/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/edit/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/after/index.js":
/*!*************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/after/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = after;

function after(count, callback, err_cb) {
    var bail = false;
    err_cb = err_cb || noop;
    proxy.count = count;

    return count === 0 ? callback() : proxy;

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times');
        }
        --proxy.count;

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true;
            callback(err);
            // future error callbacks will go to error handler
            callback = err_cb;
        } else if (proxy.count === 0 && !bail) {
            callback(null, result);
        }
    }
}

function noop() {}

/***/ }),

/***/ "../../node_modules/arraybuffer.slice/index.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/arraybuffer.slice/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function (arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) {
    return arraybuffer.slice(start, end);
  }

  if (start < 0) {
    start += bytes;
  }
  if (end < 0) {
    end += bytes;
  }
  if (end > bytes) {
    end = bytes;
  }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

/***/ }),

/***/ "../../node_modules/backo2/index.js":
/*!**************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/backo2/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function () {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function () {
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function (min) {
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function (max) {
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function (jitter) {
  this.jitter = jitter;
};

/***/ }),

/***/ "../../node_modules/base64-arraybuffer/lib/base64-arraybuffer.js":
/*!*******************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/base64-arraybuffer/lib/base64-arraybuffer.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function () {
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = "";

    for (i = 0; i < len; i += 3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64 += chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode = function (base64) {
    var bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];

      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }

    return arraybuffer;
  };
})();

/***/ }),

/***/ "../../node_modules/blob/index.js":
/*!************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/blob/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = function () {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && function () {
  try {
    var b = new Blob([new Uint8Array([1, 2])]);
    return b.size === 2;
  } catch (e) {
    return false;
  }
}();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return options.type ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = function () {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
}();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/codemirror/addon/edit/closebrackets.js":
/*!*************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/edit/closebrackets.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  var defaults = {
    pairs: "()[]{}''\"\"",
    triples: "",
    explode: "[]{}"
  };

  var Pos = CodeMirror.Pos;

  CodeMirror.defineOption("autoCloseBrackets", false, function (cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.removeKeyMap(keyMap);
      cm.state.closeBrackets = null;
    }
    if (val) {
      ensureBound(getOption(val, "pairs"));
      cm.state.closeBrackets = val;
      cm.addKeyMap(keyMap);
    }
  });

  function getOption(conf, name) {
    if (name == "pairs" && typeof conf == "string") return conf;
    if (typeof conf == "object" && conf[name] != null) return conf[name];
    return defaults[name];
  }

  var keyMap = { Backspace: handleBackspace, Enter: handleEnter };
  function ensureBound(chars) {
    for (var i = 0; i < chars.length; i++) {
      var ch = chars.charAt(i),
          key = "'" + ch + "'";
      if (!keyMap[key]) keyMap[key] = handler(ch);
    }
  }
  ensureBound(defaults.pairs + "`");

  function handler(ch) {
    return function (cm) {
      return handleChar(cm, ch);
    };
  }

  function getConfig(cm) {
    var deflt = cm.state.closeBrackets;
    if (!deflt || deflt.override) return deflt;
    var mode = cm.getModeAt(cm.getCursor());
    return mode.closeBrackets || deflt;
  }

  function handleBackspace(cm) {
    var conf = getConfig(cm);
    if (!conf || cm.getOption("disableInput")) return CodeMirror.Pass;

    var pairs = getOption(conf, "pairs");
    var ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      var around = charsAround(cm, ranges[i].head);
      if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
    }
    for (var i = ranges.length - 1; i >= 0; i--) {
      var cur = ranges[i].head;
      cm.replaceRange("", Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1), "+delete");
    }
  }

  function handleEnter(cm) {
    var conf = getConfig(cm);
    var explode = conf && getOption(conf, "explode");
    if (!explode || cm.getOption("disableInput")) return CodeMirror.Pass;

    var ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      var around = charsAround(cm, ranges[i].head);
      if (!around || explode.indexOf(around) % 2 != 0) return CodeMirror.Pass;
    }
    cm.operation(function () {
      var linesep = cm.lineSeparator() || "\n";
      cm.replaceSelection(linesep + linesep, null);
      cm.execCommand("goCharLeft");
      ranges = cm.listSelections();
      for (var i = 0; i < ranges.length; i++) {
        var line = ranges[i].head.line;
        cm.indentLine(line, null, true);
        cm.indentLine(line + 1, null, true);
      }
    });
  }

  function contractSelection(sel) {
    var inverted = CodeMirror.cmpPos(sel.anchor, sel.head) > 0;
    return { anchor: new Pos(sel.anchor.line, sel.anchor.ch + (inverted ? -1 : 1)),
      head: new Pos(sel.head.line, sel.head.ch + (inverted ? 1 : -1)) };
  }

  function handleChar(cm, ch) {
    var conf = getConfig(cm);
    if (!conf || cm.getOption("disableInput")) return CodeMirror.Pass;

    var pairs = getOption(conf, "pairs");
    var pos = pairs.indexOf(ch);
    if (pos == -1) return CodeMirror.Pass;
    var triples = getOption(conf, "triples");

    var identical = pairs.charAt(pos + 1) == ch;
    var ranges = cm.listSelections();
    var opening = pos % 2 == 0;

    var type;
    for (var i = 0; i < ranges.length; i++) {
      var range = ranges[i],
          cur = range.head,
          curType;
      var next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
      if (opening && !range.empty()) {
        curType = "surround";
      } else if ((identical || !opening) && next == ch) {
        if (identical && stringStartsAfter(cm, cur)) curType = "both";else if (triples.indexOf(ch) >= 0 && cm.getRange(cur, Pos(cur.line, cur.ch + 3)) == ch + ch + ch) curType = "skipThree";else curType = "skip";
      } else if (identical && cur.ch > 1 && triples.indexOf(ch) >= 0 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch) {
        if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2)))) return CodeMirror.Pass;
        curType = "addFour";
      } else if (identical) {
        var prev = cur.ch == 0 ? " " : cm.getRange(Pos(cur.line, cur.ch - 1), cur);
        if (!CodeMirror.isWordChar(next) && prev != ch && !CodeMirror.isWordChar(prev)) curType = "both";else return CodeMirror.Pass;
      } else if (opening && (cm.getLine(cur.line).length == cur.ch || isClosingBracket(next, pairs) || /\s/.test(next))) {
        curType = "both";
      } else {
        return CodeMirror.Pass;
      }
      if (!type) type = curType;else if (type != curType) return CodeMirror.Pass;
    }

    var left = pos % 2 ? pairs.charAt(pos - 1) : ch;
    var right = pos % 2 ? ch : pairs.charAt(pos + 1);
    cm.operation(function () {
      if (type == "skip") {
        cm.execCommand("goCharRight");
      } else if (type == "skipThree") {
        for (var i = 0; i < 3; i++) cm.execCommand("goCharRight");
      } else if (type == "surround") {
        var sels = cm.getSelections();
        for (var i = 0; i < sels.length; i++) sels[i] = left + sels[i] + right;
        cm.replaceSelections(sels, "around");
        sels = cm.listSelections().slice();
        for (var i = 0; i < sels.length; i++) sels[i] = contractSelection(sels[i]);
        cm.setSelections(sels);
      } else if (type == "both") {
        cm.replaceSelection(left + right, null);
        cm.triggerElectric(left + right);
        cm.execCommand("goCharLeft");
      } else if (type == "addFour") {
        cm.replaceSelection(left + left + left + left, "before");
        cm.execCommand("goCharRight");
      }
    });
  }

  function isClosingBracket(ch, pairs) {
    var pos = pairs.lastIndexOf(ch);
    return pos > -1 && pos % 2 == 1;
  }

  function charsAround(cm, pos) {
    var str = cm.getRange(Pos(pos.line, pos.ch - 1), Pos(pos.line, pos.ch + 1));
    return str.length == 2 ? str : null;
  }

  function stringStartsAfter(cm, pos) {
    var token = cm.getTokenAt(Pos(pos.line, pos.ch + 1));
    return (/\bstring/.test(token.type) && token.start == pos.ch && (pos.ch == 0 || !/\bstring/.test(cm.getTokenTypeAt(pos)))
    );
  }
});

/***/ }),

/***/ "../../node_modules/codemirror/addon/edit/closetag.js":
/*!********************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/edit/closetag.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

/**
 * Tag-closer extension for CodeMirror.
 *
 * This extension adds an "autoCloseTags" option that can be set to
 * either true to get the default behavior, or an object to further
 * configure its behavior.
 *
 * These are supported options:
 *
 * `whenClosing` (default true)
 *   Whether to autoclose when the '/' of a closing tag is typed.
 * `whenOpening` (default true)
 *   Whether to autoclose the tag when the final '>' of an opening
 *   tag is typed.
 * `dontCloseTags` (default is empty tags for HTML, none for XML)
 *   An array of tag names that should not be autoclosed.
 * `indentTags` (default is block tags for HTML, none for XML)
 *   An array of tag names that should, when opened, cause a
 *   blank line to be added inside the tag, and the blank line and
 *   closing line to be indented.
 *
 * See demos/closetag.html for a usage example.
 */

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! ../fold/xml-fold */ "../../node_modules/codemirror/addon/fold/xml-fold.js"));else {}
})(function (CodeMirror) {
  CodeMirror.defineOption("autoCloseTags", false, function (cm, val, old) {
    if (old != CodeMirror.Init && old) cm.removeKeyMap("autoCloseTags");
    if (!val) return;
    var map = { name: "autoCloseTags" };
    if (typeof val != "object" || val.whenClosing) map["'/'"] = function (cm) {
      return autoCloseSlash(cm);
    };
    if (typeof val != "object" || val.whenOpening) map["'>'"] = function (cm) {
      return autoCloseGT(cm);
    };
    cm.addKeyMap(map);
  });

  var htmlDontClose = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
  var htmlIndent = ["applet", "blockquote", "body", "button", "div", "dl", "fieldset", "form", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "html", "iframe", "layer", "legend", "object", "ol", "p", "select", "table", "ul"];

  function autoCloseGT(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    var ranges = cm.listSelections(),
        replacements = [];
    var opt = cm.getOption("autoCloseTags");
    for (var i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      var pos = ranges[i].head,
          tok = cm.getTokenAt(pos);
      var inner = CodeMirror.innerMode(cm.getMode(), tok.state),
          state = inner.state;
      if (inner.mode.name != "xml" || !state.tagName) return CodeMirror.Pass;

      var html = inner.mode.configuration == "html";
      var dontCloseTags = typeof opt == "object" && opt.dontCloseTags || html && htmlDontClose;
      var indentTags = typeof opt == "object" && opt.indentTags || html && htmlIndent;

      var tagName = state.tagName;
      if (tok.end > pos.ch) tagName = tagName.slice(0, tagName.length - tok.end + pos.ch);
      var lowerTagName = tagName.toLowerCase();
      // Don't process the '>' at the end of an end-tag or self-closing tag
      if (!tagName || tok.type == "string" && (tok.end != pos.ch || !/[\"\']/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length == 1) || tok.type == "tag" && state.type == "closeTag" || tok.string.indexOf("/") == tok.string.length - 1 || // match something like <someTagName />
      dontCloseTags && indexOf(dontCloseTags, lowerTagName) > -1 || closingTagExists(cm, tagName, pos, state, true)) return CodeMirror.Pass;

      var indent = indentTags && indexOf(indentTags, lowerTagName) > -1;
      replacements[i] = { indent: indent,
        text: ">" + (indent ? "\n\n" : "") + "</" + tagName + ">",
        newPos: indent ? CodeMirror.Pos(pos.line + 1, 0) : CodeMirror.Pos(pos.line, pos.ch + 1) };
    }

    var dontIndentOnAutoClose = typeof opt == "object" && opt.dontIndentOnAutoClose;
    for (var i = ranges.length - 1; i >= 0; i--) {
      var info = replacements[i];
      cm.replaceRange(info.text, ranges[i].head, ranges[i].anchor, "+insert");
      var sel = cm.listSelections().slice(0);
      sel[i] = { head: info.newPos, anchor: info.newPos };
      cm.setSelections(sel);
      if (!dontIndentOnAutoClose && info.indent) {
        cm.indentLine(info.newPos.line, null, true);
        cm.indentLine(info.newPos.line + 1, null, true);
      }
    }
  }

  function autoCloseCurrent(cm, typingSlash) {
    var ranges = cm.listSelections(),
        replacements = [];
    var head = typingSlash ? "/" : "</";
    var opt = cm.getOption("autoCloseTags");
    var dontIndentOnAutoClose = typeof opt == "object" && opt.dontIndentOnSlash;
    for (var i = 0; i < ranges.length; i++) {
      if (!ranges[i].empty()) return CodeMirror.Pass;
      var pos = ranges[i].head,
          tok = cm.getTokenAt(pos);
      var inner = CodeMirror.innerMode(cm.getMode(), tok.state),
          state = inner.state;
      if (typingSlash && (tok.type == "string" || tok.string.charAt(0) != "<" || tok.start != pos.ch - 1)) return CodeMirror.Pass;
      // Kludge to get around the fact that we are not in XML mode
      // when completing in JS/CSS snippet in htmlmixed mode. Does not
      // work for other XML embedded languages (there is no general
      // way to go from a mixed mode to its current XML state).
      var replacement;
      if (inner.mode.name != "xml") {
        if (cm.getMode().name == "htmlmixed" && inner.mode.name == "javascript") replacement = head + "script";else if (cm.getMode().name == "htmlmixed" && inner.mode.name == "css") replacement = head + "style";else return CodeMirror.Pass;
      } else {
        if (!state.context || !state.context.tagName || closingTagExists(cm, state.context.tagName, pos, state)) return CodeMirror.Pass;
        replacement = head + state.context.tagName;
      }
      if (cm.getLine(pos.line).charAt(tok.end) != ">") replacement += ">";
      replacements[i] = replacement;
    }
    cm.replaceSelections(replacements);
    ranges = cm.listSelections();
    if (!dontIndentOnAutoClose) {
      for (var i = 0; i < ranges.length; i++) if (i == ranges.length - 1 || ranges[i].head.line < ranges[i + 1].head.line) cm.indentLine(ranges[i].head.line);
    }
  }

  function autoCloseSlash(cm) {
    if (cm.getOption("disableInput")) return CodeMirror.Pass;
    return autoCloseCurrent(cm, true);
  }

  CodeMirror.commands.closeTag = function (cm) {
    return autoCloseCurrent(cm);
  };

  function indexOf(collection, elt) {
    if (collection.indexOf) return collection.indexOf(elt);
    for (var i = 0, e = collection.length; i < e; ++i) if (collection[i] == elt) return i;
    return -1;
  }

  // If xml-fold is loaded, we use its functionality to try and verify
  // whether a given tag is actually unclosed.
  function closingTagExists(cm, tagName, pos, state, newTag) {
    if (!CodeMirror.scanForClosingTag) return false;
    var end = Math.min(cm.lastLine() + 1, pos.line + 500);
    var nextClose = CodeMirror.scanForClosingTag(cm, pos, null, end);
    if (!nextClose || nextClose.tag != tagName) return false;
    var cx = state.context;
    // If the immediate wrapping context contains onCx instances of
    // the same tag, a closing tag only exists if there are at least
    // that many closing tags of that type following.
    for (var onCx = newTag ? 1 : 0; cx && cx.tagName == tagName; cx = cx.prev) ++onCx;
    pos = nextClose.to;
    for (var i = 1; i < onCx; i++) {
      var next = CodeMirror.scanForClosingTag(cm, pos, null, end);
      if (!next || next.tag != tagName) return false;
      pos = next.to;
    }
    return true;
  }
});

/***/ }),

/***/ "../../node_modules/codemirror/addon/edit/matchbrackets.js":
/*!*************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/edit/matchbrackets.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  var ie_lt8 = /MSIE \d/.test(navigator.userAgent) && (document.documentMode == null || document.documentMode < 8);

  var Pos = CodeMirror.Pos;

  var matching = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<" };

  function findMatchingBracket(cm, where, config) {
    var line = cm.getLineHandle(where.line),
        pos = where.ch - 1;
    var afterCursor = config && config.afterCursor;
    if (afterCursor == null) afterCursor = /(^| )cm-fat-cursor($| )/.test(cm.getWrapperElement().className);

    // A cursor is defined as between two characters, but in in vim command mode
    // (i.e. not insert mode), the cursor is visually represented as a
    // highlighted box on top of the 2nd character. Otherwise, we allow matches
    // from before or after the cursor.
    var match = !afterCursor && pos >= 0 && matching[line.text.charAt(pos)] || matching[line.text.charAt(++pos)];
    if (!match) return null;
    var dir = match.charAt(1) == ">" ? 1 : -1;
    if (config && config.strict && dir > 0 != (pos == where.ch)) return null;
    var style = cm.getTokenTypeAt(Pos(where.line, pos + 1));

    var found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style || null, config);
    if (found == null) return null;
    return { from: Pos(where.line, pos), to: found && found.pos,
      match: found && found.ch == match.charAt(0), forward: dir > 0 };
  }

  // bracketRegex is used to specify which type of bracket to scan
  // should be a regexp, e.g. /[[\]]/
  //
  // Note: If "where" is on an open bracket, then this bracket is ignored.
  //
  // Returns false when no bracket was found, null when it reached
  // maxScanLines and gave up
  function scanForBracket(cm, where, dir, style, config) {
    var maxScanLen = config && config.maxScanLineLength || 10000;
    var maxScanLines = config && config.maxScanLines || 1000;

    var stack = [];
    var re = config && config.bracketRegex ? config.bracketRegex : /[(){}[\]]/;
    var lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1) : Math.max(cm.firstLine() - 1, where.line - maxScanLines);
    for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
      var line = cm.getLine(lineNo);
      if (!line) continue;
      var pos = dir > 0 ? 0 : line.length - 1,
          end = dir > 0 ? line.length : -1;
      if (line.length > maxScanLen) continue;
      if (lineNo == where.line) pos = where.ch - (dir < 0 ? 1 : 0);
      for (; pos != end; pos += dir) {
        var ch = line.charAt(pos);
        if (re.test(ch) && (style === undefined || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
          var match = matching[ch];
          if (match.charAt(1) == ">" == dir > 0) stack.push(ch);else if (!stack.length) return { pos: Pos(lineNo, pos), ch: ch };else stack.pop();
        }
      }
    }
    return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null;
  }

  function matchBrackets(cm, autoclear, config) {
    // Disable brace matching in long lines, since it'll cause hugely slow updates
    var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1000;
    var marks = [],
        ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, config);
      if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
        var style = match.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
        marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), { className: style }));
        if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen) marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), { className: style }));
      }
    }

    if (marks.length) {
      // Kludge to work around the IE bug from issue #1193, where text
      // input stops going to the textare whever this fires.
      if (ie_lt8 && cm.state.focused) cm.focus();

      var clear = function () {
        cm.operation(function () {
          for (var i = 0; i < marks.length; i++) marks[i].clear();
        });
      };
      if (autoclear) setTimeout(clear, 800);else return clear;
    }
  }

  function doMatchBrackets(cm) {
    cm.operation(function () {
      if (cm.state.matchBrackets.currentlyHighlighted) {
        cm.state.matchBrackets.currentlyHighlighted();
        cm.state.matchBrackets.currentlyHighlighted = null;
      }
      cm.state.matchBrackets.currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets);
    });
  }

  CodeMirror.defineOption("matchBrackets", false, function (cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.off("cursorActivity", doMatchBrackets);
      if (cm.state.matchBrackets && cm.state.matchBrackets.currentlyHighlighted) {
        cm.state.matchBrackets.currentlyHighlighted();
        cm.state.matchBrackets.currentlyHighlighted = null;
      }
    }
    if (val) {
      cm.state.matchBrackets = typeof val == "object" ? val : {};
      cm.on("cursorActivity", doMatchBrackets);
    }
  });

  CodeMirror.defineExtension("matchBrackets", function () {
    matchBrackets(this, true);
  });
  CodeMirror.defineExtension("findMatchingBracket", function (pos, config, oldConfig) {
    // Backwards-compatibility kludge
    if (oldConfig || typeof config == "boolean") {
      if (!oldConfig) {
        config = config ? { strict: true } : null;
      } else {
        oldConfig.strict = config;
        config = oldConfig;
      }
    }
    return findMatchingBracket(this, pos, config);
  });
  CodeMirror.defineExtension("scanForBracket", function (pos, dir, style, config) {
    return scanForBracket(this, pos, dir, style, config);
  });
});

/***/ }),

/***/ "../../node_modules/codemirror/addon/edit/matchtags.js":
/*!*********************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/edit/matchtags.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! ../fold/xml-fold */ "../../node_modules/codemirror/addon/fold/xml-fold.js"));else {}
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineOption("matchTags", false, function (cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.off("cursorActivity", doMatchTags);
      cm.off("viewportChange", maybeUpdateMatch);
      clear(cm);
    }
    if (val) {
      cm.state.matchBothTags = typeof val == "object" && val.bothTags;
      cm.on("cursorActivity", doMatchTags);
      cm.on("viewportChange", maybeUpdateMatch);
      doMatchTags(cm);
    }
  });

  function clear(cm) {
    if (cm.state.tagHit) cm.state.tagHit.clear();
    if (cm.state.tagOther) cm.state.tagOther.clear();
    cm.state.tagHit = cm.state.tagOther = null;
  }

  function doMatchTags(cm) {
    cm.state.failedTagMatch = false;
    cm.operation(function () {
      clear(cm);
      if (cm.somethingSelected()) return;
      var cur = cm.getCursor(),
          range = cm.getViewport();
      range.from = Math.min(range.from, cur.line);range.to = Math.max(cur.line + 1, range.to);
      var match = CodeMirror.findMatchingTag(cm, cur, range);
      if (!match) return;
      if (cm.state.matchBothTags) {
        var hit = match.at == "open" ? match.open : match.close;
        if (hit) cm.state.tagHit = cm.markText(hit.from, hit.to, { className: "CodeMirror-matchingtag" });
      }
      var other = match.at == "close" ? match.open : match.close;
      if (other) cm.state.tagOther = cm.markText(other.from, other.to, { className: "CodeMirror-matchingtag" });else cm.state.failedTagMatch = true;
    });
  }

  function maybeUpdateMatch(cm) {
    if (cm.state.failedTagMatch) doMatchTags(cm);
  }

  CodeMirror.commands.toMatchingTag = function (cm) {
    var found = CodeMirror.findMatchingTag(cm, cm.getCursor());
    if (found) {
      var other = found.at == "close" ? found.open : found.close;
      if (other) cm.extendSelection(other.to, other.from);
    }
  };
});

/***/ }),

/***/ "../../node_modules/codemirror/addon/fold/xml-fold.js":
/*!********************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/fold/xml-fold.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  var Pos = CodeMirror.Pos;
  function cmp(a, b) {
    return a.line - b.line || a.ch - b.ch;
  }

  var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  var nameChar = nameStartChar + "\-\:\.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");

  function Iter(cm, line, ch, range) {
    this.line = line;this.ch = ch;
    this.cm = cm;this.text = cm.getLine(line);
    this.min = range ? Math.max(range.from, cm.firstLine()) : cm.firstLine();
    this.max = range ? Math.min(range.to - 1, cm.lastLine()) : cm.lastLine();
  }

  function tagAt(iter, ch) {
    var type = iter.cm.getTokenTypeAt(Pos(iter.line, ch));
    return type && /\btag\b/.test(type);
  }

  function nextLine(iter) {
    if (iter.line >= iter.max) return;
    iter.ch = 0;
    iter.text = iter.cm.getLine(++iter.line);
    return true;
  }
  function prevLine(iter) {
    if (iter.line <= iter.min) return;
    iter.text = iter.cm.getLine(--iter.line);
    iter.ch = iter.text.length;
    return true;
  }

  function toTagEnd(iter) {
    for (;;) {
      var gt = iter.text.indexOf(">", iter.ch);
      if (gt == -1) {
        if (nextLine(iter)) continue;else return;
      }
      if (!tagAt(iter, gt + 1)) {
        iter.ch = gt + 1;continue;
      }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }
  function toTagStart(iter) {
    for (;;) {
      var lt = iter.ch ? iter.text.lastIndexOf("<", iter.ch - 1) : -1;
      if (lt == -1) {
        if (prevLine(iter)) continue;else return;
      }
      if (!tagAt(iter, lt + 1)) {
        iter.ch = lt;continue;
      }
      xmlTagStart.lastIndex = lt;
      iter.ch = lt;
      var match = xmlTagStart.exec(iter.text);
      if (match && match.index == lt) return match;
    }
  }

  function toNextTag(iter) {
    for (;;) {
      xmlTagStart.lastIndex = iter.ch;
      var found = xmlTagStart.exec(iter.text);
      if (!found) {
        if (nextLine(iter)) continue;else return;
      }
      if (!tagAt(iter, found.index + 1)) {
        iter.ch = found.index + 1;continue;
      }
      iter.ch = found.index + found[0].length;
      return found;
    }
  }
  function toPrevTag(iter) {
    for (;;) {
      var gt = iter.ch ? iter.text.lastIndexOf(">", iter.ch - 1) : -1;
      if (gt == -1) {
        if (prevLine(iter)) continue;else return;
      }
      if (!tagAt(iter, gt + 1)) {
        iter.ch = gt;continue;
      }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }

  function findMatchingClose(iter, tag) {
    var stack = [];
    for (;;) {
      var next = toNextTag(iter),
          end,
          startLine = iter.line,
          startCh = iter.ch - (next ? next[0].length : 0);
      if (!next || !(end = toTagEnd(iter))) return;
      if (end == "selfClose") continue;
      if (next[1]) {
        // closing tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == next[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == next[2])) return {
          tag: next[2],
          from: Pos(startLine, startCh),
          to: Pos(iter.line, iter.ch)
        };
      } else {
        // opening tag
        stack.push(next[2]);
      }
    }
  }
  function findMatchingOpen(iter, tag) {
    var stack = [];
    for (;;) {
      var prev = toPrevTag(iter);
      if (!prev) return;
      if (prev == "selfClose") {
        toTagStart(iter);continue;
      }
      var endLine = iter.line,
          endCh = iter.ch;
      var start = toTagStart(iter);
      if (!start) return;
      if (start[1]) {
        // closing tag
        stack.push(start[2]);
      } else {
        // opening tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == start[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == start[2])) return {
          tag: start[2],
          from: Pos(iter.line, iter.ch),
          to: Pos(endLine, endCh)
        };
      }
    }
  }

  CodeMirror.registerHelper("fold", "xml", function (cm, start) {
    var iter = new Iter(cm, start.line, 0);
    for (;;) {
      var openTag = toNextTag(iter),
          end;
      if (!openTag || !(end = toTagEnd(iter)) || iter.line != start.line) return;
      if (!openTag[1] && end != "selfClose") {
        var startPos = Pos(iter.line, iter.ch);
        var endPos = findMatchingClose(iter, openTag[2]);
        return endPos && { from: startPos, to: endPos.from };
      }
    }
  });
  CodeMirror.findMatchingTag = function (cm, pos, range) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    if (iter.text.indexOf(">") == -1 && iter.text.indexOf("<") == -1) return;
    var end = toTagEnd(iter),
        to = end && Pos(iter.line, iter.ch);
    var start = end && toTagStart(iter);
    if (!end || !start || cmp(iter, pos) > 0) return;
    var here = { from: Pos(iter.line, iter.ch), to: to, tag: start[2] };
    if (end == "selfClose") return { open: here, close: null, at: "open" };

    if (start[1]) {
      // closing tag
      return { open: findMatchingOpen(iter, start[2]), close: here, at: "close" };
    } else {
      // opening tag
      iter = new Iter(cm, to.line, to.ch, range);
      return { open: here, close: findMatchingClose(iter, start[2]), at: "open" };
    }
  };

  CodeMirror.findEnclosingTag = function (cm, pos, range, tag) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    for (;;) {
      var open = findMatchingOpen(iter, tag);
      if (!open) break;
      var forward = new Iter(cm, pos.line, pos.ch, range);
      var close = findMatchingClose(forward, open.tag);
      if (close) return { open: open, close: close };
    }
  };

  // Used by addon/edit/closetag.js
  CodeMirror.scanForClosingTag = function (cm, pos, name, end) {
    var iter = new Iter(cm, pos.line, pos.ch, end ? { from: 0, to: end } : null);
    return findMatchingClose(iter, name);
  };
});

/***/ }),

/***/ "../../node_modules/codemirror/addon/scroll/simplescrollbars.css":
/*!*******************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/scroll/simplescrollbars.css ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader??ref--6-1!./simplescrollbars.css */ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/addon/scroll/simplescrollbars.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../node_modules/codemirror/addon/scroll/simplescrollbars.js":
/*!******************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/scroll/simplescrollbars.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  function Bar(cls, orientation, scroll) {
    this.orientation = orientation;
    this.scroll = scroll;
    this.screen = this.total = this.size = 1;
    this.pos = 0;

    this.node = document.createElement("div");
    this.node.className = cls + "-" + orientation;
    this.inner = this.node.appendChild(document.createElement("div"));

    var self = this;
    CodeMirror.on(this.inner, "mousedown", function (e) {
      if (e.which != 1) return;
      CodeMirror.e_preventDefault(e);
      var axis = self.orientation == "horizontal" ? "pageX" : "pageY";
      var start = e[axis],
          startpos = self.pos;
      function done() {
        CodeMirror.off(document, "mousemove", move);
        CodeMirror.off(document, "mouseup", done);
      }
      function move(e) {
        if (e.which != 1) return done();
        self.moveTo(startpos + (e[axis] - start) * (self.total / self.size));
      }
      CodeMirror.on(document, "mousemove", move);
      CodeMirror.on(document, "mouseup", done);
    });

    CodeMirror.on(this.node, "click", function (e) {
      CodeMirror.e_preventDefault(e);
      var innerBox = self.inner.getBoundingClientRect(),
          where;
      if (self.orientation == "horizontal") where = e.clientX < innerBox.left ? -1 : e.clientX > innerBox.right ? 1 : 0;else where = e.clientY < innerBox.top ? -1 : e.clientY > innerBox.bottom ? 1 : 0;
      self.moveTo(self.pos + where * self.screen);
    });

    function onWheel(e) {
      var moved = CodeMirror.wheelEventPixels(e)[self.orientation == "horizontal" ? "x" : "y"];
      var oldPos = self.pos;
      self.moveTo(self.pos + moved);
      if (self.pos != oldPos) CodeMirror.e_preventDefault(e);
    }
    CodeMirror.on(this.node, "mousewheel", onWheel);
    CodeMirror.on(this.node, "DOMMouseScroll", onWheel);
  }

  Bar.prototype.setPos = function (pos, force) {
    if (pos < 0) pos = 0;
    if (pos > this.total - this.screen) pos = this.total - this.screen;
    if (!force && pos == this.pos) return false;
    this.pos = pos;
    this.inner.style[this.orientation == "horizontal" ? "left" : "top"] = pos * (this.size / this.total) + "px";
    return true;
  };

  Bar.prototype.moveTo = function (pos) {
    if (this.setPos(pos)) this.scroll(pos, this.orientation);
  };

  var minButtonSize = 10;

  Bar.prototype.update = function (scrollSize, clientSize, barSize) {
    var sizeChanged = this.screen != clientSize || this.total != scrollSize || this.size != barSize;
    if (sizeChanged) {
      this.screen = clientSize;
      this.total = scrollSize;
      this.size = barSize;
    }

    var buttonSize = this.screen * (this.size / this.total);
    if (buttonSize < minButtonSize) {
      this.size -= minButtonSize - buttonSize;
      buttonSize = minButtonSize;
    }
    this.inner.style[this.orientation == "horizontal" ? "width" : "height"] = buttonSize + "px";
    this.setPos(this.pos, sizeChanged);
  };

  function SimpleScrollbars(cls, place, scroll) {
    this.addClass = cls;
    this.horiz = new Bar(cls, "horizontal", scroll);
    place(this.horiz.node);
    this.vert = new Bar(cls, "vertical", scroll);
    place(this.vert.node);
    this.width = null;
  }

  SimpleScrollbars.prototype.update = function (measure) {
    if (this.width == null) {
      var style = window.getComputedStyle ? window.getComputedStyle(this.horiz.node) : this.horiz.node.currentStyle;
      if (style) this.width = parseInt(style.height);
    }
    var width = this.width || 0;

    var needsH = measure.scrollWidth > measure.clientWidth + 1;
    var needsV = measure.scrollHeight > measure.clientHeight + 1;
    this.vert.node.style.display = needsV ? "block" : "none";
    this.horiz.node.style.display = needsH ? "block" : "none";

    if (needsV) {
      this.vert.update(measure.scrollHeight, measure.clientHeight, measure.viewHeight - (needsH ? width : 0));
      this.vert.node.style.bottom = needsH ? width + "px" : "0";
    }
    if (needsH) {
      this.horiz.update(measure.scrollWidth, measure.clientWidth, measure.viewWidth - (needsV ? width : 0) - measure.barLeft);
      this.horiz.node.style.right = needsV ? width + "px" : "0";
      this.horiz.node.style.left = measure.barLeft + "px";
    }

    return { right: needsV ? width : 0, bottom: needsH ? width : 0 };
  };

  SimpleScrollbars.prototype.setScrollTop = function (pos) {
    this.vert.setPos(pos);
  };

  SimpleScrollbars.prototype.setScrollLeft = function (pos) {
    this.horiz.setPos(pos);
  };

  SimpleScrollbars.prototype.clear = function () {
    var parent = this.horiz.node.parentNode;
    parent.removeChild(this.horiz.node);
    parent.removeChild(this.vert.node);
  };

  CodeMirror.scrollbarModel.simple = function (place, scroll) {
    return new SimpleScrollbars("CodeMirror-simplescroll", place, scroll);
  };
  CodeMirror.scrollbarModel.overlay = function (place, scroll) {
    return new SimpleScrollbars("CodeMirror-overlayscroll", place, scroll);
  };
});

/***/ }),

/***/ "../../node_modules/codemirror/lib/codemirror.css":
/*!****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/lib/codemirror.css ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--6-1!./codemirror.css */ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/lib/codemirror.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../node_modules/codemirror/lib/codemirror.js":
/*!***************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/lib/codemirror.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// This is CodeMirror (http://codemirror.net), a code editor
// implemented in JavaScript on top of the browser's DOM.
//
// You can find some technical background for some of the code below
// at http://marijnhaverbeke.nl/blog/#cm-internals .

(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(this, function () {
  'use strict';

  // Kludges for bugs and behavior differences that can't be feature
  // detected are enabled based on userAgent etc sniffing.

  var userAgent = navigator.userAgent;
  var platform = navigator.platform;

  var gecko = /gecko\/\d/i.test(userAgent);
  var ie_upto10 = /MSIE \d/.test(userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
  var edge = /Edge\/(\d+)/.exec(userAgent);
  var ie = ie_upto10 || ie_11up || edge;
  var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
  var webkit = !edge && /WebKit\//.test(userAgent);
  var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
  var chrome = !edge && /Chrome\//.test(userAgent);
  var presto = /Opera\//.test(userAgent);
  var safari = /Apple Computer/.test(navigator.vendor);
  var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
  var phantom = /PhantomJS/.test(userAgent);

  var ios = !edge && /AppleWebKit/.test(userAgent) && /Mobile\/\w+/.test(userAgent);
  var android = /Android/.test(userAgent);
  // This is woefully incomplete. Suggestions for alternative methods welcome.
  var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
  var mac = ios || /Mac/.test(platform);
  var chromeOS = /\bCrOS\b/.test(userAgent);
  var windows = /win/i.test(platform);

  var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
  if (presto_version) {
    presto_version = Number(presto_version[1]);
  }
  if (presto_version && presto_version >= 15) {
    presto = false;webkit = true;
  }
  // Some browsers use the wrong event properties to signal cmd/ctrl on OS X
  var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
  var captureRightClick = gecko || ie && ie_version >= 9;

  function classTest(cls) {
    return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
  }

  var rmClass = function (node, cls) {
    var current = node.className;
    var match = classTest(cls).exec(current);
    if (match) {
      var after = current.slice(match.index + match[0].length);
      node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
    }
  };

  function removeChildren(e) {
    for (var count = e.childNodes.length; count > 0; --count) {
      e.removeChild(e.firstChild);
    }
    return e;
  }

  function removeChildrenAndAdd(parent, e) {
    return removeChildren(parent).appendChild(e);
  }

  function elt(tag, content, className, style) {
    var e = document.createElement(tag);
    if (className) {
      e.className = className;
    }
    if (style) {
      e.style.cssText = style;
    }
    if (typeof content == "string") {
      e.appendChild(document.createTextNode(content));
    } else if (content) {
      for (var i = 0; i < content.length; ++i) {
        e.appendChild(content[i]);
      }
    }
    return e;
  }
  // wrapper for elt, which removes the elt from the accessibility tree
  function eltP(tag, content, className, style) {
    var e = elt(tag, content, className, style);
    e.setAttribute("role", "presentation");
    return e;
  }

  var range;
  if (document.createRange) {
    range = function (node, start, end, endNode) {
      var r = document.createRange();
      r.setEnd(endNode || node, end);
      r.setStart(node, start);
      return r;
    };
  } else {
    range = function (node, start, end) {
      var r = document.body.createTextRange();
      try {
        r.moveToElementText(node.parentNode);
      } catch (e) {
        return r;
      }
      r.collapse(true);
      r.moveEnd("character", end);
      r.moveStart("character", start);
      return r;
    };
  }

  function contains(parent, child) {
    if (child.nodeType == 3) // Android browser always returns false when child is a textnode
      {
        child = child.parentNode;
      }
    if (parent.contains) {
      return parent.contains(child);
    }
    do {
      if (child.nodeType == 11) {
        child = child.host;
      }
      if (child == parent) {
        return true;
      }
    } while (child = child.parentNode);
  }

  function activeElt() {
    // IE and Edge may throw an "Unspecified Error" when accessing document.activeElement.
    // IE < 10 will throw when accessed while the page is loading or in an iframe.
    // IE > 9 and Edge will throw when accessed in an iframe if document.body is unavailable.
    var activeElement;
    try {
      activeElement = document.activeElement;
    } catch (e) {
      activeElement = document.body || null;
    }
    while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }

  function addClass(node, cls) {
    var current = node.className;
    if (!classTest(cls).test(current)) {
      node.className += (current ? " " : "") + cls;
    }
  }
  function joinClasses(a, b) {
    var as = a.split(" ");
    for (var i = 0; i < as.length; i++) {
      if (as[i] && !classTest(as[i]).test(b)) {
        b += " " + as[i];
      }
    }
    return b;
  }

  var selectInput = function (node) {
    node.select();
  };
  if (ios) // Mobile Safari apparently has a bug where select() is broken.
    {
      selectInput = function (node) {
        node.selectionStart = 0;node.selectionEnd = node.value.length;
      };
    } else if (ie) // Suppress mysterious IE10 errors
    {
      selectInput = function (node) {
        try {
          node.select();
        } catch (_e) {}
      };
    }

  function bind(f) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
      return f.apply(null, args);
    };
  }

  function copyObj(obj, target, overwrite) {
    if (!target) {
      target = {};
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop) && (overwrite !== false || !target.hasOwnProperty(prop))) {
        target[prop] = obj[prop];
      }
    }
    return target;
  }

  // Counts the column offset in a string, taking tabs into account.
  // Used mostly to find indentation.
  function countColumn(string, end, tabSize, startIndex, startValue) {
    if (end == null) {
      end = string.search(/[^\s\u00a0]/);
      if (end == -1) {
        end = string.length;
      }
    }
    for (var i = startIndex || 0, n = startValue || 0;;) {
      var nextTab = string.indexOf("\t", i);
      if (nextTab < 0 || nextTab >= end) {
        return n + (end - i);
      }
      n += nextTab - i;
      n += tabSize - n % tabSize;
      i = nextTab + 1;
    }
  }

  var Delayed = function () {
    this.id = null;
  };
  Delayed.prototype.set = function (ms, f) {
    clearTimeout(this.id);
    this.id = setTimeout(f, ms);
  };

  function indexOf(array, elt) {
    for (var i = 0; i < array.length; ++i) {
      if (array[i] == elt) {
        return i;
      }
    }
    return -1;
  }

  // Number of pixels added to scroller and sizer to hide scrollbar
  var scrollerGap = 30;

  // Returned or thrown by various protocols to signal 'I'm not
  // handling this'.
  var Pass = { toString: function () {
      return "CodeMirror.Pass";
    } };

  // Reused option objects for setSelection & friends
  var sel_dontScroll = { scroll: false };
  var sel_mouse = { origin: "*mouse" };
  var sel_move = { origin: "+move" };

  // The inverse of countColumn -- find the offset that corresponds to
  // a particular column.
  function findColumn(string, goal, tabSize) {
    for (var pos = 0, col = 0;;) {
      var nextTab = string.indexOf("\t", pos);
      if (nextTab == -1) {
        nextTab = string.length;
      }
      var skipped = nextTab - pos;
      if (nextTab == string.length || col + skipped >= goal) {
        return pos + Math.min(skipped, goal - col);
      }
      col += nextTab - pos;
      col += tabSize - col % tabSize;
      pos = nextTab + 1;
      if (col >= goal) {
        return pos;
      }
    }
  }

  var spaceStrs = [""];
  function spaceStr(n) {
    while (spaceStrs.length <= n) {
      spaceStrs.push(lst(spaceStrs) + " ");
    }
    return spaceStrs[n];
  }

  function lst(arr) {
    return arr[arr.length - 1];
  }

  function map(array, f) {
    var out = [];
    for (var i = 0; i < array.length; i++) {
      out[i] = f(array[i], i);
    }
    return out;
  }

  function insertSorted(array, value, score) {
    var pos = 0,
        priority = score(value);
    while (pos < array.length && score(array[pos]) <= priority) {
      pos++;
    }
    array.splice(pos, 0, value);
  }

  function nothing() {}

  function createObj(base, props) {
    var inst;
    if (Object.create) {
      inst = Object.create(base);
    } else {
      nothing.prototype = base;
      inst = new nothing();
    }
    if (props) {
      copyObj(props, inst);
    }
    return inst;
  }

  var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
  function isWordCharBasic(ch) {
    return (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch))
    );
  }
  function isWordChar(ch, helper) {
    if (!helper) {
      return isWordCharBasic(ch);
    }
    if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
      return true;
    }
    return helper.test(ch);
  }

  function isEmpty(obj) {
    for (var n in obj) {
      if (obj.hasOwnProperty(n) && obj[n]) {
        return false;
      }
    }
    return true;
  }

  // Extending unicode characters. A series of a non-extending char +
  // any number of extending chars is treated as a single unit as far
  // as editing and measuring is concerned. This is not fully correct,
  // since some scripts/fonts/browsers also treat other configurations
  // of code points as a group.
  var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  function isExtendingChar(ch) {
    return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
  }

  // Returns a number from the range [`0`; `str.length`] unless `pos` is outside that range.
  function skipExtendingChars(str, pos, dir) {
    while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
      pos += dir;
    }
    return pos;
  }

  // Returns the value from the range [`from`; `to`] that satisfies
  // `pred` and is closest to `from`. Assumes that at least `to`
  // satisfies `pred`. Supports `from` being greater than `to`.
  function findFirst(pred, from, to) {
    // At any point we are certain `to` satisfies `pred`, don't know
    // whether `from` does.
    var dir = from > to ? -1 : 1;
    for (;;) {
      if (from == to) {
        return from;
      }
      var midF = (from + to) / 2,
          mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
      if (mid == from) {
        return pred(mid) ? from : to;
      }
      if (pred(mid)) {
        to = mid;
      } else {
        from = mid + dir;
      }
    }
  }

  // The display handles the DOM integration, both for input reading
  // and content drawing. It holds references to DOM nodes and
  // display-related state.

  function Display(place, doc, input) {
    var d = this;
    this.input = input;

    // Covers bottom-right square when both scrollbars are present.
    d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
    d.scrollbarFiller.setAttribute("cm-not-content", "true");
    // Covers bottom of gutter when coverGutterNextToScrollbar is on
    // and h scrollbar is present.
    d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
    d.gutterFiller.setAttribute("cm-not-content", "true");
    // Will contain the actual code, positioned to cover the viewport.
    d.lineDiv = eltP("div", null, "CodeMirror-code");
    // Elements are added to these to represent selection and cursors.
    d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
    d.cursorDiv = elt("div", null, "CodeMirror-cursors");
    // A visibility: hidden element used to find the size of things.
    d.measure = elt("div", null, "CodeMirror-measure");
    // When lines outside of the viewport are measured, they are drawn in this.
    d.lineMeasure = elt("div", null, "CodeMirror-measure");
    // Wraps everything that needs to exist inside the vertically-padded coordinate system
    d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
    var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
    // Moved around its parent to cover visible view.
    d.mover = elt("div", [lines], null, "position: relative");
    // Set to the height of the document, allowing scrolling.
    d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
    d.sizerWidth = null;
    // Behavior of elts with overflow: auto and padding is
    // inconsistent across browsers. This is used to ensure the
    // scrollable area is big enough.
    d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
    // Will contain the gutters, if any.
    d.gutters = elt("div", null, "CodeMirror-gutters");
    d.lineGutter = null;
    // Actual scrollable element.
    d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
    d.scroller.setAttribute("tabIndex", "-1");
    // The element in which the editor lives.
    d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");

    // Work around IE7 z-index bug (not perfect, hence IE7 not really being supported)
    if (ie && ie_version < 8) {
      d.gutters.style.zIndex = -1;d.scroller.style.paddingRight = 0;
    }
    if (!webkit && !(gecko && mobile)) {
      d.scroller.draggable = true;
    }

    if (place) {
      if (place.appendChild) {
        place.appendChild(d.wrapper);
      } else {
        place(d.wrapper);
      }
    }

    // Current rendered range (may be bigger than the view window).
    d.viewFrom = d.viewTo = doc.first;
    d.reportedViewFrom = d.reportedViewTo = doc.first;
    // Information about the rendered lines.
    d.view = [];
    d.renderedView = null;
    // Holds info about a single rendered line when it was rendered
    // for measurement, while not in view.
    d.externalMeasured = null;
    // Empty space (in pixels) above the view
    d.viewOffset = 0;
    d.lastWrapHeight = d.lastWrapWidth = 0;
    d.updateLineNumbers = null;

    d.nativeBarWidth = d.barHeight = d.barWidth = 0;
    d.scrollbarsClipped = false;

    // Used to only resize the line number gutter when necessary (when
    // the amount of lines crosses a boundary that makes its width change)
    d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
    // Set to true when a non-horizontal-scrolling line widget is
    // added. As an optimization, line widget aligning is skipped when
    // this is false.
    d.alignWidgets = false;

    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;

    // Tracks the maximum line length so that the horizontal scrollbar
    // can be kept static when scrolling.
    d.maxLine = null;
    d.maxLineLength = 0;
    d.maxLineChanged = false;

    // Used for measuring wheel scrolling granularity
    d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;

    // True when shift is held down.
    d.shift = false;

    // Used to track whether anything happened since the context menu
    // was opened.
    d.selForContextMenu = null;

    d.activeTouch = null;

    input.init(d);
  }

  // Find the line object corresponding to the given line number.
  function getLine(doc, n) {
    n -= doc.first;
    if (n < 0 || n >= doc.size) {
      throw new Error("There is no line " + (n + doc.first) + " in the document.");
    }
    var chunk = doc;
    while (!chunk.lines) {
      for (var i = 0;; ++i) {
        var child = chunk.children[i],
            sz = child.chunkSize();
        if (n < sz) {
          chunk = child;break;
        }
        n -= sz;
      }
    }
    return chunk.lines[n];
  }

  // Get the part of a document between two positions, as an array of
  // strings.
  function getBetween(doc, start, end) {
    var out = [],
        n = start.line;
    doc.iter(start.line, end.line + 1, function (line) {
      var text = line.text;
      if (n == end.line) {
        text = text.slice(0, end.ch);
      }
      if (n == start.line) {
        text = text.slice(start.ch);
      }
      out.push(text);
      ++n;
    });
    return out;
  }
  // Get the lines between from and to, as array of strings.
  function getLines(doc, from, to) {
    var out = [];
    doc.iter(from, to, function (line) {
      out.push(line.text);
    }); // iter aborts when callback returns truthy value
    return out;
  }

  // Update the height of a line, propagating the height change
  // upwards to parent nodes.
  function updateLineHeight(line, height) {
    var diff = height - line.height;
    if (diff) {
      for (var n = line; n; n = n.parent) {
        n.height += diff;
      }
    }
  }

  // Given a line object, find its line number by walking up through
  // its parent links.
  function lineNo(line) {
    if (line.parent == null) {
      return null;
    }
    var cur = line.parent,
        no = indexOf(cur.lines, line);
    for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
      for (var i = 0;; ++i) {
        if (chunk.children[i] == cur) {
          break;
        }
        no += chunk.children[i].chunkSize();
      }
    }
    return no + cur.first;
  }

  // Find the line at the given vertical position, using the height
  // information in the document tree.
  function lineAtHeight(chunk, h) {
    var n = chunk.first;
    outer: do {
      for (var i$1 = 0; i$1 < chunk.children.length; ++i$1) {
        var child = chunk.children[i$1],
            ch = child.height;
        if (h < ch) {
          chunk = child;continue outer;
        }
        h -= ch;
        n += child.chunkSize();
      }
      return n;
    } while (!chunk.lines);
    var i = 0;
    for (; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i],
          lh = line.height;
      if (h < lh) {
        break;
      }
      h -= lh;
    }
    return n + i;
  }

  function isLine(doc, l) {
    return l >= doc.first && l < doc.first + doc.size;
  }

  function lineNumberFor(options, i) {
    return String(options.lineNumberFormatter(i + options.firstLineNumber));
  }

  // A Pos instance represents a position within the text.
  function Pos(line, ch, sticky) {
    if (sticky === void 0) sticky = null;

    if (!(this instanceof Pos)) {
      return new Pos(line, ch, sticky);
    }
    this.line = line;
    this.ch = ch;
    this.sticky = sticky;
  }

  // Compare two positions, return 0 if they are the same, a negative
  // number when a is less, and a positive number otherwise.
  function cmp(a, b) {
    return a.line - b.line || a.ch - b.ch;
  }

  function equalCursorPos(a, b) {
    return a.sticky == b.sticky && cmp(a, b) == 0;
  }

  function copyPos(x) {
    return Pos(x.line, x.ch);
  }
  function maxPos(a, b) {
    return cmp(a, b) < 0 ? b : a;
  }
  function minPos(a, b) {
    return cmp(a, b) < 0 ? a : b;
  }

  // Most of the external API clips given positions to make sure they
  // actually exist within the document.
  function clipLine(doc, n) {
    return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
  }
  function clipPos(doc, pos) {
    if (pos.line < doc.first) {
      return Pos(doc.first, 0);
    }
    var last = doc.first + doc.size - 1;
    if (pos.line > last) {
      return Pos(last, getLine(doc, last).text.length);
    }
    return clipToLen(pos, getLine(doc, pos.line).text.length);
  }
  function clipToLen(pos, linelen) {
    var ch = pos.ch;
    if (ch == null || ch > linelen) {
      return Pos(pos.line, linelen);
    } else if (ch < 0) {
      return Pos(pos.line, 0);
    } else {
      return pos;
    }
  }
  function clipPosArray(doc, array) {
    var out = [];
    for (var i = 0; i < array.length; i++) {
      out[i] = clipPos(doc, array[i]);
    }
    return out;
  }

  // Optimize some code when these features are not used.
  var sawReadOnlySpans = false;
  var sawCollapsedSpans = false;

  function seeReadOnlySpans() {
    sawReadOnlySpans = true;
  }

  function seeCollapsedSpans() {
    sawCollapsedSpans = true;
  }

  // TEXTMARKER SPANS

  function MarkedSpan(marker, from, to) {
    this.marker = marker;
    this.from = from;this.to = to;
  }

  // Search an array of spans for a span matching the given marker.
  function getMarkedSpanFor(spans, marker) {
    if (spans) {
      for (var i = 0; i < spans.length; ++i) {
        var span = spans[i];
        if (span.marker == marker) {
          return span;
        }
      }
    }
  }
  // Remove a span from an array, returning undefined if no spans are
  // left (we don't store arrays for lines without spans).
  function removeMarkedSpan(spans, span) {
    var r;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i] != span) {
        (r || (r = [])).push(spans[i]);
      }
    }
    return r;
  }
  // Add a span to a line.
  function addMarkedSpan(line, span) {
    line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
    span.marker.attachLine(line);
  }

  // Used for the algorithm that adjusts markers for a change in the
  // document. These functions cut an array of spans at a given
  // character position, returning an array of remaining chunks (or
  // undefined if nothing remains).
  function markedSpansBefore(old, startCh, isInsert) {
    var nw;
    if (old) {
      for (var i = 0; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
        if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);(nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
        }
      }
    }
    return nw;
  }
  function markedSpansAfter(old, endCh, isInsert) {
    var nw;
    if (old) {
      for (var i = 0; i < old.length; ++i) {
        var span = old[i],
            marker = span.marker;
        var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
        if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);(nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
        }
      }
    }
    return nw;
  }

  // Given a change object, compute the new set of marker spans that
  // cover the line in which the change took place. Removes spans
  // entirely within the change, reconnects spans belonging to the
  // same marker that appear on both sides of the change, and cuts off
  // spans partially within the change. Returns an array of span
  // arrays with one element for each line in (after) the change.
  function stretchSpansOverChange(doc, change) {
    if (change.full) {
      return null;
    }
    var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
    var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
    if (!oldFirst && !oldLast) {
      return null;
    }

    var startCh = change.from.ch,
        endCh = change.to.ch,
        isInsert = cmp(change.from, change.to) == 0;
    // Get the spans that 'stick out' on both sides
    var first = markedSpansBefore(oldFirst, startCh, isInsert);
    var last = markedSpansAfter(oldLast, endCh, isInsert);

    // Next, merge those two ends
    var sameLine = change.text.length == 1,
        offset = lst(change.text).length + (sameLine ? startCh : 0);
    if (first) {
      // Fix up .to properties of first
      for (var i = 0; i < first.length; ++i) {
        var span = first[i];
        if (span.to == null) {
          var found = getMarkedSpanFor(last, span.marker);
          if (!found) {
            span.to = startCh;
          } else if (sameLine) {
            span.to = found.to == null ? null : found.to + offset;
          }
        }
      }
    }
    if (last) {
      // Fix up .from in last (or move them into first in case of sameLine)
      for (var i$1 = 0; i$1 < last.length; ++i$1) {
        var span$1 = last[i$1];
        if (span$1.to != null) {
          span$1.to += offset;
        }
        if (span$1.from == null) {
          var found$1 = getMarkedSpanFor(first, span$1.marker);
          if (!found$1) {
            span$1.from = offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        } else {
          span$1.from += offset;
          if (sameLine) {
            (first || (first = [])).push(span$1);
          }
        }
      }
    }
    // Make sure we didn't create any zero-length spans
    if (first) {
      first = clearEmptySpans(first);
    }
    if (last && last != first) {
      last = clearEmptySpans(last);
    }

    var newMarkers = [first];
    if (!sameLine) {
      // Fill gap with whole-line-spans
      var gap = change.text.length - 2,
          gapMarkers;
      if (gap > 0 && first) {
        for (var i$2 = 0; i$2 < first.length; ++i$2) {
          if (first[i$2].to == null) {
            (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$2].marker, null, null));
          }
        }
      }
      for (var i$3 = 0; i$3 < gap; ++i$3) {
        newMarkers.push(gapMarkers);
      }
      newMarkers.push(last);
    }
    return newMarkers;
  }

  // Remove spans that are empty and don't have a clearWhenEmpty
  // option of false.
  function clearEmptySpans(spans) {
    for (var i = 0; i < spans.length; ++i) {
      var span = spans[i];
      if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
        spans.splice(i--, 1);
      }
    }
    if (!spans.length) {
      return null;
    }
    return spans;
  }

  // Used to 'clip' out readOnly ranges when making a change.
  function removeReadOnlyRanges(doc, from, to) {
    var markers = null;
    doc.iter(from.line, to.line + 1, function (line) {
      if (line.markedSpans) {
        for (var i = 0; i < line.markedSpans.length; ++i) {
          var mark = line.markedSpans[i].marker;
          if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
            (markers || (markers = [])).push(mark);
          }
        }
      }
    });
    if (!markers) {
      return null;
    }
    var parts = [{ from: from, to: to }];
    for (var i = 0; i < markers.length; ++i) {
      var mk = markers[i],
          m = mk.find(0);
      for (var j = 0; j < parts.length; ++j) {
        var p = parts[j];
        if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
          continue;
        }
        var newParts = [j, 1],
            dfrom = cmp(p.from, m.from),
            dto = cmp(p.to, m.to);
        if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
          newParts.push({ from: p.from, to: m.from });
        }
        if (dto > 0 || !mk.inclusiveRight && !dto) {
          newParts.push({ from: m.to, to: p.to });
        }
        parts.splice.apply(parts, newParts);
        j += newParts.length - 3;
      }
    }
    return parts;
  }

  // Connect or disconnect spans from a line.
  function detachMarkedSpans(line) {
    var spans = line.markedSpans;
    if (!spans) {
      return;
    }
    for (var i = 0; i < spans.length; ++i) {
      spans[i].marker.detachLine(line);
    }
    line.markedSpans = null;
  }
  function attachMarkedSpans(line, spans) {
    if (!spans) {
      return;
    }
    for (var i = 0; i < spans.length; ++i) {
      spans[i].marker.attachLine(line);
    }
    line.markedSpans = spans;
  }

  // Helpers used when computing which overlapping collapsed span
  // counts as the larger one.
  function extraLeft(marker) {
    return marker.inclusiveLeft ? -1 : 0;
  }
  function extraRight(marker) {
    return marker.inclusiveRight ? 1 : 0;
  }

  // Returns a number indicating which of two overlapping collapsed
  // spans is larger (and thus includes the other). Falls back to
  // comparing ids when the spans cover exactly the same range.
  function compareCollapsedMarkers(a, b) {
    var lenDiff = a.lines.length - b.lines.length;
    if (lenDiff != 0) {
      return lenDiff;
    }
    var aPos = a.find(),
        bPos = b.find();
    var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
    if (fromCmp) {
      return -fromCmp;
    }
    var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
    if (toCmp) {
      return toCmp;
    }
    return b.id - a.id;
  }

  // Find out whether a line ends or starts in a collapsed span. If
  // so, return the marker for that span.
  function collapsedSpanAtSide(line, start) {
    var sps = sawCollapsedSpans && line.markedSpans,
        found;
    if (sps) {
      for (var sp = void 0, i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
          found = sp.marker;
        }
      }
    }
    return found;
  }
  function collapsedSpanAtStart(line) {
    return collapsedSpanAtSide(line, true);
  }
  function collapsedSpanAtEnd(line) {
    return collapsedSpanAtSide(line, false);
  }

  // Test whether there exists a collapsed span that partially
  // overlaps (covers the start or end, but not both) of a new span.
  // Such overlap is not allowed.
  function conflictingCollapsedRange(doc, lineNo$$1, from, to, marker) {
    var line = getLine(doc, lineNo$$1);
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var i = 0; i < sps.length; ++i) {
        var sp = sps[i];
        if (!sp.marker.collapsed) {
          continue;
        }
        var found = sp.marker.find(0);
        var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
        var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
        if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
          continue;
        }
        if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
          return true;
        }
      }
    }
  }

  // A visual line is a line as drawn on the screen. Folding, for
  // example, can cause multiple logical lines to appear on the same
  // visual line. This finds the start of the visual line that the
  // given line is part of (usually that is the line itself).
  function visualLine(line) {
    var merged;
    while (merged = collapsedSpanAtStart(line)) {
      line = merged.find(-1, true).line;
    }
    return line;
  }

  function visualLineEnd(line) {
    var merged;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return line;
  }

  // Returns an array of logical lines that continue the visual line
  // started by the argument, or undefined if there are no such lines.
  function visualLineContinued(line) {
    var merged, lines;
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;(lines || (lines = [])).push(line);
    }
    return lines;
  }

  // Get the line number of the start of the visual line that the
  // given line number is part of.
  function visualLineNo(doc, lineN) {
    var line = getLine(doc, lineN),
        vis = visualLine(line);
    if (line == vis) {
      return lineN;
    }
    return lineNo(vis);
  }

  // Get the line number of the start of the next visual line after
  // the given line.
  function visualLineEndNo(doc, lineN) {
    if (lineN > doc.lastLine()) {
      return lineN;
    }
    var line = getLine(doc, lineN),
        merged;
    if (!lineIsHidden(doc, line)) {
      return lineN;
    }
    while (merged = collapsedSpanAtEnd(line)) {
      line = merged.find(1, true).line;
    }
    return lineNo(line) + 1;
  }

  // Compute whether a line is hidden. Lines count as hidden when they
  // are part of a visual line that starts with another line, or when
  // they are entirely covered by collapsed, non-widget span.
  function lineIsHidden(doc, line) {
    var sps = sawCollapsedSpans && line.markedSpans;
    if (sps) {
      for (var sp = void 0, i = 0; i < sps.length; ++i) {
        sp = sps[i];
        if (!sp.marker.collapsed) {
          continue;
        }
        if (sp.from == null) {
          return true;
        }
        if (sp.marker.widgetNode) {
          continue;
        }
        if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) {
          return true;
        }
      }
    }
  }
  function lineIsHiddenInner(doc, line, span) {
    if (span.to == null) {
      var end = span.marker.find(1, true);
      return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
    }
    if (span.marker.inclusiveRight && span.to == line.text.length) {
      return true;
    }
    for (var sp = void 0, i = 0; i < line.markedSpans.length; ++i) {
      sp = line.markedSpans[i];
      if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) {
        return true;
      }
    }
  }

  // Find the height above the given line.
  function heightAtLine(lineObj) {
    lineObj = visualLine(lineObj);

    var h = 0,
        chunk = lineObj.parent;
    for (var i = 0; i < chunk.lines.length; ++i) {
      var line = chunk.lines[i];
      if (line == lineObj) {
        break;
      } else {
        h += line.height;
      }
    }
    for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
      for (var i$1 = 0; i$1 < p.children.length; ++i$1) {
        var cur = p.children[i$1];
        if (cur == chunk) {
          break;
        } else {
          h += cur.height;
        }
      }
    }
    return h;
  }

  // Compute the character length of a line, taking into account
  // collapsed ranges (see markText) that might hide parts, and join
  // other lines onto it.
  function lineLength(line) {
    if (line.height == 0) {
      return 0;
    }
    var len = line.text.length,
        merged,
        cur = line;
    while (merged = collapsedSpanAtStart(cur)) {
      var found = merged.find(0, true);
      cur = found.from.line;
      len += found.from.ch - found.to.ch;
    }
    cur = line;
    while (merged = collapsedSpanAtEnd(cur)) {
      var found$1 = merged.find(0, true);
      len -= cur.text.length - found$1.from.ch;
      cur = found$1.to.line;
      len += cur.text.length - found$1.to.ch;
    }
    return len;
  }

  // Find the longest line in the document.
  function findMaxLine(cm) {
    var d = cm.display,
        doc = cm.doc;
    d.maxLine = getLine(doc, doc.first);
    d.maxLineLength = lineLength(d.maxLine);
    d.maxLineChanged = true;
    doc.iter(function (line) {
      var len = lineLength(line);
      if (len > d.maxLineLength) {
        d.maxLineLength = len;
        d.maxLine = line;
      }
    });
  }

  // BIDI HELPERS

  function iterateBidiSections(order, from, to, f) {
    if (!order) {
      return f(from, to, "ltr", 0);
    }
    var found = false;
    for (var i = 0; i < order.length; ++i) {
      var part = order[i];
      if (part.from < to && part.to > from || from == to && part.to == from) {
        f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i);
        found = true;
      }
    }
    if (!found) {
      f(from, to, "ltr");
    }
  }

  var bidiOther = null;
  function getBidiPartAt(order, ch, sticky) {
    var found;
    bidiOther = null;
    for (var i = 0; i < order.length; ++i) {
      var cur = order[i];
      if (cur.from < ch && cur.to > ch) {
        return i;
      }
      if (cur.to == ch) {
        if (cur.from != cur.to && sticky == "before") {
          found = i;
        } else {
          bidiOther = i;
        }
      }
      if (cur.from == ch) {
        if (cur.from != cur.to && sticky != "before") {
          found = i;
        } else {
          bidiOther = i;
        }
      }
    }
    return found != null ? found : bidiOther;
  }

  // Bidirectional ordering algorithm
  // See http://unicode.org/reports/tr9/tr9-13.html for the algorithm
  // that this (partially) implements.

  // One-char codes used for character types:
  // L (L):   Left-to-Right
  // R (R):   Right-to-Left
  // r (AL):  Right-to-Left Arabic
  // 1 (EN):  European Number
  // + (ES):  European Number Separator
  // % (ET):  European Number Terminator
  // n (AN):  Arabic Number
  // , (CS):  Common Number Separator
  // m (NSM): Non-Spacing Mark
  // b (BN):  Boundary Neutral
  // s (B):   Paragraph Separator
  // t (S):   Segment Separator
  // w (WS):  Whitespace
  // N (ON):  Other Neutrals

  // Returns null if characters are ordered as they appear
  // (left-to-right), or an array of sections ({from, to, level}
  // objects) in the order in which they occur visually.
  var bidiOrdering = function () {
    // Character types for codepoints 0 to 0xff
    var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
    // Character types for codepoints 0x600 to 0x6f9
    var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
    function charType(code) {
      if (code <= 0xf7) {
        return lowTypes.charAt(code);
      } else if (0x590 <= code && code <= 0x5f4) {
        return "R";
      } else if (0x600 <= code && code <= 0x6f9) {
        return arabicTypes.charAt(code - 0x600);
      } else if (0x6ee <= code && code <= 0x8ac) {
        return "r";
      } else if (0x2000 <= code && code <= 0x200b) {
        return "w";
      } else if (code == 0x200c) {
        return "b";
      } else {
        return "L";
      }
    }

    var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
    var isNeutral = /[stwN]/,
        isStrong = /[LRr]/,
        countsAsLeft = /[Lb1n]/,
        countsAsNum = /[1n]/;

    function BidiSpan(level, from, to) {
      this.level = level;
      this.from = from;this.to = to;
    }

    return function (str, direction) {
      var outerType = direction == "ltr" ? "L" : "R";

      if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
        return false;
      }
      var len = str.length,
          types = [];
      for (var i = 0; i < len; ++i) {
        types.push(charType(str.charCodeAt(i)));
      }

      // W1. Examine each non-spacing mark (NSM) in the level run, and
      // change the type of the NSM to the type of the previous
      // character. If the NSM is at the start of the level run, it will
      // get the type of sor.
      for (var i$1 = 0, prev = outerType; i$1 < len; ++i$1) {
        var type = types[i$1];
        if (type == "m") {
          types[i$1] = prev;
        } else {
          prev = type;
        }
      }

      // W2. Search backwards from each instance of a European number
      // until the first strong type (R, L, AL, or sor) is found. If an
      // AL is found, change the type of the European number to Arabic
      // number.
      // W3. Change all ALs to R.
      for (var i$2 = 0, cur = outerType; i$2 < len; ++i$2) {
        var type$1 = types[i$2];
        if (type$1 == "1" && cur == "r") {
          types[i$2] = "n";
        } else if (isStrong.test(type$1)) {
          cur = type$1;if (type$1 == "r") {
            types[i$2] = "R";
          }
        }
      }

      // W4. A single European separator between two European numbers
      // changes to a European number. A single common separator between
      // two numbers of the same type changes to that type.
      for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
        var type$2 = types[i$3];
        if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
          types[i$3] = "1";
        } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
          types[i$3] = prev$1;
        }
        prev$1 = type$2;
      }

      // W5. A sequence of European terminators adjacent to European
      // numbers changes to all European numbers.
      // W6. Otherwise, separators and terminators change to Other
      // Neutral.
      for (var i$4 = 0; i$4 < len; ++i$4) {
        var type$3 = types[i$4];
        if (type$3 == ",") {
          types[i$4] = "N";
        } else if (type$3 == "%") {
          var end = void 0;
          for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {}
          var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
          for (var j = i$4; j < end; ++j) {
            types[j] = replace;
          }
          i$4 = end - 1;
        }
      }

      // W7. Search backwards from each instance of a European number
      // until the first strong type (R, L, or sor) is found. If an L is
      // found, then change the type of the European number to L.
      for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
        var type$4 = types[i$5];
        if (cur$1 == "L" && type$4 == "1") {
          types[i$5] = "L";
        } else if (isStrong.test(type$4)) {
          cur$1 = type$4;
        }
      }

      // N1. A sequence of neutrals takes the direction of the
      // surrounding strong text if the text on both sides has the same
      // direction. European and Arabic numbers act as if they were R in
      // terms of their influence on neutrals. Start-of-level-run (sor)
      // and end-of-level-run (eor) are used at level run boundaries.
      // N2. Any remaining neutrals take the embedding direction.
      for (var i$6 = 0; i$6 < len; ++i$6) {
        if (isNeutral.test(types[i$6])) {
          var end$1 = void 0;
          for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {}
          var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
          var after = (end$1 < len ? types[end$1] : outerType) == "L";
          var replace$1 = before == after ? before ? "L" : "R" : outerType;
          for (var j$1 = i$6; j$1 < end$1; ++j$1) {
            types[j$1] = replace$1;
          }
          i$6 = end$1 - 1;
        }
      }

      // Here we depart from the documented algorithm, in order to avoid
      // building up an actual levels array. Since there are only three
      // levels (0, 1, 2) in an implementation that doesn't take
      // explicit embedding into account, we can build up the order on
      // the fly, without following the level-based algorithm.
      var order = [],
          m;
      for (var i$7 = 0; i$7 < len;) {
        if (countsAsLeft.test(types[i$7])) {
          var start = i$7;
          for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {}
          order.push(new BidiSpan(0, start, i$7));
        } else {
          var pos = i$7,
              at = order.length;
          for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {}
          for (var j$2 = pos; j$2 < i$7;) {
            if (countsAsNum.test(types[j$2])) {
              if (pos < j$2) {
                order.splice(at, 0, new BidiSpan(1, pos, j$2));
              }
              var nstart = j$2;
              for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {}
              order.splice(at, 0, new BidiSpan(2, nstart, j$2));
              pos = j$2;
            } else {
              ++j$2;
            }
          }
          if (pos < i$7) {
            order.splice(at, 0, new BidiSpan(1, pos, i$7));
          }
        }
      }
      if (direction == "ltr") {
        if (order[0].level == 1 && (m = str.match(/^\s+/))) {
          order[0].from = m[0].length;
          order.unshift(new BidiSpan(0, 0, m[0].length));
        }
        if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
          lst(order).to -= m[0].length;
          order.push(new BidiSpan(0, len - m[0].length, len));
        }
      }

      return direction == "rtl" ? order.reverse() : order;
    };
  }();

  // Get the bidi ordering for the given line (and cache it). Returns
  // false for lines that are fully left-to-right, and an array of
  // BidiSpan objects otherwise.
  function getOrder(line, direction) {
    var order = line.order;
    if (order == null) {
      order = line.order = bidiOrdering(line.text, direction);
    }
    return order;
  }

  // EVENT HANDLING

  // Lightweight event framework. on/off also work on DOM nodes,
  // registering native DOM handlers.

  var noHandlers = [];

  var on = function (emitter, type, f) {
    if (emitter.addEventListener) {
      emitter.addEventListener(type, f, false);
    } else if (emitter.attachEvent) {
      emitter.attachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers || (emitter._handlers = {});
      map$$1[type] = (map$$1[type] || noHandlers).concat(f);
    }
  };

  function getHandlers(emitter, type) {
    return emitter._handlers && emitter._handlers[type] || noHandlers;
  }

  function off(emitter, type, f) {
    if (emitter.removeEventListener) {
      emitter.removeEventListener(type, f, false);
    } else if (emitter.detachEvent) {
      emitter.detachEvent("on" + type, f);
    } else {
      var map$$1 = emitter._handlers,
          arr = map$$1 && map$$1[type];
      if (arr) {
        var index = indexOf(arr, f);
        if (index > -1) {
          map$$1[type] = arr.slice(0, index).concat(arr.slice(index + 1));
        }
      }
    }
  }

  function signal(emitter, type /*, values...*/) {
    var handlers = getHandlers(emitter, type);
    if (!handlers.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2);
    for (var i = 0; i < handlers.length; ++i) {
      handlers[i].apply(null, args);
    }
  }

  // The DOM events that CodeMirror handles can be overridden by
  // registering a (non-DOM) handler on the editor for the event name,
  // and preventDefault-ing the event in that handler.
  function signalDOMEvent(cm, e, override) {
    if (typeof e == "string") {
      e = { type: e, preventDefault: function () {
          this.defaultPrevented = true;
        } };
    }
    signal(cm, override || e.type, cm, e);
    return e_defaultPrevented(e) || e.codemirrorIgnore;
  }

  function signalCursorActivity(cm) {
    var arr = cm._handlers && cm._handlers.cursorActivity;
    if (!arr) {
      return;
    }
    var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
    for (var i = 0; i < arr.length; ++i) {
      if (indexOf(set, arr[i]) == -1) {
        set.push(arr[i]);
      }
    }
  }

  function hasHandler(emitter, type) {
    return getHandlers(emitter, type).length > 0;
  }

  // Add on and off methods to a constructor's prototype, to make
  // registering events on such objects more convenient.
  function eventMixin(ctor) {
    ctor.prototype.on = function (type, f) {
      on(this, type, f);
    };
    ctor.prototype.off = function (type, f) {
      off(this, type, f);
    };
  }

  // Due to the fact that we still support jurassic IE versions, some
  // compatibility wrappers are needed.

  function e_preventDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  }
  function e_stopPropagation(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  }
  function e_defaultPrevented(e) {
    return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
  }
  function e_stop(e) {
    e_preventDefault(e);e_stopPropagation(e);
  }

  function e_target(e) {
    return e.target || e.srcElement;
  }
  function e_button(e) {
    var b = e.which;
    if (b == null) {
      if (e.button & 1) {
        b = 1;
      } else if (e.button & 2) {
        b = 3;
      } else if (e.button & 4) {
        b = 2;
      }
    }
    if (mac && e.ctrlKey && b == 1) {
      b = 3;
    }
    return b;
  }

  // Detect drag-and-drop
  var dragAndDrop = function () {
    // There is *some* kind of drag-and-drop support in IE6-8, but I
    // couldn't get it to work yet.
    if (ie && ie_version < 9) {
      return false;
    }
    var div = elt('div');
    return "draggable" in div || "dragDrop" in div;
  }();

  var zwspSupported;
  function zeroWidthElement(measure) {
    if (zwspSupported == null) {
      var test = elt("span", "\u200b");
      removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
      if (measure.firstChild.offsetHeight != 0) {
        zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
      }
    }
    var node = zwspSupported ? elt("span", "\u200b") : elt("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px");
    node.setAttribute("cm-text", "");
    return node;
  }

  // Feature-detect IE's crummy client rect reporting for bidi text
  var badBidiRects;
  function hasBadBidiRects(measure) {
    if (badBidiRects != null) {
      return badBidiRects;
    }
    var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062eA"));
    var r0 = range(txt, 0, 1).getBoundingClientRect();
    var r1 = range(txt, 1, 2).getBoundingClientRect();
    removeChildren(measure);
    if (!r0 || r0.left == r0.right) {
      return false;
    } // Safari returns null in some cases (#2780)
    return badBidiRects = r1.right - r0.right < 3;
  }

  // See if "".split is the broken IE version, if so, provide an
  // alternative way to split lines.
  var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function (string) {
    var pos = 0,
        result = [],
        l = string.length;
    while (pos <= l) {
      var nl = string.indexOf("\n", pos);
      if (nl == -1) {
        nl = string.length;
      }
      var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
      var rt = line.indexOf("\r");
      if (rt != -1) {
        result.push(line.slice(0, rt));
        pos += rt + 1;
      } else {
        result.push(line);
        pos = nl + 1;
      }
    }
    return result;
  } : function (string) {
    return string.split(/\r\n?|\n/);
  };

  var hasSelection = window.getSelection ? function (te) {
    try {
      return te.selectionStart != te.selectionEnd;
    } catch (e) {
      return false;
    }
  } : function (te) {
    var range$$1;
    try {
      range$$1 = te.ownerDocument.selection.createRange();
    } catch (e) {}
    if (!range$$1 || range$$1.parentElement() != te) {
      return false;
    }
    return range$$1.compareEndPoints("StartToEnd", range$$1) != 0;
  };

  var hasCopyEvent = function () {
    var e = elt("div");
    if ("oncopy" in e) {
      return true;
    }
    e.setAttribute("oncopy", "return;");
    return typeof e.oncopy == "function";
  }();

  var badZoomedRects = null;
  function hasBadZoomedRects(measure) {
    if (badZoomedRects != null) {
      return badZoomedRects;
    }
    var node = removeChildrenAndAdd(measure, elt("span", "x"));
    var normal = node.getBoundingClientRect();
    var fromRange = range(node, 0, 1).getBoundingClientRect();
    return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
  }

  // Known modes, by name and by MIME
  var modes = {};
  var mimeModes = {};

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  function defineMode(name, mode) {
    if (arguments.length > 2) {
      mode.dependencies = Array.prototype.slice.call(arguments, 2);
    }
    modes[name] = mode;
  }

  function defineMIME(mime, spec) {
    mimeModes[mime] = spec;
  }

  // Given a MIME type, a {name, ...options} config object, or a name
  // string, return a mode config object.
  function resolveMode(spec) {
    if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
      var found = mimeModes[spec.name];
      if (typeof found == "string") {
        found = { name: found };
      }
      spec = createObj(found, spec);
      spec.name = found.name;
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
      return resolveMode("application/xml");
    } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
      return resolveMode("application/json");
    }
    if (typeof spec == "string") {
      return { name: spec };
    } else {
      return spec || { name: "null" };
    }
  }

  // Given a mode spec (anything that resolveMode accepts), find and
  // initialize an actual mode object.
  function getMode(options, spec) {
    spec = resolveMode(spec);
    var mfactory = modes[spec.name];
    if (!mfactory) {
      return getMode(options, "text/plain");
    }
    var modeObj = mfactory(options, spec);
    if (modeExtensions.hasOwnProperty(spec.name)) {
      var exts = modeExtensions[spec.name];
      for (var prop in exts) {
        if (!exts.hasOwnProperty(prop)) {
          continue;
        }
        if (modeObj.hasOwnProperty(prop)) {
          modeObj["_" + prop] = modeObj[prop];
        }
        modeObj[prop] = exts[prop];
      }
    }
    modeObj.name = spec.name;
    if (spec.helperType) {
      modeObj.helperType = spec.helperType;
    }
    if (spec.modeProps) {
      for (var prop$1 in spec.modeProps) {
        modeObj[prop$1] = spec.modeProps[prop$1];
      }
    }

    return modeObj;
  }

  // This can be used to attach properties to mode objects from
  // outside the actual mode definition.
  var modeExtensions = {};
  function extendMode(mode, properties) {
    var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
    copyObj(properties, exts);
  }

  function copyState(mode, state) {
    if (state === true) {
      return state;
    }
    if (mode.copyState) {
      return mode.copyState(state);
    }
    var nstate = {};
    for (var n in state) {
      var val = state[n];
      if (val instanceof Array) {
        val = val.concat([]);
      }
      nstate[n] = val;
    }
    return nstate;
  }

  // Given a mode and a state (for that mode), find the inner mode and
  // state at the position that the state refers to.
  function innerMode(mode, state) {
    var info;
    while (mode.innerMode) {
      info = mode.innerMode(state);
      if (!info || info.mode == mode) {
        break;
      }
      state = info.state;
      mode = info.mode;
    }
    return info || { mode: mode, state: state };
  }

  function startState(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  }

  // STRING STREAM

  // Fed to the mode parsers, provides helper functions to make
  // parsers more succinct.

  var StringStream = function (string, tabSize, lineOracle) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
    this.lineOracle = lineOracle;
  };

  StringStream.prototype.eol = function () {
    return this.pos >= this.string.length;
  };
  StringStream.prototype.sol = function () {
    return this.pos == this.lineStart;
  };
  StringStream.prototype.peek = function () {
    return this.string.charAt(this.pos) || undefined;
  };
  StringStream.prototype.next = function () {
    if (this.pos < this.string.length) {
      return this.string.charAt(this.pos++);
    }
  };
  StringStream.prototype.eat = function (match) {
    var ch = this.string.charAt(this.pos);
    var ok;
    if (typeof match == "string") {
      ok = ch == match;
    } else {
      ok = ch && (match.test ? match.test(ch) : match(ch));
    }
    if (ok) {
      ++this.pos;return ch;
    }
  };
  StringStream.prototype.eatWhile = function (match) {
    var start = this.pos;
    while (this.eat(match)) {}
    return this.pos > start;
  };
  StringStream.prototype.eatSpace = function () {
    var this$1 = this;

    var start = this.pos;
    while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
      ++this$1.pos;
    }
    return this.pos > start;
  };
  StringStream.prototype.skipToEnd = function () {
    this.pos = this.string.length;
  };
  StringStream.prototype.skipTo = function (ch) {
    var found = this.string.indexOf(ch, this.pos);
    if (found > -1) {
      this.pos = found;return true;
    }
  };
  StringStream.prototype.backUp = function (n) {
    this.pos -= n;
  };
  StringStream.prototype.column = function () {
    if (this.lastColumnPos < this.start) {
      this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
      this.lastColumnPos = this.start;
    }
    return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.indentation = function () {
    return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
  };
  StringStream.prototype.match = function (pattern, consume, caseInsensitive) {
    if (typeof pattern == "string") {
      var cased = function (str) {
        return caseInsensitive ? str.toLowerCase() : str;
      };
      var substr = this.string.substr(this.pos, pattern.length);
      if (cased(substr) == cased(pattern)) {
        if (consume !== false) {
          this.pos += pattern.length;
        }
        return true;
      }
    } else {
      var match = this.string.slice(this.pos).match(pattern);
      if (match && match.index > 0) {
        return null;
      }
      if (match && consume !== false) {
        this.pos += match[0].length;
      }
      return match;
    }
  };
  StringStream.prototype.current = function () {
    return this.string.slice(this.start, this.pos);
  };
  StringStream.prototype.hideFirstChars = function (n, inner) {
    this.lineStart += n;
    try {
      return inner();
    } finally {
      this.lineStart -= n;
    }
  };
  StringStream.prototype.lookAhead = function (n) {
    var oracle = this.lineOracle;
    return oracle && oracle.lookAhead(n);
  };
  StringStream.prototype.baseToken = function () {
    var oracle = this.lineOracle;
    return oracle && oracle.baseToken(this.pos);
  };

  var SavedContext = function (state, lookAhead) {
    this.state = state;
    this.lookAhead = lookAhead;
  };

  var Context = function (doc, state, line, lookAhead) {
    this.state = state;
    this.doc = doc;
    this.line = line;
    this.maxLookAhead = lookAhead || 0;
    this.baseTokens = null;
    this.baseTokenPos = 1;
  };

  Context.prototype.lookAhead = function (n) {
    var line = this.doc.getLine(this.line + n);
    if (line != null && n > this.maxLookAhead) {
      this.maxLookAhead = n;
    }
    return line;
  };

  Context.prototype.baseToken = function (n) {
    var this$1 = this;

    if (!this.baseTokens) {
      return null;
    }
    while (this.baseTokens[this.baseTokenPos] <= n) {
      this$1.baseTokenPos += 2;
    }
    var type = this.baseTokens[this.baseTokenPos + 1];
    return { type: type && type.replace(/( |^)overlay .*/, ""),
      size: this.baseTokens[this.baseTokenPos] - n };
  };

  Context.prototype.nextLine = function () {
    this.line++;
    if (this.maxLookAhead > 0) {
      this.maxLookAhead--;
    }
  };

  Context.fromSaved = function (doc, saved, line) {
    if (saved instanceof SavedContext) {
      return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead);
    } else {
      return new Context(doc, copyState(doc.mode, saved), line);
    }
  };

  Context.prototype.save = function (copy) {
    var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
    return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
  };

  // Compute a style array (an array starting with a mode generation
  // -- for invalidation -- followed by pairs of end positions and
  // style strings), which is used to highlight the tokens on the
  // line.
  function highlightLine(cm, line, context, forceToEnd) {
    // A styles array always starts with a number identifying the
    // mode/overlays that it is based on (for easy invalidation).
    var st = [cm.state.modeGen],
        lineClasses = {};
    // Compute the base array of styles
    runMode(cm, line.text, cm.doc.mode, context, function (end, style) {
      return st.push(end, style);
    }, lineClasses, forceToEnd);
    var state = context.state;

    // Run overlays, adjust style array.
    var loop = function (o) {
      context.baseTokens = st;
      var overlay = cm.state.overlays[o],
          i = 1,
          at = 0;
      context.state = true;
      runMode(cm, line.text, overlay.mode, context, function (end, style) {
        var start = i;
        // Ensure there's a token end at the current position, and that i points at it
        while (at < end) {
          var i_end = st[i];
          if (i_end > end) {
            st.splice(i, 1, end, st[i + 1], i_end);
          }
          i += 2;
          at = Math.min(end, i_end);
        }
        if (!style) {
          return;
        }
        if (overlay.opaque) {
          st.splice(start, i - start, end, "overlay " + style);
          i = start + 2;
        } else {
          for (; start < i; start += 2) {
            var cur = st[start + 1];
            st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
          }
        }
      }, lineClasses);
      context.state = state;
      context.baseTokens = null;
      context.baseTokenPos = 1;
    };

    for (var o = 0; o < cm.state.overlays.length; ++o) loop(o);

    return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
  }

  function getLineStyles(cm, line, updateFrontier) {
    if (!line.styles || line.styles[0] != cm.state.modeGen) {
      var context = getContextBefore(cm, lineNo(line));
      var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
      var result = highlightLine(cm, line, context);
      if (resetState) {
        context.state = resetState;
      }
      line.stateAfter = context.save(!resetState);
      line.styles = result.styles;
      if (result.classes) {
        line.styleClasses = result.classes;
      } else if (line.styleClasses) {
        line.styleClasses = null;
      }
      if (updateFrontier === cm.doc.highlightFrontier) {
        cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
      }
    }
    return line.styles;
  }

  function getContextBefore(cm, n, precise) {
    var doc = cm.doc,
        display = cm.display;
    if (!doc.mode.startState) {
      return new Context(doc, true, n);
    }
    var start = findStartLine(cm, n, precise);
    var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
    var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);

    doc.iter(start, n, function (line) {
      processLine(cm, line.text, context);
      var pos = context.line;
      line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
      context.nextLine();
    });
    if (precise) {
      doc.modeFrontier = context.line;
    }
    return context;
  }

  // Lightweight form of highlight -- proceed over this line and
  // update state, but don't save a style array. Used for lines that
  // aren't currently visible.
  function processLine(cm, text, context, startAt) {
    var mode = cm.doc.mode;
    var stream = new StringStream(text, cm.options.tabSize, context);
    stream.start = stream.pos = startAt || 0;
    if (text == "") {
      callBlankLine(mode, context.state);
    }
    while (!stream.eol()) {
      readToken(mode, stream, context.state);
      stream.start = stream.pos;
    }
  }

  function callBlankLine(mode, state) {
    if (mode.blankLine) {
      return mode.blankLine(state);
    }
    if (!mode.innerMode) {
      return;
    }
    var inner = innerMode(mode, state);
    if (inner.mode.blankLine) {
      return inner.mode.blankLine(inner.state);
    }
  }

  function readToken(mode, stream, state, inner) {
    for (var i = 0; i < 10; i++) {
      if (inner) {
        inner[0] = innerMode(mode, state).mode;
      }
      var style = mode.token(stream, state);
      if (stream.pos > stream.start) {
        return style;
      }
    }
    throw new Error("Mode " + mode.name + " failed to advance stream.");
  }

  var Token = function (stream, type, state) {
    this.start = stream.start;this.end = stream.pos;
    this.string = stream.current();
    this.type = type || null;
    this.state = state;
  };

  // Utility for getTokenAt and getLineTokens
  function takeToken(cm, pos, precise, asArray) {
    var doc = cm.doc,
        mode = doc.mode,
        style;
    pos = clipPos(doc, pos);
    var line = getLine(doc, pos.line),
        context = getContextBefore(cm, pos.line, precise);
    var stream = new StringStream(line.text, cm.options.tabSize, context),
        tokens;
    if (asArray) {
      tokens = [];
    }
    while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
      stream.start = stream.pos;
      style = readToken(mode, stream, context.state);
      if (asArray) {
        tokens.push(new Token(stream, style, copyState(doc.mode, context.state)));
      }
    }
    return asArray ? tokens : new Token(stream, style, context.state);
  }

  function extractLineClasses(type, output) {
    if (type) {
      for (;;) {
        var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!lineClass) {
          break;
        }
        type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
        var prop = lineClass[1] ? "bgClass" : "textClass";
        if (output[prop] == null) {
          output[prop] = lineClass[2];
        } else if (!new RegExp("(?:^|\s)" + lineClass[2] + "(?:$|\s)").test(output[prop])) {
          output[prop] += " " + lineClass[2];
        }
      }
    }
    return type;
  }

  // Run the given mode's parser over a line, calling f for each token.
  function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
    var flattenSpans = mode.flattenSpans;
    if (flattenSpans == null) {
      flattenSpans = cm.options.flattenSpans;
    }
    var curStart = 0,
        curStyle = null;
    var stream = new StringStream(text, cm.options.tabSize, context),
        style;
    var inner = cm.options.addModeClass && [null];
    if (text == "") {
      extractLineClasses(callBlankLine(mode, context.state), lineClasses);
    }
    while (!stream.eol()) {
      if (stream.pos > cm.options.maxHighlightLength) {
        flattenSpans = false;
        if (forceToEnd) {
          processLine(cm, text, context, stream.pos);
        }
        stream.pos = text.length;
        style = null;
      } else {
        style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
      }
      if (inner) {
        var mName = inner[0].name;
        if (mName) {
          style = "m-" + (style ? mName + " " + style : mName);
        }
      }
      if (!flattenSpans || curStyle != style) {
        while (curStart < stream.start) {
          curStart = Math.min(stream.start, curStart + 5000);
          f(curStart, curStyle);
        }
        curStyle = style;
      }
      stream.start = stream.pos;
    }
    while (curStart < stream.pos) {
      // Webkit seems to refuse to render text nodes longer than 57444
      // characters, and returns inaccurate measurements in nodes
      // starting around 5000 chars.
      var pos = Math.min(stream.pos, curStart + 5000);
      f(pos, curStyle);
      curStart = pos;
    }
  }

  // Finds the line to start with when starting a parse. Tries to
  // find a line with a stateAfter, so that it can start with a
  // valid state. If that fails, it returns the line with the
  // smallest indentation, which tends to need the least context to
  // parse correctly.
  function findStartLine(cm, n, precise) {
    var minindent,
        minline,
        doc = cm.doc;
    var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1000 : 100);
    for (var search = n; search > lim; --search) {
      if (search <= doc.first) {
        return doc.first;
      }
      var line = getLine(doc, search - 1),
          after = line.stateAfter;
      if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier)) {
        return search;
      }
      var indented = countColumn(line.text, null, cm.options.tabSize);
      if (minline == null || minindent > indented) {
        minline = search - 1;
        minindent = indented;
      }
    }
    return minline;
  }

  function retreatFrontier(doc, n) {
    doc.modeFrontier = Math.min(doc.modeFrontier, n);
    if (doc.highlightFrontier < n - 10) {
      return;
    }
    var start = doc.first;
    for (var line = n - 1; line > start; line--) {
      var saved = getLine(doc, line).stateAfter;
      // change is on 3
      // state on line 1 looked ahead 2 -- so saw 3
      // test 1 + 2 < 3 should cover this
      if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
        start = line + 1;
        break;
      }
    }
    doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
  }

  // LINE DATA STRUCTURE

  // Line objects. These hold state related to a line, including
  // highlighting info (the styles array).
  var Line = function (text, markedSpans, estimateHeight) {
    this.text = text;
    attachMarkedSpans(this, markedSpans);
    this.height = estimateHeight ? estimateHeight(this) : 1;
  };

  Line.prototype.lineNo = function () {
    return lineNo(this);
  };
  eventMixin(Line);

  // Change the content (text, markers) of a line. Automatically
  // invalidates cached information and tries to re-estimate the
  // line's height.
  function updateLine(line, text, markedSpans, estimateHeight) {
    line.text = text;
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    if (line.styles) {
      line.styles = null;
    }
    if (line.order != null) {
      line.order = null;
    }
    detachMarkedSpans(line);
    attachMarkedSpans(line, markedSpans);
    var estHeight = estimateHeight ? estimateHeight(line) : 1;
    if (estHeight != line.height) {
      updateLineHeight(line, estHeight);
    }
  }

  // Detach a line from the document tree and its markers.
  function cleanUpLine(line) {
    line.parent = null;
    detachMarkedSpans(line);
  }

  // Convert a style as returned by a mode (either null, or a string
  // containing one or more styles) to a CSS style. This is cached,
  // and also looks for line-wide styles.
  var styleToClassCache = {};
  var styleToClassCacheWithMode = {};
  function interpretTokenStyle(style, options) {
    if (!style || /^\s*$/.test(style)) {
      return null;
    }
    var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
    return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
  }

  // Render the DOM representation of the text of a line. Also builds
  // up a 'line map', which points at the DOM nodes that represent
  // specific stretches of text, and is used by the measuring code.
  // The returned object contains the DOM node, this map, and
  // information about line-wide styles that were set by the mode.
  function buildLineContent(cm, lineView) {
    // The padding-right forces the element to have a 'border', which
    // is needed on Webkit to be able to get line-level bounding
    // rectangles for it (in measureChar).
    var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
    var builder = { pre: eltP("pre", [content], "CodeMirror-line"), content: content,
      col: 0, pos: 0, cm: cm,
      trailingSpace: false,
      splitSpaces: (ie || webkit) && cm.getOption("lineWrapping") };
    lineView.measure = {};

    // Iterate over the logical lines that make up this visual line.
    for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
      var line = i ? lineView.rest[i - 1] : lineView.line,
          order = void 0;
      builder.pos = 0;
      builder.addToken = buildToken;
      // Optionally wire in some hacks into the token-rendering
      // algorithm, to deal with browser quirks.
      if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
        builder.addToken = buildTokenBadBidi(builder.addToken, order);
      }
      builder.map = [];
      var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
      insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
      if (line.styleClasses) {
        if (line.styleClasses.bgClass) {
          builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
        }
        if (line.styleClasses.textClass) {
          builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
        }
      }

      // Ensure at least a single node is present, for measuring.
      if (builder.map.length == 0) {
        builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
      }

      // Store the map and a cache object for the current logical line
      if (i == 0) {
        lineView.measure.map = builder.map;
        lineView.measure.cache = {};
      } else {
        (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);(lineView.measure.caches || (lineView.measure.caches = [])).push({});
      }
    }

    // See issue #2901
    if (webkit) {
      var last = builder.content.lastChild;
      if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
        builder.content.className = "cm-tab-wrap-hack";
      }
    }

    signal(cm, "renderLine", cm, lineView.line, builder.pre);
    if (builder.pre.className) {
      builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
    }

    return builder;
  }

  function defaultSpecialCharPlaceholder(ch) {
    var token = elt("span", "\u2022", "cm-invalidchar");
    token.title = "\\u" + ch.charCodeAt(0).toString(16);
    token.setAttribute("aria-label", token.title);
    return token;
  }

  // Build up the DOM representation for a single token, and add it to
  // the line map. Takes care to render special characters separately.
  function buildToken(builder, text, style, startStyle, endStyle, title, css) {
    if (!text) {
      return;
    }
    var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
    var special = builder.cm.state.specialChars,
        mustWrap = false;
    var content;
    if (!special.test(text)) {
      builder.col += text.length;
      content = document.createTextNode(displayText);
      builder.map.push(builder.pos, builder.pos + text.length, content);
      if (ie && ie_version < 9) {
        mustWrap = true;
      }
      builder.pos += text.length;
    } else {
      content = document.createDocumentFragment();
      var pos = 0;
      while (true) {
        special.lastIndex = pos;
        var m = special.exec(text);
        var skipped = m ? m.index - pos : text.length - pos;
        if (skipped) {
          var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt]));
          } else {
            content.appendChild(txt);
          }
          builder.map.push(builder.pos, builder.pos + skipped, txt);
          builder.col += skipped;
          builder.pos += skipped;
        }
        if (!m) {
          break;
        }
        pos += skipped + 1;
        var txt$1 = void 0;
        if (m[0] == "\t") {
          var tabSize = builder.cm.options.tabSize,
              tabWidth = tabSize - builder.col % tabSize;
          txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
          txt$1.setAttribute("role", "presentation");
          txt$1.setAttribute("cm-text", "\t");
          builder.col += tabWidth;
        } else if (m[0] == "\r" || m[0] == "\n") {
          txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240d" : "\u2424", "cm-invalidchar"));
          txt$1.setAttribute("cm-text", m[0]);
          builder.col += 1;
        } else {
          txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
          txt$1.setAttribute("cm-text", m[0]);
          if (ie && ie_version < 9) {
            content.appendChild(elt("span", [txt$1]));
          } else {
            content.appendChild(txt$1);
          }
          builder.col += 1;
        }
        builder.map.push(builder.pos, builder.pos + 1, txt$1);
        builder.pos++;
      }
    }
    builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
    if (style || startStyle || endStyle || mustWrap || css) {
      var fullStyle = style || "";
      if (startStyle) {
        fullStyle += startStyle;
      }
      if (endStyle) {
        fullStyle += endStyle;
      }
      var token = elt("span", [content], fullStyle, css);
      if (title) {
        token.title = title;
      }
      return builder.content.appendChild(token);
    }
    builder.content.appendChild(content);
  }

  function splitSpaces(text, trailingBefore) {
    if (text.length > 1 && !/  /.test(text)) {
      return text;
    }
    var spaceBefore = trailingBefore,
        result = "";
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      if (ch == " " && spaceBefore && (i == text.length - 1 || text.charCodeAt(i + 1) == 32)) {
        ch = "\u00a0";
      }
      result += ch;
      spaceBefore = ch == " ";
    }
    return result;
  }

  // Work around nonsense dimensions being reported for stretches of
  // right-to-left text.
  function buildTokenBadBidi(inner, order) {
    return function (builder, text, style, startStyle, endStyle, title, css) {
      style = style ? style + " cm-force-border" : "cm-force-border";
      var start = builder.pos,
          end = start + text.length;
      for (;;) {
        // Find the part that overlaps with the start of this text
        var part = void 0;
        for (var i = 0; i < order.length; i++) {
          part = order[i];
          if (part.to > start && part.from <= start) {
            break;
          }
        }
        if (part.to >= end) {
          return inner(builder, text, style, startStyle, endStyle, title, css);
        }
        inner(builder, text.slice(0, part.to - start), style, startStyle, null, title, css);
        startStyle = null;
        text = text.slice(part.to - start);
        start = part.to;
      }
    };
  }

  function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
    var widget = !ignoreWidget && marker.widgetNode;
    if (widget) {
      builder.map.push(builder.pos, builder.pos + size, widget);
    }
    if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
      if (!widget) {
        widget = builder.content.appendChild(document.createElement("span"));
      }
      widget.setAttribute("cm-marker", marker.id);
    }
    if (widget) {
      builder.cm.display.input.setUneditable(widget);
      builder.content.appendChild(widget);
    }
    builder.pos += size;
    builder.trailingSpace = false;
  }

  // Outputs a number of spans to make up a line, taking highlighting
  // and marked text into account.
  function insertLineContent(line, builder, styles) {
    var spans = line.markedSpans,
        allText = line.text,
        at = 0;
    if (!spans) {
      for (var i$1 = 1; i$1 < styles.length; i$1 += 2) {
        builder.addToken(builder, allText.slice(at, at = styles[i$1]), interpretTokenStyle(styles[i$1 + 1], builder.cm.options));
      }
      return;
    }

    var len = allText.length,
        pos = 0,
        i = 1,
        text = "",
        style,
        css;
    var nextChange = 0,
        spanStyle,
        spanEndStyle,
        spanStartStyle,
        title,
        collapsed;
    for (;;) {
      if (nextChange == pos) {
        // Update current marker set
        spanStyle = spanEndStyle = spanStartStyle = title = css = "";
        collapsed = null;nextChange = Infinity;
        var foundBookmarks = [],
            endStyles = void 0;
        for (var j = 0; j < spans.length; ++j) {
          var sp = spans[j],
              m = sp.marker;
          if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
            foundBookmarks.push(m);
          } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
            if (sp.to != null && sp.to != pos && nextChange > sp.to) {
              nextChange = sp.to;
              spanEndStyle = "";
            }
            if (m.className) {
              spanStyle += " " + m.className;
            }
            if (m.css) {
              css = (css ? css + ";" : "") + m.css;
            }
            if (m.startStyle && sp.from == pos) {
              spanStartStyle += " " + m.startStyle;
            }
            if (m.endStyle && sp.to == nextChange) {
              (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
            }
            if (m.title && !title) {
              title = m.title;
            }
            if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
              collapsed = sp;
            }
          } else if (sp.from > pos && nextChange > sp.from) {
            nextChange = sp.from;
          }
        }
        if (endStyles) {
          for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
            if (endStyles[j$1 + 1] == nextChange) {
              spanEndStyle += " " + endStyles[j$1];
            }
          }
        }

        if (!collapsed || collapsed.from == pos) {
          for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
            buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
          }
        }
        if (collapsed && (collapsed.from || 0) == pos) {
          buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
          if (collapsed.to == null) {
            return;
          }
          if (collapsed.to == pos) {
            collapsed = false;
          }
        }
      }
      if (pos >= len) {
        break;
      }

      var upto = Math.min(len, nextChange);
      while (true) {
        if (text) {
          var end = pos + text.length;
          if (!collapsed) {
            var tokenText = end > upto ? text.slice(0, upto - pos) : text;
            builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title, css);
          }
          if (end >= upto) {
            text = text.slice(upto - pos);pos = upto;break;
          }
          pos = end;
          spanStartStyle = "";
        }
        text = allText.slice(at, at = styles[i++]);
        style = interpretTokenStyle(styles[i++], builder.cm.options);
      }
    }
  }

  // These objects are used to represent the visible (currently drawn)
  // part of the document. A LineView may correspond to multiple
  // logical lines, if those are connected by collapsed ranges.
  function LineView(doc, line, lineN) {
    // The starting line
    this.line = line;
    // Continuing lines, if any
    this.rest = visualLineContinued(line);
    // Number of logical lines in this visual line
    this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
    this.node = this.text = null;
    this.hidden = lineIsHidden(doc, line);
  }

  // Create a range of LineView objects for the given lines.
  function buildViewArray(cm, from, to) {
    var array = [],
        nextPos;
    for (var pos = from; pos < to; pos = nextPos) {
      var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
      nextPos = pos + view.size;
      array.push(view);
    }
    return array;
  }

  var operationGroup = null;

  function pushOperation(op) {
    if (operationGroup) {
      operationGroup.ops.push(op);
    } else {
      op.ownsGroup = operationGroup = {
        ops: [op],
        delayedCallbacks: []
      };
    }
  }

  function fireCallbacksForOps(group) {
    // Calls delayed callbacks and cursorActivity handlers until no
    // new ones appear
    var callbacks = group.delayedCallbacks,
        i = 0;
    do {
      for (; i < callbacks.length; i++) {
        callbacks[i].call(null);
      }
      for (var j = 0; j < group.ops.length; j++) {
        var op = group.ops[j];
        if (op.cursorActivityHandlers) {
          while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
            op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
          }
        }
      }
    } while (i < callbacks.length);
  }

  function finishOperation(op, endCb) {
    var group = op.ownsGroup;
    if (!group) {
      return;
    }

    try {
      fireCallbacksForOps(group);
    } finally {
      operationGroup = null;
      endCb(group);
    }
  }

  var orphanDelayedCallbacks = null;

  // Often, we want to signal events at a point where we are in the
  // middle of some work, but don't want the handler to start calling
  // other methods on the editor, which might be in an inconsistent
  // state or simply not expect any other events to happen.
  // signalLater looks whether there are any handlers, and schedules
  // them to be executed when the last operation ends, or, if no
  // operation is active, when a timeout fires.
  function signalLater(emitter, type /*, values...*/) {
    var arr = getHandlers(emitter, type);
    if (!arr.length) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 2),
        list;
    if (operationGroup) {
      list = operationGroup.delayedCallbacks;
    } else if (orphanDelayedCallbacks) {
      list = orphanDelayedCallbacks;
    } else {
      list = orphanDelayedCallbacks = [];
      setTimeout(fireOrphanDelayed, 0);
    }
    var loop = function (i) {
      list.push(function () {
        return arr[i].apply(null, args);
      });
    };

    for (var i = 0; i < arr.length; ++i) loop(i);
  }

  function fireOrphanDelayed() {
    var delayed = orphanDelayedCallbacks;
    orphanDelayedCallbacks = null;
    for (var i = 0; i < delayed.length; ++i) {
      delayed[i]();
    }
  }

  // When an aspect of a line changes, a string is added to
  // lineView.changes. This updates the relevant part of the line's
  // DOM structure.
  function updateLineForChanges(cm, lineView, lineN, dims) {
    for (var j = 0; j < lineView.changes.length; j++) {
      var type = lineView.changes[j];
      if (type == "text") {
        updateLineText(cm, lineView);
      } else if (type == "gutter") {
        updateLineGutter(cm, lineView, lineN, dims);
      } else if (type == "class") {
        updateLineClasses(cm, lineView);
      } else if (type == "widget") {
        updateLineWidgets(cm, lineView, dims);
      }
    }
    lineView.changes = null;
  }

  // Lines with gutter elements, widgets or a background class need to
  // be wrapped, and have the extra elements added to the wrapper div
  function ensureLineWrapped(lineView) {
    if (lineView.node == lineView.text) {
      lineView.node = elt("div", null, null, "position: relative");
      if (lineView.text.parentNode) {
        lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
      }
      lineView.node.appendChild(lineView.text);
      if (ie && ie_version < 8) {
        lineView.node.style.zIndex = 2;
      }
    }
    return lineView.node;
  }

  function updateLineBackground(cm, lineView) {
    var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
    if (cls) {
      cls += " CodeMirror-linebackground";
    }
    if (lineView.background) {
      if (cls) {
        lineView.background.className = cls;
      } else {
        lineView.background.parentNode.removeChild(lineView.background);lineView.background = null;
      }
    } else if (cls) {
      var wrap = ensureLineWrapped(lineView);
      lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
      cm.display.input.setUneditable(lineView.background);
    }
  }

  // Wrapper around buildLineContent which will reuse the structure
  // in display.externalMeasured when possible.
  function getLineContent(cm, lineView) {
    var ext = cm.display.externalMeasured;
    if (ext && ext.line == lineView.line) {
      cm.display.externalMeasured = null;
      lineView.measure = ext.measure;
      return ext.built;
    }
    return buildLineContent(cm, lineView);
  }

  // Redraw the line's text. Interacts with the background and text
  // classes because the mode may output tokens that influence these
  // classes.
  function updateLineText(cm, lineView) {
    var cls = lineView.text.className;
    var built = getLineContent(cm, lineView);
    if (lineView.text == lineView.node) {
      lineView.node = built.pre;
    }
    lineView.text.parentNode.replaceChild(built.pre, lineView.text);
    lineView.text = built.pre;
    if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
      lineView.bgClass = built.bgClass;
      lineView.textClass = built.textClass;
      updateLineClasses(cm, lineView);
    } else if (cls) {
      lineView.text.className = cls;
    }
  }

  function updateLineClasses(cm, lineView) {
    updateLineBackground(cm, lineView);
    if (lineView.line.wrapClass) {
      ensureLineWrapped(lineView).className = lineView.line.wrapClass;
    } else if (lineView.node != lineView.text) {
      lineView.node.className = "";
    }
    var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
    lineView.text.className = textClass || "";
  }

  function updateLineGutter(cm, lineView, lineN, dims) {
    if (lineView.gutter) {
      lineView.node.removeChild(lineView.gutter);
      lineView.gutter = null;
    }
    if (lineView.gutterBackground) {
      lineView.node.removeChild(lineView.gutterBackground);
      lineView.gutterBackground = null;
    }
    if (lineView.line.gutterClass) {
      var wrap = ensureLineWrapped(lineView);
      lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
      cm.display.input.setUneditable(lineView.gutterBackground);
      wrap.insertBefore(lineView.gutterBackground, lineView.text);
    }
    var markers = lineView.line.gutterMarkers;
    if (cm.options.lineNumbers || markers) {
      var wrap$1 = ensureLineWrapped(lineView);
      var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
      cm.display.input.setUneditable(gutterWrap);
      wrap$1.insertBefore(gutterWrap, lineView.text);
      if (lineView.line.gutterClass) {
        gutterWrap.className += " " + lineView.line.gutterClass;
      }
      if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
        lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
      }
      if (markers) {
        for (var k = 0; k < cm.options.gutters.length; ++k) {
          var id = cm.options.gutters[k],
              found = markers.hasOwnProperty(id) && markers[id];
          if (found) {
            gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
          }
        }
      }
    }
  }

  function updateLineWidgets(cm, lineView, dims) {
    if (lineView.alignable) {
      lineView.alignable = null;
    }
    for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
      next = node.nextSibling;
      if (node.className == "CodeMirror-linewidget") {
        lineView.node.removeChild(node);
      }
    }
    insertLineWidgets(cm, lineView, dims);
  }

  // Build a line's DOM representation from scratch
  function buildLineElement(cm, lineView, lineN, dims) {
    var built = getLineContent(cm, lineView);
    lineView.text = lineView.node = built.pre;
    if (built.bgClass) {
      lineView.bgClass = built.bgClass;
    }
    if (built.textClass) {
      lineView.textClass = built.textClass;
    }

    updateLineClasses(cm, lineView);
    updateLineGutter(cm, lineView, lineN, dims);
    insertLineWidgets(cm, lineView, dims);
    return lineView.node;
  }

  // A lineView may contain multiple logical lines (when merged by
  // collapsed spans). The widgets for all of them need to be drawn.
  function insertLineWidgets(cm, lineView, dims) {
    insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
    if (lineView.rest) {
      for (var i = 0; i < lineView.rest.length; i++) {
        insertLineWidgetsFor(cm, lineView.rest[i], lineView, dims, false);
      }
    }
  }

  function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
    if (!line.widgets) {
      return;
    }
    var wrap = ensureLineWrapped(lineView);
    for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
      var widget = ws[i],
          node = elt("div", [widget.node], "CodeMirror-linewidget");
      if (!widget.handleMouseEvents) {
        node.setAttribute("cm-ignore-events", "true");
      }
      positionLineWidget(widget, node, lineView, dims);
      cm.display.input.setUneditable(node);
      if (allowAbove && widget.above) {
        wrap.insertBefore(node, lineView.gutter || lineView.text);
      } else {
        wrap.appendChild(node);
      }
      signalLater(widget, "redraw");
    }
  }

  function positionLineWidget(widget, node, lineView, dims) {
    if (widget.noHScroll) {
      (lineView.alignable || (lineView.alignable = [])).push(node);
      var width = dims.wrapperWidth;
      node.style.left = dims.fixedPos + "px";
      if (!widget.coverGutter) {
        width -= dims.gutterTotalWidth;
        node.style.paddingLeft = dims.gutterTotalWidth + "px";
      }
      node.style.width = width + "px";
    }
    if (widget.coverGutter) {
      node.style.zIndex = 5;
      node.style.position = "relative";
      if (!widget.noHScroll) {
        node.style.marginLeft = -dims.gutterTotalWidth + "px";
      }
    }
  }

  function widgetHeight(widget) {
    if (widget.height != null) {
      return widget.height;
    }
    var cm = widget.doc.cm;
    if (!cm) {
      return 0;
    }
    if (!contains(document.body, widget.node)) {
      var parentStyle = "position: relative;";
      if (widget.coverGutter) {
        parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
      }
      if (widget.noHScroll) {
        parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
      }
      removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
    }
    return widget.height = widget.node.parentNode.offsetHeight;
  }

  // Return true when the given mouse event happened in a widget
  function eventInWidget(display, e) {
    for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
      if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
        return true;
      }
    }
  }

  // POSITION MEASUREMENT

  function paddingTop(display) {
    return display.lineSpace.offsetTop;
  }
  function paddingVert(display) {
    return display.mover.offsetHeight - display.lineSpace.offsetHeight;
  }
  function paddingH(display) {
    if (display.cachedPaddingH) {
      return display.cachedPaddingH;
    }
    var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
    var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
    var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
    if (!isNaN(data.left) && !isNaN(data.right)) {
      display.cachedPaddingH = data;
    }
    return data;
  }

  function scrollGap(cm) {
    return scrollerGap - cm.display.nativeBarWidth;
  }
  function displayWidth(cm) {
    return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
  }
  function displayHeight(cm) {
    return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
  }

  // Ensure the lineView.wrapping.heights array is populated. This is
  // an array of bottom offsets for the lines that make up a drawn
  // line. When lineWrapping is on, there might be more than one
  // height.
  function ensureLineHeights(cm, lineView, rect) {
    var wrapping = cm.options.lineWrapping;
    var curWidth = wrapping && displayWidth(cm);
    if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
      var heights = lineView.measure.heights = [];
      if (wrapping) {
        lineView.measure.width = curWidth;
        var rects = lineView.text.firstChild.getClientRects();
        for (var i = 0; i < rects.length - 1; i++) {
          var cur = rects[i],
              next = rects[i + 1];
          if (Math.abs(cur.bottom - next.bottom) > 2) {
            heights.push((cur.bottom + next.top) / 2 - rect.top);
          }
        }
      }
      heights.push(rect.bottom - rect.top);
    }
  }

  // Find a line map (mapping character offsets to text nodes) and a
  // measurement cache for the given line number. (A line view might
  // contain multiple lines when collapsed ranges are present.)
  function mapFromLineView(lineView, line, lineN) {
    if (lineView.line == line) {
      return { map: lineView.measure.map, cache: lineView.measure.cache };
    }
    for (var i = 0; i < lineView.rest.length; i++) {
      if (lineView.rest[i] == line) {
        return { map: lineView.measure.maps[i], cache: lineView.measure.caches[i] };
      }
    }
    for (var i$1 = 0; i$1 < lineView.rest.length; i$1++) {
      if (lineNo(lineView.rest[i$1]) > lineN) {
        return { map: lineView.measure.maps[i$1], cache: lineView.measure.caches[i$1], before: true };
      }
    }
  }

  // Render a line into the hidden node display.externalMeasured. Used
  // when measurement is needed for a line that's not in the viewport.
  function updateExternalMeasurement(cm, line) {
    line = visualLine(line);
    var lineN = lineNo(line);
    var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
    view.lineN = lineN;
    var built = view.built = buildLineContent(cm, view);
    view.text = built.pre;
    removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
    return view;
  }

  // Get a {top, bottom, left, right} box (in line-local coordinates)
  // for a given character.
  function measureChar(cm, line, ch, bias) {
    return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
  }

  // Find a line view that corresponds to the given line number.
  function findViewForLine(cm, lineN) {
    if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
      return cm.display.view[findViewIndex(cm, lineN)];
    }
    var ext = cm.display.externalMeasured;
    if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
      return ext;
    }
  }

  // Measurement can be split in two steps, the set-up work that
  // applies to the whole line, and the measurement of the actual
  // character. Functions like coordsChar, that need to do a lot of
  // measurements in a row, can thus ensure that the set-up work is
  // only done once.
  function prepareMeasureForLine(cm, line) {
    var lineN = lineNo(line);
    var view = findViewForLine(cm, lineN);
    if (view && !view.text) {
      view = null;
    } else if (view && view.changes) {
      updateLineForChanges(cm, view, lineN, getDimensions(cm));
      cm.curOp.forceUpdate = true;
    }
    if (!view) {
      view = updateExternalMeasurement(cm, line);
    }

    var info = mapFromLineView(view, line, lineN);
    return {
      line: line, view: view, rect: null,
      map: info.map, cache: info.cache, before: info.before,
      hasHeights: false
    };
  }

  // Given a prepared measurement object, measures the position of an
  // actual character (or fetches it from the cache).
  function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
    if (prepared.before) {
      ch = -1;
    }
    var key = ch + (bias || ""),
        found;
    if (prepared.cache.hasOwnProperty(key)) {
      found = prepared.cache[key];
    } else {
      if (!prepared.rect) {
        prepared.rect = prepared.view.text.getBoundingClientRect();
      }
      if (!prepared.hasHeights) {
        ensureLineHeights(cm, prepared.view, prepared.rect);
        prepared.hasHeights = true;
      }
      found = measureCharInner(cm, prepared, ch, bias);
      if (!found.bogus) {
        prepared.cache[key] = found;
      }
    }
    return { left: found.left, right: found.right,
      top: varHeight ? found.rtop : found.top,
      bottom: varHeight ? found.rbottom : found.bottom };
  }

  var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };

  function nodeAndOffsetInLineMap(map$$1, ch, bias) {
    var node, start, end, collapse, mStart, mEnd;
    // First, search the line map for the text node corresponding to,
    // or closest to, the target character.
    for (var i = 0; i < map$$1.length; i += 3) {
      mStart = map$$1[i];
      mEnd = map$$1[i + 1];
      if (ch < mStart) {
        start = 0;end = 1;
        collapse = "left";
      } else if (ch < mEnd) {
        start = ch - mStart;
        end = start + 1;
      } else if (i == map$$1.length - 3 || ch == mEnd && map$$1[i + 3] > ch) {
        end = mEnd - mStart;
        start = end - 1;
        if (ch >= mEnd) {
          collapse = "right";
        }
      }
      if (start != null) {
        node = map$$1[i + 2];
        if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
          collapse = bias;
        }
        if (bias == "left" && start == 0) {
          while (i && map$$1[i - 2] == map$$1[i - 3] && map$$1[i - 1].insertLeft) {
            node = map$$1[(i -= 3) + 2];
            collapse = "left";
          }
        }
        if (bias == "right" && start == mEnd - mStart) {
          while (i < map$$1.length - 3 && map$$1[i + 3] == map$$1[i + 4] && !map$$1[i + 5].insertLeft) {
            node = map$$1[(i += 3) + 2];
            collapse = "right";
          }
        }
        break;
      }
    }
    return { node: node, start: start, end: end, collapse: collapse, coverStart: mStart, coverEnd: mEnd };
  }

  function getUsefulRect(rects, bias) {
    var rect = nullRect;
    if (bias == "left") {
      for (var i = 0; i < rects.length; i++) {
        if ((rect = rects[i]).left != rect.right) {
          break;
        }
      }
    } else {
      for (var i$1 = rects.length - 1; i$1 >= 0; i$1--) {
        if ((rect = rects[i$1]).left != rect.right) {
          break;
        }
      }
    }
    return rect;
  }

  function measureCharInner(cm, prepared, ch, bias) {
    var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
    var node = place.node,
        start = place.start,
        end = place.end,
        collapse = place.collapse;

    var rect;
    if (node.nodeType == 3) {
      // If it is a text node, use a range to retrieve the coordinates.
      for (var i$1 = 0; i$1 < 4; i$1++) {
        // Retry a maximum of 4 times when nonsense rectangles are returned
        while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
          --start;
        }
        while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
          ++end;
        }
        if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
          rect = node.parentNode.getBoundingClientRect();
        } else {
          rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
        }
        if (rect.left || rect.right || start == 0) {
          break;
        }
        end = start;
        start = start - 1;
        collapse = "right";
      }
      if (ie && ie_version < 11) {
        rect = maybeUpdateRectForZooming(cm.display.measure, rect);
      }
    } else {
      // If it is a widget, simply get the box for the whole widget.
      if (start > 0) {
        collapse = bias = "right";
      }
      var rects;
      if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
        rect = rects[bias == "right" ? rects.length - 1 : 0];
      } else {
        rect = node.getBoundingClientRect();
      }
    }
    if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
      var rSpan = node.parentNode.getClientRects()[0];
      if (rSpan) {
        rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
      } else {
        rect = nullRect;
      }
    }

    var rtop = rect.top - prepared.rect.top,
        rbot = rect.bottom - prepared.rect.top;
    var mid = (rtop + rbot) / 2;
    var heights = prepared.view.measure.heights;
    var i = 0;
    for (; i < heights.length - 1; i++) {
      if (mid < heights[i]) {
        break;
      }
    }
    var top = i ? heights[i - 1] : 0,
        bot = heights[i];
    var result = { left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
      right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
      top: top, bottom: bot };
    if (!rect.left && !rect.right) {
      result.bogus = true;
    }
    if (!cm.options.singleCursorHeightPerLine) {
      result.rtop = rtop;result.rbottom = rbot;
    }

    return result;
  }

  // Work around problem with bounding client rects on ranges being
  // returned incorrectly when zoomed on IE10 and below.
  function maybeUpdateRectForZooming(measure, rect) {
    if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
      return rect;
    }
    var scaleX = screen.logicalXDPI / screen.deviceXDPI;
    var scaleY = screen.logicalYDPI / screen.deviceYDPI;
    return { left: rect.left * scaleX, right: rect.right * scaleX,
      top: rect.top * scaleY, bottom: rect.bottom * scaleY };
  }

  function clearLineMeasurementCacheFor(lineView) {
    if (lineView.measure) {
      lineView.measure.cache = {};
      lineView.measure.heights = null;
      if (lineView.rest) {
        for (var i = 0; i < lineView.rest.length; i++) {
          lineView.measure.caches[i] = {};
        }
      }
    }
  }

  function clearLineMeasurementCache(cm) {
    cm.display.externalMeasure = null;
    removeChildren(cm.display.lineMeasure);
    for (var i = 0; i < cm.display.view.length; i++) {
      clearLineMeasurementCacheFor(cm.display.view[i]);
    }
  }

  function clearCaches(cm) {
    clearLineMeasurementCache(cm);
    cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
    if (!cm.options.lineWrapping) {
      cm.display.maxLineChanged = true;
    }
    cm.display.lineNumChars = null;
  }

  function pageScrollX() {
    // Work around https://bugs.chromium.org/p/chromium/issues/detail?id=489206
    // which causes page_Offset and bounding client rects to use
    // different reference viewports and invalidate our calculations.
    if (chrome && android) {
      return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft));
    }
    return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
  }
  function pageScrollY() {
    if (chrome && android) {
      return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop));
    }
    return window.pageYOffset || (document.documentElement || document.body).scrollTop;
  }

  function widgetTopHeight(lineObj) {
    var height = 0;
    if (lineObj.widgets) {
      for (var i = 0; i < lineObj.widgets.length; ++i) {
        if (lineObj.widgets[i].above) {
          height += widgetHeight(lineObj.widgets[i]);
        }
      }
    }
    return height;
  }

  // Converts a {top, bottom, left, right} box from line-local
  // coordinates into another coordinate system. Context may be one of
  // "line", "div" (display.lineDiv), "local"./null (editor), "window",
  // or "page".
  function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
    if (!includeWidgets) {
      var height = widgetTopHeight(lineObj);
      rect.top += height;rect.bottom += height;
    }
    if (context == "line") {
      return rect;
    }
    if (!context) {
      context = "local";
    }
    var yOff = heightAtLine(lineObj);
    if (context == "local") {
      yOff += paddingTop(cm.display);
    } else {
      yOff -= cm.display.viewOffset;
    }
    if (context == "page" || context == "window") {
      var lOff = cm.display.lineSpace.getBoundingClientRect();
      yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
      var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
      rect.left += xOff;rect.right += xOff;
    }
    rect.top += yOff;rect.bottom += yOff;
    return rect;
  }

  // Coverts a box from "div" coords to another coordinate system.
  // Context may be "window", "page", "div", or "local"./null.
  function fromCoordSystem(cm, coords, context) {
    if (context == "div") {
      return coords;
    }
    var left = coords.left,
        top = coords.top;
    // First move into "page" coordinate system
    if (context == "page") {
      left -= pageScrollX();
      top -= pageScrollY();
    } else if (context == "local" || !context) {
      var localBox = cm.display.sizer.getBoundingClientRect();
      left += localBox.left;
      top += localBox.top;
    }

    var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
    return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
  }

  function charCoords(cm, pos, context, lineObj, bias) {
    if (!lineObj) {
      lineObj = getLine(cm.doc, pos.line);
    }
    return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
  }

  // Returns a box for a given cursor position, which may have an
  // 'other' property containing the position of the secondary cursor
  // on a bidi boundary.
  // A cursor Pos(line, char, "before") is on the same visual line as `char - 1`
  // and after `char - 1` in writing order of `char - 1`
  // A cursor Pos(line, char, "after") is on the same visual line as `char`
  // and before `char` in writing order of `char`
  // Examples (upper-case letters are RTL, lower-case are LTR):
  //     Pos(0, 1, ...)
  //     before   after
  // ab     a|b     a|b
  // aB     a|B     aB|
  // Ab     |Ab     A|b
  // AB     B|A     B|A
  // Every position after the last character on a line is considered to stick
  // to the last character on the line.
  function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
    lineObj = lineObj || getLine(cm.doc, pos.line);
    if (!preparedMeasure) {
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    }
    function get(ch, right) {
      var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left", varHeight);
      if (right) {
        m.left = m.right;
      } else {
        m.right = m.left;
      }
      return intoCoordSystem(cm, lineObj, m, context);
    }
    var order = getOrder(lineObj, cm.doc.direction),
        ch = pos.ch,
        sticky = pos.sticky;
    if (ch >= lineObj.text.length) {
      ch = lineObj.text.length;
      sticky = "before";
    } else if (ch <= 0) {
      ch = 0;
      sticky = "after";
    }
    if (!order) {
      return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
    }

    function getBidi(ch, partPos, invert) {
      var part = order[partPos],
          right = part.level == 1;
      return get(invert ? ch - 1 : ch, right != invert);
    }
    var partPos = getBidiPartAt(order, ch, sticky);
    var other = bidiOther;
    var val = getBidi(ch, partPos, sticky == "before");
    if (other != null) {
      val.other = getBidi(ch, other, sticky != "before");
    }
    return val;
  }

  // Used to cheaply estimate the coordinates for a position. Used for
  // intermediate scroll updates.
  function estimateCoords(cm, pos) {
    var left = 0;
    pos = clipPos(cm.doc, pos);
    if (!cm.options.lineWrapping) {
      left = charWidth(cm.display) * pos.ch;
    }
    var lineObj = getLine(cm.doc, pos.line);
    var top = heightAtLine(lineObj) + paddingTop(cm.display);
    return { left: left, right: left, top: top, bottom: top + lineObj.height };
  }

  // Positions returned by coordsChar contain some extra information.
  // xRel is the relative x position of the input coordinates compared
  // to the found position (so xRel > 0 means the coordinates are to
  // the right of the character position, for example). When outside
  // is true, that means the coordinates lie outside the line's
  // vertical range.
  function PosWithInfo(line, ch, sticky, outside, xRel) {
    var pos = Pos(line, ch, sticky);
    pos.xRel = xRel;
    if (outside) {
      pos.outside = true;
    }
    return pos;
  }

  // Compute the character position closest to the given coordinates.
  // Input must be lineSpace-local ("div" coordinate system).
  function coordsChar(cm, x, y) {
    var doc = cm.doc;
    y += cm.display.viewOffset;
    if (y < 0) {
      return PosWithInfo(doc.first, 0, null, true, -1);
    }
    var lineN = lineAtHeight(doc, y),
        last = doc.first + doc.size - 1;
    if (lineN > last) {
      return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, true, 1);
    }
    if (x < 0) {
      x = 0;
    }

    var lineObj = getLine(doc, lineN);
    for (;;) {
      var found = coordsCharInner(cm, lineObj, lineN, x, y);
      var merged = collapsedSpanAtEnd(lineObj);
      var mergedPos = merged && merged.find(0, true);
      if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0)) {
        lineN = lineNo(lineObj = mergedPos.to.line);
      } else {
        return found;
      }
    }
  }

  function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
    y -= widgetTopHeight(lineObj);
    var end = lineObj.text.length;
    var begin = findFirst(function (ch) {
      return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
    }, end, 0);
    end = findFirst(function (ch) {
      return measureCharPrepared(cm, preparedMeasure, ch).top > y;
    }, begin, end);
    return { begin: begin, end: end };
  }

  function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
    if (!preparedMeasure) {
      preparedMeasure = prepareMeasureForLine(cm, lineObj);
    }
    var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
    return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
  }

  // Returns true if the given side of a box is after the given
  // coordinates, in top-to-bottom, left-to-right order.
  function boxIsAfter(box, x, y, left) {
    return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
  }

  function coordsCharInner(cm, lineObj, lineNo$$1, x, y) {
    // Move y into line-local coordinate space
    y -= heightAtLine(lineObj);
    var preparedMeasure = prepareMeasureForLine(cm, lineObj);
    // When directly calling `measureCharPrepared`, we have to adjust
    // for the widgets at this line.
    var widgetHeight$$1 = widgetTopHeight(lineObj);
    var begin = 0,
        end = lineObj.text.length,
        ltr = true;

    var order = getOrder(lineObj, cm.doc.direction);
    // If the line isn't plain left-to-right text, first figure out
    // which bidi section the coordinates fall into.
    if (order) {
      var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo$$1, preparedMeasure, order, x, y);
      ltr = part.level != 1;
      // The awkward -1 offsets are needed because findFirst (called
      // on these below) will treat its first bound as inclusive,
      // second as exclusive, but we want to actually address the
      // characters in the part's range
      begin = ltr ? part.from : part.to - 1;
      end = ltr ? part.to : part.from - 1;
    }

    // A binary search to find the first character whose bounding box
    // starts after the coordinates. If we run across any whose box wrap
    // the coordinates, store that.
    var chAround = null,
        boxAround = null;
    var ch = findFirst(function (ch) {
      var box = measureCharPrepared(cm, preparedMeasure, ch);
      box.top += widgetHeight$$1;box.bottom += widgetHeight$$1;
      if (!boxIsAfter(box, x, y, false)) {
        return false;
      }
      if (box.top <= y && box.left <= x) {
        chAround = ch;
        boxAround = box;
      }
      return true;
    }, begin, end);

    var baseX,
        sticky,
        outside = false;
    // If a box around the coordinates was found, use that
    if (boxAround) {
      // Distinguish coordinates nearer to the left or right side of the box
      var atLeft = x - boxAround.left < boxAround.right - x,
          atStart = atLeft == ltr;
      ch = chAround + (atStart ? 0 : 1);
      sticky = atStart ? "after" : "before";
      baseX = atLeft ? boxAround.left : boxAround.right;
    } else {
      // (Adjust for extended bound, if necessary.)
      if (!ltr && (ch == end || ch == begin)) {
        ch++;
      }
      // To determine which side to associate with, get the box to the
      // left of the character and compare it's vertical position to the
      // coordinates
      sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight$$1 <= y == ltr ? "after" : "before";
      // Now get accurate coordinates for this place, in order to get a
      // base X position
      var coords = cursorCoords(cm, Pos(lineNo$$1, ch, sticky), "line", lineObj, preparedMeasure);
      baseX = coords.left;
      outside = y < coords.top || y >= coords.bottom;
    }

    ch = skipExtendingChars(lineObj.text, ch, 1);
    return PosWithInfo(lineNo$$1, ch, sticky, outside, x - baseX);
  }

  function coordsBidiPart(cm, lineObj, lineNo$$1, preparedMeasure, order, x, y) {
    // Bidi parts are sorted left-to-right, and in a non-line-wrapping
    // situation, we can take this ordering to correspond to the visual
    // ordering. This finds the first part whose end is after the given
    // coordinates.
    var index = findFirst(function (i) {
      var part = order[i],
          ltr = part.level != 1;
      return boxIsAfter(cursorCoords(cm, Pos(lineNo$$1, ltr ? part.to : part.from, ltr ? "before" : "after"), "line", lineObj, preparedMeasure), x, y, true);
    }, 0, order.length - 1);
    var part = order[index];
    // If this isn't the first part, the part's start is also after
    // the coordinates, and the coordinates aren't on the same line as
    // that start, move one part back.
    if (index > 0) {
      var ltr = part.level != 1;
      var start = cursorCoords(cm, Pos(lineNo$$1, ltr ? part.from : part.to, ltr ? "after" : "before"), "line", lineObj, preparedMeasure);
      if (boxIsAfter(start, x, y, true) && start.top > y) {
        part = order[index - 1];
      }
    }
    return part;
  }

  function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
    // In a wrapped line, rtl text on wrapping boundaries can do things
    // that don't correspond to the ordering in our `order` array at
    // all, so a binary search doesn't work, and we want to return a
    // part that only spans one line so that the binary search in
    // coordsCharInner is safe. As such, we first find the extent of the
    // wrapped line, and then do a flat search in which we discard any
    // spans that aren't on the line.
    var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
    var begin = ref.begin;
    var end = ref.end;
    if (/\s/.test(lineObj.text.charAt(end - 1))) {
      end--;
    }
    var part = null,
        closestDist = null;
    for (var i = 0; i < order.length; i++) {
      var p = order[i];
      if (p.from >= end || p.to <= begin) {
        continue;
      }
      var ltr = p.level != 1;
      var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
      // Weigh against spans ending before this, so that they are only
      // picked if nothing ends after
      var dist = endX < x ? x - endX + 1e9 : endX - x;
      if (!part || closestDist > dist) {
        part = p;
        closestDist = dist;
      }
    }
    if (!part) {
      part = order[order.length - 1];
    }
    // Clip the part to the wrapped line.
    if (part.from < begin) {
      part = { from: begin, to: part.to, level: part.level };
    }
    if (part.to > end) {
      part = { from: part.from, to: end, level: part.level };
    }
    return part;
  }

  var measureText;
  // Compute the default text height.
  function textHeight(display) {
    if (display.cachedTextHeight != null) {
      return display.cachedTextHeight;
    }
    if (measureText == null) {
      measureText = elt("pre");
      // Measure a bunch of lines, for browsers that compute
      // fractional heights.
      for (var i = 0; i < 49; ++i) {
        measureText.appendChild(document.createTextNode("x"));
        measureText.appendChild(elt("br"));
      }
      measureText.appendChild(document.createTextNode("x"));
    }
    removeChildrenAndAdd(display.measure, measureText);
    var height = measureText.offsetHeight / 50;
    if (height > 3) {
      display.cachedTextHeight = height;
    }
    removeChildren(display.measure);
    return height || 1;
  }

  // Compute the default character width.
  function charWidth(display) {
    if (display.cachedCharWidth != null) {
      return display.cachedCharWidth;
    }
    var anchor = elt("span", "xxxxxxxxxx");
    var pre = elt("pre", [anchor]);
    removeChildrenAndAdd(display.measure, pre);
    var rect = anchor.getBoundingClientRect(),
        width = (rect.right - rect.left) / 10;
    if (width > 2) {
      display.cachedCharWidth = width;
    }
    return width || 10;
  }

  // Do a bulk-read of the DOM positions and sizes needed to draw the
  // view, so that we don't interleave reading and writing to the DOM.
  function getDimensions(cm) {
    var d = cm.display,
        left = {},
        width = {};
    var gutterLeft = d.gutters.clientLeft;
    for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
      left[cm.options.gutters[i]] = n.offsetLeft + n.clientLeft + gutterLeft;
      width[cm.options.gutters[i]] = n.clientWidth;
    }
    return { fixedPos: compensateForHScroll(d),
      gutterTotalWidth: d.gutters.offsetWidth,
      gutterLeft: left,
      gutterWidth: width,
      wrapperWidth: d.wrapper.clientWidth };
  }

  // Computes display.scroller.scrollLeft + display.gutters.offsetWidth,
  // but using getBoundingClientRect to get a sub-pixel-accurate
  // result.
  function compensateForHScroll(display) {
    return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
  }

  // Returns a function that estimates the height of a line, to use as
  // first approximation until the line becomes visible (and is thus
  // properly measurable).
  function estimateHeight(cm) {
    var th = textHeight(cm.display),
        wrapping = cm.options.lineWrapping;
    var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
    return function (line) {
      if (lineIsHidden(cm.doc, line)) {
        return 0;
      }

      var widgetsHeight = 0;
      if (line.widgets) {
        for (var i = 0; i < line.widgets.length; i++) {
          if (line.widgets[i].height) {
            widgetsHeight += line.widgets[i].height;
          }
        }
      }

      if (wrapping) {
        return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
      } else {
        return widgetsHeight + th;
      }
    };
  }

  function estimateLineHeights(cm) {
    var doc = cm.doc,
        est = estimateHeight(cm);
    doc.iter(function (line) {
      var estHeight = est(line);
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    });
  }

  // Given a mouse event, find the corresponding position. If liberal
  // is false, it checks whether a gutter or scrollbar was clicked,
  // and returns null if it was. forRect is used by rectangular
  // selections, and tries to estimate a character position even for
  // coordinates beyond the right of the text.
  function posFromMouse(cm, e, liberal, forRect) {
    var display = cm.display;
    if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
      return null;
    }

    var x,
        y,
        space = display.lineSpace.getBoundingClientRect();
    // Fails unpredictably on IE[67] when mouse is dragged around quickly.
    try {
      x = e.clientX - space.left;y = e.clientY - space.top;
    } catch (e) {
      return null;
    }
    var coords = coordsChar(cm, x, y),
        line;
    if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
      var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
      coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
    }
    return coords;
  }

  // Find the view element corresponding to a given line. Return null
  // when the line isn't visible.
  function findViewIndex(cm, n) {
    if (n >= cm.display.viewTo) {
      return null;
    }
    n -= cm.display.viewFrom;
    if (n < 0) {
      return null;
    }
    var view = cm.display.view;
    for (var i = 0; i < view.length; i++) {
      n -= view[i].size;
      if (n < 0) {
        return i;
      }
    }
  }

  function updateSelection(cm) {
    cm.display.input.showSelection(cm.display.input.prepareSelection());
  }

  function prepareSelection(cm, primary) {
    if (primary === void 0) primary = true;

    var doc = cm.doc,
        result = {};
    var curFragment = result.cursors = document.createDocumentFragment();
    var selFragment = result.selection = document.createDocumentFragment();

    for (var i = 0; i < doc.sel.ranges.length; i++) {
      if (!primary && i == doc.sel.primIndex) {
        continue;
      }
      var range$$1 = doc.sel.ranges[i];
      if (range$$1.from().line >= cm.display.viewTo || range$$1.to().line < cm.display.viewFrom) {
        continue;
      }
      var collapsed = range$$1.empty();
      if (collapsed || cm.options.showCursorWhenSelecting) {
        drawSelectionCursor(cm, range$$1.head, curFragment);
      }
      if (!collapsed) {
        drawSelectionRange(cm, range$$1, selFragment);
      }
    }
    return result;
  }

  // Draws a cursor for the given range
  function drawSelectionCursor(cm, head, output) {
    var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);

    var cursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor"));
    cursor.style.left = pos.left + "px";
    cursor.style.top = pos.top + "px";
    cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";

    if (pos.other) {
      // Secondary cursor, shown when on a 'jump' in bi-directional text
      var otherCursor = output.appendChild(elt("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor"));
      otherCursor.style.display = "";
      otherCursor.style.left = pos.other.left + "px";
      otherCursor.style.top = pos.other.top + "px";
      otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
    }
  }

  function cmpCoords(a, b) {
    return a.top - b.top || a.left - b.left;
  }

  // Draws the given range as a highlighted selection
  function drawSelectionRange(cm, range$$1, output) {
    var display = cm.display,
        doc = cm.doc;
    var fragment = document.createDocumentFragment();
    var padding = paddingH(cm.display),
        leftSide = padding.left;
    var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
    var docLTR = doc.direction == "ltr";

    function add(left, top, width, bottom) {
      if (top < 0) {
        top = 0;
      }
      top = Math.round(top);
      bottom = Math.round(bottom);
      fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
    }

    function drawForLine(line, fromArg, toArg) {
      var lineObj = getLine(doc, line);
      var lineLen = lineObj.text.length;
      var start, end;
      function coords(ch, bias) {
        return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
      }

      function wrapX(pos, dir, side) {
        var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
        var prop = dir == "ltr" == (side == "after") ? "left" : "right";
        var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
        return coords(ch, prop)[prop];
      }

      var order = getOrder(lineObj, doc.direction);
      iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function (from, to, dir, i) {
        var ltr = dir == "ltr";
        var fromPos = coords(from, ltr ? "left" : "right");
        var toPos = coords(to - 1, ltr ? "right" : "left");

        var openStart = fromArg == null && from == 0,
            openEnd = toArg == null && to == lineLen;
        var first = i == 0,
            last = !order || i == order.length - 1;
        if (toPos.top - fromPos.top <= 3) {
          // Single line
          var openLeft = (docLTR ? openStart : openEnd) && first;
          var openRight = (docLTR ? openEnd : openStart) && last;
          var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
          var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
          add(left, fromPos.top, right - left, fromPos.bottom);
        } else {
          // Multiple lines
          var topLeft, topRight, botLeft, botRight;
          if (ltr) {
            topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
            topRight = docLTR ? rightSide : wrapX(from, dir, "before");
            botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
            botRight = docLTR && openEnd && last ? rightSide : toPos.right;
          } else {
            topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
            topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
            botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
            botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
          }
          add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
          if (fromPos.bottom < toPos.top) {
            add(leftSide, fromPos.bottom, null, toPos.top);
          }
          add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
        }

        if (!start || cmpCoords(fromPos, start) < 0) {
          start = fromPos;
        }
        if (cmpCoords(toPos, start) < 0) {
          start = toPos;
        }
        if (!end || cmpCoords(fromPos, end) < 0) {
          end = fromPos;
        }
        if (cmpCoords(toPos, end) < 0) {
          end = toPos;
        }
      });
      return { start: start, end: end };
    }

    var sFrom = range$$1.from(),
        sTo = range$$1.to();
    if (sFrom.line == sTo.line) {
      drawForLine(sFrom.line, sFrom.ch, sTo.ch);
    } else {
      var fromLine = getLine(doc, sFrom.line),
          toLine = getLine(doc, sTo.line);
      var singleVLine = visualLine(fromLine) == visualLine(toLine);
      var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
      var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
      if (singleVLine) {
        if (leftEnd.top < rightStart.top - 2) {
          add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
          add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
        } else {
          add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
        }
      }
      if (leftEnd.bottom < rightStart.top) {
        add(leftSide, leftEnd.bottom, null, rightStart.top);
      }
    }

    output.appendChild(fragment);
  }

  // Cursor-blinking
  function restartBlink(cm) {
    if (!cm.state.focused) {
      return;
    }
    var display = cm.display;
    clearInterval(display.blinker);
    var on = true;
    display.cursorDiv.style.visibility = "";
    if (cm.options.cursorBlinkRate > 0) {
      display.blinker = setInterval(function () {
        return display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
      }, cm.options.cursorBlinkRate);
    } else if (cm.options.cursorBlinkRate < 0) {
      display.cursorDiv.style.visibility = "hidden";
    }
  }

  function ensureFocus(cm) {
    if (!cm.state.focused) {
      cm.display.input.focus();onFocus(cm);
    }
  }

  function delayBlurEvent(cm) {
    cm.state.delayingBlurEvent = true;
    setTimeout(function () {
      if (cm.state.delayingBlurEvent) {
        cm.state.delayingBlurEvent = false;
        onBlur(cm);
      }
    }, 100);
  }

  function onFocus(cm, e) {
    if (cm.state.delayingBlurEvent) {
      cm.state.delayingBlurEvent = false;
    }

    if (cm.options.readOnly == "nocursor") {
      return;
    }
    if (!cm.state.focused) {
      signal(cm, "focus", cm, e);
      cm.state.focused = true;
      addClass(cm.display.wrapper, "CodeMirror-focused");
      // This test prevents this from firing when a context
      // menu is closed (since the input reset would kill the
      // select-all detection hack)
      if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
        cm.display.input.reset();
        if (webkit) {
          setTimeout(function () {
            return cm.display.input.reset(true);
          }, 20);
        } // Issue #1730
      }
      cm.display.input.receivedFocus();
    }
    restartBlink(cm);
  }
  function onBlur(cm, e) {
    if (cm.state.delayingBlurEvent) {
      return;
    }

    if (cm.state.focused) {
      signal(cm, "blur", cm, e);
      cm.state.focused = false;
      rmClass(cm.display.wrapper, "CodeMirror-focused");
    }
    clearInterval(cm.display.blinker);
    setTimeout(function () {
      if (!cm.state.focused) {
        cm.display.shift = false;
      }
    }, 150);
  }

  // Read the actual heights of the rendered lines, and update their
  // stored heights to match.
  function updateHeightsInViewport(cm) {
    var display = cm.display;
    var prevBottom = display.lineDiv.offsetTop;
    for (var i = 0; i < display.view.length; i++) {
      var cur = display.view[i],
          height = void 0;
      if (cur.hidden) {
        continue;
      }
      if (ie && ie_version < 8) {
        var bot = cur.node.offsetTop + cur.node.offsetHeight;
        height = bot - prevBottom;
        prevBottom = bot;
      } else {
        var box = cur.node.getBoundingClientRect();
        height = box.bottom - box.top;
      }
      var diff = cur.line.height - height;
      if (height < 2) {
        height = textHeight(display);
      }
      if (diff > .005 || diff < -.005) {
        updateLineHeight(cur.line, height);
        updateWidgetHeight(cur.line);
        if (cur.rest) {
          for (var j = 0; j < cur.rest.length; j++) {
            updateWidgetHeight(cur.rest[j]);
          }
        }
      }
    }
  }

  // Read and store the height of line widgets associated with the
  // given line.
  function updateWidgetHeight(line) {
    if (line.widgets) {
      for (var i = 0; i < line.widgets.length; ++i) {
        var w = line.widgets[i],
            parent = w.node.parentNode;
        if (parent) {
          w.height = parent.offsetHeight;
        }
      }
    }
  }

  // Compute the lines that are visible in a given viewport (defaults
  // the the current scroll position). viewport may contain top,
  // height, and ensure (see op.scrollToPos) properties.
  function visibleLines(display, doc, viewport) {
    var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
    top = Math.floor(top - paddingTop(display));
    var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;

    var from = lineAtHeight(doc, top),
        to = lineAtHeight(doc, bottom);
    // Ensure is a {from: {line, ch}, to: {line, ch}} object, and
    // forces those lines into the viewport (if possible).
    if (viewport && viewport.ensure) {
      var ensureFrom = viewport.ensure.from.line,
          ensureTo = viewport.ensure.to.line;
      if (ensureFrom < from) {
        from = ensureFrom;
        to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
      } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
        from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
        to = ensureTo;
      }
    }
    return { from: from, to: Math.max(to, from + 1) };
  }

  // Re-align line numbers and gutter marks to compensate for
  // horizontal scrolling.
  function alignHorizontally(cm) {
    var display = cm.display,
        view = display.view;
    if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
      return;
    }
    var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
    var gutterW = display.gutters.offsetWidth,
        left = comp + "px";
    for (var i = 0; i < view.length; i++) {
      if (!view[i].hidden) {
        if (cm.options.fixedGutter) {
          if (view[i].gutter) {
            view[i].gutter.style.left = left;
          }
          if (view[i].gutterBackground) {
            view[i].gutterBackground.style.left = left;
          }
        }
        var align = view[i].alignable;
        if (align) {
          for (var j = 0; j < align.length; j++) {
            align[j].style.left = left;
          }
        }
      }
    }
    if (cm.options.fixedGutter) {
      display.gutters.style.left = comp + gutterW + "px";
    }
  }

  // Used to ensure that the line number gutter is still the right
  // size for the current document size. Returns true when an update
  // is needed.
  function maybeUpdateLineNumberWidth(cm) {
    if (!cm.options.lineNumbers) {
      return false;
    }
    var doc = cm.doc,
        last = lineNumberFor(cm.options, doc.first + doc.size - 1),
        display = cm.display;
    if (last.length != display.lineNumChars) {
      var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
      var innerW = test.firstChild.offsetWidth,
          padding = test.offsetWidth - innerW;
      display.lineGutter.style.width = "";
      display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
      display.lineNumWidth = display.lineNumInnerWidth + padding;
      display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
      display.lineGutter.style.width = display.lineNumWidth + "px";
      updateGutterSpace(cm);
      return true;
    }
    return false;
  }

  // SCROLLING THINGS INTO VIEW

  // If an editor sits on the top or bottom of the window, partially
  // scrolled out of view, this ensures that the cursor is visible.
  function maybeScrollWindow(cm, rect) {
    if (signalDOMEvent(cm, "scrollCursorIntoView")) {
      return;
    }

    var display = cm.display,
        box = display.sizer.getBoundingClientRect(),
        doScroll = null;
    if (rect.top + box.top < 0) {
      doScroll = true;
    } else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) {
      doScroll = false;
    }
    if (doScroll != null && !phantom) {
      var scrollNode = elt("div", "\u200b", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
      cm.display.lineSpace.appendChild(scrollNode);
      scrollNode.scrollIntoView(doScroll);
      cm.display.lineSpace.removeChild(scrollNode);
    }
  }

  // Scroll a given position into view (immediately), verifying that
  // it actually became visible (as line heights are accurately
  // measured, the position of something may 'drift' during drawing).
  function scrollPosIntoView(cm, pos, end, margin) {
    if (margin == null) {
      margin = 0;
    }
    var rect;
    if (!cm.options.lineWrapping && pos == end) {
      // Set pos and end to the cursor positions around the character pos sticks to
      // If pos.sticky == "before", that is around pos.ch - 1, otherwise around pos.ch
      // If pos == Pos(_, 0, "before"), pos and end are unchanged
      pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
      end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
    }
    for (var limit = 0; limit < 5; limit++) {
      var changed = false;
      var coords = cursorCoords(cm, pos);
      var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
      rect = { left: Math.min(coords.left, endCoords.left),
        top: Math.min(coords.top, endCoords.top) - margin,
        right: Math.max(coords.left, endCoords.left),
        bottom: Math.max(coords.bottom, endCoords.bottom) + margin };
      var scrollPos = calculateScrollPos(cm, rect);
      var startTop = cm.doc.scrollTop,
          startLeft = cm.doc.scrollLeft;
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm, scrollPos.scrollTop);
        if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
          changed = true;
        }
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm, scrollPos.scrollLeft);
        if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
          changed = true;
        }
      }
      if (!changed) {
        break;
      }
    }
    return rect;
  }

  // Scroll a given set of coordinates into view (immediately).
  function scrollIntoView(cm, rect) {
    var scrollPos = calculateScrollPos(cm, rect);
    if (scrollPos.scrollTop != null) {
      updateScrollTop(cm, scrollPos.scrollTop);
    }
    if (scrollPos.scrollLeft != null) {
      setScrollLeft(cm, scrollPos.scrollLeft);
    }
  }

  // Calculate a new scroll position needed to scroll the given
  // rectangle into view. Returns an object with scrollTop and
  // scrollLeft properties. When these are undefined, the
  // vertical/horizontal position does not need to be adjusted.
  function calculateScrollPos(cm, rect) {
    var display = cm.display,
        snapMargin = textHeight(cm.display);
    if (rect.top < 0) {
      rect.top = 0;
    }
    var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
    var screen = displayHeight(cm),
        result = {};
    if (rect.bottom - rect.top > screen) {
      rect.bottom = rect.top + screen;
    }
    var docBottom = cm.doc.height + paddingVert(display);
    var atTop = rect.top < snapMargin,
        atBottom = rect.bottom > docBottom - snapMargin;
    if (rect.top < screentop) {
      result.scrollTop = atTop ? 0 : rect.top;
    } else if (rect.bottom > screentop + screen) {
      var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen);
      if (newTop != screentop) {
        result.scrollTop = newTop;
      }
    }

    var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
    var screenw = displayWidth(cm) - (cm.options.fixedGutter ? display.gutters.offsetWidth : 0);
    var tooWide = rect.right - rect.left > screenw;
    if (tooWide) {
      rect.right = rect.left + screenw;
    }
    if (rect.left < 10) {
      result.scrollLeft = 0;
    } else if (rect.left < screenleft) {
      result.scrollLeft = Math.max(0, rect.left - (tooWide ? 0 : 10));
    } else if (rect.right > screenw + screenleft - 3) {
      result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
    }
    return result;
  }

  // Store a relative adjustment to the scroll position in the current
  // operation (to be applied when the operation finishes).
  function addToScrollTop(cm, top) {
    if (top == null) {
      return;
    }
    resolveScrollToPos(cm);
    cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
  }

  // Make sure that at the end of the operation the current cursor is
  // shown.
  function ensureCursorVisible(cm) {
    resolveScrollToPos(cm);
    var cur = cm.getCursor();
    cm.curOp.scrollToPos = { from: cur, to: cur, margin: cm.options.cursorScrollMargin };
  }

  function scrollToCoords(cm, x, y) {
    if (x != null || y != null) {
      resolveScrollToPos(cm);
    }
    if (x != null) {
      cm.curOp.scrollLeft = x;
    }
    if (y != null) {
      cm.curOp.scrollTop = y;
    }
  }

  function scrollToRange(cm, range$$1) {
    resolveScrollToPos(cm);
    cm.curOp.scrollToPos = range$$1;
  }

  // When an operation has its scrollToPos property set, and another
  // scroll action is applied before the end of the operation, this
  // 'simulates' scrolling that position into view in a cheap way, so
  // that the effect of intermediate scroll commands is not ignored.
  function resolveScrollToPos(cm) {
    var range$$1 = cm.curOp.scrollToPos;
    if (range$$1) {
      cm.curOp.scrollToPos = null;
      var from = estimateCoords(cm, range$$1.from),
          to = estimateCoords(cm, range$$1.to);
      scrollToCoordsRange(cm, from, to, range$$1.margin);
    }
  }

  function scrollToCoordsRange(cm, from, to, margin) {
    var sPos = calculateScrollPos(cm, {
      left: Math.min(from.left, to.left),
      top: Math.min(from.top, to.top) - margin,
      right: Math.max(from.right, to.right),
      bottom: Math.max(from.bottom, to.bottom) + margin
    });
    scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
  }

  // Sync the scrollable area and scrollbars, ensure the viewport
  // covers the visible area.
  function updateScrollTop(cm, val) {
    if (Math.abs(cm.doc.scrollTop - val) < 2) {
      return;
    }
    if (!gecko) {
      updateDisplaySimple(cm, { top: val });
    }
    setScrollTop(cm, val, true);
    if (gecko) {
      updateDisplaySimple(cm);
    }
    startWorker(cm, 100);
  }

  function setScrollTop(cm, val, forceScroll) {
    val = Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val);
    if (cm.display.scroller.scrollTop == val && !forceScroll) {
      return;
    }
    cm.doc.scrollTop = val;
    cm.display.scrollbars.setScrollTop(val);
    if (cm.display.scroller.scrollTop != val) {
      cm.display.scroller.scrollTop = val;
    }
  }

  // Sync scroller and scrollbar, ensure the gutter elements are
  // aligned.
  function setScrollLeft(cm, val, isScroller, forceScroll) {
    val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
    if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
      return;
    }
    cm.doc.scrollLeft = val;
    alignHorizontally(cm);
    if (cm.display.scroller.scrollLeft != val) {
      cm.display.scroller.scrollLeft = val;
    }
    cm.display.scrollbars.setScrollLeft(val);
  }

  // SCROLLBARS

  // Prepare DOM reads needed to update the scrollbars. Done in one
  // shot to minimize update/measure roundtrips.
  function measureForScrollbars(cm) {
    var d = cm.display,
        gutterW = d.gutters.offsetWidth;
    var docH = Math.round(cm.doc.height + paddingVert(cm.display));
    return {
      clientHeight: d.scroller.clientHeight,
      viewHeight: d.wrapper.clientHeight,
      scrollWidth: d.scroller.scrollWidth, clientWidth: d.scroller.clientWidth,
      viewWidth: d.wrapper.clientWidth,
      barLeft: cm.options.fixedGutter ? gutterW : 0,
      docHeight: docH,
      scrollHeight: docH + scrollGap(cm) + d.barHeight,
      nativeBarWidth: d.nativeBarWidth,
      gutterWidth: gutterW
    };
  }

  var NativeScrollbars = function (place, scroll, cm) {
    this.cm = cm;
    var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
    var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
    place(vert);place(horiz);

    on(vert, "scroll", function () {
      if (vert.clientHeight) {
        scroll(vert.scrollTop, "vertical");
      }
    });
    on(horiz, "scroll", function () {
      if (horiz.clientWidth) {
        scroll(horiz.scrollLeft, "horizontal");
      }
    });

    this.checkedZeroWidth = false;
    // Need to set a minimum width to see the scrollbar on IE7 (but must not set it on IE8).
    if (ie && ie_version < 8) {
      this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
    }
  };

  NativeScrollbars.prototype.update = function (measure) {
    var needsH = measure.scrollWidth > measure.clientWidth + 1;
    var needsV = measure.scrollHeight > measure.clientHeight + 1;
    var sWidth = measure.nativeBarWidth;

    if (needsV) {
      this.vert.style.display = "block";
      this.vert.style.bottom = needsH ? sWidth + "px" : "0";
      var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
      // A bug in IE8 can cause this value to be negative, so guard it.
      this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
    } else {
      this.vert.style.display = "";
      this.vert.firstChild.style.height = "0";
    }

    if (needsH) {
      this.horiz.style.display = "block";
      this.horiz.style.right = needsV ? sWidth + "px" : "0";
      this.horiz.style.left = measure.barLeft + "px";
      var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
      this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
    } else {
      this.horiz.style.display = "";
      this.horiz.firstChild.style.width = "0";
    }

    if (!this.checkedZeroWidth && measure.clientHeight > 0) {
      if (sWidth == 0) {
        this.zeroWidthHack();
      }
      this.checkedZeroWidth = true;
    }

    return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
  };

  NativeScrollbars.prototype.setScrollLeft = function (pos) {
    if (this.horiz.scrollLeft != pos) {
      this.horiz.scrollLeft = pos;
    }
    if (this.disableHoriz) {
      this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
    }
  };

  NativeScrollbars.prototype.setScrollTop = function (pos) {
    if (this.vert.scrollTop != pos) {
      this.vert.scrollTop = pos;
    }
    if (this.disableVert) {
      this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
    }
  };

  NativeScrollbars.prototype.zeroWidthHack = function () {
    var w = mac && !mac_geMountainLion ? "12px" : "18px";
    this.horiz.style.height = this.vert.style.width = w;
    this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
    this.disableHoriz = new Delayed();
    this.disableVert = new Delayed();
  };

  NativeScrollbars.prototype.enableZeroWidthBar = function (bar, delay, type) {
    bar.style.pointerEvents = "auto";
    function maybeDisable() {
      // To find out whether the scrollbar is still visible, we
      // check whether the element under the pixel in the bottom
      // right corner of the scrollbar box is the scrollbar box
      // itself (when the bar is still visible) or its filler child
      // (when the bar is hidden). If it is still visible, we keep
      // it enabled, if it's hidden, we disable pointer events.
      var box = bar.getBoundingClientRect();
      var elt$$1 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
      if (elt$$1 != bar) {
        bar.style.pointerEvents = "none";
      } else {
        delay.set(1000, maybeDisable);
      }
    }
    delay.set(1000, maybeDisable);
  };

  NativeScrollbars.prototype.clear = function () {
    var parent = this.horiz.parentNode;
    parent.removeChild(this.horiz);
    parent.removeChild(this.vert);
  };

  var NullScrollbars = function () {};

  NullScrollbars.prototype.update = function () {
    return { bottom: 0, right: 0 };
  };
  NullScrollbars.prototype.setScrollLeft = function () {};
  NullScrollbars.prototype.setScrollTop = function () {};
  NullScrollbars.prototype.clear = function () {};

  function updateScrollbars(cm, measure) {
    if (!measure) {
      measure = measureForScrollbars(cm);
    }
    var startWidth = cm.display.barWidth,
        startHeight = cm.display.barHeight;
    updateScrollbarsInner(cm, measure);
    for (var i = 0; i < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i++) {
      if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
        updateHeightsInViewport(cm);
      }
      updateScrollbarsInner(cm, measureForScrollbars(cm));
      startWidth = cm.display.barWidth;startHeight = cm.display.barHeight;
    }
  }

  // Re-synchronize the fake scrollbars with the actual size of the
  // content.
  function updateScrollbarsInner(cm, measure) {
    var d = cm.display;
    var sizes = d.scrollbars.update(measure);

    d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
    d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
    d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";

    if (sizes.right && sizes.bottom) {
      d.scrollbarFiller.style.display = "block";
      d.scrollbarFiller.style.height = sizes.bottom + "px";
      d.scrollbarFiller.style.width = sizes.right + "px";
    } else {
      d.scrollbarFiller.style.display = "";
    }
    if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
      d.gutterFiller.style.display = "block";
      d.gutterFiller.style.height = sizes.bottom + "px";
      d.gutterFiller.style.width = measure.gutterWidth + "px";
    } else {
      d.gutterFiller.style.display = "";
    }
  }

  var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };

  function initScrollbars(cm) {
    if (cm.display.scrollbars) {
      cm.display.scrollbars.clear();
      if (cm.display.scrollbars.addClass) {
        rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
      }
    }

    cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function (node) {
      cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
      // Prevent clicks in the scrollbars from killing focus
      on(node, "mousedown", function () {
        if (cm.state.focused) {
          setTimeout(function () {
            return cm.display.input.focus();
          }, 0);
        }
      });
      node.setAttribute("cm-not-content", "true");
    }, function (pos, axis) {
      if (axis == "horizontal") {
        setScrollLeft(cm, pos);
      } else {
        updateScrollTop(cm, pos);
      }
    }, cm);
    if (cm.display.scrollbars.addClass) {
      addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
    }
  }

  // Operations are used to wrap a series of changes to the editor
  // state in such a way that each change won't have to update the
  // cursor and display (which would be awkward, slow, and
  // error-prone). Instead, display updates are batched and then all
  // combined and executed at once.

  var nextOpId = 0;
  // Start a new operation.
  function startOperation(cm) {
    cm.curOp = {
      cm: cm,
      viewChanged: false, // Flag that indicates that lines might need to be redrawn
      startHeight: cm.doc.height, // Used to detect need to update scrollbar
      forceUpdate: false, // Used to force a redraw
      updateInput: null, // Whether to reset the input textarea
      typing: false, // Whether this reset should be careful to leave existing text (for compositing)
      changeObjs: null, // Accumulated changes, for firing change events
      cursorActivityHandlers: null, // Set of handlers to fire cursorActivity on
      cursorActivityCalled: 0, // Tracks which cursorActivity handlers have been called already
      selectionChanged: false, // Whether the selection needs to be redrawn
      updateMaxLine: false, // Set when the widest line needs to be determined anew
      scrollLeft: null, scrollTop: null, // Intermediate scroll position, not pushed to DOM yet
      scrollToPos: null, // Used to scroll to a specific position
      focus: false,
      id: ++nextOpId // Unique ID
    };
    pushOperation(cm.curOp);
  }

  // Finish an operation, updating the display and signalling delayed events
  function endOperation(cm) {
    var op = cm.curOp;
    finishOperation(op, function (group) {
      for (var i = 0; i < group.ops.length; i++) {
        group.ops[i].cm.curOp = null;
      }
      endOperations(group);
    });
  }

  // The DOM updates done when an operation finishes are batched so
  // that the minimum number of relayouts are required.
  function endOperations(group) {
    var ops = group.ops;
    for (var i = 0; i < ops.length; i++) // Read DOM
    {
      endOperation_R1(ops[i]);
    }
    for (var i$1 = 0; i$1 < ops.length; i$1++) // Write DOM (maybe)
    {
      endOperation_W1(ops[i$1]);
    }
    for (var i$2 = 0; i$2 < ops.length; i$2++) // Read DOM
    {
      endOperation_R2(ops[i$2]);
    }
    for (var i$3 = 0; i$3 < ops.length; i$3++) // Write DOM (maybe)
    {
      endOperation_W2(ops[i$3]);
    }
    for (var i$4 = 0; i$4 < ops.length; i$4++) // Read DOM
    {
      endOperation_finish(ops[i$4]);
    }
  }

  function endOperation_R1(op) {
    var cm = op.cm,
        display = cm.display;
    maybeClipScrollbars(cm);
    if (op.updateMaxLine) {
      findMaxLine(cm);
    }

    op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
    op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
  }

  function endOperation_W1(op) {
    op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
  }

  function endOperation_R2(op) {
    var cm = op.cm,
        display = cm.display;
    if (op.updatedDisplay) {
      updateHeightsInViewport(cm);
    }

    op.barMeasure = measureForScrollbars(cm);

    // If the max line changed since it was last measured, measure it,
    // and ensure the document's width matches it.
    // updateDisplay_W2 will use these properties to do the actual resizing
    if (display.maxLineChanged && !cm.options.lineWrapping) {
      op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
      cm.display.sizerWidth = op.adjustWidthTo;
      op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
      op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
    }

    if (op.updatedDisplay || op.selectionChanged) {
      op.preparedSelection = display.input.prepareSelection();
    }
  }

  function endOperation_W2(op) {
    var cm = op.cm;

    if (op.adjustWidthTo != null) {
      cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
      if (op.maxScrollLeft < cm.doc.scrollLeft) {
        setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
      }
      cm.display.maxLineChanged = false;
    }

    var takeFocus = op.focus && op.focus == activeElt();
    if (op.preparedSelection) {
      cm.display.input.showSelection(op.preparedSelection, takeFocus);
    }
    if (op.updatedDisplay || op.startHeight != cm.doc.height) {
      updateScrollbars(cm, op.barMeasure);
    }
    if (op.updatedDisplay) {
      setDocumentHeight(cm, op.barMeasure);
    }

    if (op.selectionChanged) {
      restartBlink(cm);
    }

    if (cm.state.focused && op.updateInput) {
      cm.display.input.reset(op.typing);
    }
    if (takeFocus) {
      ensureFocus(op.cm);
    }
  }

  function endOperation_finish(op) {
    var cm = op.cm,
        display = cm.display,
        doc = cm.doc;

    if (op.updatedDisplay) {
      postUpdateDisplay(cm, op.update);
    }

    // Abort mouse wheel delta measurement, when scrolling explicitly
    if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
      display.wheelStartX = display.wheelStartY = null;
    }

    // Propagate the scroll position to the actual DOM scroller
    if (op.scrollTop != null) {
      setScrollTop(cm, op.scrollTop, op.forceScroll);
    }

    if (op.scrollLeft != null) {
      setScrollLeft(cm, op.scrollLeft, true, true);
    }
    // If we need to scroll a specific position into view, do so.
    if (op.scrollToPos) {
      var rect = scrollPosIntoView(cm, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
      maybeScrollWindow(cm, rect);
    }

    // Fire events for markers that are hidden/unidden by editing or
    // undoing
    var hidden = op.maybeHiddenMarkers,
        unhidden = op.maybeUnhiddenMarkers;
    if (hidden) {
      for (var i = 0; i < hidden.length; ++i) {
        if (!hidden[i].lines.length) {
          signal(hidden[i], "hide");
        }
      }
    }
    if (unhidden) {
      for (var i$1 = 0; i$1 < unhidden.length; ++i$1) {
        if (unhidden[i$1].lines.length) {
          signal(unhidden[i$1], "unhide");
        }
      }
    }

    if (display.wrapper.offsetHeight) {
      doc.scrollTop = cm.display.scroller.scrollTop;
    }

    // Fire change events, and delayed event handlers
    if (op.changeObjs) {
      signal(cm, "changes", cm, op.changeObjs);
    }
    if (op.update) {
      op.update.finish();
    }
  }

  // Run the given function in an operation
  function runInOp(cm, f) {
    if (cm.curOp) {
      return f();
    }
    startOperation(cm);
    try {
      return f();
    } finally {
      endOperation(cm);
    }
  }
  // Wraps a function in an operation. Returns the wrapped function.
  function operation(cm, f) {
    return function () {
      if (cm.curOp) {
        return f.apply(cm, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(cm, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }
  // Used to add methods to editor and doc instances, wrapping them in
  // operations.
  function methodOp(f) {
    return function () {
      if (this.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(this);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(this);
      }
    };
  }
  function docMethodOp(f) {
    return function () {
      var cm = this.cm;
      if (!cm || cm.curOp) {
        return f.apply(this, arguments);
      }
      startOperation(cm);
      try {
        return f.apply(this, arguments);
      } finally {
        endOperation(cm);
      }
    };
  }

  // Updates the display.view data structure for a given change to the
  // document. From and to are in pre-change coordinates. Lendiff is
  // the amount of lines added or subtracted by the change. This is
  // used for changes that span multiple lines, or change the way
  // lines are divided into visual lines. regLineChange (below)
  // registers single-line changes.
  function regChange(cm, from, to, lendiff) {
    if (from == null) {
      from = cm.doc.first;
    }
    if (to == null) {
      to = cm.doc.first + cm.doc.size;
    }
    if (!lendiff) {
      lendiff = 0;
    }

    var display = cm.display;
    if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
      display.updateLineNumbers = from;
    }

    cm.curOp.viewChanged = true;

    if (from >= display.viewTo) {
      // Change after
      if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
        resetView(cm);
      }
    } else if (to <= display.viewFrom) {
      // Change before
      if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
        resetView(cm);
      } else {
        display.viewFrom += lendiff;
        display.viewTo += lendiff;
      }
    } else if (from <= display.viewFrom && to >= display.viewTo) {
      // Full overlap
      resetView(cm);
    } else if (from <= display.viewFrom) {
      // Top overlap
      var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cut) {
        display.view = display.view.slice(cut.index);
        display.viewFrom = cut.lineN;
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    } else if (to >= display.viewTo) {
      // Bottom overlap
      var cut$1 = viewCuttingPoint(cm, from, from, -1);
      if (cut$1) {
        display.view = display.view.slice(0, cut$1.index);
        display.viewTo = cut$1.lineN;
      } else {
        resetView(cm);
      }
    } else {
      // Gap in the middle
      var cutTop = viewCuttingPoint(cm, from, from, -1);
      var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
      if (cutTop && cutBot) {
        display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
        display.viewTo += lendiff;
      } else {
        resetView(cm);
      }
    }

    var ext = display.externalMeasured;
    if (ext) {
      if (to < ext.lineN) {
        ext.lineN += lendiff;
      } else if (from < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
    }
  }

  // Register a change to a single line. Type must be one of "text",
  // "gutter", "class", "widget"
  function regLineChange(cm, line, type) {
    cm.curOp.viewChanged = true;
    var display = cm.display,
        ext = cm.display.externalMeasured;
    if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
      display.externalMeasured = null;
    }

    if (line < display.viewFrom || line >= display.viewTo) {
      return;
    }
    var lineView = display.view[findViewIndex(cm, line)];
    if (lineView.node == null) {
      return;
    }
    var arr = lineView.changes || (lineView.changes = []);
    if (indexOf(arr, type) == -1) {
      arr.push(type);
    }
  }

  // Clear the view.
  function resetView(cm) {
    cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
    cm.display.view = [];
    cm.display.viewOffset = 0;
  }

  function viewCuttingPoint(cm, oldN, newN, dir) {
    var index = findViewIndex(cm, oldN),
        diff,
        view = cm.display.view;
    if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
      return { index: index, lineN: newN };
    }
    var n = cm.display.viewFrom;
    for (var i = 0; i < index; i++) {
      n += view[i].size;
    }
    if (n != oldN) {
      if (dir > 0) {
        if (index == view.length - 1) {
          return null;
        }
        diff = n + view[index].size - oldN;
        index++;
      } else {
        diff = n - oldN;
      }
      oldN += diff;newN += diff;
    }
    while (visualLineNo(cm.doc, newN) != newN) {
      if (index == (dir < 0 ? 0 : view.length - 1)) {
        return null;
      }
      newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
      index += dir;
    }
    return { index: index, lineN: newN };
  }

  // Force the view to cover a given range, adding empty view element
  // or clipping off existing ones as needed.
  function adjustView(cm, from, to) {
    var display = cm.display,
        view = display.view;
    if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
      display.view = buildViewArray(cm, from, to);
      display.viewFrom = from;
    } else {
      if (display.viewFrom > from) {
        display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
      } else if (display.viewFrom < from) {
        display.view = display.view.slice(findViewIndex(cm, from));
      }
      display.viewFrom = from;
      if (display.viewTo < to) {
        display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
      } else if (display.viewTo > to) {
        display.view = display.view.slice(0, findViewIndex(cm, to));
      }
    }
    display.viewTo = to;
  }

  // Count the number of lines in the view whose DOM representation is
  // out of date (or nonexistent).
  function countDirtyView(cm) {
    var view = cm.display.view,
        dirty = 0;
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (!lineView.hidden && (!lineView.node || lineView.changes)) {
        ++dirty;
      }
    }
    return dirty;
  }

  // HIGHLIGHT WORKER

  function startWorker(cm, time) {
    if (cm.doc.highlightFrontier < cm.display.viewTo) {
      cm.state.highlight.set(time, bind(highlightWorker, cm));
    }
  }

  function highlightWorker(cm) {
    var doc = cm.doc;
    if (doc.highlightFrontier >= cm.display.viewTo) {
      return;
    }
    var end = +new Date() + cm.options.workTime;
    var context = getContextBefore(cm, doc.highlightFrontier);
    var changedLines = [];

    doc.iter(context.line, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function (line) {
      if (context.line >= cm.display.viewFrom) {
        // Visible
        var oldStyles = line.styles;
        var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
        var highlighted = highlightLine(cm, line, context, true);
        if (resetState) {
          context.state = resetState;
        }
        line.styles = highlighted.styles;
        var oldCls = line.styleClasses,
            newCls = highlighted.classes;
        if (newCls) {
          line.styleClasses = newCls;
        } else if (oldCls) {
          line.styleClasses = null;
        }
        var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
        for (var i = 0; !ischange && i < oldStyles.length; ++i) {
          ischange = oldStyles[i] != line.styles[i];
        }
        if (ischange) {
          changedLines.push(context.line);
        }
        line.stateAfter = context.save();
        context.nextLine();
      } else {
        if (line.text.length <= cm.options.maxHighlightLength) {
          processLine(cm, line.text, context);
        }
        line.stateAfter = context.line % 5 == 0 ? context.save() : null;
        context.nextLine();
      }
      if (+new Date() > end) {
        startWorker(cm, cm.options.workDelay);
        return true;
      }
    });
    doc.highlightFrontier = context.line;
    doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
    if (changedLines.length) {
      runInOp(cm, function () {
        for (var i = 0; i < changedLines.length; i++) {
          regLineChange(cm, changedLines[i], "text");
        }
      });
    }
  }

  // DISPLAY DRAWING

  var DisplayUpdate = function (cm, viewport, force) {
    var display = cm.display;

    this.viewport = viewport;
    // Store some values that we'll need later (but don't want to force a relayout for)
    this.visible = visibleLines(display, cm.doc, viewport);
    this.editorIsHidden = !display.wrapper.offsetWidth;
    this.wrapperHeight = display.wrapper.clientHeight;
    this.wrapperWidth = display.wrapper.clientWidth;
    this.oldDisplayWidth = displayWidth(cm);
    this.force = force;
    this.dims = getDimensions(cm);
    this.events = [];
  };

  DisplayUpdate.prototype.signal = function (emitter, type) {
    if (hasHandler(emitter, type)) {
      this.events.push(arguments);
    }
  };
  DisplayUpdate.prototype.finish = function () {
    var this$1 = this;

    for (var i = 0; i < this.events.length; i++) {
      signal.apply(null, this$1.events[i]);
    }
  };

  function maybeClipScrollbars(cm) {
    var display = cm.display;
    if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
      display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
      display.heightForcer.style.height = scrollGap(cm) + "px";
      display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
      display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
      display.scrollbarsClipped = true;
    }
  }

  function selectionSnapshot(cm) {
    if (cm.hasFocus()) {
      return null;
    }
    var active = activeElt();
    if (!active || !contains(cm.display.lineDiv, active)) {
      return null;
    }
    var result = { activeElt: active };
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
        result.anchorNode = sel.anchorNode;
        result.anchorOffset = sel.anchorOffset;
        result.focusNode = sel.focusNode;
        result.focusOffset = sel.focusOffset;
      }
    }
    return result;
  }

  function restoreSelection(snapshot) {
    if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) {
      return;
    }
    snapshot.activeElt.focus();
    if (snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
      var sel = window.getSelection(),
          range$$1 = document.createRange();
      range$$1.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
      range$$1.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range$$1);
      sel.extend(snapshot.focusNode, snapshot.focusOffset);
    }
  }

  // Does the actual updating of the line display. Bails out
  // (returning false) when there is nothing to be done and forced is
  // false.
  function updateDisplayIfNeeded(cm, update) {
    var display = cm.display,
        doc = cm.doc;

    if (update.editorIsHidden) {
      resetView(cm);
      return false;
    }

    // Bail out if the visible area is already rendered and nothing changed.
    if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
      return false;
    }

    if (maybeUpdateLineNumberWidth(cm)) {
      resetView(cm);
      update.dims = getDimensions(cm);
    }

    // Compute a suitable new viewport (from & to)
    var end = doc.first + doc.size;
    var from = Math.max(update.visible.from - cm.options.viewportMargin, doc.first);
    var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
    if (display.viewFrom < from && from - display.viewFrom < 20) {
      from = Math.max(doc.first, display.viewFrom);
    }
    if (display.viewTo > to && display.viewTo - to < 20) {
      to = Math.min(end, display.viewTo);
    }
    if (sawCollapsedSpans) {
      from = visualLineNo(cm.doc, from);
      to = visualLineEndNo(cm.doc, to);
    }

    var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
    adjustView(cm, from, to);

    display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
    // Position the mover div to align with the current scroll position
    cm.display.mover.style.top = display.viewOffset + "px";

    var toUpdate = countDirtyView(cm);
    if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
      return false;
    }

    // For big changes, we hide the enclosing element during the
    // update, since that speeds up the operations on most browsers.
    var selSnapshot = selectionSnapshot(cm);
    if (toUpdate > 4) {
      display.lineDiv.style.display = "none";
    }
    patchDisplay(cm, display.updateLineNumbers, update.dims);
    if (toUpdate > 4) {
      display.lineDiv.style.display = "";
    }
    display.renderedView = display.view;
    // There might have been a widget with a focused element that got
    // hidden or updated, if so re-focus it.
    restoreSelection(selSnapshot);

    // Prevent selection and cursors from interfering with the scroll
    // width and height.
    removeChildren(display.cursorDiv);
    removeChildren(display.selectionDiv);
    display.gutters.style.height = display.sizer.style.minHeight = 0;

    if (different) {
      display.lastWrapHeight = update.wrapperHeight;
      display.lastWrapWidth = update.wrapperWidth;
      startWorker(cm, 400);
    }

    display.updateLineNumbers = null;

    return true;
  }

  function postUpdateDisplay(cm, update) {
    var viewport = update.viewport;

    for (var first = true;; first = false) {
      if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
        // Clip forced viewport to actual scrollable area.
        if (viewport && viewport.top != null) {
          viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
        }
        // Updated line heights might result in the drawn area not
        // actually covering the viewport. Keep looping until it does.
        update.visible = visibleLines(cm.display, cm.doc, viewport);
        if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
          break;
        }
      }
      if (!updateDisplayIfNeeded(cm, update)) {
        break;
      }
      updateHeightsInViewport(cm);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.force = false;
    }

    update.signal(cm, "update", cm);
    if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
      update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
      cm.display.reportedViewFrom = cm.display.viewFrom;cm.display.reportedViewTo = cm.display.viewTo;
    }
  }

  function updateDisplaySimple(cm, viewport) {
    var update = new DisplayUpdate(cm, viewport);
    if (updateDisplayIfNeeded(cm, update)) {
      updateHeightsInViewport(cm);
      postUpdateDisplay(cm, update);
      var barMeasure = measureForScrollbars(cm);
      updateSelection(cm);
      updateScrollbars(cm, barMeasure);
      setDocumentHeight(cm, barMeasure);
      update.finish();
    }
  }

  // Sync the actual display DOM structure with display.view, removing
  // nodes for lines that are no longer in view, and creating the ones
  // that are not there yet, and updating the ones that are out of
  // date.
  function patchDisplay(cm, updateNumbersFrom, dims) {
    var display = cm.display,
        lineNumbers = cm.options.lineNumbers;
    var container = display.lineDiv,
        cur = container.firstChild;

    function rm(node) {
      var next = node.nextSibling;
      // Works around a throw-scroll bug in OS X Webkit
      if (webkit && mac && cm.display.currentWheelTarget == node) {
        node.style.display = "none";
      } else {
        node.parentNode.removeChild(node);
      }
      return next;
    }

    var view = display.view,
        lineN = display.viewFrom;
    // Loop over the elements in the view, syncing cur (the DOM nodes
    // in display.lineDiv) with the view as we go.
    for (var i = 0; i < view.length; i++) {
      var lineView = view[i];
      if (lineView.hidden) {} else if (!lineView.node || lineView.node.parentNode != container) {
        // Not drawn yet
        var node = buildLineElement(cm, lineView, lineN, dims);
        container.insertBefore(node, cur);
      } else {
        // Already drawn
        while (cur != lineView.node) {
          cur = rm(cur);
        }
        var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
        if (lineView.changes) {
          if (indexOf(lineView.changes, "gutter") > -1) {
            updateNumber = false;
          }
          updateLineForChanges(cm, lineView, lineN, dims);
        }
        if (updateNumber) {
          removeChildren(lineView.lineNumber);
          lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
        }
        cur = lineView.node.nextSibling;
      }
      lineN += lineView.size;
    }
    while (cur) {
      cur = rm(cur);
    }
  }

  function updateGutterSpace(cm) {
    var width = cm.display.gutters.offsetWidth;
    cm.display.sizer.style.marginLeft = width + "px";
  }

  function setDocumentHeight(cm, measure) {
    cm.display.sizer.style.minHeight = measure.docHeight + "px";
    cm.display.heightForcer.style.top = measure.docHeight + "px";
    cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
  }

  // Rebuild the gutter elements, ensure the margin to the left of the
  // code matches their width.
  function updateGutters(cm) {
    var gutters = cm.display.gutters,
        specs = cm.options.gutters;
    removeChildren(gutters);
    var i = 0;
    for (; i < specs.length; ++i) {
      var gutterClass = specs[i];
      var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
      if (gutterClass == "CodeMirror-linenumbers") {
        cm.display.lineGutter = gElt;
        gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
      }
    }
    gutters.style.display = i ? "" : "none";
    updateGutterSpace(cm);
  }

  // Make sure the gutters options contains the element
  // "CodeMirror-linenumbers" when the lineNumbers option is true.
  function setGuttersForLineNumbers(options) {
    var found = indexOf(options.gutters, "CodeMirror-linenumbers");
    if (found == -1 && options.lineNumbers) {
      options.gutters = options.gutters.concat(["CodeMirror-linenumbers"]);
    } else if (found > -1 && !options.lineNumbers) {
      options.gutters = options.gutters.slice(0);
      options.gutters.splice(found, 1);
    }
  }

  // Since the delta values reported on mouse wheel events are
  // unstandardized between browsers and even browser versions, and
  // generally horribly unpredictable, this code starts by measuring
  // the scroll effect that the first few mouse wheel events have,
  // and, from that, detects the way it can convert deltas to pixel
  // offsets afterwards.
  //
  // The reason we want to know the amount a wheel event will scroll
  // is that it gives us a chance to update the display before the
  // actual scrolling happens, reducing flickering.

  var wheelSamples = 0;
  var wheelPixelsPerUnit = null;
  // Fill in a browser-detected starting value on browsers where we
  // know one. These don't have to be accurate -- the result of them
  // being wrong would just be a slight flicker on the first wheel
  // scroll (if it is large enough).
  if (ie) {
    wheelPixelsPerUnit = -.53;
  } else if (gecko) {
    wheelPixelsPerUnit = 15;
  } else if (chrome) {
    wheelPixelsPerUnit = -.7;
  } else if (safari) {
    wheelPixelsPerUnit = -1 / 3;
  }

  function wheelEventDelta(e) {
    var dx = e.wheelDeltaX,
        dy = e.wheelDeltaY;
    if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
      dx = e.detail;
    }
    if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
      dy = e.detail;
    } else if (dy == null) {
      dy = e.wheelDelta;
    }
    return { x: dx, y: dy };
  }
  function wheelEventPixels(e) {
    var delta = wheelEventDelta(e);
    delta.x *= wheelPixelsPerUnit;
    delta.y *= wheelPixelsPerUnit;
    return delta;
  }

  function onScrollWheel(cm, e) {
    var delta = wheelEventDelta(e),
        dx = delta.x,
        dy = delta.y;

    var display = cm.display,
        scroll = display.scroller;
    // Quit if there's nothing to scroll here
    var canScrollX = scroll.scrollWidth > scroll.clientWidth;
    var canScrollY = scroll.scrollHeight > scroll.clientHeight;
    if (!(dx && canScrollX || dy && canScrollY)) {
      return;
    }

    // Webkit browsers on OS X abort momentum scrolls when the target
    // of the scroll event is removed from the scrollable element.
    // This hack (see related code in patchDisplay) makes sure the
    // element is kept around.
    if (dy && mac && webkit) {
      outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
        for (var i = 0; i < view.length; i++) {
          if (view[i].node == cur) {
            cm.display.currentWheelTarget = cur;
            break outer;
          }
        }
      }
    }

    // On some browsers, horizontal scrolling will cause redraws to
    // happen before the gutter has been realigned, causing it to
    // wriggle around in a most unseemly way. When we have an
    // estimated pixels/delta value, we just handle horizontal
    // scrolling entirely here. It'll be slightly off from native, but
    // better than glitching out.
    if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
      if (dy && canScrollY) {
        updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * wheelPixelsPerUnit));
      }
      setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * wheelPixelsPerUnit));
      // Only prevent default scrolling if vertical scrolling is
      // actually possible. Otherwise, it causes vertical scroll
      // jitter on OSX trackpads when deltaX is small and deltaY
      // is large (issue #3579)
      if (!dy || dy && canScrollY) {
        e_preventDefault(e);
      }
      display.wheelStartX = null; // Abort measurement, if in progress
      return;
    }

    // 'Project' the visible viewport to cover the area that is being
    // scrolled into view (if we know enough to estimate it).
    if (dy && wheelPixelsPerUnit != null) {
      var pixels = dy * wheelPixelsPerUnit;
      var top = cm.doc.scrollTop,
          bot = top + display.wrapper.clientHeight;
      if (pixels < 0) {
        top = Math.max(0, top + pixels - 50);
      } else {
        bot = Math.min(cm.doc.height, bot + pixels + 50);
      }
      updateDisplaySimple(cm, { top: top, bottom: bot });
    }

    if (wheelSamples < 20) {
      if (display.wheelStartX == null) {
        display.wheelStartX = scroll.scrollLeft;display.wheelStartY = scroll.scrollTop;
        display.wheelDX = dx;display.wheelDY = dy;
        setTimeout(function () {
          if (display.wheelStartX == null) {
            return;
          }
          var movedX = scroll.scrollLeft - display.wheelStartX;
          var movedY = scroll.scrollTop - display.wheelStartY;
          var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
          display.wheelStartX = display.wheelStartY = null;
          if (!sample) {
            return;
          }
          wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
          ++wheelSamples;
        }, 200);
      } else {
        display.wheelDX += dx;display.wheelDY += dy;
      }
    }
  }

  // Selection objects are immutable. A new one is created every time
  // the selection changes. A selection is one or more non-overlapping
  // (and non-touching) ranges, sorted, and an integer that indicates
  // which one is the primary selection (the one that's scrolled into
  // view, that getCursor returns, etc).
  var Selection = function (ranges, primIndex) {
    this.ranges = ranges;
    this.primIndex = primIndex;
  };

  Selection.prototype.primary = function () {
    return this.ranges[this.primIndex];
  };

  Selection.prototype.equals = function (other) {
    var this$1 = this;

    if (other == this) {
      return true;
    }
    if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
      return false;
    }
    for (var i = 0; i < this.ranges.length; i++) {
      var here = this$1.ranges[i],
          there = other.ranges[i];
      if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
        return false;
      }
    }
    return true;
  };

  Selection.prototype.deepCopy = function () {
    var this$1 = this;

    var out = [];
    for (var i = 0; i < this.ranges.length; i++) {
      out[i] = new Range(copyPos(this$1.ranges[i].anchor), copyPos(this$1.ranges[i].head));
    }
    return new Selection(out, this.primIndex);
  };

  Selection.prototype.somethingSelected = function () {
    var this$1 = this;

    for (var i = 0; i < this.ranges.length; i++) {
      if (!this$1.ranges[i].empty()) {
        return true;
      }
    }
    return false;
  };

  Selection.prototype.contains = function (pos, end) {
    var this$1 = this;

    if (!end) {
      end = pos;
    }
    for (var i = 0; i < this.ranges.length; i++) {
      var range = this$1.ranges[i];
      if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0) {
        return i;
      }
    }
    return -1;
  };

  var Range = function (anchor, head) {
    this.anchor = anchor;this.head = head;
  };

  Range.prototype.from = function () {
    return minPos(this.anchor, this.head);
  };
  Range.prototype.to = function () {
    return maxPos(this.anchor, this.head);
  };
  Range.prototype.empty = function () {
    return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
  };

  // Take an unsorted, potentially overlapping set of ranges, and
  // build a selection out of it. 'Consumes' ranges array (modifying
  // it).
  function normalizeSelection(ranges, primIndex) {
    var prim = ranges[primIndex];
    ranges.sort(function (a, b) {
      return cmp(a.from(), b.from());
    });
    primIndex = indexOf(ranges, prim);
    for (var i = 1; i < ranges.length; i++) {
      var cur = ranges[i],
          prev = ranges[i - 1];
      if (cmp(prev.to(), cur.from()) >= 0) {
        var from = minPos(prev.from(), cur.from()),
            to = maxPos(prev.to(), cur.to());
        var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
        if (i <= primIndex) {
          --primIndex;
        }
        ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
      }
    }
    return new Selection(ranges, primIndex);
  }

  function simpleSelection(anchor, head) {
    return new Selection([new Range(anchor, head || anchor)], 0);
  }

  // Compute the position of the end of a change (its 'to' property
  // refers to the pre-change end).
  function changeEnd(change) {
    if (!change.text) {
      return change.to;
    }
    return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
  }

  // Adjust a position to refer to the post-change position of the
  // same text, or the end of the change if the change covers it.
  function adjustForChange(pos, change) {
    if (cmp(pos, change.from) < 0) {
      return pos;
    }
    if (cmp(pos, change.to) <= 0) {
      return changeEnd(change);
    }

    var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1,
        ch = pos.ch;
    if (pos.line == change.to.line) {
      ch += changeEnd(change).ch - change.to.ch;
    }
    return Pos(line, ch);
  }

  function computeSelAfterChange(doc, change) {
    var out = [];
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      var range = doc.sel.ranges[i];
      out.push(new Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
    }
    return normalizeSelection(out, doc.sel.primIndex);
  }

  function offsetPos(pos, old, nw) {
    if (pos.line == old.line) {
      return Pos(nw.line, pos.ch - old.ch + nw.ch);
    } else {
      return Pos(nw.line + (pos.line - old.line), pos.ch);
    }
  }

  // Used by replaceSelections to allow moving the selection to the
  // start or around the replaced test. Hint may be "start" or "around".
  function computeReplacedSel(doc, changes, hint) {
    var out = [];
    var oldPrev = Pos(doc.first, 0),
        newPrev = oldPrev;
    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];
      var from = offsetPos(change.from, oldPrev, newPrev);
      var to = offsetPos(changeEnd(change), oldPrev, newPrev);
      oldPrev = change.to;
      newPrev = to;
      if (hint == "around") {
        var range = doc.sel.ranges[i],
            inv = cmp(range.head, range.anchor) < 0;
        out[i] = new Range(inv ? to : from, inv ? from : to);
      } else {
        out[i] = new Range(from, from);
      }
    }
    return new Selection(out, doc.sel.primIndex);
  }

  // Used to get the editor into a consistent state again when options change.

  function loadMode(cm) {
    cm.doc.mode = getMode(cm.options, cm.doc.modeOption);
    resetModeState(cm);
  }

  function resetModeState(cm) {
    cm.doc.iter(function (line) {
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
    });
    cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
    startWorker(cm, 100);
    cm.state.modeGen++;
    if (cm.curOp) {
      regChange(cm);
    }
  }

  // DOCUMENT DATA STRUCTURE

  // By default, updates that start and end at the beginning of a line
  // are treated specially, in order to make the association of line
  // widgets and marker elements with the text behave more intuitive.
  function isWholeLineUpdate(doc, change) {
    return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
  }

  // Perform a change on the document data structure.
  function updateDoc(doc, change, markedSpans, estimateHeight$$1) {
    function spansFor(n) {
      return markedSpans ? markedSpans[n] : null;
    }
    function update(line, text, spans) {
      updateLine(line, text, spans, estimateHeight$$1);
      signalLater(line, "change", line, change);
    }
    function linesFor(start, end) {
      var result = [];
      for (var i = start; i < end; ++i) {
        result.push(new Line(text[i], spansFor(i), estimateHeight$$1));
      }
      return result;
    }

    var from = change.from,
        to = change.to,
        text = change.text;
    var firstLine = getLine(doc, from.line),
        lastLine = getLine(doc, to.line);
    var lastText = lst(text),
        lastSpans = spansFor(text.length - 1),
        nlines = to.line - from.line;

    // Adjust the line structure
    if (change.full) {
      doc.insert(0, linesFor(0, text.length));
      doc.remove(text.length, doc.size - text.length);
    } else if (isWholeLineUpdate(doc, change)) {
      // This is a whole-line replace. Treated specially to make
      // sure line objects move the way they are supposed to.
      var added = linesFor(0, text.length - 1);
      update(lastLine, lastLine.text, lastSpans);
      if (nlines) {
        doc.remove(from.line, nlines);
      }
      if (added.length) {
        doc.insert(from.line, added);
      }
    } else if (firstLine == lastLine) {
      if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
      } else {
        var added$1 = linesFor(1, text.length - 1);
        added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight$$1));
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        doc.insert(from.line + 1, added$1);
      }
    } else if (text.length == 1) {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
      doc.remove(from.line + 1, nlines);
    } else {
      update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
      update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
      var added$2 = linesFor(1, text.length - 1);
      if (nlines > 1) {
        doc.remove(from.line + 1, nlines - 1);
      }
      doc.insert(from.line + 1, added$2);
    }

    signalLater(doc, "change", doc, change);
  }

  // Call f for all linked documents.
  function linkedDocs(doc, f, sharedHistOnly) {
    function propagate(doc, skip, sharedHist) {
      if (doc.linked) {
        for (var i = 0; i < doc.linked.length; ++i) {
          var rel = doc.linked[i];
          if (rel.doc == skip) {
            continue;
          }
          var shared = sharedHist && rel.sharedHist;
          if (sharedHistOnly && !shared) {
            continue;
          }
          f(rel.doc, shared);
          propagate(rel.doc, doc, shared);
        }
      }
    }
    propagate(doc, null, true);
  }

  // Attach a document to an editor.
  function attachDoc(cm, doc) {
    if (doc.cm) {
      throw new Error("This document is already in use.");
    }
    cm.doc = doc;
    doc.cm = cm;
    estimateLineHeights(cm);
    loadMode(cm);
    setDirectionClass(cm);
    if (!cm.options.lineWrapping) {
      findMaxLine(cm);
    }
    cm.options.mode = doc.modeOption;
    regChange(cm);
  }

  function setDirectionClass(cm) {
    (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
  }

  function directionChanged(cm) {
    runInOp(cm, function () {
      setDirectionClass(cm);
      regChange(cm);
    });
  }

  function History(startGen) {
    // Arrays of change events and selections. Doing something adds an
    // event to done and clears undo. Undoing moves events from done
    // to undone, redoing moves them in the other direction.
    this.done = [];this.undone = [];
    this.undoDepth = Infinity;
    // Used to track when changes can be merged into a single undo
    // event
    this.lastModTime = this.lastSelTime = 0;
    this.lastOp = this.lastSelOp = null;
    this.lastOrigin = this.lastSelOrigin = null;
    // Used by the isClean() method
    this.generation = this.maxGeneration = startGen || 1;
  }

  // Create a history change event from an updateDoc-style change
  // object.
  function historyChangeFromChange(doc, change) {
    var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to) };
    attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    linkedDocs(doc, function (doc) {
      return attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
    }, true);
    return histChange;
  }

  // Pop all selection events off the end of a history array. Stop at
  // a change event.
  function clearSelectionEvents(array) {
    while (array.length) {
      var last = lst(array);
      if (last.ranges) {
        array.pop();
      } else {
        break;
      }
    }
  }

  // Find the top change event in the history. Pop off selection
  // events that are in the way.
  function lastChangeEvent(hist, force) {
    if (force) {
      clearSelectionEvents(hist.done);
      return lst(hist.done);
    } else if (hist.done.length && !lst(hist.done).ranges) {
      return lst(hist.done);
    } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
      hist.done.pop();
      return lst(hist.done);
    }
  }

  // Register a change in the history. Merges changes that are within
  // a single operation, or are close together with an origin that
  // allows merging (starting with "+") into a single event.
  function addChangeToHistory(doc, change, selAfter, opId) {
    var hist = doc.history;
    hist.undone.length = 0;
    var time = +new Date(),
        cur;
    var last;

    if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
      // Merge this change into the last event
      last = lst(cur.changes);
      if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
        // Optimized case for simple insertion -- don't want to add
        // new changesets for every character typed
        last.to = changeEnd(change);
      } else {
        // Add new sub-event
        cur.changes.push(historyChangeFromChange(doc, change));
      }
    } else {
      // Can not be merged, start a new event.
      var before = lst(hist.done);
      if (!before || !before.ranges) {
        pushSelectionToHistory(doc.sel, hist.done);
      }
      cur = { changes: [historyChangeFromChange(doc, change)],
        generation: hist.generation };
      hist.done.push(cur);
      while (hist.done.length > hist.undoDepth) {
        hist.done.shift();
        if (!hist.done[0].ranges) {
          hist.done.shift();
        }
      }
    }
    hist.done.push(selAfter);
    hist.generation = ++hist.maxGeneration;
    hist.lastModTime = hist.lastSelTime = time;
    hist.lastOp = hist.lastSelOp = opId;
    hist.lastOrigin = hist.lastSelOrigin = change.origin;

    if (!last) {
      signal(doc, "historyAdded");
    }
  }

  function selectionEventCanBeMerged(doc, origin, prev, sel) {
    var ch = origin.charAt(0);
    return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
  }

  // Called whenever the selection changes, sets the new selection as
  // the pending selection in the history, and pushes the old pending
  // selection into the 'done' array when it was significantly
  // different (in number of selected ranges, emptiness, or time).
  function addSelectionToHistory(doc, sel, opId, options) {
    var hist = doc.history,
        origin = options && options.origin;

    // A new event is started when the previous origin does not match
    // the current, or the origins don't allow matching. Origins
    // starting with * are always merged, those starting with + are
    // merged when similar and close together in time.
    if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))) {
      hist.done[hist.done.length - 1] = sel;
    } else {
      pushSelectionToHistory(sel, hist.done);
    }

    hist.lastSelTime = +new Date();
    hist.lastSelOrigin = origin;
    hist.lastSelOp = opId;
    if (options && options.clearRedo !== false) {
      clearSelectionEvents(hist.undone);
    }
  }

  function pushSelectionToHistory(sel, dest) {
    var top = lst(dest);
    if (!(top && top.ranges && top.equals(sel))) {
      dest.push(sel);
    }
  }

  // Used to store marked span information in the history.
  function attachLocalSpans(doc, change, from, to) {
    var existing = change["spans_" + doc.id],
        n = 0;
    doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function (line) {
      if (line.markedSpans) {
        (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
      }
      ++n;
    });
  }

  // When un/re-doing restores text containing marked spans, those
  // that have been explicitly cleared should not be restored.
  function removeClearedSpans(spans) {
    if (!spans) {
      return null;
    }
    var out;
    for (var i = 0; i < spans.length; ++i) {
      if (spans[i].marker.explicitlyCleared) {
        if (!out) {
          out = spans.slice(0, i);
        }
      } else if (out) {
        out.push(spans[i]);
      }
    }
    return !out ? spans : out.length ? out : null;
  }

  // Retrieve and filter the old marked spans stored in a change event.
  function getOldSpans(doc, change) {
    var found = change["spans_" + doc.id];
    if (!found) {
      return null;
    }
    var nw = [];
    for (var i = 0; i < change.text.length; ++i) {
      nw.push(removeClearedSpans(found[i]));
    }
    return nw;
  }

  // Used for un/re-doing changes from the history. Combines the
  // result of computing the existing spans with the set of spans that
  // existed in the history (so that deleting around a span and then
  // undoing brings back the span).
  function mergeOldSpans(doc, change) {
    var old = getOldSpans(doc, change);
    var stretched = stretchSpansOverChange(doc, change);
    if (!old) {
      return stretched;
    }
    if (!stretched) {
      return old;
    }

    for (var i = 0; i < old.length; ++i) {
      var oldCur = old[i],
          stretchCur = stretched[i];
      if (oldCur && stretchCur) {
        spans: for (var j = 0; j < stretchCur.length; ++j) {
          var span = stretchCur[j];
          for (var k = 0; k < oldCur.length; ++k) {
            if (oldCur[k].marker == span.marker) {
              continue spans;
            }
          }
          oldCur.push(span);
        }
      } else if (stretchCur) {
        old[i] = stretchCur;
      }
    }
    return old;
  }

  // Used both to provide a JSON-safe object in .getHistory, and, when
  // detaching a document, to split the history in two
  function copyHistoryArray(events, newGroup, instantiateSel) {
    var copy = [];
    for (var i = 0; i < events.length; ++i) {
      var event = events[i];
      if (event.ranges) {
        copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
        continue;
      }
      var changes = event.changes,
          newChanges = [];
      copy.push({ changes: newChanges });
      for (var j = 0; j < changes.length; ++j) {
        var change = changes[j],
            m = void 0;
        newChanges.push({ from: change.from, to: change.to, text: change.text });
        if (newGroup) {
          for (var prop in change) {
            if (m = prop.match(/^spans_(\d+)$/)) {
              if (indexOf(newGroup, Number(m[1])) > -1) {
                lst(newChanges)[prop] = change[prop];
                delete change[prop];
              }
            }
          }
        }
      }
    }
    return copy;
  }

  // The 'scroll' parameter given to many of these indicated whether
  // the new cursor position should be scrolled into view after
  // modifying the selection.

  // If shift is held or the extend flag is set, extends a range to
  // include a given position (and optionally a second position).
  // Otherwise, simply returns the range between the given positions.
  // Used for cursor motion and such.
  function extendRange(range, head, other, extend) {
    if (extend) {
      var anchor = range.anchor;
      if (other) {
        var posBefore = cmp(head, anchor) < 0;
        if (posBefore != cmp(other, anchor) < 0) {
          anchor = head;
          head = other;
        } else if (posBefore != cmp(head, other) < 0) {
          head = other;
        }
      }
      return new Range(anchor, head);
    } else {
      return new Range(other || head, head);
    }
  }

  // Extend the primary selection range, discard the rest.
  function extendSelection(doc, head, other, options, extend) {
    if (extend == null) {
      extend = doc.cm && (doc.cm.display.shift || doc.extend);
    }
    setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
  }

  // Extend all selections (pos is an array of selections with length
  // equal the number of selections)
  function extendSelections(doc, heads, options) {
    var out = [];
    var extend = doc.cm && (doc.cm.display.shift || doc.extend);
    for (var i = 0; i < doc.sel.ranges.length; i++) {
      out[i] = extendRange(doc.sel.ranges[i], heads[i], null, extend);
    }
    var newSel = normalizeSelection(out, doc.sel.primIndex);
    setSelection(doc, newSel, options);
  }

  // Updates a single range in the selection.
  function replaceOneSelection(doc, i, range, options) {
    var ranges = doc.sel.ranges.slice(0);
    ranges[i] = range;
    setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
  }

  // Reset the selection to a single range.
  function setSimpleSelection(doc, anchor, head, options) {
    setSelection(doc, simpleSelection(anchor, head), options);
  }

  // Give beforeSelectionChange handlers a change to influence a
  // selection update.
  function filterSelectionChange(doc, sel, options) {
    var obj = {
      ranges: sel.ranges,
      update: function (ranges) {
        var this$1 = this;

        this.ranges = [];
        for (var i = 0; i < ranges.length; i++) {
          this$1.ranges[i] = new Range(clipPos(doc, ranges[i].anchor), clipPos(doc, ranges[i].head));
        }
      },
      origin: options && options.origin
    };
    signal(doc, "beforeSelectionChange", doc, obj);
    if (doc.cm) {
      signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
    }
    if (obj.ranges != sel.ranges) {
      return normalizeSelection(obj.ranges, obj.ranges.length - 1);
    } else {
      return sel;
    }
  }

  function setSelectionReplaceHistory(doc, sel, options) {
    var done = doc.history.done,
        last = lst(done);
    if (last && last.ranges) {
      done[done.length - 1] = sel;
      setSelectionNoUndo(doc, sel, options);
    } else {
      setSelection(doc, sel, options);
    }
  }

  // Set a new selection.
  function setSelection(doc, sel, options) {
    setSelectionNoUndo(doc, sel, options);
    addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
  }

  function setSelectionNoUndo(doc, sel, options) {
    if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) {
      sel = filterSelectionChange(doc, sel, options);
    }

    var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
    setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));

    if (!(options && options.scroll === false) && doc.cm) {
      ensureCursorVisible(doc.cm);
    }
  }

  function setSelectionInner(doc, sel) {
    if (sel.equals(doc.sel)) {
      return;
    }

    doc.sel = sel;

    if (doc.cm) {
      doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = true;
      signalCursorActivity(doc.cm);
    }
    signalLater(doc, "cursorActivity", doc);
  }

  // Verify that the selection does not partially select any atomic
  // marked ranges.
  function reCheckSelection(doc) {
    setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
  }

  // Return a selection that does not partially select any atomic
  // ranges.
  function skipAtomicInSelection(doc, sel, bias, mayClear) {
    var out;
    for (var i = 0; i < sel.ranges.length; i++) {
      var range = sel.ranges[i];
      var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i];
      var newAnchor = skipAtomic(doc, range.anchor, old && old.anchor, bias, mayClear);
      var newHead = skipAtomic(doc, range.head, old && old.head, bias, mayClear);
      if (out || newAnchor != range.anchor || newHead != range.head) {
        if (!out) {
          out = sel.ranges.slice(0, i);
        }
        out[i] = new Range(newAnchor, newHead);
      }
    }
    return out ? normalizeSelection(out, sel.primIndex) : sel;
  }

  function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
    var line = getLine(doc, pos.line);
    if (line.markedSpans) {
      for (var i = 0; i < line.markedSpans.length; ++i) {
        var sp = line.markedSpans[i],
            m = sp.marker;
        if ((sp.from == null || (m.inclusiveLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (m.inclusiveRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
          if (mayClear) {
            signal(m, "beforeCursorEnter");
            if (m.explicitlyCleared) {
              if (!line.markedSpans) {
                break;
              } else {
                --i;continue;
              }
            }
          }
          if (!m.atomic) {
            continue;
          }

          if (oldPos) {
            var near = m.find(dir < 0 ? 1 : -1),
                diff = void 0;
            if (dir < 0 ? m.inclusiveRight : m.inclusiveLeft) {
              near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
            }
            if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
              return skipAtomicInner(doc, near, pos, dir, mayClear);
            }
          }

          var far = m.find(dir < 0 ? -1 : 1);
          if (dir < 0 ? m.inclusiveLeft : m.inclusiveRight) {
            far = movePos(doc, far, dir, far.line == pos.line ? line : null);
          }
          return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
        }
      }
    }
    return pos;
  }

  // Ensure a given position is not inside an atomic range.
  function skipAtomic(doc, pos, oldPos, bias, mayClear) {
    var dir = bias || 1;
    var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, dir, true) || skipAtomicInner(doc, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true);
    if (!found) {
      doc.cantEdit = true;
      return Pos(doc.first, 0);
    }
    return found;
  }

  function movePos(doc, pos, dir, line) {
    if (dir < 0 && pos.ch == 0) {
      if (pos.line > doc.first) {
        return clipPos(doc, Pos(pos.line - 1));
      } else {
        return null;
      }
    } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
      if (pos.line < doc.first + doc.size - 1) {
        return Pos(pos.line + 1, 0);
      } else {
        return null;
      }
    } else {
      return new Pos(pos.line, pos.ch + dir);
    }
  }

  function selectAll(cm) {
    cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
  }

  // UPDATING

  // Allow "beforeChange" event handlers to influence a change
  function filterChange(doc, change, update) {
    var obj = {
      canceled: false,
      from: change.from,
      to: change.to,
      text: change.text,
      origin: change.origin,
      cancel: function () {
        return obj.canceled = true;
      }
    };
    if (update) {
      obj.update = function (from, to, text, origin) {
        if (from) {
          obj.from = clipPos(doc, from);
        }
        if (to) {
          obj.to = clipPos(doc, to);
        }
        if (text) {
          obj.text = text;
        }
        if (origin !== undefined) {
          obj.origin = origin;
        }
      };
    }
    signal(doc, "beforeChange", doc, obj);
    if (doc.cm) {
      signal(doc.cm, "beforeChange", doc.cm, obj);
    }

    if (obj.canceled) {
      return null;
    }
    return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
  }

  // Apply a change to a document, and add it to the document's
  // history, and propagating it to all linked documents.
  function makeChange(doc, change, ignoreReadOnly) {
    if (doc.cm) {
      if (!doc.cm.curOp) {
        return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
      }
      if (doc.cm.state.suppressEdits) {
        return;
      }
    }

    if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
      change = filterChange(doc, change, true);
      if (!change) {
        return;
      }
    }

    // Possibly split or suppress the update based on the presence
    // of read-only spans in its range.
    var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
    if (split) {
      for (var i = split.length - 1; i >= 0; --i) {
        makeChangeInner(doc, { from: split[i].from, to: split[i].to, text: i ? [""] : change.text, origin: change.origin });
      }
    } else {
      makeChangeInner(doc, change);
    }
  }

  function makeChangeInner(doc, change) {
    if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
      return;
    }
    var selAfter = computeSelAfterChange(doc, change);
    addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);

    makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
    var rebased = [];

    linkedDocs(doc, function (doc, sharedHist) {
      if (!sharedHist && indexOf(rebased, doc.history) == -1) {
        rebaseHist(doc.history, change);
        rebased.push(doc.history);
      }
      makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
    });
  }

  // Revert a change stored in a document's history.
  function makeChangeFromHistory(doc, type, allowSelectionOnly) {
    var suppress = doc.cm && doc.cm.state.suppressEdits;
    if (suppress && !allowSelectionOnly) {
      return;
    }

    var hist = doc.history,
        event,
        selAfter = doc.sel;
    var source = type == "undo" ? hist.done : hist.undone,
        dest = type == "undo" ? hist.undone : hist.done;

    // Verify that there is a useable event (so that ctrl-z won't
    // needlessly clear selection events)
    var i = 0;
    for (; i < source.length; i++) {
      event = source[i];
      if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges) {
        break;
      }
    }
    if (i == source.length) {
      return;
    }
    hist.lastOrigin = hist.lastSelOrigin = null;

    for (;;) {
      event = source.pop();
      if (event.ranges) {
        pushSelectionToHistory(event, dest);
        if (allowSelectionOnly && !event.equals(doc.sel)) {
          setSelection(doc, event, { clearRedo: false });
          return;
        }
        selAfter = event;
      } else if (suppress) {
        source.push(event);
        return;
      } else {
        break;
      }
    }

    // Build up a reverse change object to add to the opposite history
    // stack (redo when undoing, and vice versa).
    var antiChanges = [];
    pushSelectionToHistory(selAfter, dest);
    dest.push({ changes: antiChanges, generation: hist.generation });
    hist.generation = event.generation || ++hist.maxGeneration;

    var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");

    var loop = function (i) {
      var change = event.changes[i];
      change.origin = type;
      if (filter && !filterChange(doc, change, false)) {
        source.length = 0;
        return {};
      }

      antiChanges.push(historyChangeFromChange(doc, change));

      var after = i ? computeSelAfterChange(doc, change) : lst(source);
      makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
      if (!i && doc.cm) {
        doc.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
      }
      var rebased = [];

      // Propagate to the linked documents
      linkedDocs(doc, function (doc, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc.history) == -1) {
          rebaseHist(doc.history, change);
          rebased.push(doc.history);
        }
        makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
      });
    };

    for (var i$1 = event.changes.length - 1; i$1 >= 0; --i$1) {
      var returned = loop(i$1);

      if (returned) return returned.v;
    }
  }

  // Sub-views need their line numbers shifted when text is added
  // above or below them in the parent document.
  function shiftDoc(doc, distance) {
    if (distance == 0) {
      return;
    }
    doc.first += distance;
    doc.sel = new Selection(map(doc.sel.ranges, function (range) {
      return new Range(Pos(range.anchor.line + distance, range.anchor.ch), Pos(range.head.line + distance, range.head.ch));
    }), doc.sel.primIndex);
    if (doc.cm) {
      regChange(doc.cm, doc.first, doc.first - distance, distance);
      for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
        regLineChange(doc.cm, l, "gutter");
      }
    }
  }

  // More lower-level change function, handling only a single document
  // (not linked ones).
  function makeChangeSingleDoc(doc, change, selAfter, spans) {
    if (doc.cm && !doc.cm.curOp) {
      return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
    }

    if (change.to.line < doc.first) {
      shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
      return;
    }
    if (change.from.line > doc.lastLine()) {
      return;
    }

    // Clip the change to the size of this doc
    if (change.from.line < doc.first) {
      var shift = change.text.length - 1 - (doc.first - change.from.line);
      shiftDoc(doc, shift);
      change = { from: Pos(doc.first, 0), to: Pos(change.to.line + shift, change.to.ch),
        text: [lst(change.text)], origin: change.origin };
    }
    var last = doc.lastLine();
    if (change.to.line > last) {
      change = { from: change.from, to: Pos(last, getLine(doc, last).text.length),
        text: [change.text[0]], origin: change.origin };
    }

    change.removed = getBetween(doc, change.from, change.to);

    if (!selAfter) {
      selAfter = computeSelAfterChange(doc, change);
    }
    if (doc.cm) {
      makeChangeSingleDocInEditor(doc.cm, change, spans);
    } else {
      updateDoc(doc, change, spans);
    }
    setSelectionNoUndo(doc, selAfter, sel_dontScroll);
  }

  // Handle the interaction of a change to a document with the editor
  // that this document is part of.
  function makeChangeSingleDocInEditor(cm, change, spans) {
    var doc = cm.doc,
        display = cm.display,
        from = change.from,
        to = change.to;

    var recomputeMaxLength = false,
        checkWidthStart = from.line;
    if (!cm.options.lineWrapping) {
      checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
      doc.iter(checkWidthStart, to.line + 1, function (line) {
        if (line == display.maxLine) {
          recomputeMaxLength = true;
          return true;
        }
      });
    }

    if (doc.sel.contains(change.from, change.to) > -1) {
      signalCursorActivity(cm);
    }

    updateDoc(doc, change, spans, estimateHeight(cm));

    if (!cm.options.lineWrapping) {
      doc.iter(checkWidthStart, from.line + change.text.length, function (line) {
        var len = lineLength(line);
        if (len > display.maxLineLength) {
          display.maxLine = line;
          display.maxLineLength = len;
          display.maxLineChanged = true;
          recomputeMaxLength = false;
        }
      });
      if (recomputeMaxLength) {
        cm.curOp.updateMaxLine = true;
      }
    }

    retreatFrontier(doc, from.line);
    startWorker(cm, 400);

    var lendiff = change.text.length - (to.line - from.line) - 1;
    // Remember that these lines changed, for updating the display
    if (change.full) {
      regChange(cm);
    } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
      regLineChange(cm, from.line, "text");
    } else {
      regChange(cm, from.line, to.line + 1, lendiff);
    }

    var changesHandler = hasHandler(cm, "changes"),
        changeHandler = hasHandler(cm, "change");
    if (changeHandler || changesHandler) {
      var obj = {
        from: from, to: to,
        text: change.text,
        removed: change.removed,
        origin: change.origin
      };
      if (changeHandler) {
        signalLater(cm, "change", cm, obj);
      }
      if (changesHandler) {
        (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
      }
    }
    cm.display.selForContextMenu = null;
  }

  function replaceRange(doc, code, from, to, origin) {
    if (!to) {
      to = from;
    }
    if (cmp(to, from) < 0) {
      var assign;
      assign = [to, from], from = assign[0], to = assign[1], assign;
    }
    if (typeof code == "string") {
      code = doc.splitLines(code);
    }
    makeChange(doc, { from: from, to: to, text: code, origin: origin });
  }

  // Rebasing/resetting history to deal with externally-sourced changes

  function rebaseHistSelSingle(pos, from, to, diff) {
    if (to < pos.line) {
      pos.line += diff;
    } else if (from < pos.line) {
      pos.line = from;
      pos.ch = 0;
    }
  }

  // Tries to rebase an array of history events given a change in the
  // document. If the change touches the same lines as the event, the
  // event, and everything 'behind' it, is discarded. If the change is
  // before the event, the event's positions are updated. Uses a
  // copy-on-write scheme for the positions, to avoid having to
  // reallocate them all on every rebase, but also avoid problems with
  // shared position objects being unsafely updated.
  function rebaseHistArray(array, from, to, diff) {
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i],
          ok = true;
      if (sub.ranges) {
        if (!sub.copied) {
          sub = array[i] = sub.deepCopy();sub.copied = true;
        }
        for (var j = 0; j < sub.ranges.length; j++) {
          rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
          rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
        }
        continue;
      }
      for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
        var cur = sub.changes[j$1];
        if (to < cur.from.line) {
          cur.from = Pos(cur.from.line + diff, cur.from.ch);
          cur.to = Pos(cur.to.line + diff, cur.to.ch);
        } else if (from <= cur.to.line) {
          ok = false;
          break;
        }
      }
      if (!ok) {
        array.splice(0, i + 1);
        i = 0;
      }
    }
  }

  function rebaseHist(hist, change) {
    var from = change.from.line,
        to = change.to.line,
        diff = change.text.length - (to - from) - 1;
    rebaseHistArray(hist.done, from, to, diff);
    rebaseHistArray(hist.undone, from, to, diff);
  }

  // Utility for applying a change to a line by handle or number,
  // returning the number and optionally registering the line as
  // changed.
  function changeLine(doc, handle, changeType, op) {
    var no = handle,
        line = handle;
    if (typeof handle == "number") {
      line = getLine(doc, clipLine(doc, handle));
    } else {
      no = lineNo(handle);
    }
    if (no == null) {
      return null;
    }
    if (op(line, no) && doc.cm) {
      regLineChange(doc.cm, no, changeType);
    }
    return line;
  }

  // The document is represented as a BTree consisting of leaves, with
  // chunk of lines in them, and branches, with up to ten leaves or
  // other branch nodes below them. The top node is always a branch
  // node, and is the document object itself (meaning it has
  // additional methods and properties).
  //
  // All nodes have parent links. The tree is used both to go from
  // line numbers to line objects, and to go from objects to numbers.
  // It also indexes by height, and is used to convert between height
  // and line object, and to find the total height of the document.
  //
  // See also http://marijnhaverbeke.nl/blog/codemirror-line-tree.html

  function LeafChunk(lines) {
    var this$1 = this;

    this.lines = lines;
    this.parent = null;
    var height = 0;
    for (var i = 0; i < lines.length; ++i) {
      lines[i].parent = this$1;
      height += lines[i].height;
    }
    this.height = height;
  }

  LeafChunk.prototype = {
    chunkSize: function chunkSize() {
      return this.lines.length;
    },

    // Remove the n lines at offset 'at'.
    removeInner: function removeInner(at, n) {
      var this$1 = this;

      for (var i = at, e = at + n; i < e; ++i) {
        var line = this$1.lines[i];
        this$1.height -= line.height;
        cleanUpLine(line);
        signalLater(line, "delete");
      }
      this.lines.splice(at, n);
    },

    // Helper used to collapse a small branch into a single leaf.
    collapse: function collapse(lines) {
      lines.push.apply(lines, this.lines);
    },

    // Insert the given array of lines at offset 'at', count them as
    // having the given height.
    insertInner: function insertInner(at, lines, height) {
      var this$1 = this;

      this.height += height;
      this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
      for (var i = 0; i < lines.length; ++i) {
        lines[i].parent = this$1;
      }
    },

    // Used to iterate over a part of the tree.
    iterN: function iterN(at, n, op) {
      var this$1 = this;

      for (var e = at + n; at < e; ++at) {
        if (op(this$1.lines[at])) {
          return true;
        }
      }
    }
  };

  function BranchChunk(children) {
    var this$1 = this;

    this.children = children;
    var size = 0,
        height = 0;
    for (var i = 0; i < children.length; ++i) {
      var ch = children[i];
      size += ch.chunkSize();height += ch.height;
      ch.parent = this$1;
    }
    this.size = size;
    this.height = height;
    this.parent = null;
  }

  BranchChunk.prototype = {
    chunkSize: function chunkSize() {
      return this.size;
    },

    removeInner: function removeInner(at, n) {
      var this$1 = this;

      this.size -= n;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i],
            sz = child.chunkSize();
        if (at < sz) {
          var rm = Math.min(n, sz - at),
              oldHeight = child.height;
          child.removeInner(at, rm);
          this$1.height -= oldHeight - child.height;
          if (sz == rm) {
            this$1.children.splice(i--, 1);child.parent = null;
          }
          if ((n -= rm) == 0) {
            break;
          }
          at = 0;
        } else {
          at -= sz;
        }
      }
      // If the result is smaller than 25 lines, ensure that it is a
      // single leaf node.
      if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
        var lines = [];
        this.collapse(lines);
        this.children = [new LeafChunk(lines)];
        this.children[0].parent = this;
      }
    },

    collapse: function collapse(lines) {
      var this$1 = this;

      for (var i = 0; i < this.children.length; ++i) {
        this$1.children[i].collapse(lines);
      }
    },

    insertInner: function insertInner(at, lines, height) {
      var this$1 = this;

      this.size += lines.length;
      this.height += height;
      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i],
            sz = child.chunkSize();
        if (at <= sz) {
          child.insertInner(at, lines, height);
          if (child.lines && child.lines.length > 50) {
            // To avoid memory thrashing when child.lines is huge (e.g. first view of a large file), it's never spliced.
            // Instead, small slices are taken. They're taken in order because sequential memory accesses are fastest.
            var remaining = child.lines.length % 25 + 25;
            for (var pos = remaining; pos < child.lines.length;) {
              var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
              child.height -= leaf.height;
              this$1.children.splice(++i, 0, leaf);
              leaf.parent = this$1;
            }
            child.lines = child.lines.slice(0, remaining);
            this$1.maybeSpill();
          }
          break;
        }
        at -= sz;
      }
    },

    // When a node has grown, check whether it should be split.
    maybeSpill: function maybeSpill() {
      if (this.children.length <= 10) {
        return;
      }
      var me = this;
      do {
        var spilled = me.children.splice(me.children.length - 5, 5);
        var sibling = new BranchChunk(spilled);
        if (!me.parent) {
          // Become the parent node
          var copy = new BranchChunk(me.children);
          copy.parent = me;
          me.children = [copy, sibling];
          me = copy;
        } else {
          me.size -= sibling.size;
          me.height -= sibling.height;
          var myIndex = indexOf(me.parent.children, me);
          me.parent.children.splice(myIndex + 1, 0, sibling);
        }
        sibling.parent = me.parent;
      } while (me.children.length > 10);
      me.parent.maybeSpill();
    },

    iterN: function iterN(at, n, op) {
      var this$1 = this;

      for (var i = 0; i < this.children.length; ++i) {
        var child = this$1.children[i],
            sz = child.chunkSize();
        if (at < sz) {
          var used = Math.min(n, sz - at);
          if (child.iterN(at, used, op)) {
            return true;
          }
          if ((n -= used) == 0) {
            break;
          }
          at = 0;
        } else {
          at -= sz;
        }
      }
    }
  };

  // Line widgets are block elements displayed above or below a line.

  var LineWidget = function (doc, node, options) {
    var this$1 = this;

    if (options) {
      for (var opt in options) {
        if (options.hasOwnProperty(opt)) {
          this$1[opt] = options[opt];
        }
      }
    }
    this.doc = doc;
    this.node = node;
  };

  LineWidget.prototype.clear = function () {
    var this$1 = this;

    var cm = this.doc.cm,
        ws = this.line.widgets,
        line = this.line,
        no = lineNo(line);
    if (no == null || !ws) {
      return;
    }
    for (var i = 0; i < ws.length; ++i) {
      if (ws[i] == this$1) {
        ws.splice(i--, 1);
      }
    }
    if (!ws.length) {
      line.widgets = null;
    }
    var height = widgetHeight(this);
    updateLineHeight(line, Math.max(0, line.height - height));
    if (cm) {
      runInOp(cm, function () {
        adjustScrollWhenAboveVisible(cm, line, -height);
        regLineChange(cm, no, "widget");
      });
      signalLater(cm, "lineWidgetCleared", cm, this, no);
    }
  };

  LineWidget.prototype.changed = function () {
    var this$1 = this;

    var oldH = this.height,
        cm = this.doc.cm,
        line = this.line;
    this.height = null;
    var diff = widgetHeight(this) - oldH;
    if (!diff) {
      return;
    }
    updateLineHeight(line, line.height + diff);
    if (cm) {
      runInOp(cm, function () {
        cm.curOp.forceUpdate = true;
        adjustScrollWhenAboveVisible(cm, line, diff);
        signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
      });
    }
  };
  eventMixin(LineWidget);

  function adjustScrollWhenAboveVisible(cm, line, diff) {
    if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
      addToScrollTop(cm, diff);
    }
  }

  function addLineWidget(doc, handle, node, options) {
    var widget = new LineWidget(doc, node, options);
    var cm = doc.cm;
    if (cm && widget.noHScroll) {
      cm.display.alignWidgets = true;
    }
    changeLine(doc, handle, "widget", function (line) {
      var widgets = line.widgets || (line.widgets = []);
      if (widget.insertAt == null) {
        widgets.push(widget);
      } else {
        widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
      }
      widget.line = line;
      if (cm && !lineIsHidden(doc, line)) {
        var aboveVisible = heightAtLine(line) < doc.scrollTop;
        updateLineHeight(line, line.height + widgetHeight(widget));
        if (aboveVisible) {
          addToScrollTop(cm, widget.height);
        }
        cm.curOp.forceUpdate = true;
      }
      return true;
    });
    if (cm) {
      signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
    }
    return widget;
  }

  // TEXTMARKERS

  // Created with markText and setBookmark methods. A TextMarker is a
  // handle that can be used to clear or find a marked position in the
  // document. Line objects hold arrays (markedSpans) containing
  // {from, to, marker} object pointing to such marker objects, and
  // indicating that such a marker is present on that line. Multiple
  // lines may point to the same marker when it spans across lines.
  // The spans will have null for their from/to properties when the
  // marker continues beyond the start/end of the line. Markers have
  // links back to the lines they currently touch.

  // Collapsed markers have unique ids, in order to be able to order
  // them, which is needed for uniquely determining an outer marker
  // when they overlap (they may nest, but not partially overlap).
  var nextMarkerId = 0;

  var TextMarker = function (doc, type) {
    this.lines = [];
    this.type = type;
    this.doc = doc;
    this.id = ++nextMarkerId;
  };

  // Clear the marker.
  TextMarker.prototype.clear = function () {
    var this$1 = this;

    if (this.explicitlyCleared) {
      return;
    }
    var cm = this.doc.cm,
        withOp = cm && !cm.curOp;
    if (withOp) {
      startOperation(cm);
    }
    if (hasHandler(this, "clear")) {
      var found = this.find();
      if (found) {
        signalLater(this, "clear", found.from, found.to);
      }
    }
    var min = null,
        max = null;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (cm && !this$1.collapsed) {
        regLineChange(cm, lineNo(line), "text");
      } else if (cm) {
        if (span.to != null) {
          max = lineNo(line);
        }
        if (span.from != null) {
          min = lineNo(line);
        }
      }
      line.markedSpans = removeMarkedSpan(line.markedSpans, span);
      if (span.from == null && this$1.collapsed && !lineIsHidden(this$1.doc, line) && cm) {
        updateLineHeight(line, textHeight(cm.display));
      }
    }
    if (cm && this.collapsed && !cm.options.lineWrapping) {
      for (var i$1 = 0; i$1 < this.lines.length; ++i$1) {
        var visual = visualLine(this$1.lines[i$1]),
            len = lineLength(visual);
        if (len > cm.display.maxLineLength) {
          cm.display.maxLine = visual;
          cm.display.maxLineLength = len;
          cm.display.maxLineChanged = true;
        }
      }
    }

    if (min != null && cm && this.collapsed) {
      regChange(cm, min, max + 1);
    }
    this.lines.length = 0;
    this.explicitlyCleared = true;
    if (this.atomic && this.doc.cantEdit) {
      this.doc.cantEdit = false;
      if (cm) {
        reCheckSelection(cm.doc);
      }
    }
    if (cm) {
      signalLater(cm, "markerCleared", cm, this, min, max);
    }
    if (withOp) {
      endOperation(cm);
    }
    if (this.parent) {
      this.parent.clear();
    }
  };

  // Find the position of the marker in the document. Returns a {from,
  // to} object by default. Side can be passed to get a specific side
  // -- 0 (both), -1 (left), or 1 (right). When lineObj is true, the
  // Pos objects returned contain a line object, rather than a line
  // number (used to prevent looking up the same line twice).
  TextMarker.prototype.find = function (side, lineObj) {
    var this$1 = this;

    if (side == null && this.type == "bookmark") {
      side = 1;
    }
    var from, to;
    for (var i = 0; i < this.lines.length; ++i) {
      var line = this$1.lines[i];
      var span = getMarkedSpanFor(line.markedSpans, this$1);
      if (span.from != null) {
        from = Pos(lineObj ? line : lineNo(line), span.from);
        if (side == -1) {
          return from;
        }
      }
      if (span.to != null) {
        to = Pos(lineObj ? line : lineNo(line), span.to);
        if (side == 1) {
          return to;
        }
      }
    }
    return from && { from: from, to: to };
  };

  // Signals that the marker's widget changed, and surrounding layout
  // should be recomputed.
  TextMarker.prototype.changed = function () {
    var this$1 = this;

    var pos = this.find(-1, true),
        widget = this,
        cm = this.doc.cm;
    if (!pos || !cm) {
      return;
    }
    runInOp(cm, function () {
      var line = pos.line,
          lineN = lineNo(pos.line);
      var view = findViewForLine(cm, lineN);
      if (view) {
        clearLineMeasurementCacheFor(view);
        cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
      }
      cm.curOp.updateMaxLine = true;
      if (!lineIsHidden(widget.doc, line) && widget.height != null) {
        var oldHeight = widget.height;
        widget.height = null;
        var dHeight = widgetHeight(widget) - oldHeight;
        if (dHeight) {
          updateLineHeight(line, line.height + dHeight);
        }
      }
      signalLater(cm, "markerChanged", cm, this$1);
    });
  };

  TextMarker.prototype.attachLine = function (line) {
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;
      if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
        (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
      }
    }
    this.lines.push(line);
  };

  TextMarker.prototype.detachLine = function (line) {
    this.lines.splice(indexOf(this.lines, line), 1);
    if (!this.lines.length && this.doc.cm) {
      var op = this.doc.cm.curOp;(op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
    }
  };
  eventMixin(TextMarker);

  // Create a marker, wire it up to the right lines, and
  function markText(doc, from, to, options, type) {
    // Shared markers (across linked documents) are handled separately
    // (markTextShared will call out to this again, once per
    // document).
    if (options && options.shared) {
      return markTextShared(doc, from, to, options, type);
    }
    // Ensure we are in an operation.
    if (doc.cm && !doc.cm.curOp) {
      return operation(doc.cm, markText)(doc, from, to, options, type);
    }

    var marker = new TextMarker(doc, type),
        diff = cmp(from, to);
    if (options) {
      copyObj(options, marker, false);
    }
    // Don't connect empty markers unless clearWhenEmpty is false
    if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
      return marker;
    }
    if (marker.replacedWith) {
      // Showing up as a widget implies collapsed (widget replaces text)
      marker.collapsed = true;
      marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
      if (!options.handleMouseEvents) {
        marker.widgetNode.setAttribute("cm-ignore-events", "true");
      }
      if (options.insertLeft) {
        marker.widgetNode.insertLeft = true;
      }
    }
    if (marker.collapsed) {
      if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) {
        throw new Error("Inserting collapsed marker partially overlapping an existing one");
      }
      seeCollapsedSpans();
    }

    if (marker.addToHistory) {
      addChangeToHistory(doc, { from: from, to: to, origin: "markText" }, doc.sel, NaN);
    }

    var curLine = from.line,
        cm = doc.cm,
        updateMaxLine;
    doc.iter(curLine, to.line + 1, function (line) {
      if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
        updateMaxLine = true;
      }
      if (marker.collapsed && curLine != from.line) {
        updateLineHeight(line, 0);
      }
      addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null));
      ++curLine;
    });
    // lineIsHidden depends on the presence of the spans, so needs a second pass
    if (marker.collapsed) {
      doc.iter(from.line, to.line + 1, function (line) {
        if (lineIsHidden(doc, line)) {
          updateLineHeight(line, 0);
        }
      });
    }

    if (marker.clearOnEnter) {
      on(marker, "beforeCursorEnter", function () {
        return marker.clear();
      });
    }

    if (marker.readOnly) {
      seeReadOnlySpans();
      if (doc.history.done.length || doc.history.undone.length) {
        doc.clearHistory();
      }
    }
    if (marker.collapsed) {
      marker.id = ++nextMarkerId;
      marker.atomic = true;
    }
    if (cm) {
      // Sync editor state
      if (updateMaxLine) {
        cm.curOp.updateMaxLine = true;
      }
      if (marker.collapsed) {
        regChange(cm, from.line, to.line + 1);
      } else if (marker.className || marker.title || marker.startStyle || marker.endStyle || marker.css) {
        for (var i = from.line; i <= to.line; i++) {
          regLineChange(cm, i, "text");
        }
      }
      if (marker.atomic) {
        reCheckSelection(cm.doc);
      }
      signalLater(cm, "markerAdded", cm, marker);
    }
    return marker;
  }

  // SHARED TEXTMARKERS

  // A shared marker spans multiple linked documents. It is
  // implemented as a meta-marker-object controlling multiple normal
  // markers.
  var SharedTextMarker = function (markers, primary) {
    var this$1 = this;

    this.markers = markers;
    this.primary = primary;
    for (var i = 0; i < markers.length; ++i) {
      markers[i].parent = this$1;
    }
  };

  SharedTextMarker.prototype.clear = function () {
    var this$1 = this;

    if (this.explicitlyCleared) {
      return;
    }
    this.explicitlyCleared = true;
    for (var i = 0; i < this.markers.length; ++i) {
      this$1.markers[i].clear();
    }
    signalLater(this, "clear");
  };

  SharedTextMarker.prototype.find = function (side, lineObj) {
    return this.primary.find(side, lineObj);
  };
  eventMixin(SharedTextMarker);

  function markTextShared(doc, from, to, options, type) {
    options = copyObj(options);
    options.shared = false;
    var markers = [markText(doc, from, to, options, type)],
        primary = markers[0];
    var widget = options.widgetNode;
    linkedDocs(doc, function (doc) {
      if (widget) {
        options.widgetNode = widget.cloneNode(true);
      }
      markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
      for (var i = 0; i < doc.linked.length; ++i) {
        if (doc.linked[i].isParent) {
          return;
        }
      }
      primary = lst(markers);
    });
    return new SharedTextMarker(markers, primary);
  }

  function findSharedMarkers(doc) {
    return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function (m) {
      return m.parent;
    });
  }

  function copySharedMarkers(doc, markers) {
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i],
          pos = marker.find();
      var mFrom = doc.clipPos(pos.from),
          mTo = doc.clipPos(pos.to);
      if (cmp(mFrom, mTo)) {
        var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
        marker.markers.push(subMark);
        subMark.parent = marker;
      }
    }
  }

  function detachSharedMarkers(markers) {
    var loop = function (i) {
      var marker = markers[i],
          linked = [marker.primary.doc];
      linkedDocs(marker.primary.doc, function (d) {
        return linked.push(d);
      });
      for (var j = 0; j < marker.markers.length; j++) {
        var subMarker = marker.markers[j];
        if (indexOf(linked, subMarker.doc) == -1) {
          subMarker.parent = null;
          marker.markers.splice(j--, 1);
        }
      }
    };

    for (var i = 0; i < markers.length; i++) loop(i);
  }

  var nextDocId = 0;
  var Doc = function (text, mode, firstLine, lineSep, direction) {
    if (!(this instanceof Doc)) {
      return new Doc(text, mode, firstLine, lineSep, direction);
    }
    if (firstLine == null) {
      firstLine = 0;
    }

    BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
    this.first = firstLine;
    this.scrollTop = this.scrollLeft = 0;
    this.cantEdit = false;
    this.cleanGeneration = 1;
    this.modeFrontier = this.highlightFrontier = firstLine;
    var start = Pos(firstLine, 0);
    this.sel = simpleSelection(start);
    this.history = new History(null);
    this.id = ++nextDocId;
    this.modeOption = mode;
    this.lineSep = lineSep;
    this.direction = direction == "rtl" ? "rtl" : "ltr";
    this.extend = false;

    if (typeof text == "string") {
      text = this.splitLines(text);
    }
    updateDoc(this, { from: start, to: start, text: text });
    setSelection(this, simpleSelection(start), sel_dontScroll);
  };

  Doc.prototype = createObj(BranchChunk.prototype, {
    constructor: Doc,
    // Iterate over the document. Supports two forms -- with only one
    // argument, it calls that for each line in the document. With
    // three, it iterates over the range given by the first two (with
    // the second being non-inclusive).
    iter: function (from, to, op) {
      if (op) {
        this.iterN(from - this.first, to - from, op);
      } else {
        this.iterN(this.first, this.first + this.size, from);
      }
    },

    // Non-public interface for adding and removing lines.
    insert: function (at, lines) {
      var height = 0;
      for (var i = 0; i < lines.length; ++i) {
        height += lines[i].height;
      }
      this.insertInner(at - this.first, lines, height);
    },
    remove: function (at, n) {
      this.removeInner(at - this.first, n);
    },

    // From here, the methods are part of the public interface. Most
    // are also available from CodeMirror (editor) instances.

    getValue: function (lineSep) {
      var lines = getLines(this, this.first, this.first + this.size);
      if (lineSep === false) {
        return lines;
      }
      return lines.join(lineSep || this.lineSeparator());
    },
    setValue: docMethodOp(function (code) {
      var top = Pos(this.first, 0),
          last = this.first + this.size - 1;
      makeChange(this, { from: top, to: Pos(last, getLine(this, last).text.length),
        text: this.splitLines(code), origin: "setValue", full: true }, true);
      if (this.cm) {
        scrollToCoords(this.cm, 0, 0);
      }
      setSelection(this, simpleSelection(top), sel_dontScroll);
    }),
    replaceRange: function (code, from, to, origin) {
      from = clipPos(this, from);
      to = to ? clipPos(this, to) : from;
      replaceRange(this, code, from, to, origin);
    },
    getRange: function (from, to, lineSep) {
      var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
      if (lineSep === false) {
        return lines;
      }
      return lines.join(lineSep || this.lineSeparator());
    },

    getLine: function (line) {
      var l = this.getLineHandle(line);return l && l.text;
    },

    getLineHandle: function (line) {
      if (isLine(this, line)) {
        return getLine(this, line);
      }
    },
    getLineNumber: function (line) {
      return lineNo(line);
    },

    getLineHandleVisualStart: function (line) {
      if (typeof line == "number") {
        line = getLine(this, line);
      }
      return visualLine(line);
    },

    lineCount: function () {
      return this.size;
    },
    firstLine: function () {
      return this.first;
    },
    lastLine: function () {
      return this.first + this.size - 1;
    },

    clipPos: function (pos) {
      return clipPos(this, pos);
    },

    getCursor: function (start) {
      var range$$1 = this.sel.primary(),
          pos;
      if (start == null || start == "head") {
        pos = range$$1.head;
      } else if (start == "anchor") {
        pos = range$$1.anchor;
      } else if (start == "end" || start == "to" || start === false) {
        pos = range$$1.to();
      } else {
        pos = range$$1.from();
      }
      return pos;
    },
    listSelections: function () {
      return this.sel.ranges;
    },
    somethingSelected: function () {
      return this.sel.somethingSelected();
    },

    setCursor: docMethodOp(function (line, ch, options) {
      setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
    }),
    setSelection: docMethodOp(function (anchor, head, options) {
      setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
    }),
    extendSelection: docMethodOp(function (head, other, options) {
      extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
    }),
    extendSelections: docMethodOp(function (heads, options) {
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    extendSelectionsBy: docMethodOp(function (f, options) {
      var heads = map(this.sel.ranges, f);
      extendSelections(this, clipPosArray(this, heads), options);
    }),
    setSelections: docMethodOp(function (ranges, primary, options) {
      var this$1 = this;

      if (!ranges.length) {
        return;
      }
      var out = [];
      for (var i = 0; i < ranges.length; i++) {
        out[i] = new Range(clipPos(this$1, ranges[i].anchor), clipPos(this$1, ranges[i].head));
      }
      if (primary == null) {
        primary = Math.min(ranges.length - 1, this.sel.primIndex);
      }
      setSelection(this, normalizeSelection(out, primary), options);
    }),
    addSelection: docMethodOp(function (anchor, head, options) {
      var ranges = this.sel.ranges.slice(0);
      ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
      setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
    }),

    getSelection: function (lineSep) {
      var this$1 = this;

      var ranges = this.sel.ranges,
          lines;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        lines = lines ? lines.concat(sel) : sel;
      }
      if (lineSep === false) {
        return lines;
      } else {
        return lines.join(lineSep || this.lineSeparator());
      }
    },
    getSelections: function (lineSep) {
      var this$1 = this;

      var parts = [],
          ranges = this.sel.ranges;
      for (var i = 0; i < ranges.length; i++) {
        var sel = getBetween(this$1, ranges[i].from(), ranges[i].to());
        if (lineSep !== false) {
          sel = sel.join(lineSep || this$1.lineSeparator());
        }
        parts[i] = sel;
      }
      return parts;
    },
    replaceSelection: function (code, collapse, origin) {
      var dup = [];
      for (var i = 0; i < this.sel.ranges.length; i++) {
        dup[i] = code;
      }
      this.replaceSelections(dup, collapse, origin || "+input");
    },
    replaceSelections: docMethodOp(function (code, collapse, origin) {
      var this$1 = this;

      var changes = [],
          sel = this.sel;
      for (var i = 0; i < sel.ranges.length; i++) {
        var range$$1 = sel.ranges[i];
        changes[i] = { from: range$$1.from(), to: range$$1.to(), text: this$1.splitLines(code[i]), origin: origin };
      }
      var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
      for (var i$1 = changes.length - 1; i$1 >= 0; i$1--) {
        makeChange(this$1, changes[i$1]);
      }
      if (newSel) {
        setSelectionReplaceHistory(this, newSel);
      } else if (this.cm) {
        ensureCursorVisible(this.cm);
      }
    }),
    undo: docMethodOp(function () {
      makeChangeFromHistory(this, "undo");
    }),
    redo: docMethodOp(function () {
      makeChangeFromHistory(this, "redo");
    }),
    undoSelection: docMethodOp(function () {
      makeChangeFromHistory(this, "undo", true);
    }),
    redoSelection: docMethodOp(function () {
      makeChangeFromHistory(this, "redo", true);
    }),

    setExtending: function (val) {
      this.extend = val;
    },
    getExtending: function () {
      return this.extend;
    },

    historySize: function () {
      var hist = this.history,
          done = 0,
          undone = 0;
      for (var i = 0; i < hist.done.length; i++) {
        if (!hist.done[i].ranges) {
          ++done;
        }
      }
      for (var i$1 = 0; i$1 < hist.undone.length; i$1++) {
        if (!hist.undone[i$1].ranges) {
          ++undone;
        }
      }
      return { undo: done, redo: undone };
    },
    clearHistory: function () {
      this.history = new History(this.history.maxGeneration);
    },

    markClean: function () {
      this.cleanGeneration = this.changeGeneration(true);
    },
    changeGeneration: function (forceSplit) {
      if (forceSplit) {
        this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
      }
      return this.history.generation;
    },
    isClean: function (gen) {
      return this.history.generation == (gen || this.cleanGeneration);
    },

    getHistory: function () {
      return { done: copyHistoryArray(this.history.done),
        undone: copyHistoryArray(this.history.undone) };
    },
    setHistory: function (histData) {
      var hist = this.history = new History(this.history.maxGeneration);
      hist.done = copyHistoryArray(histData.done.slice(0), null, true);
      hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
    },

    setGutterMarker: docMethodOp(function (line, gutterID, value) {
      return changeLine(this, line, "gutter", function (line) {
        var markers = line.gutterMarkers || (line.gutterMarkers = {});
        markers[gutterID] = value;
        if (!value && isEmpty(markers)) {
          line.gutterMarkers = null;
        }
        return true;
      });
    }),

    clearGutter: docMethodOp(function (gutterID) {
      var this$1 = this;

      this.iter(function (line) {
        if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
          changeLine(this$1, line, "gutter", function () {
            line.gutterMarkers[gutterID] = null;
            if (isEmpty(line.gutterMarkers)) {
              line.gutterMarkers = null;
            }
            return true;
          });
        }
      });
    }),

    lineInfo: function (line) {
      var n;
      if (typeof line == "number") {
        if (!isLine(this, line)) {
          return null;
        }
        n = line;
        line = getLine(this, line);
        if (!line) {
          return null;
        }
      } else {
        n = lineNo(line);
        if (n == null) {
          return null;
        }
      }
      return { line: n, handle: line, text: line.text, gutterMarkers: line.gutterMarkers,
        textClass: line.textClass, bgClass: line.bgClass, wrapClass: line.wrapClass,
        widgets: line.widgets };
    },

    addLineClass: docMethodOp(function (handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        if (!line[prop]) {
          line[prop] = cls;
        } else if (classTest(cls).test(line[prop])) {
          return false;
        } else {
          line[prop] += " " + cls;
        }
        return true;
      });
    }),
    removeLineClass: docMethodOp(function (handle, where, cls) {
      return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function (line) {
        var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
        var cur = line[prop];
        if (!cur) {
          return false;
        } else if (cls == null) {
          line[prop] = null;
        } else {
          var found = cur.match(classTest(cls));
          if (!found) {
            return false;
          }
          var end = found.index + found[0].length;
          line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
        }
        return true;
      });
    }),

    addLineWidget: docMethodOp(function (handle, node, options) {
      return addLineWidget(this, handle, node, options);
    }),
    removeLineWidget: function (widget) {
      widget.clear();
    },

    markText: function (from, to, options) {
      return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
    },
    setBookmark: function (pos, options) {
      var realOpts = { replacedWith: options && (options.nodeType == null ? options.widget : options),
        insertLeft: options && options.insertLeft,
        clearWhenEmpty: false, shared: options && options.shared,
        handleMouseEvents: options && options.handleMouseEvents };
      pos = clipPos(this, pos);
      return markText(this, pos, pos, realOpts, "bookmark");
    },
    findMarksAt: function (pos) {
      pos = clipPos(this, pos);
      var markers = [],
          spans = getLine(this, pos.line).markedSpans;
      if (spans) {
        for (var i = 0; i < spans.length; ++i) {
          var span = spans[i];
          if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
            markers.push(span.marker.parent || span.marker);
          }
        }
      }
      return markers;
    },
    findMarks: function (from, to, filter) {
      from = clipPos(this, from);to = clipPos(this, to);
      var found = [],
          lineNo$$1 = from.line;
      this.iter(from.line, to.line + 1, function (line) {
        var spans = line.markedSpans;
        if (spans) {
          for (var i = 0; i < spans.length; i++) {
            var span = spans[i];
            if (!(span.to != null && lineNo$$1 == from.line && from.ch >= span.to || span.from == null && lineNo$$1 != from.line || span.from != null && lineNo$$1 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
              found.push(span.marker.parent || span.marker);
            }
          }
        }
        ++lineNo$$1;
      });
      return found;
    },
    getAllMarks: function () {
      var markers = [];
      this.iter(function (line) {
        var sps = line.markedSpans;
        if (sps) {
          for (var i = 0; i < sps.length; ++i) {
            if (sps[i].from != null) {
              markers.push(sps[i].marker);
            }
          }
        }
      });
      return markers;
    },

    posFromIndex: function (off) {
      var ch,
          lineNo$$1 = this.first,
          sepSize = this.lineSeparator().length;
      this.iter(function (line) {
        var sz = line.text.length + sepSize;
        if (sz > off) {
          ch = off;return true;
        }
        off -= sz;
        ++lineNo$$1;
      });
      return clipPos(this, Pos(lineNo$$1, ch));
    },
    indexFromPos: function (coords) {
      coords = clipPos(this, coords);
      var index = coords.ch;
      if (coords.line < this.first || coords.ch < 0) {
        return 0;
      }
      var sepSize = this.lineSeparator().length;
      this.iter(this.first, coords.line, function (line) {
        // iter aborts when callback returns a truthy value
        index += line.text.length + sepSize;
      });
      return index;
    },

    copy: function (copyHistory) {
      var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
      doc.scrollTop = this.scrollTop;doc.scrollLeft = this.scrollLeft;
      doc.sel = this.sel;
      doc.extend = false;
      if (copyHistory) {
        doc.history.undoDepth = this.history.undoDepth;
        doc.setHistory(this.getHistory());
      }
      return doc;
    },

    linkedDoc: function (options) {
      if (!options) {
        options = {};
      }
      var from = this.first,
          to = this.first + this.size;
      if (options.from != null && options.from > from) {
        from = options.from;
      }
      if (options.to != null && options.to < to) {
        to = options.to;
      }
      var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
      if (options.sharedHist) {
        copy.history = this.history;
      }(this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
      copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
      copySharedMarkers(copy, findSharedMarkers(this));
      return copy;
    },
    unlinkDoc: function (other) {
      var this$1 = this;

      if (other instanceof CodeMirror$1) {
        other = other.doc;
      }
      if (this.linked) {
        for (var i = 0; i < this.linked.length; ++i) {
          var link = this$1.linked[i];
          if (link.doc != other) {
            continue;
          }
          this$1.linked.splice(i, 1);
          other.unlinkDoc(this$1);
          detachSharedMarkers(findSharedMarkers(this$1));
          break;
        }
      }
      // If the histories were shared, split them again
      if (other.history == this.history) {
        var splitIds = [other.id];
        linkedDocs(other, function (doc) {
          return splitIds.push(doc.id);
        }, true);
        other.history = new History(null);
        other.history.done = copyHistoryArray(this.history.done, splitIds);
        other.history.undone = copyHistoryArray(this.history.undone, splitIds);
      }
    },
    iterLinkedDocs: function (f) {
      linkedDocs(this, f);
    },

    getMode: function () {
      return this.mode;
    },
    getEditor: function () {
      return this.cm;
    },

    splitLines: function (str) {
      if (this.lineSep) {
        return str.split(this.lineSep);
      }
      return splitLinesAuto(str);
    },
    lineSeparator: function () {
      return this.lineSep || "\n";
    },

    setDirection: docMethodOp(function (dir) {
      if (dir != "rtl") {
        dir = "ltr";
      }
      if (dir == this.direction) {
        return;
      }
      this.direction = dir;
      this.iter(function (line) {
        return line.order = null;
      });
      if (this.cm) {
        directionChanged(this.cm);
      }
    })
  });

  // Public alias.
  Doc.prototype.eachLine = Doc.prototype.iter;

  // Kludge to work around strange IE behavior where it'll sometimes
  // re-fire a series of drag-related events right after the drop (#1551)
  var lastDrop = 0;

  function onDrop(e) {
    var cm = this;
    clearDragCursor(cm);
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }
    e_preventDefault(e);
    if (ie) {
      lastDrop = +new Date();
    }
    var pos = posFromMouse(cm, e, true),
        files = e.dataTransfer.files;
    if (!pos || cm.isReadOnly()) {
      return;
    }
    // Might be a file drop, in which case we simply extract the text
    // and insert it.
    if (files && files.length && window.FileReader && window.File) {
      var n = files.length,
          text = Array(n),
          read = 0;
      var loadFile = function (file, i) {
        if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
          return;
        }

        var reader = new FileReader();
        reader.onload = operation(cm, function () {
          var content = reader.result;
          if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
            content = "";
          }
          text[i] = content;
          if (++read == n) {
            pos = clipPos(cm.doc, pos);
            var change = { from: pos, to: pos,
              text: cm.doc.splitLines(text.join(cm.doc.lineSeparator())),
              origin: "paste" };
            makeChange(cm.doc, change);
            setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
          }
        });
        reader.readAsText(file);
      };
      for (var i = 0; i < n; ++i) {
        loadFile(files[i], i);
      }
    } else {
      // Normal drop
      // Don't do a replace if the drop happened inside of the selected text.
      if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
        cm.state.draggingText(e);
        // Ensure the editor is re-focused
        setTimeout(function () {
          return cm.display.input.focus();
        }, 20);
        return;
      }
      try {
        var text$1 = e.dataTransfer.getData("Text");
        if (text$1) {
          var selected;
          if (cm.state.draggingText && !cm.state.draggingText.copy) {
            selected = cm.listSelections();
          }
          setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
          if (selected) {
            for (var i$1 = 0; i$1 < selected.length; ++i$1) {
              replaceRange(cm.doc, "", selected[i$1].anchor, selected[i$1].head, "drag");
            }
          }
          cm.replaceSelection(text$1, "around", "paste");
          cm.display.input.focus();
        }
      } catch (e) {}
    }
  }

  function onDragStart(cm, e) {
    if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
      e_stop(e);return;
    }
    if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
      return;
    }

    e.dataTransfer.setData("Text", cm.getSelection());
    e.dataTransfer.effectAllowed = "copyMove";

    // Use dummy image instead of default browsers image.
    // Recent Safari (~6.0.2) have a tendency to segfault when this happens, so we don't do it there.
    if (e.dataTransfer.setDragImage && !safari) {
      var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
      if (presto) {
        img.width = img.height = 1;
        cm.display.wrapper.appendChild(img);
        // Force a relayout, or Opera won't use our image for some obscure reason
        img._top = img.offsetTop;
      }
      e.dataTransfer.setDragImage(img, 0, 0);
      if (presto) {
        img.parentNode.removeChild(img);
      }
    }
  }

  function onDragOver(cm, e) {
    var pos = posFromMouse(cm, e);
    if (!pos) {
      return;
    }
    var frag = document.createDocumentFragment();
    drawSelectionCursor(cm, pos, frag);
    if (!cm.display.dragCursor) {
      cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
      cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
    }
    removeChildrenAndAdd(cm.display.dragCursor, frag);
  }

  function clearDragCursor(cm) {
    if (cm.display.dragCursor) {
      cm.display.lineSpace.removeChild(cm.display.dragCursor);
      cm.display.dragCursor = null;
    }
  }

  // These must be handled carefully, because naively registering a
  // handler for each editor will cause the editors to never be
  // garbage collected.

  function forEachCodeMirror(f) {
    if (!document.getElementsByClassName) {
      return;
    }
    var byClass = document.getElementsByClassName("CodeMirror");
    for (var i = 0; i < byClass.length; i++) {
      var cm = byClass[i].CodeMirror;
      if (cm) {
        f(cm);
      }
    }
  }

  var globalsRegistered = false;
  function ensureGlobalHandlers() {
    if (globalsRegistered) {
      return;
    }
    registerGlobalHandlers();
    globalsRegistered = true;
  }
  function registerGlobalHandlers() {
    // When the window resizes, we need to refresh active editors.
    var resizeTimer;
    on(window, "resize", function () {
      if (resizeTimer == null) {
        resizeTimer = setTimeout(function () {
          resizeTimer = null;
          forEachCodeMirror(onResize);
        }, 100);
      }
    });
    // When the window loses focus, we want to show the editor as blurred
    on(window, "blur", function () {
      return forEachCodeMirror(onBlur);
    });
  }
  // Called when the window resizes
  function onResize(cm) {
    var d = cm.display;
    if (d.lastWrapHeight == d.wrapper.clientHeight && d.lastWrapWidth == d.wrapper.clientWidth) {
      return;
    }
    // Might be a text scaling operation, clear size caches.
    d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
    d.scrollbarsClipped = false;
    cm.setSize();
  }

  var keyNames = {
    3: "Pause", 8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt",
    19: "Pause", 20: "CapsLock", 27: "Esc", 32: "Space", 33: "PageUp", 34: "PageDown", 35: "End",
    36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "PrintScrn", 45: "Insert",
    46: "Delete", 59: ";", 61: "=", 91: "Mod", 92: "Mod", 93: "Mod",
    106: "*", 107: "=", 109: "-", 110: ".", 111: "/", 127: "Delete", 145: "ScrollLock",
    173: "-", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\",
    221: "]", 222: "'", 63232: "Up", 63233: "Down", 63234: "Left", 63235: "Right", 63272: "Delete",
    63273: "Home", 63275: "End", 63276: "PageUp", 63277: "PageDown", 63302: "Insert"
  };

  // Number keys
  for (var i = 0; i < 10; i++) {
    keyNames[i + 48] = keyNames[i + 96] = String(i);
  }
  // Alphabetic keys
  for (var i$1 = 65; i$1 <= 90; i$1++) {
    keyNames[i$1] = String.fromCharCode(i$1);
  }
  // Function keys
  for (var i$2 = 1; i$2 <= 12; i$2++) {
    keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
  }

  var keyMap = {};

  keyMap.basic = {
    "Left": "goCharLeft", "Right": "goCharRight", "Up": "goLineUp", "Down": "goLineDown",
    "End": "goLineEnd", "Home": "goLineStartSmart", "PageUp": "goPageUp", "PageDown": "goPageDown",
    "Delete": "delCharAfter", "Backspace": "delCharBefore", "Shift-Backspace": "delCharBefore",
    "Tab": "defaultTab", "Shift-Tab": "indentAuto",
    "Enter": "newlineAndIndent", "Insert": "toggleOverwrite",
    "Esc": "singleSelection"
  };
  // Note that the save and find-related commands aren't defined by
  // default. User code or addons can define them. Unknown commands
  // are simply ignored.
  keyMap.pcDefault = {
    "Ctrl-A": "selectAll", "Ctrl-D": "deleteLine", "Ctrl-Z": "undo", "Shift-Ctrl-Z": "redo", "Ctrl-Y": "redo",
    "Ctrl-Home": "goDocStart", "Ctrl-End": "goDocEnd", "Ctrl-Up": "goLineUp", "Ctrl-Down": "goLineDown",
    "Ctrl-Left": "goGroupLeft", "Ctrl-Right": "goGroupRight", "Alt-Left": "goLineStart", "Alt-Right": "goLineEnd",
    "Ctrl-Backspace": "delGroupBefore", "Ctrl-Delete": "delGroupAfter", "Ctrl-S": "save", "Ctrl-F": "find",
    "Ctrl-G": "findNext", "Shift-Ctrl-G": "findPrev", "Shift-Ctrl-F": "replace", "Shift-Ctrl-R": "replaceAll",
    "Ctrl-[": "indentLess", "Ctrl-]": "indentMore",
    "Ctrl-U": "undoSelection", "Shift-Ctrl-U": "redoSelection", "Alt-U": "redoSelection",
    fallthrough: "basic"
  };
  // Very basic readline/emacs-style bindings, which are standard on Mac.
  keyMap.emacsy = {
    "Ctrl-F": "goCharRight", "Ctrl-B": "goCharLeft", "Ctrl-P": "goLineUp", "Ctrl-N": "goLineDown",
    "Alt-F": "goWordRight", "Alt-B": "goWordLeft", "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "Ctrl-V": "goPageDown", "Shift-Ctrl-V": "goPageUp", "Ctrl-D": "delCharAfter", "Ctrl-H": "delCharBefore",
    "Alt-D": "delWordAfter", "Alt-Backspace": "delWordBefore", "Ctrl-K": "killLine", "Ctrl-T": "transposeChars",
    "Ctrl-O": "openLine"
  };
  keyMap.macDefault = {
    "Cmd-A": "selectAll", "Cmd-D": "deleteLine", "Cmd-Z": "undo", "Shift-Cmd-Z": "redo", "Cmd-Y": "redo",
    "Cmd-Home": "goDocStart", "Cmd-Up": "goDocStart", "Cmd-End": "goDocEnd", "Cmd-Down": "goDocEnd", "Alt-Left": "goGroupLeft",
    "Alt-Right": "goGroupRight", "Cmd-Left": "goLineLeft", "Cmd-Right": "goLineRight", "Alt-Backspace": "delGroupBefore",
    "Ctrl-Alt-Backspace": "delGroupAfter", "Alt-Delete": "delGroupAfter", "Cmd-S": "save", "Cmd-F": "find",
    "Cmd-G": "findNext", "Shift-Cmd-G": "findPrev", "Cmd-Alt-F": "replace", "Shift-Cmd-Alt-F": "replaceAll",
    "Cmd-[": "indentLess", "Cmd-]": "indentMore", "Cmd-Backspace": "delWrappedLineLeft", "Cmd-Delete": "delWrappedLineRight",
    "Cmd-U": "undoSelection", "Shift-Cmd-U": "redoSelection", "Ctrl-Up": "goDocStart", "Ctrl-Down": "goDocEnd",
    fallthrough: ["basic", "emacsy"]
  };
  keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;

  // KEYMAP DISPATCH

  function normalizeKeyName(name) {
    var parts = name.split(/-(?!$)/);
    name = parts[parts.length - 1];
    var alt, ctrl, shift, cmd;
    for (var i = 0; i < parts.length - 1; i++) {
      var mod = parts[i];
      if (/^(cmd|meta|m)$/i.test(mod)) {
        cmd = true;
      } else if (/^a(lt)?$/i.test(mod)) {
        alt = true;
      } else if (/^(c|ctrl|control)$/i.test(mod)) {
        ctrl = true;
      } else if (/^s(hift)?$/i.test(mod)) {
        shift = true;
      } else {
        throw new Error("Unrecognized modifier name: " + mod);
      }
    }
    if (alt) {
      name = "Alt-" + name;
    }
    if (ctrl) {
      name = "Ctrl-" + name;
    }
    if (cmd) {
      name = "Cmd-" + name;
    }
    if (shift) {
      name = "Shift-" + name;
    }
    return name;
  }

  // This is a kludge to keep keymaps mostly working as raw objects
  // (backwards compatibility) while at the same time support features
  // like normalization and multi-stroke key bindings. It compiles a
  // new normalized keymap, and then updates the old object to reflect
  // this.
  function normalizeKeyMap(keymap) {
    var copy = {};
    for (var keyname in keymap) {
      if (keymap.hasOwnProperty(keyname)) {
        var value = keymap[keyname];
        if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
          continue;
        }
        if (value == "...") {
          delete keymap[keyname];continue;
        }

        var keys = map(keyname.split(" "), normalizeKeyName);
        for (var i = 0; i < keys.length; i++) {
          var val = void 0,
              name = void 0;
          if (i == keys.length - 1) {
            name = keys.join(" ");
            val = value;
          } else {
            name = keys.slice(0, i + 1).join(" ");
            val = "...";
          }
          var prev = copy[name];
          if (!prev) {
            copy[name] = val;
          } else if (prev != val) {
            throw new Error("Inconsistent bindings for " + name);
          }
        }
        delete keymap[keyname];
      }
    }
    for (var prop in copy) {
      keymap[prop] = copy[prop];
    }
    return keymap;
  }

  function lookupKey(key, map$$1, handle, context) {
    map$$1 = getKeyMap(map$$1);
    var found = map$$1.call ? map$$1.call(key, context) : map$$1[key];
    if (found === false) {
      return "nothing";
    }
    if (found === "...") {
      return "multi";
    }
    if (found != null && handle(found)) {
      return "handled";
    }

    if (map$$1.fallthrough) {
      if (Object.prototype.toString.call(map$$1.fallthrough) != "[object Array]") {
        return lookupKey(key, map$$1.fallthrough, handle, context);
      }
      for (var i = 0; i < map$$1.fallthrough.length; i++) {
        var result = lookupKey(key, map$$1.fallthrough[i], handle, context);
        if (result) {
          return result;
        }
      }
    }
  }

  // Modifier key presses don't count as 'real' key presses for the
  // purpose of keymap fallthrough.
  function isModifierKey(value) {
    var name = typeof value == "string" ? value : keyNames[value.keyCode];
    return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
  }

  function addModifierNames(name, event, noShift) {
    var base = name;
    if (event.altKey && base != "Alt") {
      name = "Alt-" + name;
    }
    if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
      name = "Ctrl-" + name;
    }
    if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Cmd") {
      name = "Cmd-" + name;
    }
    if (!noShift && event.shiftKey && base != "Shift") {
      name = "Shift-" + name;
    }
    return name;
  }

  // Look up the name of a key as indicated by an event object.
  function keyName(event, noShift) {
    if (presto && event.keyCode == 34 && event["char"]) {
      return false;
    }
    var name = keyNames[event.keyCode];
    if (name == null || event.altGraphKey) {
      return false;
    }
    // Ctrl-ScrollLock has keyCode 3, same as Ctrl-Pause,
    // so we'll use event.code when available (Chrome 48+, FF 38+, Safari 10.1+)
    if (event.keyCode == 3 && event.code) {
      name = event.code;
    }
    return addModifierNames(name, event, noShift);
  }

  function getKeyMap(val) {
    return typeof val == "string" ? keyMap[val] : val;
  }

  // Helper for deleting text near the selection(s), used to implement
  // backspace, delete, and similar functionality.
  function deleteNearSelection(cm, compute) {
    var ranges = cm.doc.sel.ranges,
        kill = [];
    // Build up a set of ranges to kill first, merging overlapping
    // ranges.
    for (var i = 0; i < ranges.length; i++) {
      var toKill = compute(ranges[i]);
      while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
        var replaced = kill.pop();
        if (cmp(replaced.from, toKill.from) < 0) {
          toKill.from = replaced.from;
          break;
        }
      }
      kill.push(toKill);
    }
    // Next, remove those actual ranges.
    runInOp(cm, function () {
      for (var i = kill.length - 1; i >= 0; i--) {
        replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
      }
      ensureCursorVisible(cm);
    });
  }

  function moveCharLogically(line, ch, dir) {
    var target = skipExtendingChars(line.text, ch + dir, dir);
    return target < 0 || target > line.text.length ? null : target;
  }

  function moveLogically(line, start, dir) {
    var ch = moveCharLogically(line, start.ch, dir);
    return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
  }

  function endOfLine(visually, cm, lineObj, lineNo, dir) {
    if (visually) {
      var order = getOrder(lineObj, cm.doc.direction);
      if (order) {
        var part = dir < 0 ? lst(order) : order[0];
        var moveInStorageOrder = dir < 0 == (part.level == 1);
        var sticky = moveInStorageOrder ? "after" : "before";
        var ch;
        // With a wrapped rtl chunk (possibly spanning multiple bidi parts),
        // it could be that the last bidi part is not on the last visual line,
        // since visual lines contain content order-consecutive chunks.
        // Thus, in rtl, we are looking for the first (content-order) character
        // in the rtl chunk that is on the last line (that is, the same line
        // as the last (content-order) character).
        if (part.level > 0 || cm.doc.direction == "rtl") {
          var prep = prepareMeasureForLine(cm, lineObj);
          ch = dir < 0 ? lineObj.text.length - 1 : 0;
          var targetTop = measureCharPrepared(cm, prep, ch).top;
          ch = findFirst(function (ch) {
            return measureCharPrepared(cm, prep, ch).top == targetTop;
          }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
          if (sticky == "before") {
            ch = moveCharLogically(lineObj, ch, 1);
          }
        } else {
          ch = dir < 0 ? part.to : part.from;
        }
        return new Pos(lineNo, ch, sticky);
      }
    }
    return new Pos(lineNo, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
  }

  function moveVisually(cm, line, start, dir) {
    var bidi = getOrder(line, cm.doc.direction);
    if (!bidi) {
      return moveLogically(line, start, dir);
    }
    if (start.ch >= line.text.length) {
      start.ch = line.text.length;
      start.sticky = "before";
    } else if (start.ch <= 0) {
      start.ch = 0;
      start.sticky = "after";
    }
    var partPos = getBidiPartAt(bidi, start.ch, start.sticky),
        part = bidi[partPos];
    if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
      // Case 1: We move within an ltr part in an ltr editor. Even with wrapped lines,
      // nothing interesting happens.
      return moveLogically(line, start, dir);
    }

    var mv = function (pos, dir) {
      return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir);
    };
    var prep;
    var getWrappedLineExtent = function (ch) {
      if (!cm.options.lineWrapping) {
        return { begin: 0, end: line.text.length };
      }
      prep = prep || prepareMeasureForLine(cm, line);
      return wrappedLineExtentChar(cm, line, prep, ch);
    };
    var wrappedLineExtent = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);

    if (cm.doc.direction == "rtl" || part.level == 1) {
      var moveInStorageOrder = part.level == 1 == dir < 0;
      var ch = mv(start, moveInStorageOrder ? 1 : -1);
      if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent.begin : ch <= part.to && ch <= wrappedLineExtent.end)) {
        // Case 2: We move within an rtl part or in an rtl editor on the same visual line
        var sticky = moveInStorageOrder ? "before" : "after";
        return new Pos(start.line, ch, sticky);
      }
    }

    // Case 3: Could not move within this bidi part in this visual line, so leave
    // the current bidi part

    var searchInVisualLine = function (partPos, dir, wrappedLineExtent) {
      var getRes = function (ch, moveInStorageOrder) {
        return moveInStorageOrder ? new Pos(start.line, mv(ch, 1), "before") : new Pos(start.line, ch, "after");
      };

      for (; partPos >= 0 && partPos < bidi.length; partPos += dir) {
        var part = bidi[partPos];
        var moveInStorageOrder = dir > 0 == (part.level != 1);
        var ch = moveInStorageOrder ? wrappedLineExtent.begin : mv(wrappedLineExtent.end, -1);
        if (part.from <= ch && ch < part.to) {
          return getRes(ch, moveInStorageOrder);
        }
        ch = moveInStorageOrder ? part.from : mv(part.to, -1);
        if (wrappedLineExtent.begin <= ch && ch < wrappedLineExtent.end) {
          return getRes(ch, moveInStorageOrder);
        }
      }
    };

    // Case 3a: Look for other bidi parts on the same visual line
    var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent);
    if (res) {
      return res;
    }

    // Case 3b: Look for other bidi parts on the next visual line
    var nextCh = dir > 0 ? wrappedLineExtent.end : mv(wrappedLineExtent.begin, -1);
    if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
      res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
      if (res) {
        return res;
      }
    }

    // Case 4: Nowhere to move
    return null;
  }

  // Commands are parameter-less actions that can be performed on an
  // editor, mostly used for keybindings.
  var commands = {
    selectAll: selectAll,
    singleSelection: function (cm) {
      return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
    },
    killLine: function (cm) {
      return deleteNearSelection(cm, function (range) {
        if (range.empty()) {
          var len = getLine(cm.doc, range.head.line).text.length;
          if (range.head.ch == len && range.head.line < cm.lastLine()) {
            return { from: range.head, to: Pos(range.head.line + 1, 0) };
          } else {
            return { from: range.head, to: Pos(range.head.line, len) };
          }
        } else {
          return { from: range.from(), to: range.to() };
        }
      });
    },
    deleteLine: function (cm) {
      return deleteNearSelection(cm, function (range) {
        return {
          from: Pos(range.from().line, 0),
          to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
        };
      });
    },
    delLineLeft: function (cm) {
      return deleteNearSelection(cm, function (range) {
        return {
          from: Pos(range.from().line, 0), to: range.from()
        };
      });
    },
    delWrappedLineLeft: function (cm) {
      return deleteNearSelection(cm, function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var leftPos = cm.coordsChar({ left: 0, top: top }, "div");
        return { from: leftPos, to: range.from() };
      });
    },
    delWrappedLineRight: function (cm) {
      return deleteNearSelection(cm, function (range) {
        var top = cm.charCoords(range.head, "div").top + 5;
        var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top: top }, "div");
        return { from: range.from(), to: rightPos };
      });
    },
    undo: function (cm) {
      return cm.undo();
    },
    redo: function (cm) {
      return cm.redo();
    },
    undoSelection: function (cm) {
      return cm.undoSelection();
    },
    redoSelection: function (cm) {
      return cm.redoSelection();
    },
    goDocStart: function (cm) {
      return cm.extendSelection(Pos(cm.firstLine(), 0));
    },
    goDocEnd: function (cm) {
      return cm.extendSelection(Pos(cm.lastLine()));
    },
    goLineStart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineStart(cm, range.head.line);
      }, { origin: "+move", bias: 1 });
    },
    goLineStartSmart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineStartSmart(cm, range.head);
      }, { origin: "+move", bias: 1 });
    },
    goLineEnd: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        return lineEnd(cm, range.head.line);
      }, { origin: "+move", bias: -1 });
    },
    goLineRight: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.cursorCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top: top }, "div");
      }, sel_move);
    },
    goLineLeft: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.cursorCoords(range.head, "div").top + 5;
        return cm.coordsChar({ left: 0, top: top }, "div");
      }, sel_move);
    },
    goLineLeftSmart: function (cm) {
      return cm.extendSelectionsBy(function (range) {
        var top = cm.cursorCoords(range.head, "div").top + 5;
        var pos = cm.coordsChar({ left: 0, top: top }, "div");
        if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
          return lineStartSmart(cm, range.head);
        }
        return pos;
      }, sel_move);
    },
    goLineUp: function (cm) {
      return cm.moveV(-1, "line");
    },
    goLineDown: function (cm) {
      return cm.moveV(1, "line");
    },
    goPageUp: function (cm) {
      return cm.moveV(-1, "page");
    },
    goPageDown: function (cm) {
      return cm.moveV(1, "page");
    },
    goCharLeft: function (cm) {
      return cm.moveH(-1, "char");
    },
    goCharRight: function (cm) {
      return cm.moveH(1, "char");
    },
    goColumnLeft: function (cm) {
      return cm.moveH(-1, "column");
    },
    goColumnRight: function (cm) {
      return cm.moveH(1, "column");
    },
    goWordLeft: function (cm) {
      return cm.moveH(-1, "word");
    },
    goGroupRight: function (cm) {
      return cm.moveH(1, "group");
    },
    goGroupLeft: function (cm) {
      return cm.moveH(-1, "group");
    },
    goWordRight: function (cm) {
      return cm.moveH(1, "word");
    },
    delCharBefore: function (cm) {
      return cm.deleteH(-1, "char");
    },
    delCharAfter: function (cm) {
      return cm.deleteH(1, "char");
    },
    delWordBefore: function (cm) {
      return cm.deleteH(-1, "word");
    },
    delWordAfter: function (cm) {
      return cm.deleteH(1, "word");
    },
    delGroupBefore: function (cm) {
      return cm.deleteH(-1, "group");
    },
    delGroupAfter: function (cm) {
      return cm.deleteH(1, "group");
    },
    indentAuto: function (cm) {
      return cm.indentSelection("smart");
    },
    indentMore: function (cm) {
      return cm.indentSelection("add");
    },
    indentLess: function (cm) {
      return cm.indentSelection("subtract");
    },
    insertTab: function (cm) {
      return cm.replaceSelection("\t");
    },
    insertSoftTab: function (cm) {
      var spaces = [],
          ranges = cm.listSelections(),
          tabSize = cm.options.tabSize;
      for (var i = 0; i < ranges.length; i++) {
        var pos = ranges[i].from();
        var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
        spaces.push(spaceStr(tabSize - col % tabSize));
      }
      cm.replaceSelections(spaces);
    },
    defaultTab: function (cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection("add");
      } else {
        cm.execCommand("insertTab");
      }
    },
    // Swap the two chars left and right of each selection's head.
    // Move cursor behind the two swapped characters afterwards.
    //
    // Doesn't consider line feeds a character.
    // Doesn't scan more than one line above to find a character.
    // Doesn't do anything on an empty line.
    // Doesn't do anything with non-empty selections.
    transposeChars: function (cm) {
      return runInOp(cm, function () {
        var ranges = cm.listSelections(),
            newSel = [];
        for (var i = 0; i < ranges.length; i++) {
          if (!ranges[i].empty()) {
            continue;
          }
          var cur = ranges[i].head,
              line = getLine(cm.doc, cur.line).text;
          if (line) {
            if (cur.ch == line.length) {
              cur = new Pos(cur.line, cur.ch - 1);
            }
            if (cur.ch > 0) {
              cur = new Pos(cur.line, cur.ch + 1);
              cm.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
            } else if (cur.line > cm.doc.first) {
              var prev = getLine(cm.doc, cur.line - 1).text;
              if (prev) {
                cur = new Pos(cur.line, 1);
                cm.replaceRange(line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
              }
            }
          }
          newSel.push(new Range(cur, cur));
        }
        cm.setSelections(newSel);
      });
    },
    newlineAndIndent: function (cm) {
      return runInOp(cm, function () {
        var sels = cm.listSelections();
        for (var i = sels.length - 1; i >= 0; i--) {
          cm.replaceRange(cm.doc.lineSeparator(), sels[i].anchor, sels[i].head, "+input");
        }
        sels = cm.listSelections();
        for (var i$1 = 0; i$1 < sels.length; i$1++) {
          cm.indentLine(sels[i$1].from().line, null, true);
        }
        ensureCursorVisible(cm);
      });
    },
    openLine: function (cm) {
      return cm.replaceSelection("\n", "start");
    },
    toggleOverwrite: function (cm) {
      return cm.toggleOverwrite();
    }
  };

  function lineStart(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLine(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, visual, lineN, 1);
  }
  function lineEnd(cm, lineN) {
    var line = getLine(cm.doc, lineN);
    var visual = visualLineEnd(line);
    if (visual != line) {
      lineN = lineNo(visual);
    }
    return endOfLine(true, cm, line, lineN, -1);
  }
  function lineStartSmart(cm, pos) {
    var start = lineStart(cm, pos.line);
    var line = getLine(cm.doc, start.line);
    var order = getOrder(line, cm.doc.direction);
    if (!order || order[0].level == 0) {
      var firstNonWS = Math.max(0, line.text.search(/\S/));
      var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
      return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
    }
    return start;
  }

  // Run a handler that was bound to a key.
  function doHandleBinding(cm, bound, dropShift) {
    if (typeof bound == "string") {
      bound = commands[bound];
      if (!bound) {
        return false;
      }
    }
    // Ensure previous input has been read, so that the handler sees a
    // consistent view of the document
    cm.display.input.ensurePolled();
    var prevShift = cm.display.shift,
        done = false;
    try {
      if (cm.isReadOnly()) {
        cm.state.suppressEdits = true;
      }
      if (dropShift) {
        cm.display.shift = false;
      }
      done = bound(cm) != Pass;
    } finally {
      cm.display.shift = prevShift;
      cm.state.suppressEdits = false;
    }
    return done;
  }

  function lookupKeyForEditor(cm, name, handle) {
    for (var i = 0; i < cm.state.keyMaps.length; i++) {
      var result = lookupKey(name, cm.state.keyMaps[i], handle, cm);
      if (result) {
        return result;
      }
    }
    return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
  }

  // Note that, despite the name, this function is also used to check
  // for bound mouse clicks.

  var stopSeq = new Delayed();

  function dispatchKey(cm, name, e, handle) {
    var seq = cm.state.keySeq;
    if (seq) {
      if (isModifierKey(name)) {
        return "handled";
      }
      if (/\'$/.test(name)) {
        cm.state.keySeq = null;
      } else {
        stopSeq.set(50, function () {
          if (cm.state.keySeq == seq) {
            cm.state.keySeq = null;
            cm.display.input.reset();
          }
        });
      }
      if (dispatchKeyInner(cm, seq + " " + name, e, handle)) {
        return true;
      }
    }
    return dispatchKeyInner(cm, name, e, handle);
  }

  function dispatchKeyInner(cm, name, e, handle) {
    var result = lookupKeyForEditor(cm, name, handle);

    if (result == "multi") {
      cm.state.keySeq = name;
    }
    if (result == "handled") {
      signalLater(cm, "keyHandled", cm, name, e);
    }

    if (result == "handled" || result == "multi") {
      e_preventDefault(e);
      restartBlink(cm);
    }

    return !!result;
  }

  // Handle a key from the keydown event.
  function handleKeyBinding(cm, e) {
    var name = keyName(e, true);
    if (!name) {
      return false;
    }

    if (e.shiftKey && !cm.state.keySeq) {
      // First try to resolve full name (including 'Shift-'). Failing
      // that, see if there is a cursor-motion command (starting with
      // 'go') bound to the keyname without 'Shift-'.
      return dispatchKey(cm, "Shift-" + name, e, function (b) {
        return doHandleBinding(cm, b, true);
      }) || dispatchKey(cm, name, e, function (b) {
        if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
          return doHandleBinding(cm, b);
        }
      });
    } else {
      return dispatchKey(cm, name, e, function (b) {
        return doHandleBinding(cm, b);
      });
    }
  }

  // Handle a key from the keypress event
  function handleCharBinding(cm, e, ch) {
    return dispatchKey(cm, "'" + ch + "'", e, function (b) {
      return doHandleBinding(cm, b, true);
    });
  }

  var lastStoppedKey = null;
  function onKeyDown(e) {
    var cm = this;
    cm.curOp.focus = activeElt();
    if (signalDOMEvent(cm, e)) {
      return;
    }
    // IE does strange things with escape.
    if (ie && ie_version < 11 && e.keyCode == 27) {
      e.returnValue = false;
    }
    var code = e.keyCode;
    cm.display.shift = code == 16 || e.shiftKey;
    var handled = handleKeyBinding(cm, e);
    if (presto) {
      lastStoppedKey = handled ? code : null;
      // Opera has no cut event... we try to at least catch the key combo
      if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
        cm.replaceSelection("", null, "cut");
      }
    }

    // Turn mouse into crosshair when Alt is held on Mac.
    if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
      showCrossHair(cm);
    }
  }

  function showCrossHair(cm) {
    var lineDiv = cm.display.lineDiv;
    addClass(lineDiv, "CodeMirror-crosshair");

    function up(e) {
      if (e.keyCode == 18 || !e.altKey) {
        rmClass(lineDiv, "CodeMirror-crosshair");
        off(document, "keyup", up);
        off(document, "mouseover", up);
      }
    }
    on(document, "keyup", up);
    on(document, "mouseover", up);
  }

  function onKeyUp(e) {
    if (e.keyCode == 16) {
      this.doc.sel.shift = false;
    }
    signalDOMEvent(this, e);
  }

  function onKeyPress(e) {
    var cm = this;
    if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
      return;
    }
    var keyCode = e.keyCode,
        charCode = e.charCode;
    if (presto && keyCode == lastStoppedKey) {
      lastStoppedKey = null;e_preventDefault(e);return;
    }
    if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
      return;
    }
    var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
    // Some browsers fire keypress events for backspace
    if (ch == "\x08") {
      return;
    }
    if (handleCharBinding(cm, e, ch)) {
      return;
    }
    cm.display.input.onKeyPress(e);
  }

  var DOUBLECLICK_DELAY = 400;

  var PastClick = function (time, pos, button) {
    this.time = time;
    this.pos = pos;
    this.button = button;
  };

  PastClick.prototype.compare = function (time, pos, button) {
    return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
  };

  var lastClick;
  var lastDoubleClick;
  function clickRepeat(pos, button) {
    var now = +new Date();
    if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
      lastClick = lastDoubleClick = null;
      return "triple";
    } else if (lastClick && lastClick.compare(now, pos, button)) {
      lastDoubleClick = new PastClick(now, pos, button);
      lastClick = null;
      return "double";
    } else {
      lastClick = new PastClick(now, pos, button);
      lastDoubleClick = null;
      return "single";
    }
  }

  // A mouse down can be a single click, double click, triple click,
  // start of selection drag, start of text drag, new cursor
  // (ctrl-click), rectangle drag (alt-drag), or xwin
  // middle-click-paste. Or it might be a click on something we should
  // not interfere with, such as a scrollbar or widget.
  function onMouseDown(e) {
    var cm = this,
        display = cm.display;
    if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
      return;
    }
    display.input.ensurePolled();
    display.shift = e.shiftKey;

    if (eventInWidget(display, e)) {
      if (!webkit) {
        // Briefly turn off draggability, to allow widgets to do
        // normal dragging things.
        display.scroller.draggable = false;
        setTimeout(function () {
          return display.scroller.draggable = true;
        }, 100);
      }
      return;
    }
    if (clickInGutter(cm, e)) {
      return;
    }
    var pos = posFromMouse(cm, e),
        button = e_button(e),
        repeat = pos ? clickRepeat(pos, button) : "single";
    window.focus();

    // #3261: make sure, that we're not starting a second selection
    if (button == 1 && cm.state.selectingText) {
      cm.state.selectingText(e);
    }

    if (pos && handleMappedButton(cm, button, pos, repeat, e)) {
      return;
    }

    if (button == 1) {
      if (pos) {
        leftButtonDown(cm, pos, repeat, e);
      } else if (e_target(e) == display.scroller) {
        e_preventDefault(e);
      }
    } else if (button == 2) {
      if (pos) {
        extendSelection(cm.doc, pos);
      }
      setTimeout(function () {
        return display.input.focus();
      }, 20);
    } else if (button == 3) {
      if (captureRightClick) {
        onContextMenu(cm, e);
      } else {
        delayBlurEvent(cm);
      }
    }
  }

  function handleMappedButton(cm, button, pos, repeat, event) {
    var name = "Click";
    if (repeat == "double") {
      name = "Double" + name;
    } else if (repeat == "triple") {
      name = "Triple" + name;
    }
    name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;

    return dispatchKey(cm, addModifierNames(name, event), event, function (bound) {
      if (typeof bound == "string") {
        bound = commands[bound];
      }
      if (!bound) {
        return false;
      }
      var done = false;
      try {
        if (cm.isReadOnly()) {
          cm.state.suppressEdits = true;
        }
        done = bound(cm, pos) != Pass;
      } finally {
        cm.state.suppressEdits = false;
      }
      return done;
    });
  }

  function configureMouse(cm, repeat, event) {
    var option = cm.getOption("configureMouse");
    var value = option ? option(cm, repeat, event) : {};
    if (value.unit == null) {
      var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
      value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
    }
    if (value.extend == null || cm.doc.extend) {
      value.extend = cm.doc.extend || event.shiftKey;
    }
    if (value.addNew == null) {
      value.addNew = mac ? event.metaKey : event.ctrlKey;
    }
    if (value.moveOnDrag == null) {
      value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
    }
    return value;
  }

  function leftButtonDown(cm, pos, repeat, event) {
    if (ie) {
      setTimeout(bind(ensureFocus, cm), 0);
    } else {
      cm.curOp.focus = activeElt();
    }

    var behavior = configureMouse(cm, repeat, event);

    var sel = cm.doc.sel,
        contained;
    if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
      leftButtonStartDrag(cm, event, pos, behavior);
    } else {
      leftButtonSelect(cm, event, pos, behavior);
    }
  }

  // Start a text drag. When it ends, see if any dragging actually
  // happen, and treat as a click if it didn't.
  function leftButtonStartDrag(cm, event, pos, behavior) {
    var display = cm.display,
        moved = false;
    var dragEnd = operation(cm, function (e) {
      if (webkit) {
        display.scroller.draggable = false;
      }
      cm.state.draggingText = false;
      off(document, "mouseup", dragEnd);
      off(document, "mousemove", mouseMove);
      off(display.scroller, "dragstart", dragStart);
      off(display.scroller, "drop", dragEnd);
      if (!moved) {
        e_preventDefault(e);
        if (!behavior.addNew) {
          extendSelection(cm.doc, pos, null, null, behavior.extend);
        }
        // Work around unexplainable focus problem in IE9 (#2127) and Chrome (#3081)
        if (webkit || ie && ie_version == 9) {
          setTimeout(function () {
            document.body.focus();display.input.focus();
          }, 20);
        } else {
          display.input.focus();
        }
      }
    });
    var mouseMove = function (e2) {
      moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
    };
    var dragStart = function () {
      return moved = true;
    };
    // Let the drag handler handle this.
    if (webkit) {
      display.scroller.draggable = true;
    }
    cm.state.draggingText = dragEnd;
    dragEnd.copy = !behavior.moveOnDrag;
    // IE's approach to draggable
    if (display.scroller.dragDrop) {
      display.scroller.dragDrop();
    }
    on(document, "mouseup", dragEnd);
    on(document, "mousemove", mouseMove);
    on(display.scroller, "dragstart", dragStart);
    on(display.scroller, "drop", dragEnd);

    delayBlurEvent(cm);
    setTimeout(function () {
      return display.input.focus();
    }, 20);
  }

  function rangeForUnit(cm, pos, unit) {
    if (unit == "char") {
      return new Range(pos, pos);
    }
    if (unit == "word") {
      return cm.findWordAt(pos);
    }
    if (unit == "line") {
      return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
    }
    var result = unit(cm, pos);
    return new Range(result.from, result.to);
  }

  // Normal selection, as opposed to text dragging.
  function leftButtonSelect(cm, event, start, behavior) {
    var display = cm.display,
        doc = cm.doc;
    e_preventDefault(event);

    var ourRange,
        ourIndex,
        startSel = doc.sel,
        ranges = startSel.ranges;
    if (behavior.addNew && !behavior.extend) {
      ourIndex = doc.sel.contains(start);
      if (ourIndex > -1) {
        ourRange = ranges[ourIndex];
      } else {
        ourRange = new Range(start, start);
      }
    } else {
      ourRange = doc.sel.primary();
      ourIndex = doc.sel.primIndex;
    }

    if (behavior.unit == "rectangle") {
      if (!behavior.addNew) {
        ourRange = new Range(start, start);
      }
      start = posFromMouse(cm, event, true, true);
      ourIndex = -1;
    } else {
      var range$$1 = rangeForUnit(cm, start, behavior.unit);
      if (behavior.extend) {
        ourRange = extendRange(ourRange, range$$1.anchor, range$$1.head, behavior.extend);
      } else {
        ourRange = range$$1;
      }
    }

    if (!behavior.addNew) {
      ourIndex = 0;
      setSelection(doc, new Selection([ourRange], 0), sel_mouse);
      startSel = doc.sel;
    } else if (ourIndex == -1) {
      ourIndex = ranges.length;
      setSelection(doc, normalizeSelection(ranges.concat([ourRange]), ourIndex), { scroll: false, origin: "*mouse" });
    } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
      setSelection(doc, normalizeSelection(ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), { scroll: false, origin: "*mouse" });
      startSel = doc.sel;
    } else {
      replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
    }

    var lastPos = start;
    function extendTo(pos) {
      if (cmp(lastPos, pos) == 0) {
        return;
      }
      lastPos = pos;

      if (behavior.unit == "rectangle") {
        var ranges = [],
            tabSize = cm.options.tabSize;
        var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
        var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
        var left = Math.min(startCol, posCol),
            right = Math.max(startCol, posCol);
        for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
          var text = getLine(doc, line).text,
              leftPos = findColumn(text, left, tabSize);
          if (left == right) {
            ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
          } else if (text.length > leftPos) {
            ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
          }
        }
        if (!ranges.length) {
          ranges.push(new Range(start, start));
        }
        setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), { origin: "*mouse", scroll: false });
        cm.scrollIntoView(pos);
      } else {
        var oldRange = ourRange;
        var range$$1 = rangeForUnit(cm, pos, behavior.unit);
        var anchor = oldRange.anchor,
            head;
        if (cmp(range$$1.anchor, anchor) > 0) {
          head = range$$1.head;
          anchor = minPos(oldRange.from(), range$$1.anchor);
        } else {
          head = range$$1.anchor;
          anchor = maxPos(oldRange.to(), range$$1.head);
        }
        var ranges$1 = startSel.ranges.slice(0);
        ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc, anchor), head));
        setSelection(doc, normalizeSelection(ranges$1, ourIndex), sel_mouse);
      }
    }

    var editorSize = display.wrapper.getBoundingClientRect();
    // Used to ensure timeout re-tries don't fire when another extend
    // happened in the meantime (clearTimeout isn't reliable -- at
    // least on Chrome, the timeouts still happen even when cleared,
    // if the clear happens after their scheduled firing time).
    var counter = 0;

    function extend(e) {
      var curCount = ++counter;
      var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
      if (!cur) {
        return;
      }
      if (cmp(cur, lastPos) != 0) {
        cm.curOp.focus = activeElt();
        extendTo(cur);
        var visible = visibleLines(display, doc);
        if (cur.line >= visible.to || cur.line < visible.from) {
          setTimeout(operation(cm, function () {
            if (counter == curCount) {
              extend(e);
            }
          }), 150);
        }
      } else {
        var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
        if (outside) {
          setTimeout(operation(cm, function () {
            if (counter != curCount) {
              return;
            }
            display.scroller.scrollTop += outside;
            extend(e);
          }), 50);
        }
      }
    }

    function done(e) {
      cm.state.selectingText = false;
      counter = Infinity;
      e_preventDefault(e);
      display.input.focus();
      off(document, "mousemove", move);
      off(document, "mouseup", up);
      doc.history.lastSelOrigin = null;
    }

    var move = operation(cm, function (e) {
      if (!e_button(e)) {
        done(e);
      } else {
        extend(e);
      }
    });
    var up = operation(cm, done);
    cm.state.selectingText = up;
    on(document, "mousemove", move);
    on(document, "mouseup", up);
  }

  // Used when mouse-selecting to adjust the anchor to the proper side
  // of a bidi jump depending on the visual position of the head.
  function bidiSimplify(cm, range$$1) {
    var anchor = range$$1.anchor;
    var head = range$$1.head;
    var anchorLine = getLine(cm.doc, anchor.line);
    if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
      return range$$1;
    }
    var order = getOrder(anchorLine);
    if (!order) {
      return range$$1;
    }
    var index = getBidiPartAt(order, anchor.ch, anchor.sticky),
        part = order[index];
    if (part.from != anchor.ch && part.to != anchor.ch) {
      return range$$1;
    }
    var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
    if (boundary == 0 || boundary == order.length) {
      return range$$1;
    }

    // Compute the relative visual position of the head compared to the
    // anchor (<0 is to the left, >0 to the right)
    var leftSide;
    if (head.line != anchor.line) {
      leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
    } else {
      var headIndex = getBidiPartAt(order, head.ch, head.sticky);
      var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
      if (headIndex == boundary - 1 || headIndex == boundary) {
        leftSide = dir < 0;
      } else {
        leftSide = dir > 0;
      }
    }

    var usePart = order[boundary + (leftSide ? -1 : 0)];
    var from = leftSide == (usePart.level == 1);
    var ch = from ? usePart.from : usePart.to,
        sticky = from ? "after" : "before";
    return anchor.ch == ch && anchor.sticky == sticky ? range$$1 : new Range(new Pos(anchor.line, ch, sticky), head);
  }

  // Determines whether an event happened in the gutter, and fires the
  // handlers for the corresponding event.
  function gutterEvent(cm, e, type, prevent) {
    var mX, mY;
    if (e.touches) {
      mX = e.touches[0].clientX;
      mY = e.touches[0].clientY;
    } else {
      try {
        mX = e.clientX;mY = e.clientY;
      } catch (e) {
        return false;
      }
    }
    if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
      return false;
    }
    if (prevent) {
      e_preventDefault(e);
    }

    var display = cm.display;
    var lineBox = display.lineDiv.getBoundingClientRect();

    if (mY > lineBox.bottom || !hasHandler(cm, type)) {
      return e_defaultPrevented(e);
    }
    mY -= lineBox.top - display.viewOffset;

    for (var i = 0; i < cm.options.gutters.length; ++i) {
      var g = display.gutters.childNodes[i];
      if (g && g.getBoundingClientRect().right >= mX) {
        var line = lineAtHeight(cm.doc, mY);
        var gutter = cm.options.gutters[i];
        signal(cm, type, cm, line, gutter, e);
        return e_defaultPrevented(e);
      }
    }
  }

  function clickInGutter(cm, e) {
    return gutterEvent(cm, e, "gutterClick", true);
  }

  // CONTEXT MENU HANDLING

  // To make the context menu work, we need to briefly unhide the
  // textarea (making it as unobtrusive as possible) to let the
  // right-click take effect on it.
  function onContextMenu(cm, e) {
    if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
      return;
    }
    if (signalDOMEvent(cm, e, "contextmenu")) {
      return;
    }
    cm.display.input.onContextMenu(e);
  }

  function contextMenuInGutter(cm, e) {
    if (!hasHandler(cm, "gutterContextMenu")) {
      return false;
    }
    return gutterEvent(cm, e, "gutterContextMenu", false);
  }

  function themeChanged(cm) {
    cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
    clearCaches(cm);
  }

  var Init = { toString: function () {
      return "CodeMirror.Init";
    } };

  var defaults = {};
  var optionHandlers = {};

  function defineOptions(CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    function option(name, deflt, handle, notOnInit) {
      CodeMirror.defaults[name] = deflt;
      if (handle) {
        optionHandlers[name] = notOnInit ? function (cm, val, old) {
          if (old != Init) {
            handle(cm, val, old);
          }
        } : handle;
      }
    }

    CodeMirror.defineOption = option;

    // Passed to option handlers when there is no old value.
    CodeMirror.Init = Init;

    // These two are, on init, called from the constructor because they
    // have to be initialized before the editor can start at all.
    option("value", "", function (cm, val) {
      return cm.setValue(val);
    }, true);
    option("mode", null, function (cm, val) {
      cm.doc.modeOption = val;
      loadMode(cm);
    }, true);

    option("indentUnit", 2, loadMode, true);
    option("indentWithTabs", false);
    option("smartIndent", true);
    option("tabSize", 4, function (cm) {
      resetModeState(cm);
      clearCaches(cm);
      regChange(cm);
    }, true);

    option("lineSeparator", null, function (cm, val) {
      cm.doc.lineSep = val;
      if (!val) {
        return;
      }
      var newBreaks = [],
          lineNo = cm.doc.first;
      cm.doc.iter(function (line) {
        for (var pos = 0;;) {
          var found = line.text.indexOf(val, pos);
          if (found == -1) {
            break;
          }
          pos = found + val.length;
          newBreaks.push(Pos(lineNo, found));
        }
        lineNo++;
      });
      for (var i = newBreaks.length - 1; i >= 0; i--) {
        replaceRange(cm.doc, val, newBreaks[i], Pos(newBreaks[i].line, newBreaks[i].ch + val.length));
      }
    });
    option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g, function (cm, val, old) {
      cm.state.specialChars = new RegExp(val.source + (val.test("\t") ? "" : "|\t"), "g");
      if (old != Init) {
        cm.refresh();
      }
    });
    option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function (cm) {
      return cm.refresh();
    }, true);
    option("electricChars", true);
    option("inputStyle", mobile ? "contenteditable" : "textarea", function () {
      throw new Error("inputStyle can not (yet) be changed in a running editor"); // FIXME
    }, true);
    option("spellcheck", false, function (cm, val) {
      return cm.getInputField().spellcheck = val;
    }, true);
    option("rtlMoveVisually", !windows);
    option("wholeLineUpdateBefore", true);

    option("theme", "default", function (cm) {
      themeChanged(cm);
      guttersChanged(cm);
    }, true);
    option("keyMap", "default", function (cm, val, old) {
      var next = getKeyMap(val);
      var prev = old != Init && getKeyMap(old);
      if (prev && prev.detach) {
        prev.detach(cm, next);
      }
      if (next.attach) {
        next.attach(cm, prev || null);
      }
    });
    option("extraKeys", null);
    option("configureMouse", null);

    option("lineWrapping", false, wrappingChanged, true);
    option("gutters", [], function (cm) {
      setGuttersForLineNumbers(cm.options);
      guttersChanged(cm);
    }, true);
    option("fixedGutter", true, function (cm, val) {
      cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
      cm.refresh();
    }, true);
    option("coverGutterNextToScrollbar", false, function (cm) {
      return updateScrollbars(cm);
    }, true);
    option("scrollbarStyle", "native", function (cm) {
      initScrollbars(cm);
      updateScrollbars(cm);
      cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
      cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
    }, true);
    option("lineNumbers", false, function (cm) {
      setGuttersForLineNumbers(cm.options);
      guttersChanged(cm);
    }, true);
    option("firstLineNumber", 1, guttersChanged, true);
    option("lineNumberFormatter", function (integer) {
      return integer;
    }, guttersChanged, true);
    option("showCursorWhenSelecting", false, updateSelection, true);

    option("resetSelectionOnContextMenu", true);
    option("lineWiseCopyCut", true);
    option("pasteLinesPerSelection", true);

    option("readOnly", false, function (cm, val) {
      if (val == "nocursor") {
        onBlur(cm);
        cm.display.input.blur();
      }
      cm.display.input.readOnlyChanged(val);
    });
    option("disableInput", false, function (cm, val) {
      if (!val) {
        cm.display.input.reset();
      }
    }, true);
    option("dragDrop", true, dragDropChanged);
    option("allowDropFileTypes", null);

    option("cursorBlinkRate", 530);
    option("cursorScrollMargin", 0);
    option("cursorHeight", 1, updateSelection, true);
    option("singleCursorHeightPerLine", true, updateSelection, true);
    option("workTime", 100);
    option("workDelay", 100);
    option("flattenSpans", true, resetModeState, true);
    option("addModeClass", false, resetModeState, true);
    option("pollInterval", 100);
    option("undoDepth", 200, function (cm, val) {
      return cm.doc.history.undoDepth = val;
    });
    option("historyEventDelay", 1250);
    option("viewportMargin", 10, function (cm) {
      return cm.refresh();
    }, true);
    option("maxHighlightLength", 10000, resetModeState, true);
    option("moveInputWithCursor", true, function (cm, val) {
      if (!val) {
        cm.display.input.resetPosition();
      }
    });

    option("tabindex", null, function (cm, val) {
      return cm.display.input.getField().tabIndex = val || "";
    });
    option("autofocus", null);
    option("direction", "ltr", function (cm, val) {
      return cm.doc.setDirection(val);
    }, true);
  }

  function guttersChanged(cm) {
    updateGutters(cm);
    regChange(cm);
    alignHorizontally(cm);
  }

  function dragDropChanged(cm, value, old) {
    var wasOn = old && old != Init;
    if (!value != !wasOn) {
      var funcs = cm.display.dragFunctions;
      var toggle = value ? on : off;
      toggle(cm.display.scroller, "dragstart", funcs.start);
      toggle(cm.display.scroller, "dragenter", funcs.enter);
      toggle(cm.display.scroller, "dragover", funcs.over);
      toggle(cm.display.scroller, "dragleave", funcs.leave);
      toggle(cm.display.scroller, "drop", funcs.drop);
    }
  }

  function wrappingChanged(cm) {
    if (cm.options.lineWrapping) {
      addClass(cm.display.wrapper, "CodeMirror-wrap");
      cm.display.sizer.style.minWidth = "";
      cm.display.sizerWidth = null;
    } else {
      rmClass(cm.display.wrapper, "CodeMirror-wrap");
      findMaxLine(cm);
    }
    estimateLineHeights(cm);
    regChange(cm);
    clearCaches(cm);
    setTimeout(function () {
      return updateScrollbars(cm);
    }, 100);
  }

  // A CodeMirror instance represents an editor. This is the object
  // that user code is usually dealing with.

  function CodeMirror$1(place, options) {
    var this$1 = this;

    if (!(this instanceof CodeMirror$1)) {
      return new CodeMirror$1(place, options);
    }

    this.options = options = options ? copyObj(options) : {};
    // Determine effective options based on given values and defaults.
    copyObj(defaults, options, false);
    setGuttersForLineNumbers(options);

    var doc = options.value;
    if (typeof doc == "string") {
      doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction);
    }
    this.doc = doc;

    var input = new CodeMirror$1.inputStyles[options.inputStyle](this);
    var display = this.display = new Display(place, doc, input);
    display.wrapper.CodeMirror = this;
    updateGutters(this);
    themeChanged(this);
    if (options.lineWrapping) {
      this.display.wrapper.className += " CodeMirror-wrap";
    }
    initScrollbars(this);

    this.state = {
      keyMaps: [], // stores maps added by addKeyMap
      overlays: [], // highlighting overlays, as added by addOverlay
      modeGen: 0, // bumped when mode/overlay changes, used to invalidate highlighting info
      overwrite: false,
      delayingBlurEvent: false,
      focused: false,
      suppressEdits: false, // used to disable editing during key handlers when in readOnly mode
      pasteIncoming: false, cutIncoming: false, // help recognize paste/cut edits in input.poll
      selectingText: false,
      draggingText: false,
      highlight: new Delayed(), // stores highlight worker timeout
      keySeq: null, // Unfinished key sequence
      specialChars: null
    };

    if (options.autofocus && !mobile) {
      display.input.focus();
    }

    // Override magic textarea content restore that IE sometimes does
    // on our hidden textarea on reload
    if (ie && ie_version < 11) {
      setTimeout(function () {
        return this$1.display.input.reset(true);
      }, 20);
    }

    registerEventHandlers(this);
    ensureGlobalHandlers();

    startOperation(this);
    this.curOp.forceUpdate = true;
    attachDoc(this, doc);

    if (options.autofocus && !mobile || this.hasFocus()) {
      setTimeout(bind(onFocus, this), 20);
    } else {
      onBlur(this);
    }

    for (var opt in optionHandlers) {
      if (optionHandlers.hasOwnProperty(opt)) {
        optionHandlers[opt](this$1, options[opt], Init);
      }
    }
    maybeUpdateLineNumberWidth(this);
    if (options.finishInit) {
      options.finishInit(this);
    }
    for (var i = 0; i < initHooks.length; ++i) {
      initHooks[i](this$1);
    }
    endOperation(this);
    // Suppress optimizelegibility in Webkit, since it breaks text
    // measuring on line wrapping boundaries.
    if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
      display.lineDiv.style.textRendering = "auto";
    }
  }

  // The default configuration options.
  CodeMirror$1.defaults = defaults;
  // Functions to run when options are changed.
  CodeMirror$1.optionHandlers = optionHandlers;

  // Attach the necessary event handlers when initializing the editor
  function registerEventHandlers(cm) {
    var d = cm.display;
    on(d.scroller, "mousedown", operation(cm, onMouseDown));
    // Older IE's will not fire a second mousedown for a double click
    if (ie && ie_version < 11) {
      on(d.scroller, "dblclick", operation(cm, function (e) {
        if (signalDOMEvent(cm, e)) {
          return;
        }
        var pos = posFromMouse(cm, e);
        if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e_preventDefault(e);
        var word = cm.findWordAt(pos);
        extendSelection(cm.doc, word.anchor, word.head);
      }));
    } else {
      on(d.scroller, "dblclick", function (e) {
        return signalDOMEvent(cm, e) || e_preventDefault(e);
      });
    }
    // Some browsers fire contextmenu *after* opening the menu, at
    // which point we can't mess with it anymore. Context menu is
    // handled in onMouseDown for these browsers.
    if (!captureRightClick) {
      on(d.scroller, "contextmenu", function (e) {
        return onContextMenu(cm, e);
      });
    }

    // Used to suppress mouse event handling when a touch happens
    var touchFinished,
        prevTouch = { end: 0 };
    function finishTouch() {
      if (d.activeTouch) {
        touchFinished = setTimeout(function () {
          return d.activeTouch = null;
        }, 1000);
        prevTouch = d.activeTouch;
        prevTouch.end = +new Date();
      }
    }
    function isMouseLikeTouchEvent(e) {
      if (e.touches.length != 1) {
        return false;
      }
      var touch = e.touches[0];
      return touch.radiusX <= 1 && touch.radiusY <= 1;
    }
    function farAway(touch, other) {
      if (other.left == null) {
        return true;
      }
      var dx = other.left - touch.left,
          dy = other.top - touch.top;
      return dx * dx + dy * dy > 20 * 20;
    }
    on(d.scroller, "touchstart", function (e) {
      if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
        d.input.ensurePolled();
        clearTimeout(touchFinished);
        var now = +new Date();
        d.activeTouch = { start: now, moved: false,
          prev: now - prevTouch.end <= 300 ? prevTouch : null };
        if (e.touches.length == 1) {
          d.activeTouch.left = e.touches[0].pageX;
          d.activeTouch.top = e.touches[0].pageY;
        }
      }
    });
    on(d.scroller, "touchmove", function () {
      if (d.activeTouch) {
        d.activeTouch.moved = true;
      }
    });
    on(d.scroller, "touchend", function (e) {
      var touch = d.activeTouch;
      if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
        var pos = cm.coordsChar(d.activeTouch, "page"),
            range;
        if (!touch.prev || farAway(touch, touch.prev)) // Single tap
          {
            range = new Range(pos, pos);
          } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) // Double tap
          {
            range = cm.findWordAt(pos);
          } else // Triple tap
          {
            range = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
          }
        cm.setSelection(range.anchor, range.head);
        cm.focus();
        e_preventDefault(e);
      }
      finishTouch();
    });
    on(d.scroller, "touchcancel", finishTouch);

    // Sync scrolling between fake scrollbars and real scrollable
    // area, ensure viewport is updated when scrolling.
    on(d.scroller, "scroll", function () {
      if (d.scroller.clientHeight) {
        updateScrollTop(cm, d.scroller.scrollTop);
        setScrollLeft(cm, d.scroller.scrollLeft, true);
        signal(cm, "scroll", cm);
      }
    });

    // Listen to wheel events in order to try and update the viewport on time.
    on(d.scroller, "mousewheel", function (e) {
      return onScrollWheel(cm, e);
    });
    on(d.scroller, "DOMMouseScroll", function (e) {
      return onScrollWheel(cm, e);
    });

    // Prevent wrapper from ever scrolling
    on(d.wrapper, "scroll", function () {
      return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
    });

    d.dragFunctions = {
      enter: function (e) {
        if (!signalDOMEvent(cm, e)) {
          e_stop(e);
        }
      },
      over: function (e) {
        if (!signalDOMEvent(cm, e)) {
          onDragOver(cm, e);e_stop(e);
        }
      },
      start: function (e) {
        return onDragStart(cm, e);
      },
      drop: operation(cm, onDrop),
      leave: function (e) {
        if (!signalDOMEvent(cm, e)) {
          clearDragCursor(cm);
        }
      }
    };

    var inp = d.input.getField();
    on(inp, "keyup", function (e) {
      return onKeyUp.call(cm, e);
    });
    on(inp, "keydown", operation(cm, onKeyDown));
    on(inp, "keypress", operation(cm, onKeyPress));
    on(inp, "focus", function (e) {
      return onFocus(cm, e);
    });
    on(inp, "blur", function (e) {
      return onBlur(cm, e);
    });
  }

  var initHooks = [];
  CodeMirror$1.defineInitHook = function (f) {
    return initHooks.push(f);
  };

  // Indent the given line. The how parameter can be "smart",
  // "add"/null, "subtract", or "prev". When aggressive is false
  // (typically set to true for forced single-line indents), empty
  // lines are not indented, and places where the mode returns Pass
  // are left alone.
  function indentLine(cm, n, how, aggressive) {
    var doc = cm.doc,
        state;
    if (how == null) {
      how = "add";
    }
    if (how == "smart") {
      // Fall back to "prev" when the mode doesn't have an indentation
      // method.
      if (!doc.mode.indent) {
        how = "prev";
      } else {
        state = getContextBefore(cm, n).state;
      }
    }

    var tabSize = cm.options.tabSize;
    var line = getLine(doc, n),
        curSpace = countColumn(line.text, null, tabSize);
    if (line.stateAfter) {
      line.stateAfter = null;
    }
    var curSpaceString = line.text.match(/^\s*/)[0],
        indentation;
    if (!aggressive && !/\S/.test(line.text)) {
      indentation = 0;
      how = "not";
    } else if (how == "smart") {
      indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
      if (indentation == Pass || indentation > 150) {
        if (!aggressive) {
          return;
        }
        how = "prev";
      }
    }
    if (how == "prev") {
      if (n > doc.first) {
        indentation = countColumn(getLine(doc, n - 1).text, null, tabSize);
      } else {
        indentation = 0;
      }
    } else if (how == "add") {
      indentation = curSpace + cm.options.indentUnit;
    } else if (how == "subtract") {
      indentation = curSpace - cm.options.indentUnit;
    } else if (typeof how == "number") {
      indentation = curSpace + how;
    }
    indentation = Math.max(0, indentation);

    var indentString = "",
        pos = 0;
    if (cm.options.indentWithTabs) {
      for (var i = Math.floor(indentation / tabSize); i; --i) {
        pos += tabSize;indentString += "\t";
      }
    }
    if (pos < indentation) {
      indentString += spaceStr(indentation - pos);
    }

    if (indentString != curSpaceString) {
      replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
      line.stateAfter = null;
      return true;
    } else {
      // Ensure that, if the cursor was in the whitespace at the start
      // of the line, it is moved to the end of that space.
      for (var i$1 = 0; i$1 < doc.sel.ranges.length; i$1++) {
        var range = doc.sel.ranges[i$1];
        if (range.head.line == n && range.head.ch < curSpaceString.length) {
          var pos$1 = Pos(n, curSpaceString.length);
          replaceOneSelection(doc, i$1, new Range(pos$1, pos$1));
          break;
        }
      }
    }
  }

  // This will be set to a {lineWise: bool, text: [string]} object, so
  // that, when pasting, we know what kind of selections the copied
  // text was made out of.
  var lastCopied = null;

  function setLastCopied(newLastCopied) {
    lastCopied = newLastCopied;
  }

  function applyTextInput(cm, inserted, deleted, sel, origin) {
    var doc = cm.doc;
    cm.display.shift = false;
    if (!sel) {
      sel = doc.sel;
    }

    var paste = cm.state.pasteIncoming || origin == "paste";
    var textLines = splitLinesAuto(inserted),
        multiPaste = null;
    // When pasting N lines into N selections, insert one line per selection
    if (paste && sel.ranges.length > 1) {
      if (lastCopied && lastCopied.text.join("\n") == inserted) {
        if (sel.ranges.length % lastCopied.text.length == 0) {
          multiPaste = [];
          for (var i = 0; i < lastCopied.text.length; i++) {
            multiPaste.push(doc.splitLines(lastCopied.text[i]));
          }
        }
      } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
        multiPaste = map(textLines, function (l) {
          return [l];
        });
      }
    }

    var updateInput;
    // Normal behavior is to insert the new text into every selection
    for (var i$1 = sel.ranges.length - 1; i$1 >= 0; i$1--) {
      var range$$1 = sel.ranges[i$1];
      var from = range$$1.from(),
          to = range$$1.to();
      if (range$$1.empty()) {
        if (deleted && deleted > 0) // Handle deletion
          {
            from = Pos(from.line, from.ch - deleted);
          } else if (cm.state.overwrite && !paste) // Handle overwrite
          {
            to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
          } else if (lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == inserted) {
          from = to = Pos(from.line, 0);
        }
      }
      updateInput = cm.curOp.updateInput;
      var changeEvent = { from: from, to: to, text: multiPaste ? multiPaste[i$1 % multiPaste.length] : textLines,
        origin: origin || (paste ? "paste" : cm.state.cutIncoming ? "cut" : "+input") };
      makeChange(cm.doc, changeEvent);
      signalLater(cm, "inputRead", cm, changeEvent);
    }
    if (inserted && !paste) {
      triggerElectric(cm, inserted);
    }

    ensureCursorVisible(cm);
    cm.curOp.updateInput = updateInput;
    cm.curOp.typing = true;
    cm.state.pasteIncoming = cm.state.cutIncoming = false;
  }

  function handlePaste(e, cm) {
    var pasted = e.clipboardData && e.clipboardData.getData("Text");
    if (pasted) {
      e.preventDefault();
      if (!cm.isReadOnly() && !cm.options.disableInput) {
        runInOp(cm, function () {
          return applyTextInput(cm, pasted, 0, null, "paste");
        });
      }
      return true;
    }
  }

  function triggerElectric(cm, inserted) {
    // When an 'electric' character is inserted, immediately trigger a reindent
    if (!cm.options.electricChars || !cm.options.smartIndent) {
      return;
    }
    var sel = cm.doc.sel;

    for (var i = sel.ranges.length - 1; i >= 0; i--) {
      var range$$1 = sel.ranges[i];
      if (range$$1.head.ch > 100 || i && sel.ranges[i - 1].head.line == range$$1.head.line) {
        continue;
      }
      var mode = cm.getModeAt(range$$1.head);
      var indented = false;
      if (mode.electricChars) {
        for (var j = 0; j < mode.electricChars.length; j++) {
          if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
            indented = indentLine(cm, range$$1.head.line, "smart");
            break;
          }
        }
      } else if (mode.electricInput) {
        if (mode.electricInput.test(getLine(cm.doc, range$$1.head.line).text.slice(0, range$$1.head.ch))) {
          indented = indentLine(cm, range$$1.head.line, "smart");
        }
      }
      if (indented) {
        signalLater(cm, "electricInput", cm, range$$1.head.line);
      }
    }
  }

  function copyableRanges(cm) {
    var text = [],
        ranges = [];
    for (var i = 0; i < cm.doc.sel.ranges.length; i++) {
      var line = cm.doc.sel.ranges[i].head.line;
      var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
      ranges.push(lineRange);
      text.push(cm.getRange(lineRange.anchor, lineRange.head));
    }
    return { text: text, ranges: ranges };
  }

  function disableBrowserMagic(field, spellcheck) {
    field.setAttribute("autocorrect", "off");
    field.setAttribute("autocapitalize", "off");
    field.setAttribute("spellcheck", !!spellcheck);
  }

  function hiddenTextarea() {
    var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none");
    var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
    // The textarea is kept positioned near the cursor to prevent the
    // fact that it'll be scrolled into view on input from scrolling
    // our fake cursor out of view. On webkit, when wrap=off, paste is
    // very slow. So make the area wide instead.
    if (webkit) {
      te.style.width = "1000px";
    } else {
      te.setAttribute("wrap", "off");
    }
    // If border: 0; -- iOS fails to open keyboard (issue #1287)
    if (ios) {
      te.style.border = "1px solid black";
    }
    disableBrowserMagic(te);
    return div;
  }

  // The publicly visible API. Note that methodOp(f) means
  // 'wrap f in an operation, performed on its `this` parameter'.

  // This is not the complete set of editor methods. Most of the
  // methods defined on the Doc type are also injected into
  // CodeMirror.prototype, for backwards compatibility and
  // convenience.

  var addEditorMethods = function (CodeMirror) {
    var optionHandlers = CodeMirror.optionHandlers;

    var helpers = CodeMirror.helpers = {};

    CodeMirror.prototype = {
      constructor: CodeMirror,
      focus: function () {
        window.focus();this.display.input.focus();
      },

      setOption: function (option, value) {
        var options = this.options,
            old = options[option];
        if (options[option] == value && option != "mode") {
          return;
        }
        options[option] = value;
        if (optionHandlers.hasOwnProperty(option)) {
          operation(this, optionHandlers[option])(this, value, old);
        }
        signal(this, "optionChange", this, option);
      },

      getOption: function (option) {
        return this.options[option];
      },
      getDoc: function () {
        return this.doc;
      },

      addKeyMap: function (map$$1, bottom) {
        this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map$$1));
      },
      removeKeyMap: function (map$$1) {
        var maps = this.state.keyMaps;
        for (var i = 0; i < maps.length; ++i) {
          if (maps[i] == map$$1 || maps[i].name == map$$1) {
            maps.splice(i, 1);
            return true;
          }
        }
      },

      addOverlay: methodOp(function (spec, options) {
        var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
        if (mode.startState) {
          throw new Error("Overlays may not be stateful.");
        }
        insertSorted(this.state.overlays, { mode: mode, modeSpec: spec, opaque: options && options.opaque,
          priority: options && options.priority || 0 }, function (overlay) {
          return overlay.priority;
        });
        this.state.modeGen++;
        regChange(this);
      }),
      removeOverlay: methodOp(function (spec) {
        var this$1 = this;

        var overlays = this.state.overlays;
        for (var i = 0; i < overlays.length; ++i) {
          var cur = overlays[i].modeSpec;
          if (cur == spec || typeof spec == "string" && cur.name == spec) {
            overlays.splice(i, 1);
            this$1.state.modeGen++;
            regChange(this$1);
            return;
          }
        }
      }),

      indentLine: methodOp(function (n, dir, aggressive) {
        if (typeof dir != "string" && typeof dir != "number") {
          if (dir == null) {
            dir = this.options.smartIndent ? "smart" : "prev";
          } else {
            dir = dir ? "add" : "subtract";
          }
        }
        if (isLine(this.doc, n)) {
          indentLine(this, n, dir, aggressive);
        }
      }),
      indentSelection: methodOp(function (how) {
        var this$1 = this;

        var ranges = this.doc.sel.ranges,
            end = -1;
        for (var i = 0; i < ranges.length; i++) {
          var range$$1 = ranges[i];
          if (!range$$1.empty()) {
            var from = range$$1.from(),
                to = range$$1.to();
            var start = Math.max(end, from.line);
            end = Math.min(this$1.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
            for (var j = start; j < end; ++j) {
              indentLine(this$1, j, how);
            }
            var newRanges = this$1.doc.sel.ranges;
            if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i].from().ch > 0) {
              replaceOneSelection(this$1.doc, i, new Range(from, newRanges[i].to()), sel_dontScroll);
            }
          } else if (range$$1.head.line > end) {
            indentLine(this$1, range$$1.head.line, how, true);
            end = range$$1.head.line;
            if (i == this$1.doc.sel.primIndex) {
              ensureCursorVisible(this$1);
            }
          }
        }
      }),

      // Fetch the parser token for a given character. Useful for hacks
      // that want to inspect the mode state (say, for completion).
      getTokenAt: function (pos, precise) {
        return takeToken(this, pos, precise);
      },

      getLineTokens: function (line, precise) {
        return takeToken(this, Pos(line), precise, true);
      },

      getTokenTypeAt: function (pos) {
        pos = clipPos(this.doc, pos);
        var styles = getLineStyles(this, getLine(this.doc, pos.line));
        var before = 0,
            after = (styles.length - 1) / 2,
            ch = pos.ch;
        var type;
        if (ch == 0) {
          type = styles[2];
        } else {
          for (;;) {
            var mid = before + after >> 1;
            if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
              after = mid;
            } else if (styles[mid * 2 + 1] < ch) {
              before = mid + 1;
            } else {
              type = styles[mid * 2 + 2];break;
            }
          }
        }
        var cut = type ? type.indexOf("overlay ") : -1;
        return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
      },

      getModeAt: function (pos) {
        var mode = this.doc.mode;
        if (!mode.innerMode) {
          return mode;
        }
        return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
      },

      getHelper: function (pos, type) {
        return this.getHelpers(pos, type)[0];
      },

      getHelpers: function (pos, type) {
        var this$1 = this;

        var found = [];
        if (!helpers.hasOwnProperty(type)) {
          return found;
        }
        var help = helpers[type],
            mode = this.getModeAt(pos);
        if (typeof mode[type] == "string") {
          if (help[mode[type]]) {
            found.push(help[mode[type]]);
          }
        } else if (mode[type]) {
          for (var i = 0; i < mode[type].length; i++) {
            var val = help[mode[type][i]];
            if (val) {
              found.push(val);
            }
          }
        } else if (mode.helperType && help[mode.helperType]) {
          found.push(help[mode.helperType]);
        } else if (help[mode.name]) {
          found.push(help[mode.name]);
        }
        for (var i$1 = 0; i$1 < help._global.length; i$1++) {
          var cur = help._global[i$1];
          if (cur.pred(mode, this$1) && indexOf(found, cur.val) == -1) {
            found.push(cur.val);
          }
        }
        return found;
      },

      getStateAfter: function (line, precise) {
        var doc = this.doc;
        line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
        return getContextBefore(this, line + 1, precise).state;
      },

      cursorCoords: function (start, mode) {
        var pos,
            range$$1 = this.doc.sel.primary();
        if (start == null) {
          pos = range$$1.head;
        } else if (typeof start == "object") {
          pos = clipPos(this.doc, start);
        } else {
          pos = start ? range$$1.from() : range$$1.to();
        }
        return cursorCoords(this, pos, mode || "page");
      },

      charCoords: function (pos, mode) {
        return charCoords(this, clipPos(this.doc, pos), mode || "page");
      },

      coordsChar: function (coords, mode) {
        coords = fromCoordSystem(this, coords, mode || "page");
        return coordsChar(this, coords.left, coords.top);
      },

      lineAtHeight: function (height, mode) {
        height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
        return lineAtHeight(this.doc, height + this.display.viewOffset);
      },
      heightAtLine: function (line, mode, includeWidgets) {
        var end = false,
            lineObj;
        if (typeof line == "number") {
          var last = this.doc.first + this.doc.size - 1;
          if (line < this.doc.first) {
            line = this.doc.first;
          } else if (line > last) {
            line = last;end = true;
          }
          lineObj = getLine(this.doc, line);
        } else {
          lineObj = line;
        }
        return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
      },

      defaultTextHeight: function () {
        return textHeight(this.display);
      },
      defaultCharWidth: function () {
        return charWidth(this.display);
      },

      getViewport: function () {
        return { from: this.display.viewFrom, to: this.display.viewTo };
      },

      addWidget: function (pos, node, scroll, vert, horiz) {
        var display = this.display;
        pos = cursorCoords(this, clipPos(this.doc, pos));
        var top = pos.bottom,
            left = pos.left;
        node.style.position = "absolute";
        node.setAttribute("cm-ignore-events", "true");
        this.display.input.setUneditable(node);
        display.sizer.appendChild(node);
        if (vert == "over") {
          top = pos.top;
        } else if (vert == "above" || vert == "near") {
          var vspace = Math.max(display.wrapper.clientHeight, this.doc.height),
              hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
          // Default to positioning above (if specified and possible); otherwise default to positioning below
          if ((vert == 'above' || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
            top = pos.top - node.offsetHeight;
          } else if (pos.bottom + node.offsetHeight <= vspace) {
            top = pos.bottom;
          }
          if (left + node.offsetWidth > hspace) {
            left = hspace - node.offsetWidth;
          }
        }
        node.style.top = top + "px";
        node.style.left = node.style.right = "";
        if (horiz == "right") {
          left = display.sizer.clientWidth - node.offsetWidth;
          node.style.right = "0px";
        } else {
          if (horiz == "left") {
            left = 0;
          } else if (horiz == "middle") {
            left = (display.sizer.clientWidth - node.offsetWidth) / 2;
          }
          node.style.left = left + "px";
        }
        if (scroll) {
          scrollIntoView(this, { left: left, top: top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
        }
      },

      triggerOnKeyDown: methodOp(onKeyDown),
      triggerOnKeyPress: methodOp(onKeyPress),
      triggerOnKeyUp: onKeyUp,
      triggerOnMouseDown: methodOp(onMouseDown),

      execCommand: function (cmd) {
        if (commands.hasOwnProperty(cmd)) {
          return commands[cmd].call(null, this);
        }
      },

      triggerElectric: methodOp(function (text) {
        triggerElectric(this, text);
      }),

      findPosH: function (from, amount, unit, visually) {
        var this$1 = this;

        var dir = 1;
        if (amount < 0) {
          dir = -1;amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          cur = findPosH(this$1.doc, cur, dir, unit, visually);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },

      moveH: methodOp(function (dir, unit) {
        var this$1 = this;

        this.extendSelectionsBy(function (range$$1) {
          if (this$1.display.shift || this$1.doc.extend || range$$1.empty()) {
            return findPosH(this$1.doc, range$$1.head, dir, unit, this$1.options.rtlMoveVisually);
          } else {
            return dir < 0 ? range$$1.from() : range$$1.to();
          }
        }, sel_move);
      }),

      deleteH: methodOp(function (dir, unit) {
        var sel = this.doc.sel,
            doc = this.doc;
        if (sel.somethingSelected()) {
          doc.replaceSelection("", null, "+delete");
        } else {
          deleteNearSelection(this, function (range$$1) {
            var other = findPosH(doc, range$$1.head, dir, unit, false);
            return dir < 0 ? { from: other, to: range$$1.head } : { from: range$$1.head, to: other };
          });
        }
      }),

      findPosV: function (from, amount, unit, goalColumn) {
        var this$1 = this;

        var dir = 1,
            x = goalColumn;
        if (amount < 0) {
          dir = -1;amount = -amount;
        }
        var cur = clipPos(this.doc, from);
        for (var i = 0; i < amount; ++i) {
          var coords = cursorCoords(this$1, cur, "div");
          if (x == null) {
            x = coords.left;
          } else {
            coords.left = x;
          }
          cur = findPosV(this$1, coords, dir, unit);
          if (cur.hitSide) {
            break;
          }
        }
        return cur;
      },

      moveV: methodOp(function (dir, unit) {
        var this$1 = this;

        var doc = this.doc,
            goals = [];
        var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
        doc.extendSelectionsBy(function (range$$1) {
          if (collapse) {
            return dir < 0 ? range$$1.from() : range$$1.to();
          }
          var headPos = cursorCoords(this$1, range$$1.head, "div");
          if (range$$1.goalColumn != null) {
            headPos.left = range$$1.goalColumn;
          }
          goals.push(headPos.left);
          var pos = findPosV(this$1, headPos, dir, unit);
          if (unit == "page" && range$$1 == doc.sel.primary()) {
            addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top);
          }
          return pos;
        }, sel_move);
        if (goals.length) {
          for (var i = 0; i < doc.sel.ranges.length; i++) {
            doc.sel.ranges[i].goalColumn = goals[i];
          }
        }
      }),

      // Find the word at the given position (as returned by coordsChar).
      findWordAt: function (pos) {
        var doc = this.doc,
            line = getLine(doc, pos.line).text;
        var start = pos.ch,
            end = pos.ch;
        if (line) {
          var helper = this.getHelper(pos, "wordChars");
          if ((pos.sticky == "before" || end == line.length) && start) {
            --start;
          } else {
            ++end;
          }
          var startChar = line.charAt(start);
          var check = isWordChar(startChar, helper) ? function (ch) {
            return isWordChar(ch, helper);
          } : /\s/.test(startChar) ? function (ch) {
            return (/\s/.test(ch)
            );
          } : function (ch) {
            return !/\s/.test(ch) && !isWordChar(ch);
          };
          while (start > 0 && check(line.charAt(start - 1))) {
            --start;
          }
          while (end < line.length && check(line.charAt(end))) {
            ++end;
          }
        }
        return new Range(Pos(pos.line, start), Pos(pos.line, end));
      },

      toggleOverwrite: function (value) {
        if (value != null && value == this.state.overwrite) {
          return;
        }
        if (this.state.overwrite = !this.state.overwrite) {
          addClass(this.display.cursorDiv, "CodeMirror-overwrite");
        } else {
          rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
        }

        signal(this, "overwriteToggle", this, this.state.overwrite);
      },
      hasFocus: function () {
        return this.display.input.getField() == activeElt();
      },
      isReadOnly: function () {
        return !!(this.options.readOnly || this.doc.cantEdit);
      },

      scrollTo: methodOp(function (x, y) {
        scrollToCoords(this, x, y);
      }),
      getScrollInfo: function () {
        var scroller = this.display.scroller;
        return { left: scroller.scrollLeft, top: scroller.scrollTop,
          height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
          width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
          clientHeight: displayHeight(this), clientWidth: displayWidth(this) };
      },

      scrollIntoView: methodOp(function (range$$1, margin) {
        if (range$$1 == null) {
          range$$1 = { from: this.doc.sel.primary().head, to: null };
          if (margin == null) {
            margin = this.options.cursorScrollMargin;
          }
        } else if (typeof range$$1 == "number") {
          range$$1 = { from: Pos(range$$1, 0), to: null };
        } else if (range$$1.from == null) {
          range$$1 = { from: range$$1, to: null };
        }
        if (!range$$1.to) {
          range$$1.to = range$$1.from;
        }
        range$$1.margin = margin || 0;

        if (range$$1.from.line != null) {
          scrollToRange(this, range$$1);
        } else {
          scrollToCoordsRange(this, range$$1.from, range$$1.to, range$$1.margin);
        }
      }),

      setSize: methodOp(function (width, height) {
        var this$1 = this;

        var interpret = function (val) {
          return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
        };
        if (width != null) {
          this.display.wrapper.style.width = interpret(width);
        }
        if (height != null) {
          this.display.wrapper.style.height = interpret(height);
        }
        if (this.options.lineWrapping) {
          clearLineMeasurementCache(this);
        }
        var lineNo$$1 = this.display.viewFrom;
        this.doc.iter(lineNo$$1, this.display.viewTo, function (line) {
          if (line.widgets) {
            for (var i = 0; i < line.widgets.length; i++) {
              if (line.widgets[i].noHScroll) {
                regLineChange(this$1, lineNo$$1, "widget");break;
              }
            }
          }
          ++lineNo$$1;
        });
        this.curOp.forceUpdate = true;
        signal(this, "refresh", this);
      }),

      operation: function (f) {
        return runInOp(this, f);
      },
      startOperation: function () {
        return startOperation(this);
      },
      endOperation: function () {
        return endOperation(this);
      },

      refresh: methodOp(function () {
        var oldHeight = this.display.cachedTextHeight;
        regChange(this);
        this.curOp.forceUpdate = true;
        clearCaches(this);
        scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
        updateGutterSpace(this);
        if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5) {
          estimateLineHeights(this);
        }
        signal(this, "refresh", this);
      }),

      swapDoc: methodOp(function (doc) {
        var old = this.doc;
        old.cm = null;
        attachDoc(this, doc);
        clearCaches(this);
        this.display.input.reset();
        scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
        this.curOp.forceScroll = true;
        signalLater(this, "swapDoc", this, old);
        return old;
      }),

      getInputField: function () {
        return this.display.input.getField();
      },
      getWrapperElement: function () {
        return this.display.wrapper;
      },
      getScrollerElement: function () {
        return this.display.scroller;
      },
      getGutterElement: function () {
        return this.display.gutters;
      }
    };
    eventMixin(CodeMirror);

    CodeMirror.registerHelper = function (type, name, value) {
      if (!helpers.hasOwnProperty(type)) {
        helpers[type] = CodeMirror[type] = { _global: [] };
      }
      helpers[type][name] = value;
    };
    CodeMirror.registerGlobalHelper = function (type, name, predicate, value) {
      CodeMirror.registerHelper(type, name, value);
      helpers[type]._global.push({ pred: predicate, val: value });
    };
  };

  // Used for horizontal relative motion. Dir is -1 or 1 (left or
  // right), unit can be "char", "column" (like char, but doesn't
  // cross line boundaries), "word" (across next word), or "group" (to
  // the start of next group of word or non-word-non-whitespace
  // chars). The visually param controls whether, in right-to-left
  // text, direction 1 means to move towards the next index in the
  // string, or towards the character to the right of the current
  // position. The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosH(doc, pos, dir, unit, visually) {
    var oldPos = pos;
    var origDir = dir;
    var lineObj = getLine(doc, pos.line);
    function findNextLine() {
      var l = pos.line + dir;
      if (l < doc.first || l >= doc.first + doc.size) {
        return false;
      }
      pos = new Pos(l, pos.ch, pos.sticky);
      return lineObj = getLine(doc, l);
    }
    function moveOnce(boundToLine) {
      var next;
      if (visually) {
        next = moveVisually(doc.cm, lineObj, pos, dir);
      } else {
        next = moveLogically(lineObj, pos, dir);
      }
      if (next == null) {
        if (!boundToLine && findNextLine()) {
          pos = endOfLine(visually, doc.cm, lineObj, pos.line, dir);
        } else {
          return false;
        }
      } else {
        pos = next;
      }
      return true;
    }

    if (unit == "char") {
      moveOnce();
    } else if (unit == "column") {
      moveOnce(true);
    } else if (unit == "word" || unit == "group") {
      var sawType = null,
          group = unit == "group";
      var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
      for (var first = true;; first = false) {
        if (dir < 0 && !moveOnce(!first)) {
          break;
        }
        var cur = lineObj.text.charAt(pos.ch) || "\n";
        var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
        if (group && !first && !type) {
          type = "s";
        }
        if (sawType && sawType != type) {
          if (dir < 0) {
            dir = 1;moveOnce();pos.sticky = "after";
          }
          break;
        }

        if (type) {
          sawType = type;
        }
        if (dir > 0 && !moveOnce(!first)) {
          break;
        }
      }
    }
    var result = skipAtomic(doc, pos, oldPos, origDir, true);
    if (equalCursorPos(oldPos, result)) {
      result.hitSide = true;
    }
    return result;
  }

  // For relative vertical movement. Dir may be -1 or 1. Unit can be
  // "page" or "line". The resulting position will have a hitSide=true
  // property if it reached the end of the document.
  function findPosV(cm, pos, dir, unit) {
    var doc = cm.doc,
        x = pos.left,
        y;
    if (unit == "page") {
      var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
      var moveAmount = Math.max(pageSize - .5 * textHeight(cm.display), 3);
      y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
    } else if (unit == "line") {
      y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
    }
    var target;
    for (;;) {
      target = coordsChar(cm, x, y);
      if (!target.outside) {
        break;
      }
      if (dir < 0 ? y <= 0 : y >= doc.height) {
        target.hitSide = true;break;
      }
      y += dir * 5;
    }
    return target;
  }

  // CONTENTEDITABLE INPUT STYLE

  var ContentEditableInput = function (cm) {
    this.cm = cm;
    this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
    this.polling = new Delayed();
    this.composing = null;
    this.gracePeriod = false;
    this.readDOMTimeout = null;
  };

  ContentEditableInput.prototype.init = function (display) {
    var this$1 = this;

    var input = this,
        cm = input.cm;
    var div = input.div = display.lineDiv;
    disableBrowserMagic(div, cm.options.spellcheck);

    on(div, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }
      // IE doesn't fire input events, so we schedule a read for the pasted content in this way
      if (ie_version <= 11) {
        setTimeout(operation(cm, function () {
          return this$1.updateFromDOM();
        }), 20);
      }
    });

    on(div, "compositionstart", function (e) {
      this$1.composing = { data: e.data, done: false };
    });
    on(div, "compositionupdate", function (e) {
      if (!this$1.composing) {
        this$1.composing = { data: e.data, done: false };
      }
    });
    on(div, "compositionend", function (e) {
      if (this$1.composing) {
        if (e.data != this$1.composing.data) {
          this$1.readFromDOMSoon();
        }
        this$1.composing.done = true;
      }
    });

    on(div, "touchstart", function () {
      return input.forceCompositionEnd();
    });

    on(div, "input", function () {
      if (!this$1.composing) {
        this$1.readFromDOMSoon();
      }
    });

    function onCopyCut(e) {
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
        if (e.type == "cut") {
          cm.replaceSelection("", null, "cut");
        }
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.operation(function () {
            cm.setSelections(ranges.ranges, 0, sel_dontScroll);
            cm.replaceSelection("", null, "cut");
          });
        }
      }
      if (e.clipboardData) {
        e.clipboardData.clearData();
        var content = lastCopied.text.join("\n");
        // iOS exposes the clipboard API, but seems to discard content inserted into it
        e.clipboardData.setData("Text", content);
        if (e.clipboardData.getData("Text") == content) {
          e.preventDefault();
          return;
        }
      }
      // Old-fashioned briefly-focus-a-textarea hack
      var kludge = hiddenTextarea(),
          te = kludge.firstChild;
      cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
      te.value = lastCopied.text.join("\n");
      var hadFocus = document.activeElement;
      selectInput(te);
      setTimeout(function () {
        cm.display.lineSpace.removeChild(kludge);
        hadFocus.focus();
        if (hadFocus == div) {
          input.showPrimarySelection();
        }
      }, 50);
    }
    on(div, "copy", onCopyCut);
    on(div, "cut", onCopyCut);
  };

  ContentEditableInput.prototype.prepareSelection = function () {
    var result = prepareSelection(this.cm, false);
    result.focus = this.cm.state.focused;
    return result;
  };

  ContentEditableInput.prototype.showSelection = function (info, takeFocus) {
    if (!info || !this.cm.display.view.length) {
      return;
    }
    if (info.focus || takeFocus) {
      this.showPrimarySelection();
    }
    this.showMultipleSelections(info);
  };

  ContentEditableInput.prototype.showPrimarySelection = function () {
    var sel = window.getSelection(),
        cm = this.cm,
        prim = cm.doc.sel.primary();
    var from = prim.from(),
        to = prim.to();

    if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
      sel.removeAllRanges();
      return;
    }

    var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
      return;
    }

    var view = cm.display.view;
    var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
    var end = to.line < cm.display.viewTo && posToDOM(cm, to);
    if (!end) {
      var measure = view[view.length - 1].measure;
      var map$$1 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
      end = { node: map$$1[map$$1.length - 1], offset: map$$1[map$$1.length - 2] - map$$1[map$$1.length - 3] };
    }

    if (!start || !end) {
      sel.removeAllRanges();
      return;
    }

    var old = sel.rangeCount && sel.getRangeAt(0),
        rng;
    try {
      rng = range(start.node, start.offset, end.offset, end.node);
    } catch (e) {} // Our model of the DOM might be outdated, in which case the range we try to set can be impossible
    if (rng) {
      if (!gecko && cm.state.focused) {
        sel.collapse(start.node, start.offset);
        if (!rng.collapsed) {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
      } else {
        sel.removeAllRanges();
        sel.addRange(rng);
      }
      if (old && sel.anchorNode == null) {
        sel.addRange(old);
      } else if (gecko) {
        this.startGracePeriod();
      }
    }
    this.rememberSelection();
  };

  ContentEditableInput.prototype.startGracePeriod = function () {
    var this$1 = this;

    clearTimeout(this.gracePeriod);
    this.gracePeriod = setTimeout(function () {
      this$1.gracePeriod = false;
      if (this$1.selectionChanged()) {
        this$1.cm.operation(function () {
          return this$1.cm.curOp.selectionChanged = true;
        });
      }
    }, 20);
  };

  ContentEditableInput.prototype.showMultipleSelections = function (info) {
    removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
    removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
  };

  ContentEditableInput.prototype.rememberSelection = function () {
    var sel = window.getSelection();
    this.lastAnchorNode = sel.anchorNode;this.lastAnchorOffset = sel.anchorOffset;
    this.lastFocusNode = sel.focusNode;this.lastFocusOffset = sel.focusOffset;
  };

  ContentEditableInput.prototype.selectionInEditor = function () {
    var sel = window.getSelection();
    if (!sel.rangeCount) {
      return false;
    }
    var node = sel.getRangeAt(0).commonAncestorContainer;
    return contains(this.div, node);
  };

  ContentEditableInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor") {
      if (!this.selectionInEditor()) {
        this.showSelection(this.prepareSelection(), true);
      }
      this.div.focus();
    }
  };
  ContentEditableInput.prototype.blur = function () {
    this.div.blur();
  };
  ContentEditableInput.prototype.getField = function () {
    return this.div;
  };

  ContentEditableInput.prototype.supportsTouch = function () {
    return true;
  };

  ContentEditableInput.prototype.receivedFocus = function () {
    var input = this;
    if (this.selectionInEditor()) {
      this.pollSelection();
    } else {
      runInOp(this.cm, function () {
        return input.cm.curOp.selectionChanged = true;
      });
    }

    function poll() {
      if (input.cm.state.focused) {
        input.pollSelection();
        input.polling.set(input.cm.options.pollInterval, poll);
      }
    }
    this.polling.set(this.cm.options.pollInterval, poll);
  };

  ContentEditableInput.prototype.selectionChanged = function () {
    var sel = window.getSelection();
    return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
  };

  ContentEditableInput.prototype.pollSelection = function () {
    if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
      return;
    }
    var sel = window.getSelection(),
        cm = this.cm;
    // On Android Chrome (version 56, at least), backspacing into an
    // uneditable block element will put the cursor in that element,
    // and then, because it's not editable, hide the virtual keyboard.
    // Because Android doesn't allow us to actually detect backspace
    // presses in a sane way, this code checks for when that happens
    // and simulates a backspace press in this case.
    if (android && chrome && this.cm.options.gutters.length && isInGutter(sel.anchorNode)) {
      this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
      this.blur();
      this.focus();
      return;
    }
    if (this.composing) {
      return;
    }
    this.rememberSelection();
    var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
    var head = domToPos(cm, sel.focusNode, sel.focusOffset);
    if (anchor && head) {
      runInOp(cm, function () {
        setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
        if (anchor.bad || head.bad) {
          cm.curOp.selectionChanged = true;
        }
      });
    }
  };

  ContentEditableInput.prototype.pollContent = function () {
    if (this.readDOMTimeout != null) {
      clearTimeout(this.readDOMTimeout);
      this.readDOMTimeout = null;
    }

    var cm = this.cm,
        display = cm.display,
        sel = cm.doc.sel.primary();
    var from = sel.from(),
        to = sel.to();
    if (from.ch == 0 && from.line > cm.firstLine()) {
      from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
    }
    if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
      to = Pos(to.line + 1, 0);
    }
    if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
      return false;
    }

    var fromIndex, fromLine, fromNode;
    if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
      fromLine = lineNo(display.view[0].line);
      fromNode = display.view[0].node;
    } else {
      fromLine = lineNo(display.view[fromIndex].line);
      fromNode = display.view[fromIndex - 1].node.nextSibling;
    }
    var toIndex = findViewIndex(cm, to.line);
    var toLine, toNode;
    if (toIndex == display.view.length - 1) {
      toLine = display.viewTo - 1;
      toNode = display.lineDiv.lastChild;
    } else {
      toLine = lineNo(display.view[toIndex + 1].line) - 1;
      toNode = display.view[toIndex + 1].node.previousSibling;
    }

    if (!fromNode) {
      return false;
    }
    var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
    var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
    while (newText.length > 1 && oldText.length > 1) {
      if (lst(newText) == lst(oldText)) {
        newText.pop();oldText.pop();toLine--;
      } else if (newText[0] == oldText[0]) {
        newText.shift();oldText.shift();fromLine++;
      } else {
        break;
      }
    }

    var cutFront = 0,
        cutEnd = 0;
    var newTop = newText[0],
        oldTop = oldText[0],
        maxCutFront = Math.min(newTop.length, oldTop.length);
    while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
      ++cutFront;
    }
    var newBot = lst(newText),
        oldBot = lst(oldText);
    var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
    while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
      ++cutEnd;
    }
    // Try to move start of change to start of selection if ambiguous
    if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
      while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        cutFront--;
        cutEnd++;
      }
    }

    newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
    newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");

    var chFrom = Pos(fromLine, cutFront);
    var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
    if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
      replaceRange(cm.doc, newText, chFrom, chTo, "+input");
      return true;
    }
  };

  ContentEditableInput.prototype.ensurePolled = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.reset = function () {
    this.forceCompositionEnd();
  };
  ContentEditableInput.prototype.forceCompositionEnd = function () {
    if (!this.composing) {
      return;
    }
    clearTimeout(this.readDOMTimeout);
    this.composing = null;
    this.updateFromDOM();
    this.div.blur();
    this.div.focus();
  };
  ContentEditableInput.prototype.readFromDOMSoon = function () {
    var this$1 = this;

    if (this.readDOMTimeout != null) {
      return;
    }
    this.readDOMTimeout = setTimeout(function () {
      this$1.readDOMTimeout = null;
      if (this$1.composing) {
        if (this$1.composing.done) {
          this$1.composing = null;
        } else {
          return;
        }
      }
      this$1.updateFromDOM();
    }, 80);
  };

  ContentEditableInput.prototype.updateFromDOM = function () {
    var this$1 = this;

    if (this.cm.isReadOnly() || !this.pollContent()) {
      runInOp(this.cm, function () {
        return regChange(this$1.cm);
      });
    }
  };

  ContentEditableInput.prototype.setUneditable = function (node) {
    node.contentEditable = "false";
  };

  ContentEditableInput.prototype.onKeyPress = function (e) {
    if (e.charCode == 0) {
      return;
    }
    e.preventDefault();
    if (!this.cm.isReadOnly()) {
      operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
    }
  };

  ContentEditableInput.prototype.readOnlyChanged = function (val) {
    this.div.contentEditable = String(val != "nocursor");
  };

  ContentEditableInput.prototype.onContextMenu = function () {};
  ContentEditableInput.prototype.resetPosition = function () {};

  ContentEditableInput.prototype.needsContentAttribute = true;

  function posToDOM(cm, pos) {
    var view = findViewForLine(cm, pos.line);
    if (!view || view.hidden) {
      return null;
    }
    var line = getLine(cm.doc, pos.line);
    var info = mapFromLineView(view, line, pos.line);

    var order = getOrder(line, cm.doc.direction),
        side = "left";
    if (order) {
      var partPos = getBidiPartAt(order, pos.ch);
      side = partPos % 2 ? "right" : "left";
    }
    var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
    result.offset = result.collapse == "right" ? result.end : result.start;
    return result;
  }

  function isInGutter(node) {
    for (var scan = node; scan; scan = scan.parentNode) {
      if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
        return true;
      }
    }
    return false;
  }

  function badPos(pos, bad) {
    if (bad) {
      pos.bad = true;
    }return pos;
  }

  function domTextBetween(cm, from, to, fromLine, toLine) {
    var text = "",
        closing = false,
        lineSep = cm.doc.lineSeparator();
    function recognizeMarker(id) {
      return function (marker) {
        return marker.id == id;
      };
    }
    function close() {
      if (closing) {
        text += lineSep;
        closing = false;
      }
    }
    function addText(str) {
      if (str) {
        close();
        text += str;
      }
    }
    function walk(node) {
      if (node.nodeType == 1) {
        var cmText = node.getAttribute("cm-text");
        if (cmText != null) {
          addText(cmText || node.textContent.replace(/\u200b/g, ""));
          return;
        }
        var markerID = node.getAttribute("cm-marker"),
            range$$1;
        if (markerID) {
          var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
          if (found.length && (range$$1 = found[0].find(0))) {
            addText(getBetween(cm.doc, range$$1.from, range$$1.to).join(lineSep));
          }
          return;
        }
        if (node.getAttribute("contenteditable") == "false") {
          return;
        }
        var isBlock = /^(pre|div|p)$/i.test(node.nodeName);
        if (isBlock) {
          close();
        }
        for (var i = 0; i < node.childNodes.length; i++) {
          walk(node.childNodes[i]);
        }
        if (isBlock) {
          closing = true;
        }
      } else if (node.nodeType == 3) {
        addText(node.nodeValue);
      }
    }
    for (;;) {
      walk(from);
      if (from == to) {
        break;
      }
      from = from.nextSibling;
    }
    return text;
  }

  function domToPos(cm, node, offset) {
    var lineNode;
    if (node == cm.display.lineDiv) {
      lineNode = cm.display.lineDiv.childNodes[offset];
      if (!lineNode) {
        return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
      }
      node = null;offset = 0;
    } else {
      for (lineNode = node;; lineNode = lineNode.parentNode) {
        if (!lineNode || lineNode == cm.display.lineDiv) {
          return null;
        }
        if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
          break;
        }
      }
    }
    for (var i = 0; i < cm.display.view.length; i++) {
      var lineView = cm.display.view[i];
      if (lineView.node == lineNode) {
        return locateNodeInLineView(lineView, node, offset);
      }
    }
  }

  function locateNodeInLineView(lineView, node, offset) {
    var wrapper = lineView.text.firstChild,
        bad = false;
    if (!node || !contains(wrapper, node)) {
      return badPos(Pos(lineNo(lineView.line), 0), true);
    }
    if (node == wrapper) {
      bad = true;
      node = wrapper.childNodes[offset];
      offset = 0;
      if (!node) {
        var line = lineView.rest ? lst(lineView.rest) : lineView.line;
        return badPos(Pos(lineNo(line), line.text.length), bad);
      }
    }

    var textNode = node.nodeType == 3 ? node : null,
        topNode = node;
    if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
      textNode = node.firstChild;
      if (offset) {
        offset = textNode.nodeValue.length;
      }
    }
    while (topNode.parentNode != wrapper) {
      topNode = topNode.parentNode;
    }
    var measure = lineView.measure,
        maps = measure.maps;

    function find(textNode, topNode, offset) {
      for (var i = -1; i < (maps ? maps.length : 0); i++) {
        var map$$1 = i < 0 ? measure.map : maps[i];
        for (var j = 0; j < map$$1.length; j += 3) {
          var curNode = map$$1[j + 2];
          if (curNode == textNode || curNode == topNode) {
            var line = lineNo(i < 0 ? lineView.line : lineView.rest[i]);
            var ch = map$$1[j] + offset;
            if (offset < 0 || curNode != textNode) {
              ch = map$$1[j + (offset ? 1 : 0)];
            }
            return Pos(line, ch);
          }
        }
      }
    }
    var found = find(textNode, topNode, offset);
    if (found) {
      return badPos(found, bad);
    }

    // FIXME this is all really shaky. might handle the few cases it needs to handle, but likely to cause problems
    for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
      found = find(after, after.firstChild, 0);
      if (found) {
        return badPos(Pos(found.line, found.ch - dist), bad);
      } else {
        dist += after.textContent.length;
      }
    }
    for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
      found = find(before, before.firstChild, -1);
      if (found) {
        return badPos(Pos(found.line, found.ch + dist$1), bad);
      } else {
        dist$1 += before.textContent.length;
      }
    }
  }

  // TEXTAREA INPUT STYLE

  var TextareaInput = function (cm) {
    this.cm = cm;
    // See input.poll and input.reset
    this.prevInput = "";

    // Flag that indicates whether we expect input to appear real soon
    // now (after some event like 'keypress' or 'input') and are
    // polling intensively.
    this.pollingFast = false;
    // Self-resetting timeout for the poller
    this.polling = new Delayed();
    // Used to work around IE issue with selection being forgotten when focus moves away from textarea
    this.hasSelection = false;
    this.composing = null;
  };

  TextareaInput.prototype.init = function (display) {
    var this$1 = this;

    var input = this,
        cm = this.cm;

    // Wraps and hides input textarea
    var div = this.wrapper = hiddenTextarea();
    // The semihidden textarea that is focused when the editor is
    // focused, and receives input.
    var te = this.textarea = div.firstChild;
    display.wrapper.insertBefore(div, display.wrapper.firstChild);

    // Needed to hide big blue blinking cursor on Mobile Safari (doesn't seem to work in iOS 8 anymore)
    if (ios) {
      te.style.width = "0px";
    }

    on(te, "input", function () {
      if (ie && ie_version >= 9 && this$1.hasSelection) {
        this$1.hasSelection = null;
      }
      input.poll();
    });

    on(te, "paste", function (e) {
      if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
        return;
      }

      cm.state.pasteIncoming = true;
      input.fastPoll();
    });

    function prepareCopyCut(e) {
      if (signalDOMEvent(cm, e)) {
        return;
      }
      if (cm.somethingSelected()) {
        setLastCopied({ lineWise: false, text: cm.getSelections() });
      } else if (!cm.options.lineWiseCopyCut) {
        return;
      } else {
        var ranges = copyableRanges(cm);
        setLastCopied({ lineWise: true, text: ranges.text });
        if (e.type == "cut") {
          cm.setSelections(ranges.ranges, null, sel_dontScroll);
        } else {
          input.prevInput = "";
          te.value = ranges.text.join("\n");
          selectInput(te);
        }
      }
      if (e.type == "cut") {
        cm.state.cutIncoming = true;
      }
    }
    on(te, "cut", prepareCopyCut);
    on(te, "copy", prepareCopyCut);

    on(display.scroller, "paste", function (e) {
      if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
        return;
      }
      cm.state.pasteIncoming = true;
      input.focus();
    });

    // Prevent normal selection in the editor (we handle our own)
    on(display.lineSpace, "selectstart", function (e) {
      if (!eventInWidget(display, e)) {
        e_preventDefault(e);
      }
    });

    on(te, "compositionstart", function () {
      var start = cm.getCursor("from");
      if (input.composing) {
        input.composing.range.clear();
      }
      input.composing = {
        start: start,
        range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
      };
    });
    on(te, "compositionend", function () {
      if (input.composing) {
        input.poll();
        input.composing.range.clear();
        input.composing = null;
      }
    });
  };

  TextareaInput.prototype.prepareSelection = function () {
    // Redraw the selection and/or cursor
    var cm = this.cm,
        display = cm.display,
        doc = cm.doc;
    var result = prepareSelection(cm);

    // Move the hidden textarea near the cursor to prevent scrolling artifacts
    if (cm.options.moveInputWithCursor) {
      var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
      var wrapOff = display.wrapper.getBoundingClientRect(),
          lineOff = display.lineDiv.getBoundingClientRect();
      result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
      result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
    }

    return result;
  };

  TextareaInput.prototype.showSelection = function (drawn) {
    var cm = this.cm,
        display = cm.display;
    removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
    removeChildrenAndAdd(display.selectionDiv, drawn.selection);
    if (drawn.teTop != null) {
      this.wrapper.style.top = drawn.teTop + "px";
      this.wrapper.style.left = drawn.teLeft + "px";
    }
  };

  // Reset the input to correspond to the selection (or to be empty,
  // when not typing and nothing is selected)
  TextareaInput.prototype.reset = function (typing) {
    if (this.contextMenuPending || this.composing) {
      return;
    }
    var cm = this.cm;
    if (cm.somethingSelected()) {
      this.prevInput = "";
      var content = cm.getSelection();
      this.textarea.value = content;
      if (cm.state.focused) {
        selectInput(this.textarea);
      }
      if (ie && ie_version >= 9) {
        this.hasSelection = content;
      }
    } else if (!typing) {
      this.prevInput = this.textarea.value = "";
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
    }
  };

  TextareaInput.prototype.getField = function () {
    return this.textarea;
  };

  TextareaInput.prototype.supportsTouch = function () {
    return false;
  };

  TextareaInput.prototype.focus = function () {
    if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
      try {
        this.textarea.focus();
      } catch (e) {} // IE8 will throw if the textarea is display: none or not in DOM
    }
  };

  TextareaInput.prototype.blur = function () {
    this.textarea.blur();
  };

  TextareaInput.prototype.resetPosition = function () {
    this.wrapper.style.top = this.wrapper.style.left = 0;
  };

  TextareaInput.prototype.receivedFocus = function () {
    this.slowPoll();
  };

  // Poll for input changes, using the normal rate of polling. This
  // runs as long as the editor is focused.
  TextareaInput.prototype.slowPoll = function () {
    var this$1 = this;

    if (this.pollingFast) {
      return;
    }
    this.polling.set(this.cm.options.pollInterval, function () {
      this$1.poll();
      if (this$1.cm.state.focused) {
        this$1.slowPoll();
      }
    });
  };

  // When an event has just come in that is likely to add or change
  // something in the input textarea, we poll faster, to ensure that
  // the change appears on the screen quickly.
  TextareaInput.prototype.fastPoll = function () {
    var missed = false,
        input = this;
    input.pollingFast = true;
    function p() {
      var changed = input.poll();
      if (!changed && !missed) {
        missed = true;input.polling.set(60, p);
      } else {
        input.pollingFast = false;input.slowPoll();
      }
    }
    input.polling.set(20, p);
  };

  // Read input from the textarea, and update the document to match.
  // When something is selected, it is present in the textarea, and
  // selected (unless it is huge, in which case a placeholder is
  // used). When nothing is selected, the cursor sits after previously
  // seen text (can be empty), which is stored in prevInput (we must
  // not reset the textarea when typing, because that breaks IME).
  TextareaInput.prototype.poll = function () {
    var this$1 = this;

    var cm = this.cm,
        input = this.textarea,
        prevInput = this.prevInput;
    // Since this is called a *lot*, try to bail out as cheaply as
    // possible when it is clear that nothing happened. hasSelection
    // will be the case when there is a lot of text in the textarea,
    // in which case reading its value would be expensive.
    if (this.contextMenuPending || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
      return false;
    }

    var text = input.value;
    // If nothing changed, bail.
    if (text == prevInput && !cm.somethingSelected()) {
      return false;
    }
    // Work around nonsensical selection resetting in IE9/10, and
    // inexplicable appearance of private area unicode characters on
    // some key combos in Mac (#2689).
    if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
      cm.display.input.reset();
      return false;
    }

    if (cm.doc.sel == cm.display.selForContextMenu) {
      var first = text.charCodeAt(0);
      if (first == 0x200b && !prevInput) {
        prevInput = "\u200b";
      }
      if (first == 0x21da) {
        this.reset();return this.cm.execCommand("undo");
      }
    }
    // Find the part of the input that is actually new
    var same = 0,
        l = Math.min(prevInput.length, text.length);
    while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
      ++same;
    }

    runInOp(cm, function () {
      applyTextInput(cm, text.slice(same), prevInput.length - same, null, this$1.composing ? "*compose" : null);

      // Don't leave long text in the textarea, since it makes further polling slow
      if (text.length > 1000 || text.indexOf("\n") > -1) {
        input.value = this$1.prevInput = "";
      } else {
        this$1.prevInput = text;
      }

      if (this$1.composing) {
        this$1.composing.range.clear();
        this$1.composing.range = cm.markText(this$1.composing.start, cm.getCursor("to"), { className: "CodeMirror-composing" });
      }
    });
    return true;
  };

  TextareaInput.prototype.ensurePolled = function () {
    if (this.pollingFast && this.poll()) {
      this.pollingFast = false;
    }
  };

  TextareaInput.prototype.onKeyPress = function () {
    if (ie && ie_version >= 9) {
      this.hasSelection = null;
    }
    this.fastPoll();
  };

  TextareaInput.prototype.onContextMenu = function (e) {
    var input = this,
        cm = input.cm,
        display = cm.display,
        te = input.textarea;
    var pos = posFromMouse(cm, e),
        scrollPos = display.scroller.scrollTop;
    if (!pos || presto) {
      return;
    } // Opera is difficult.

    // Reset the current text selection only if the click is done outside of the selection
    // and 'resetSelectionOnContextMenu' option is true.
    var reset = cm.options.resetSelectionOnContextMenu;
    if (reset && cm.doc.sel.contains(pos) == -1) {
      operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
    }

    var oldCSS = te.style.cssText,
        oldWrapperCSS = input.wrapper.style.cssText;
    input.wrapper.style.cssText = "position: absolute";
    var wrapperBox = input.wrapper.getBoundingClientRect();
    te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
    var oldScrollY;
    if (webkit) {
      oldScrollY = window.scrollY;
    } // Work around Chrome issue (#2712)
    display.input.focus();
    if (webkit) {
      window.scrollTo(null, oldScrollY);
    }
    display.input.reset();
    // Adds "Select all" to context menu in FF
    if (!cm.somethingSelected()) {
      te.value = input.prevInput = " ";
    }
    input.contextMenuPending = true;
    display.selForContextMenu = cm.doc.sel;
    clearTimeout(display.detectingSelectAll);

    // Select-all will be greyed out if there's nothing to select, so
    // this adds a zero-width space so that we can later check whether
    // it got selected.
    function prepareSelectAllHack() {
      if (te.selectionStart != null) {
        var selected = cm.somethingSelected();
        var extval = "\u200b" + (selected ? te.value : "");
        te.value = "\u21da"; // Used to catch context-menu undo
        te.value = extval;
        input.prevInput = selected ? "" : "\u200b";
        te.selectionStart = 1;te.selectionEnd = extval.length;
        // Re-set this, in case some other handler touched the
        // selection in the meantime.
        display.selForContextMenu = cm.doc.sel;
      }
    }
    function rehide() {
      input.contextMenuPending = false;
      input.wrapper.style.cssText = oldWrapperCSS;
      te.style.cssText = oldCSS;
      if (ie && ie_version < 9) {
        display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
      }

      // Try to detect the user choosing select-all
      if (te.selectionStart != null) {
        if (!ie || ie && ie_version < 9) {
          prepareSelectAllHack();
        }
        var i = 0,
            poll = function () {
          if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200b") {
            operation(cm, selectAll)(cm);
          } else if (i++ < 10) {
            display.detectingSelectAll = setTimeout(poll, 500);
          } else {
            display.selForContextMenu = null;
            display.input.reset();
          }
        };
        display.detectingSelectAll = setTimeout(poll, 200);
      }
    }

    if (ie && ie_version >= 9) {
      prepareSelectAllHack();
    }
    if (captureRightClick) {
      e_stop(e);
      var mouseup = function () {
        off(window, "mouseup", mouseup);
        setTimeout(rehide, 20);
      };
      on(window, "mouseup", mouseup);
    } else {
      setTimeout(rehide, 50);
    }
  };

  TextareaInput.prototype.readOnlyChanged = function (val) {
    if (!val) {
      this.reset();
    }
    this.textarea.disabled = val == "nocursor";
  };

  TextareaInput.prototype.setUneditable = function () {};

  TextareaInput.prototype.needsContentAttribute = false;

  function fromTextArea(textarea, options) {
    options = options ? copyObj(options) : {};
    options.value = textarea.value;
    if (!options.tabindex && textarea.tabIndex) {
      options.tabindex = textarea.tabIndex;
    }
    if (!options.placeholder && textarea.placeholder) {
      options.placeholder = textarea.placeholder;
    }
    // Set autofocus to true if this textarea is focused, or if it has
    // autofocus and no other element is focused.
    if (options.autofocus == null) {
      var hasFocus = activeElt();
      options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
    }

    function save() {
      textarea.value = cm.getValue();
    }

    var realSubmit;
    if (textarea.form) {
      on(textarea.form, "submit", save);
      // Deplorable hack to make the submit method do the right thing.
      if (!options.leaveSubmitMethodAlone) {
        var form = textarea.form;
        realSubmit = form.submit;
        try {
          var wrappedSubmit = form.submit = function () {
            save();
            form.submit = realSubmit;
            form.submit();
            form.submit = wrappedSubmit;
          };
        } catch (e) {}
      }
    }

    options.finishInit = function (cm) {
      cm.save = save;
      cm.getTextArea = function () {
        return textarea;
      };
      cm.toTextArea = function () {
        cm.toTextArea = isNaN; // Prevent this from being ran twice
        save();
        textarea.parentNode.removeChild(cm.getWrapperElement());
        textarea.style.display = "";
        if (textarea.form) {
          off(textarea.form, "submit", save);
          if (typeof textarea.form.submit == "function") {
            textarea.form.submit = realSubmit;
          }
        }
      };
    };

    textarea.style.display = "none";
    var cm = CodeMirror$1(function (node) {
      return textarea.parentNode.insertBefore(node, textarea.nextSibling);
    }, options);
    return cm;
  }

  function addLegacyProps(CodeMirror) {
    CodeMirror.off = off;
    CodeMirror.on = on;
    CodeMirror.wheelEventPixels = wheelEventPixels;
    CodeMirror.Doc = Doc;
    CodeMirror.splitLines = splitLinesAuto;
    CodeMirror.countColumn = countColumn;
    CodeMirror.findColumn = findColumn;
    CodeMirror.isWordChar = isWordCharBasic;
    CodeMirror.Pass = Pass;
    CodeMirror.signal = signal;
    CodeMirror.Line = Line;
    CodeMirror.changeEnd = changeEnd;
    CodeMirror.scrollbarModel = scrollbarModel;
    CodeMirror.Pos = Pos;
    CodeMirror.cmpPos = cmp;
    CodeMirror.modes = modes;
    CodeMirror.mimeModes = mimeModes;
    CodeMirror.resolveMode = resolveMode;
    CodeMirror.getMode = getMode;
    CodeMirror.modeExtensions = modeExtensions;
    CodeMirror.extendMode = extendMode;
    CodeMirror.copyState = copyState;
    CodeMirror.startState = startState;
    CodeMirror.innerMode = innerMode;
    CodeMirror.commands = commands;
    CodeMirror.keyMap = keyMap;
    CodeMirror.keyName = keyName;
    CodeMirror.isModifierKey = isModifierKey;
    CodeMirror.lookupKey = lookupKey;
    CodeMirror.normalizeKeyMap = normalizeKeyMap;
    CodeMirror.StringStream = StringStream;
    CodeMirror.SharedTextMarker = SharedTextMarker;
    CodeMirror.TextMarker = TextMarker;
    CodeMirror.LineWidget = LineWidget;
    CodeMirror.e_preventDefault = e_preventDefault;
    CodeMirror.e_stopPropagation = e_stopPropagation;
    CodeMirror.e_stop = e_stop;
    CodeMirror.addClass = addClass;
    CodeMirror.contains = contains;
    CodeMirror.rmClass = rmClass;
    CodeMirror.keyNames = keyNames;
  }

  // EDITOR CONSTRUCTOR

  defineOptions(CodeMirror$1);

  addEditorMethods(CodeMirror$1);

  // Set up methods on CodeMirror's prototype to redirect to the editor's document.
  var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
  for (var prop in Doc.prototype) {
    if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
      CodeMirror$1.prototype[prop] = function (method) {
        return function () {
          return method.apply(this.doc, arguments);
        };
      }(Doc.prototype[prop]);
    }
  }

  eventMixin(Doc);

  // INPUT HANDLING

  CodeMirror$1.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };

  // MODE DEFINITION AND QUERYING

  // Extra arguments are stored as the mode's dependencies, which is
  // used by (legacy) mechanisms like loadmode.js to automatically
  // load a mode. (Preferred mechanism is the require/define calls.)
  CodeMirror$1.defineMode = function (name /*, mode, …*/) {
    if (!CodeMirror$1.defaults.mode && name != "null") {
      CodeMirror$1.defaults.mode = name;
    }
    defineMode.apply(this, arguments);
  };

  CodeMirror$1.defineMIME = defineMIME;

  // Minimal default mode.
  CodeMirror$1.defineMode("null", function () {
    return { token: function (stream) {
        return stream.skipToEnd();
      } };
  });
  CodeMirror$1.defineMIME("text/plain", "null");

  // EXTENSIONS

  CodeMirror$1.defineExtension = function (name, func) {
    CodeMirror$1.prototype[name] = func;
  };
  CodeMirror$1.defineDocExtension = function (name, func) {
    Doc.prototype[name] = func;
  };

  CodeMirror$1.fromTextArea = fromTextArea;

  addLegacyProps(CodeMirror$1);

  CodeMirror$1.version = "5.35.0";

  return CodeMirror$1;
});

/***/ }),

/***/ "../../node_modules/codemirror/mode/css/css.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/mode/css/css.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("css", function (config, parserConfig) {
    var inline = parserConfig.inline;
    if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");

    var indentUnit = config.indentUnit,
        tokenHooks = parserConfig.tokenHooks,
        documentTypes = parserConfig.documentTypes || {},
        mediaTypes = parserConfig.mediaTypes || {},
        mediaFeatures = parserConfig.mediaFeatures || {},
        mediaValueKeywords = parserConfig.mediaValueKeywords || {},
        propertyKeywords = parserConfig.propertyKeywords || {},
        nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
        fontProperties = parserConfig.fontProperties || {},
        counterDescriptors = parserConfig.counterDescriptors || {},
        colorKeywords = parserConfig.colorKeywords || {},
        valueKeywords = parserConfig.valueKeywords || {},
        allowNested = parserConfig.allowNested,
        lineComment = parserConfig.lineComment,
        supportsAtComponent = parserConfig.supportsAtComponent === true;

    var type, override;
    function ret(style, tp) {
      type = tp;return style;
    }

    // Tokenizers

    function tokenBase(stream, state) {
      var ch = stream.next();
      if (tokenHooks[ch]) {
        var result = tokenHooks[ch](stream, state);
        if (result !== false) return result;
      }
      if (ch == "@") {
        stream.eatWhile(/[\w\\\-]/);
        return ret("def", stream.current());
      } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
        return ret(null, "compare");
      } else if (ch == "\"" || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "#") {
        stream.eatWhile(/[\w\\\-]/);
        return ret("atom", "hash");
      } else if (ch == "!") {
        stream.match(/^\s*\w*/);
        return ret("keyword", "important");
      } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
        stream.eatWhile(/[\w.%]/);
        return ret("number", "unit");
      } else if (ch === "-") {
        if (/[\d.]/.test(stream.peek())) {
          stream.eatWhile(/[\w.%]/);
          return ret("number", "unit");
        } else if (stream.match(/^-[\w\\\-]+/)) {
          stream.eatWhile(/[\w\\\-]/);
          if (stream.match(/^\s*:/, false)) return ret("variable-2", "variable-definition");
          return ret("variable-2", "variable");
        } else if (stream.match(/^\w+-/)) {
          return ret("meta", "meta");
        }
      } else if (/[,+>*\/]/.test(ch)) {
        return ret(null, "select-op");
      } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
        return ret("qualifier", "qualifier");
      } else if (/[:;{}\[\]\(\)]/.test(ch)) {
        return ret(null, ch);
      } else if ((ch == "u" || ch == "U") && stream.match(/rl(-prefix)?\(/i) || (ch == "d" || ch == "D") && stream.match("omain(", true, true) || (ch == "r" || ch == "R") && stream.match("egexp(", true, true)) {
        stream.backUp(1);
        state.tokenize = tokenParenthesized;
        return ret("property", "word");
      } else if (/[\w\\\-]/.test(ch)) {
        stream.eatWhile(/[\w\\\-]/);
        return ret("property", "word");
      } else {
        return ret(null, null);
      }
    }

    function tokenString(quote) {
      return function (stream, state) {
        var escaped = false,
            ch;
        while ((ch = stream.next()) != null) {
          if (ch == quote && !escaped) {
            if (quote == ")") stream.backUp(1);
            break;
          }
          escaped = !escaped && ch == "\\";
        }
        if (ch == quote || !escaped && quote != ")") state.tokenize = null;
        return ret("string", "string");
      };
    }

    function tokenParenthesized(stream, state) {
      stream.next(); // Must be '('
      if (!stream.match(/\s*[\"\')]/, false)) state.tokenize = tokenString(")");else state.tokenize = null;
      return ret(null, "(");
    }

    // Context management

    function Context(type, indent, prev) {
      this.type = type;
      this.indent = indent;
      this.prev = prev;
    }

    function pushContext(state, stream, type, indent) {
      state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
      return type;
    }

    function popContext(state) {
      if (state.context.prev) state.context = state.context.prev;
      return state.context.type;
    }

    function pass(type, stream, state) {
      return states[state.context.type](type, stream, state);
    }
    function popAndPass(type, stream, state, n) {
      for (var i = n || 1; i > 0; i--) state.context = state.context.prev;
      return pass(type, stream, state);
    }

    // Parser

    function wordAsValue(stream) {
      var word = stream.current().toLowerCase();
      if (valueKeywords.hasOwnProperty(word)) override = "atom";else if (colorKeywords.hasOwnProperty(word)) override = "keyword";else override = "variable";
    }

    var states = {};

    states.top = function (type, stream, state) {
      if (type == "{") {
        return pushContext(state, stream, "block");
      } else if (type == "}" && state.context.prev) {
        return popContext(state);
      } else if (supportsAtComponent && /@component/i.test(type)) {
        return pushContext(state, stream, "atComponentBlock");
      } else if (/^@(-moz-)?document$/i.test(type)) {
        return pushContext(state, stream, "documentTypes");
      } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type)) {
        return pushContext(state, stream, "atBlock");
      } else if (/^@(font-face|counter-style)/i.test(type)) {
        state.stateArg = type;
        return "restricted_atBlock_before";
      } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type)) {
        return "keyframes";
      } else if (type && type.charAt(0) == "@") {
        return pushContext(state, stream, "at");
      } else if (type == "hash") {
        override = "builtin";
      } else if (type == "word") {
        override = "tag";
      } else if (type == "variable-definition") {
        return "maybeprop";
      } else if (type == "interpolation") {
        return pushContext(state, stream, "interpolation");
      } else if (type == ":") {
        return "pseudo";
      } else if (allowNested && type == "(") {
        return pushContext(state, stream, "parens");
      }
      return state.context.type;
    };

    states.block = function (type, stream, state) {
      if (type == "word") {
        var word = stream.current().toLowerCase();
        if (propertyKeywords.hasOwnProperty(word)) {
          override = "property";
          return "maybeprop";
        } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
          override = "string-2";
          return "maybeprop";
        } else if (allowNested) {
          override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
          return "block";
        } else {
          override += " error";
          return "maybeprop";
        }
      } else if (type == "meta") {
        return "block";
      } else if (!allowNested && (type == "hash" || type == "qualifier")) {
        override = "error";
        return "block";
      } else {
        return states.top(type, stream, state);
      }
    };

    states.maybeprop = function (type, stream, state) {
      if (type == ":") return pushContext(state, stream, "prop");
      return pass(type, stream, state);
    };

    states.prop = function (type, stream, state) {
      if (type == ";") return popContext(state);
      if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
      if (type == "}" || type == "{") return popAndPass(type, stream, state);
      if (type == "(") return pushContext(state, stream, "parens");

      if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
        override += " error";
      } else if (type == "word") {
        wordAsValue(stream);
      } else if (type == "interpolation") {
        return pushContext(state, stream, "interpolation");
      }
      return "prop";
    };

    states.propBlock = function (type, _stream, state) {
      if (type == "}") return popContext(state);
      if (type == "word") {
        override = "property";return "maybeprop";
      }
      return state.context.type;
    };

    states.parens = function (type, stream, state) {
      if (type == "{" || type == "}") return popAndPass(type, stream, state);
      if (type == ")") return popContext(state);
      if (type == "(") return pushContext(state, stream, "parens");
      if (type == "interpolation") return pushContext(state, stream, "interpolation");
      if (type == "word") wordAsValue(stream);
      return "parens";
    };

    states.pseudo = function (type, stream, state) {
      if (type == "meta") return "pseudo";

      if (type == "word") {
        override = "variable-3";
        return state.context.type;
      }
      return pass(type, stream, state);
    };

    states.documentTypes = function (type, stream, state) {
      if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
        override = "tag";
        return state.context.type;
      } else {
        return states.atBlock(type, stream, state);
      }
    };

    states.atBlock = function (type, stream, state) {
      if (type == "(") return pushContext(state, stream, "atBlock_parens");
      if (type == "}" || type == ";") return popAndPass(type, stream, state);
      if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");

      if (type == "interpolation") return pushContext(state, stream, "interpolation");

      if (type == "word") {
        var word = stream.current().toLowerCase();
        if (word == "only" || word == "not" || word == "and" || word == "or") override = "keyword";else if (mediaTypes.hasOwnProperty(word)) override = "attribute";else if (mediaFeatures.hasOwnProperty(word)) override = "property";else if (mediaValueKeywords.hasOwnProperty(word)) override = "keyword";else if (propertyKeywords.hasOwnProperty(word)) override = "property";else if (nonStandardPropertyKeywords.hasOwnProperty(word)) override = "string-2";else if (valueKeywords.hasOwnProperty(word)) override = "atom";else if (colorKeywords.hasOwnProperty(word)) override = "keyword";else override = "error";
      }
      return state.context.type;
    };

    states.atComponentBlock = function (type, stream, state) {
      if (type == "}") return popAndPass(type, stream, state);
      if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
      if (type == "word") override = "error";
      return state.context.type;
    };

    states.atBlock_parens = function (type, stream, state) {
      if (type == ")") return popContext(state);
      if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
      return states.atBlock(type, stream, state);
    };

    states.restricted_atBlock_before = function (type, stream, state) {
      if (type == "{") return pushContext(state, stream, "restricted_atBlock");
      if (type == "word" && state.stateArg == "@counter-style") {
        override = "variable";
        return "restricted_atBlock_before";
      }
      return pass(type, stream, state);
    };

    states.restricted_atBlock = function (type, stream, state) {
      if (type == "}") {
        state.stateArg = null;
        return popContext(state);
      }
      if (type == "word") {
        if (state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())) override = "error";else override = "property";
        return "maybeprop";
      }
      return "restricted_atBlock";
    };

    states.keyframes = function (type, stream, state) {
      if (type == "word") {
        override = "variable";return "keyframes";
      }
      if (type == "{") return pushContext(state, stream, "top");
      return pass(type, stream, state);
    };

    states.at = function (type, stream, state) {
      if (type == ";") return popContext(state);
      if (type == "{" || type == "}") return popAndPass(type, stream, state);
      if (type == "word") override = "tag";else if (type == "hash") override = "builtin";
      return "at";
    };

    states.interpolation = function (type, stream, state) {
      if (type == "}") return popContext(state);
      if (type == "{" || type == ";") return popAndPass(type, stream, state);
      if (type == "word") override = "variable";else if (type != "variable" && type != "(" && type != ")") override = "error";
      return "interpolation";
    };

    return {
      startState: function (base) {
        return { tokenize: null,
          state: inline ? "block" : "top",
          stateArg: null,
          context: new Context(inline ? "block" : "top", base || 0, null) };
      },

      token: function (stream, state) {
        if (!state.tokenize && stream.eatSpace()) return null;
        var style = (state.tokenize || tokenBase)(stream, state);
        if (style && typeof style == "object") {
          type = style[1];
          style = style[0];
        }
        override = style;
        if (type != "comment") state.state = states[state.state](type, stream, state);
        return override;
      },

      indent: function (state, textAfter) {
        var cx = state.context,
            ch = textAfter && textAfter.charAt(0);
        var indent = cx.indent;
        if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
        if (cx.prev) {
          if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
            // Resume indentation from parent context.
            cx = cx.prev;
            indent = cx.indent;
          } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
            // Dedent relative to current context.
            indent = Math.max(0, cx.indent - indentUnit);
          }
        }
        return indent;
      },

      electricChars: "}",
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      blockCommentContinue: " * ",
      lineComment: lineComment,
      fold: "brace"
    };
  });

  function keySet(array) {
    var keys = {};
    for (var i = 0; i < array.length; ++i) {
      keys[array[i].toLowerCase()] = true;
    }
    return keys;
  }

  var documentTypes_ = ["domain", "regexp", "url", "url-prefix"],
      documentTypes = keySet(documentTypes_);

  var mediaTypes_ = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
      mediaTypes = keySet(mediaTypes_);

  var mediaFeatures_ = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid", "orientation", "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio", "pointer", "any-pointer", "hover", "any-hover"],
      mediaFeatures = keySet(mediaFeatures_);

  var mediaValueKeywords_ = ["landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover", "interlace", "progressive"],
      mediaValueKeywords = keySet(mediaValueKeywords_);

  var propertyKeywords_ = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "justify-items", "justify-self", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "place-content", "place-items", "place-self", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "user-select", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "z-index",
  // SVG-specific
  "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "text-anchor", "writing-mode"],
      propertyKeywords = keySet(propertyKeywords_);

  var nonStandardPropertyKeywords_ = ["scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color", "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color", "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "zoom"],
      nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);

  var fontProperties_ = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
      fontProperties = keySet(fontProperties_);

  var counterDescriptors_ = ["additive-symbols", "fallback", "negative", "pad", "prefix", "range", "speak-as", "suffix", "symbols", "system"],
      counterDescriptors = keySet(counterDescriptors_);

  var colorKeywords_ = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
      colorKeywords = keySet(colorKeywords_);

  var valueKeywords_ = ["above", "absolute", "activeborder", "additive", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "attr", "auto", "auto-flow", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse", "compact", "condensed", "contain", "content", "contents", "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "dense", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "difference", "disc", "discard", "disclosure-closed", "disclosure-open", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "grid", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-flex", "inline-grid", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "japanese-formal", "japanese-informal", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten", "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "opacity", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radial-gradient", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running", "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen", "scroll", "scrollbar", "scroll-position", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "self-start", "self-end", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "simp-chinese-formal", "simp-chinese-informal", "single", "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "space-evenly", "spell-out", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "system-ui", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "tamil", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "trad-chinese-formal", "trad-chinese-informal", "transform", "translate", "translate3d", "translateX", "translateY", "translateZ", "transparent", "ultra-condensed", "ultra-expanded", "underline", "unset", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor", "xx-large", "xx-small"],
      valueKeywords = keySet(valueKeywords_);

  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
  CodeMirror.registerHelper("hintWords", "css", allWords);

  function tokenCComment(stream, state) {
    var maybeEnd = false,
        ch;
    while ((ch = stream.next()) != null) {
      if (maybeEnd && ch == "/") {
        state.tokenize = null;
        break;
      }
      maybeEnd = ch == "*";
    }
    return ["comment", "comment"];
  }

  CodeMirror.defineMIME("text/css", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    tokenHooks: {
      "/": function (stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css"
  });

  CodeMirror.defineMIME("text/x-scss", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function (stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      ":": function (stream) {
        if (stream.match(/\s*\{/, false)) return [null, null];
        return false;
      },
      "$": function (stream) {
        stream.match(/^[\w-]+/);
        if (stream.match(/^\s*:/, false)) return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "#": function (stream) {
        if (!stream.eat("{")) return false;
        return [null, "interpolation"];
      }
    },
    name: "css",
    helperType: "scss"
  });

  CodeMirror.defineMIME("text/x-less", {
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    mediaValueKeywords: mediaValueKeywords,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    fontProperties: fontProperties,
    allowNested: true,
    lineComment: "//",
    tokenHooks: {
      "/": function (stream, state) {
        if (stream.eat("/")) {
          stream.skipToEnd();
          return ["comment", "comment"];
        } else if (stream.eat("*")) {
          state.tokenize = tokenCComment;
          return tokenCComment(stream, state);
        } else {
          return ["operator", "operator"];
        }
      },
      "@": function (stream) {
        if (stream.eat("{")) return [null, "interpolation"];
        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false)) return false;
        stream.eatWhile(/[\w\\\-]/);
        if (stream.match(/^\s*:/, false)) return ["variable-2", "variable-definition"];
        return ["variable-2", "variable"];
      },
      "&": function () {
        return ["atom", "atom"];
      }
    },
    name: "css",
    helperType: "less"
  });

  CodeMirror.defineMIME("text/x-gss", {
    documentTypes: documentTypes,
    mediaTypes: mediaTypes,
    mediaFeatures: mediaFeatures,
    propertyKeywords: propertyKeywords,
    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
    fontProperties: fontProperties,
    counterDescriptors: counterDescriptors,
    colorKeywords: colorKeywords,
    valueKeywords: valueKeywords,
    supportsAtComponent: true,
    tokenHooks: {
      "/": function (stream, state) {
        if (!stream.eat("*")) return false;
        state.tokenize = tokenCComment;
        return tokenCComment(stream, state);
      }
    },
    name: "css",
    helperType: "gss"
  });
});

/***/ }),

/***/ "../../node_modules/codemirror/mode/htmlmixed/htmlmixed.js":
/*!*************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/mode/htmlmixed/htmlmixed.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"), __webpack_require__(/*! ../xml/xml */ "../../node_modules/codemirror/mode/xml/xml.js"), __webpack_require__(/*! ../javascript/javascript */ "../../node_modules/codemirror/mode/javascript/javascript.js"), __webpack_require__(/*! ../css/css */ "../../node_modules/codemirror/mode/css/css.js"));else {}
})(function (CodeMirror) {
  "use strict";

  var defaultTags = {
    script: [["lang", /(javascript|babel)/i, "javascript"], ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"], ["type", /./, "text/plain"], [null, null, "javascript"]],
    style: [["lang", /^css$/i, "css"], ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"], ["type", /./, "text/plain"], [null, null, "css"]]
  };

  function maybeBackup(stream, pat, style) {
    var cur = stream.current(),
        close = cur.search(pat);
    if (close > -1) {
      stream.backUp(cur.length - close);
    } else if (cur.match(/<\/?$/)) {
      stream.backUp(cur.length);
      if (!stream.match(pat, false)) stream.match(cur);
    }
    return style;
  }

  var attrRegexpCache = {};
  function getAttrRegexp(attr) {
    var regexp = attrRegexpCache[attr];
    if (regexp) return regexp;
    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
  }

  function getAttrValue(text, attr) {
    var match = text.match(getAttrRegexp(attr));
    return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : "";
  }

  function getTagRegexp(tagName, anchored) {
    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
  }

  function addTags(from, to) {
    for (var tag in from) {
      var dest = to[tag] || (to[tag] = []);
      var source = from[tag];
      for (var i = source.length - 1; i >= 0; i--) dest.unshift(source[i]);
    }
  }

  function findMatchingMode(tagInfo, tagText) {
    for (var i = 0; i < tagInfo.length; i++) {
      var spec = tagInfo[i];
      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
    }
  }

  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
    var htmlMode = CodeMirror.getMode(config, {
      name: "xml",
      htmlMode: true,
      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
    });

    var tags = {};
    var configTags = parserConfig && parserConfig.tags,
        configScript = parserConfig && parserConfig.scriptTypes;
    addTags(defaultTags, tags);
    if (configTags) addTags(configTags, tags);
    if (configScript) for (var i = configScript.length - 1; i >= 0; i--) tags.script.unshift(["type", configScript[i].matches, configScript[i].mode]);

    function html(stream, state) {
      var style = htmlMode.token(stream, state.htmlState),
          tag = /\btag\b/.test(style),
          tagName;
      if (tag && !/[<>\s\/]/.test(stream.current()) && (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) && tags.hasOwnProperty(tagName)) {
        state.inTag = tagName + " ";
      } else if (state.inTag && tag && />$/.test(stream.current())) {
        var inTag = /^([\S]+) (.*)/.exec(state.inTag);
        state.inTag = null;
        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2]);
        var mode = CodeMirror.getMode(config, modeSpec);
        var endTagA = getTagRegexp(inTag[1], true),
            endTag = getTagRegexp(inTag[1], false);
        state.token = function (stream, state) {
          if (stream.match(endTagA, false)) {
            state.token = html;
            state.localState = state.localMode = null;
            return null;
          }
          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
        };
        state.localMode = mode;
        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, ""));
      } else if (state.inTag) {
        state.inTag += stream.current();
        if (stream.eol()) state.inTag += " ";
      }
      return style;
    };

    return {
      startState: function () {
        var state = CodeMirror.startState(htmlMode);
        return { token: html, inTag: null, localMode: null, localState: null, htmlState: state };
      },

      copyState: function (state) {
        var local;
        if (state.localState) {
          local = CodeMirror.copyState(state.localMode, state.localState);
        }
        return { token: state.token, inTag: state.inTag,
          localMode: state.localMode, localState: local,
          htmlState: CodeMirror.copyState(htmlMode, state.htmlState) };
      },

      token: function (stream, state) {
        return state.token(stream, state);
      },

      indent: function (state, textAfter, line) {
        if (!state.localMode || /^\s*<\//.test(textAfter)) return htmlMode.indent(state.htmlState, textAfter);else if (state.localMode.indent) return state.localMode.indent(state.localState, textAfter, line);else return CodeMirror.Pass;
      },

      innerMode: function (state) {
        return { state: state.localState || state.htmlState, mode: state.localMode || htmlMode };
      }
    };
  }, "xml", "javascript", "css");

  CodeMirror.defineMIME("text/html", "htmlmixed");
});

/***/ }),

/***/ "../../node_modules/codemirror/mode/javascript/javascript.js":
/*!***************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/mode/javascript/javascript.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("javascript", function (config, parserConfig) {
    var indentUnit = config.indentUnit;
    var statementIndent = parserConfig.statementIndent;
    var jsonldMode = parserConfig.jsonld;
    var jsonMode = parserConfig.json || jsonldMode;
    var isTS = parserConfig.typescript;
    var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;

    // Tokenizer

    var keywords = function () {
      function kw(type) {
        return { type: type, style: "keyword" };
      }
      var A = kw("keyword a"),
          B = kw("keyword b"),
          C = kw("keyword c"),
          D = kw("keyword d");
      var operator = kw("operator"),
          atom = { type: "atom", style: "atom" };

      return {
        "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
        "return": D, "break": D, "continue": D, "new": kw("new"), "delete": C, "void": C, "throw": C,
        "debugger": kw("debugger"), "var": kw("var"), "const": kw("var"), "let": kw("var"),
        "function": kw("function"), "catch": kw("catch"),
        "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
        "in": operator, "typeof": operator, "instanceof": operator,
        "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
        "this": kw("this"), "class": kw("class"), "super": kw("atom"),
        "yield": C, "export": kw("export"), "import": kw("import"), "extends": C,
        "await": C
      };
    }();

    var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
    var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;

    function readRegexp(stream) {
      var escaped = false,
          next,
          inSet = false;
      while ((next = stream.next()) != null) {
        if (!escaped) {
          if (next == "/" && !inSet) return;
          if (next == "[") inSet = true;else if (inSet && next == "]") inSet = false;
        }
        escaped = !escaped && next == "\\";
      }
    }

    // Used as scratch variables to communicate multiple values without
    // consing up tons of objects.
    var type, content;
    function ret(tp, style, cont) {
      type = tp;content = cont;
      return style;
    }
    function tokenBase(stream, state) {
      var ch = stream.next();
      if (ch == '"' || ch == "'") {
        state.tokenize = tokenString(ch);
        return state.tokenize(stream, state);
      } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
        return ret("number", "number");
      } else if (ch == "." && stream.match("..")) {
        return ret("spread", "meta");
      } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
        return ret(ch);
      } else if (ch == "=" && stream.eat(">")) {
        return ret("=>", "operator");
      } else if (ch == "0" && stream.eat(/x/i)) {
        stream.eatWhile(/[\da-f]/i);
        return ret("number", "number");
      } else if (ch == "0" && stream.eat(/o/i)) {
        stream.eatWhile(/[0-7]/i);
        return ret("number", "number");
      } else if (ch == "0" && stream.eat(/b/i)) {
        stream.eatWhile(/[01]/i);
        return ret("number", "number");
      } else if (/\d/.test(ch)) {
        stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
        return ret("number", "number");
      } else if (ch == "/") {
        if (stream.eat("*")) {
          state.tokenize = tokenComment;
          return tokenComment(stream, state);
        } else if (stream.eat("/")) {
          stream.skipToEnd();
          return ret("comment", "comment");
        } else if (expressionAllowed(stream, state, 1)) {
          readRegexp(stream);
          stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
          return ret("regexp", "string-2");
        } else {
          stream.eat("=");
          return ret("operator", "operator", stream.current());
        }
      } else if (ch == "`") {
        state.tokenize = tokenQuasi;
        return tokenQuasi(stream, state);
      } else if (ch == "#") {
        stream.skipToEnd();
        return ret("error", "error");
      } else if (isOperatorChar.test(ch)) {
        if (ch != ">" || !state.lexical || state.lexical.type != ">") {
          if (stream.eat("=")) {
            if (ch == "!" || ch == "=") stream.eat("=");
          } else if (/[<>*+\-]/.test(ch)) {
            stream.eat(ch);
            if (ch == ">") stream.eat(ch);
          }
        }
        return ret("operator", "operator", stream.current());
      } else if (wordRE.test(ch)) {
        stream.eatWhile(wordRE);
        var word = stream.current();
        if (state.lastType != ".") {
          if (keywords.propertyIsEnumerable(word)) {
            var kw = keywords[word];
            return ret(kw.type, kw.style, word);
          }
          if (word == "async" && stream.match(/^(\s|\/\*.*?\*\/)*[\(\w]/, false)) return ret("async", "keyword", word);
        }
        return ret("variable", "variable", word);
      }
    }

    function tokenString(quote) {
      return function (stream, state) {
        var escaped = false,
            next;
        if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
          state.tokenize = tokenBase;
          return ret("jsonld-keyword", "meta");
        }
        while ((next = stream.next()) != null) {
          if (next == quote && !escaped) break;
          escaped = !escaped && next == "\\";
        }
        if (!escaped) state.tokenize = tokenBase;
        return ret("string", "string");
      };
    }

    function tokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = ch == "*";
      }
      return ret("comment", "comment");
    }

    function tokenQuasi(stream, state) {
      var escaped = false,
          next;
      while ((next = stream.next()) != null) {
        if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
          state.tokenize = tokenBase;
          break;
        }
        escaped = !escaped && next == "\\";
      }
      return ret("quasi", "string-2", stream.current());
    }

    var brackets = "([{}])";
    // This is a crude lookahead trick to try and notice that we're
    // parsing the argument patterns for a fat-arrow function before we
    // actually hit the arrow token. It only works if the arrow is on
    // the same line as the arguments and there's no strange noise
    // (comments) in between. Fallback is to only notice when we hit the
    // arrow, and not declare the arguments as locals for the arrow
    // body.
    function findFatArrow(stream, state) {
      if (state.fatArrowAt) state.fatArrowAt = null;
      var arrow = stream.string.indexOf("=>", stream.start);
      if (arrow < 0) return;

      if (isTS) {
        // Try to skip TypeScript return type declarations after the arguments
        var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
        if (m) arrow = m.index;
      }

      var depth = 0,
          sawSomething = false;
      for (var pos = arrow - 1; pos >= 0; --pos) {
        var ch = stream.string.charAt(pos);
        var bracket = brackets.indexOf(ch);
        if (bracket >= 0 && bracket < 3) {
          if (!depth) {
            ++pos;break;
          }
          if (--depth == 0) {
            if (ch == "(") sawSomething = true;break;
          }
        } else if (bracket >= 3 && bracket < 6) {
          ++depth;
        } else if (wordRE.test(ch)) {
          sawSomething = true;
        } else if (/["'\/]/.test(ch)) {
          return;
        } else if (sawSomething && !depth) {
          ++pos;
          break;
        }
      }
      if (sawSomething && !depth) state.fatArrowAt = pos;
    }

    // Parser

    var atomicTypes = { "atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true };

    function JSLexical(indented, column, type, align, prev, info) {
      this.indented = indented;
      this.column = column;
      this.type = type;
      this.prev = prev;
      this.info = info;
      if (align != null) this.align = align;
    }

    function inScope(state, varname) {
      for (var v = state.localVars; v; v = v.next) if (v.name == varname) return true;
      for (var cx = state.context; cx; cx = cx.prev) {
        for (var v = cx.vars; v; v = v.next) if (v.name == varname) return true;
      }
    }

    function parseJS(state, style, type, content, stream) {
      var cc = state.cc;
      // Communicate our context to the combinators.
      // (Less wasteful than consing up a hundred closures on every call.)
      cx.state = state;cx.stream = stream;cx.marked = null, cx.cc = cc;cx.style = style;

      if (!state.lexical.hasOwnProperty("align")) state.lexical.align = true;

      while (true) {
        var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
        if (combinator(type, content)) {
          while (cc.length && cc[cc.length - 1].lex) cc.pop()();
          if (cx.marked) return cx.marked;
          if (type == "variable" && inScope(state, content)) return "variable-2";
          return style;
        }
      }
    }

    // Combinator utils

    var cx = { state: null, column: null, marked: null, cc: null };
    function pass() {
      for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
    }
    function cont() {
      pass.apply(null, arguments);
      return true;
    }
    function register(varname) {
      function inList(list) {
        for (var v = list; v; v = v.next) if (v.name == varname) return true;
        return false;
      }
      var state = cx.state;
      cx.marked = "def";
      if (state.context) {
        if (inList(state.localVars)) return;
        state.localVars = { name: varname, next: state.localVars };
      } else {
        if (inList(state.globalVars)) return;
        if (parserConfig.globalVars) state.globalVars = { name: varname, next: state.globalVars };
      }
    }

    function isModifier(name) {
      return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
    }

    // Combinators

    var defaultVars = { name: "this", next: { name: "arguments" } };
    function pushcontext() {
      cx.state.context = { prev: cx.state.context, vars: cx.state.localVars };
      cx.state.localVars = defaultVars;
    }
    function popcontext() {
      cx.state.localVars = cx.state.context.vars;
      cx.state.context = cx.state.context.prev;
    }
    function pushlex(type, info) {
      var result = function () {
        var state = cx.state,
            indent = state.indented;
        if (state.lexical.type == "stat") indent = state.lexical.indented;else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev) indent = outer.indented;
        state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
      };
      result.lex = true;
      return result;
    }
    function poplex() {
      var state = cx.state;
      if (state.lexical.prev) {
        if (state.lexical.type == ")") state.indented = state.lexical.indented;
        state.lexical = state.lexical.prev;
      }
    }
    poplex.lex = true;

    function expect(wanted) {
      function exp(type) {
        if (type == wanted) return cont();else if (wanted == ";") return pass();else return cont(exp);
      };
      return exp;
    }

    function statement(type, value) {
      if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
      if (type == "keyword a") return cont(pushlex("form"), parenExpr, statement, poplex);
      if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
      if (type == "keyword d") return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
      if (type == "debugger") return cont(expect(";"));
      if (type == "{") return cont(pushlex("}"), block, poplex);
      if (type == ";") return cont();
      if (type == "if") {
        if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex) cx.state.cc.pop()();
        return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
      }
      if (type == "function") return cont(functiondef);
      if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
      if (type == "class" || isTS && value == "interface") {
        cx.marked = "keyword";return cont(pushlex("form"), className, poplex);
      }
      if (type == "variable") {
        if (isTS && value == "declare") {
          cx.marked = "keyword";
          return cont(statement);
        } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
          cx.marked = "keyword";
          if (value == "enum") return cont(enumdef);else if (value == "type") return cont(typeexpr, expect("operator"), typeexpr, expect(";"));else return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
        } else if (isTS && value == "namespace") {
          cx.marked = "keyword";
          return cont(pushlex("form"), expression, block, poplex);
        } else {
          return cont(pushlex("stat"), maybelabel);
        }
      }
      if (type == "switch") return cont(pushlex("form"), parenExpr, expect("{"), pushlex("}", "switch"), block, poplex, poplex);
      if (type == "case") return cont(expression, expect(":"));
      if (type == "default") return cont(expect(":"));
      if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext);
      if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
      if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
      if (type == "async") return cont(statement);
      if (value == "@") return cont(expression, statement);
      return pass(pushlex("stat"), expression, expect(";"), poplex);
    }
    function expression(type, value) {
      return expressionInner(type, value, false);
    }
    function expressionNoComma(type, value) {
      return expressionInner(type, value, true);
    }
    function parenExpr(type) {
      if (type != "(") return pass();
      return cont(pushlex(")"), expression, expect(")"), poplex);
    }
    function expressionInner(type, value, noComma) {
      if (cx.state.fatArrowAt == cx.stream.start) {
        var body = noComma ? arrowBodyNoComma : arrowBody;
        if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
      }

      var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
      if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
      if (type == "function") return cont(functiondef, maybeop);
      if (type == "class" || isTS && value == "interface") {
        cx.marked = "keyword";return cont(pushlex("form"), classExpression, poplex);
      }
      if (type == "keyword c" || type == "async") return cont(noComma ? expressionNoComma : expression);
      if (type == "(") return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
      if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
      if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
      if (type == "{") return contCommasep(objprop, "}", null, maybeop);
      if (type == "quasi") return pass(quasi, maybeop);
      if (type == "new") return cont(maybeTarget(noComma));
      if (type == "import") return cont(expression);
      return cont();
    }
    function maybeexpression(type) {
      if (type.match(/[;\}\)\],]/)) return pass();
      return pass(expression);
    }

    function maybeoperatorComma(type, value) {
      if (type == ",") return cont(expression);
      return maybeoperatorNoComma(type, value, false);
    }
    function maybeoperatorNoComma(type, value, noComma) {
      var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
      var expr = noComma == false ? expression : expressionNoComma;
      if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
      if (type == "operator") {
        if (/\+\+|--/.test(value) || isTS && value == "!") return cont(me);
        if (isTS && value == "<" && cx.stream.match(/^([^>]|<.*?>)*>\s*\(/, false)) return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
        if (value == "?") return cont(expression, expect(":"), expr);
        return cont(expr);
      }
      if (type == "quasi") {
        return pass(quasi, me);
      }
      if (type == ";") return;
      if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
      if (type == ".") return cont(property, me);
      if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
      if (isTS && value == "as") {
        cx.marked = "keyword";return cont(typeexpr, me);
      }
      if (type == "regexp") {
        cx.state.lastType = cx.marked = "operator";
        cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
        return cont(expr);
      }
    }
    function quasi(type, value) {
      if (type != "quasi") return pass();
      if (value.slice(value.length - 2) != "${") return cont(quasi);
      return cont(expression, continueQuasi);
    }
    function continueQuasi(type) {
      if (type == "}") {
        cx.marked = "string-2";
        cx.state.tokenize = tokenQuasi;
        return cont(quasi);
      }
    }
    function arrowBody(type) {
      findFatArrow(cx.stream, cx.state);
      return pass(type == "{" ? statement : expression);
    }
    function arrowBodyNoComma(type) {
      findFatArrow(cx.stream, cx.state);
      return pass(type == "{" ? statement : expressionNoComma);
    }
    function maybeTarget(noComma) {
      return function (type) {
        if (type == ".") return cont(noComma ? targetNoComma : target);else if (type == "variable" && isTS) return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);else return pass(noComma ? expressionNoComma : expression);
      };
    }
    function target(_, value) {
      if (value == "target") {
        cx.marked = "keyword";return cont(maybeoperatorComma);
      }
    }
    function targetNoComma(_, value) {
      if (value == "target") {
        cx.marked = "keyword";return cont(maybeoperatorNoComma);
      }
    }
    function maybelabel(type) {
      if (type == ":") return cont(poplex, statement);
      return pass(maybeoperatorComma, expect(";"), poplex);
    }
    function property(type) {
      if (type == "variable") {
        cx.marked = "property";return cont();
      }
    }
    function objprop(type, value) {
      if (type == "async") {
        cx.marked = "property";
        return cont(objprop);
      } else if (type == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        if (value == "get" || value == "set") return cont(getterSetter);
        var m; // Work around fat-arrow-detection complication for detecting typescript typed arrow params
        if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false))) cx.state.fatArrowAt = cx.stream.pos + m[0].length;
        return cont(afterprop);
      } else if (type == "number" || type == "string") {
        cx.marked = jsonldMode ? "property" : cx.style + " property";
        return cont(afterprop);
      } else if (type == "jsonld-keyword") {
        return cont(afterprop);
      } else if (isTS && isModifier(value)) {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type == "[") {
        return cont(expression, maybetype, expect("]"), afterprop);
      } else if (type == "spread") {
        return cont(expressionNoComma, afterprop);
      } else if (value == "*") {
        cx.marked = "keyword";
        return cont(objprop);
      } else if (type == ":") {
        return pass(afterprop);
      }
    }
    function getterSetter(type) {
      if (type != "variable") return pass(afterprop);
      cx.marked = "property";
      return cont(functiondef);
    }
    function afterprop(type) {
      if (type == ":") return cont(expressionNoComma);
      if (type == "(") return pass(functiondef);
    }
    function commasep(what, end, sep) {
      function proceed(type, value) {
        if (sep ? sep.indexOf(type) > -1 : type == ",") {
          var lex = cx.state.lexical;
          if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
          return cont(function (type, value) {
            if (type == end || value == end) return pass();
            return pass(what);
          }, proceed);
        }
        if (type == end || value == end) return cont();
        return cont(expect(end));
      }
      return function (type, value) {
        if (type == end || value == end) return cont();
        return pass(what, proceed);
      };
    }
    function contCommasep(what, end, info) {
      for (var i = 3; i < arguments.length; i++) cx.cc.push(arguments[i]);
      return cont(pushlex(end, info), commasep(what, end), poplex);
    }
    function block(type) {
      if (type == "}") return cont();
      return pass(statement, block);
    }
    function maybetype(type, value) {
      if (isTS) {
        if (type == ":") return cont(typeexpr);
        if (value == "?") return cont(maybetype);
      }
    }
    function mayberettype(type) {
      if (isTS && type == ":") {
        if (cx.stream.match(/^\s*\w+\s+is\b/, false)) return cont(expression, isKW, typeexpr);else return cont(typeexpr);
      }
    }
    function isKW(_, value) {
      if (value == "is") {
        cx.marked = "keyword";
        return cont();
      }
    }
    function typeexpr(type, value) {
      if (type == "variable" || value == "void") {
        if (value == "keyof") {
          cx.marked = "keyword";
          return cont(typeexpr);
        } else {
          cx.marked = "type";
          return cont(afterType);
        }
      }
      if (type == "string" || type == "number" || type == "atom") return cont(afterType);
      if (type == "[") return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
      if (type == "{") return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex, afterType);
      if (type == "(") return cont(commasep(typearg, ")"), maybeReturnType);
    }
    function maybeReturnType(type) {
      if (type == "=>") return cont(typeexpr);
    }
    function typeprop(type, value) {
      if (type == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(typeprop);
      } else if (value == "?") {
        return cont(typeprop);
      } else if (type == ":") {
        return cont(typeexpr);
      } else if (type == "[") {
        return cont(expression, maybetype, expect("]"), typeprop);
      }
    }
    function typearg(type) {
      if (type == "variable") return cont(typearg);else if (type == ":") return cont(typeexpr);
    }
    function afterType(type, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
      if (value == "|" || type == "." || value == "&") return cont(typeexpr);
      if (type == "[") return cont(expect("]"), afterType);
      if (value == "extends" || value == "implements") {
        cx.marked = "keyword";return cont(typeexpr);
      }
    }
    function maybeTypeArgs(_, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
    }
    function typeparam() {
      return pass(typeexpr, maybeTypeDefault);
    }
    function maybeTypeDefault(_, value) {
      if (value == "=") return cont(typeexpr);
    }
    function vardef(_, value) {
      if (value == "enum") {
        cx.marked = "keyword";return cont(enumdef);
      }
      return pass(pattern, maybetype, maybeAssign, vardefCont);
    }
    function pattern(type, value) {
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";return cont(pattern);
      }
      if (type == "variable") {
        register(value);return cont();
      }
      if (type == "spread") return cont(pattern);
      if (type == "[") return contCommasep(pattern, "]");
      if (type == "{") return contCommasep(proppattern, "}");
    }
    function proppattern(type, value) {
      if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
        register(value);
        return cont(maybeAssign);
      }
      if (type == "variable") cx.marked = "property";
      if (type == "spread") return cont(pattern);
      if (type == "}") return pass();
      return cont(expect(":"), pattern, maybeAssign);
    }
    function maybeAssign(_type, value) {
      if (value == "=") return cont(expressionNoComma);
    }
    function vardefCont(type) {
      if (type == ",") return cont(vardef);
    }
    function maybeelse(type, value) {
      if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
    }
    function forspec(type, value) {
      if (value == "await") return cont(forspec);
      if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
    }
    function forspec1(type) {
      if (type == "var") return cont(vardef, expect(";"), forspec2);
      if (type == ";") return cont(forspec2);
      if (type == "variable") return cont(formaybeinof);
      return pass(expression, expect(";"), forspec2);
    }
    function formaybeinof(_type, value) {
      if (value == "in" || value == "of") {
        cx.marked = "keyword";return cont(expression);
      }
      return cont(maybeoperatorComma, forspec2);
    }
    function forspec2(type, value) {
      if (type == ";") return cont(forspec3);
      if (value == "in" || value == "of") {
        cx.marked = "keyword";return cont(expression);
      }
      return pass(expression, expect(";"), forspec3);
    }
    function forspec3(type) {
      if (type != ")") cont(expression);
    }
    function functiondef(type, value) {
      if (value == "*") {
        cx.marked = "keyword";return cont(functiondef);
      }
      if (type == "variable") {
        register(value);return cont(functiondef);
      }
      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
      if (isTS && value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
    }
    function funarg(type, value) {
      if (value == "@") cont(expression, funarg);
      if (type == "spread") return cont(funarg);
      if (isTS && isModifier(value)) {
        cx.marked = "keyword";return cont(funarg);
      }
      return pass(pattern, maybetype, maybeAssign);
    }
    function classExpression(type, value) {
      // Class expressions may have an optional name.
      if (type == "variable") return className(type, value);
      return classNameAfter(type, value);
    }
    function className(type, value) {
      if (type == "variable") {
        register(value);return cont(classNameAfter);
      }
    }
    function classNameAfter(type, value) {
      if (value == "<") return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
      if (value == "extends" || value == "implements" || isTS && type == ",") {
        if (value == "implements") cx.marked = "keyword";
        return cont(isTS ? typeexpr : expression, classNameAfter);
      }
      if (type == "{") return cont(pushlex("}"), classBody, poplex);
    }
    function classBody(type, value) {
      if (type == "async" || type == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (type == "variable" || cx.style == "keyword") {
        cx.marked = "property";
        return cont(isTS ? classfield : functiondef, classBody);
      }
      if (type == "[") return cont(expression, maybetype, expect("]"), isTS ? classfield : functiondef, classBody);
      if (value == "*") {
        cx.marked = "keyword";
        return cont(classBody);
      }
      if (type == ";") return cont(classBody);
      if (type == "}") return cont();
      if (value == "@") return cont(expression, classBody);
    }
    function classfield(type, value) {
      if (value == "?") return cont(classfield);
      if (type == ":") return cont(typeexpr, maybeAssign);
      if (value == "=") return cont(expressionNoComma);
      return pass(functiondef);
    }
    function afterExport(type, value) {
      if (value == "*") {
        cx.marked = "keyword";return cont(maybeFrom, expect(";"));
      }
      if (value == "default") {
        cx.marked = "keyword";return cont(expression, expect(";"));
      }
      if (type == "{") return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
      return pass(statement);
    }
    function exportField(type, value) {
      if (value == "as") {
        cx.marked = "keyword";return cont(expect("variable"));
      }
      if (type == "variable") return pass(expressionNoComma, exportField);
    }
    function afterImport(type) {
      if (type == "string") return cont();
      if (type == "(") return pass(expression);
      return pass(importSpec, maybeMoreImports, maybeFrom);
    }
    function importSpec(type, value) {
      if (type == "{") return contCommasep(importSpec, "}");
      if (type == "variable") register(value);
      if (value == "*") cx.marked = "keyword";
      return cont(maybeAs);
    }
    function maybeMoreImports(type) {
      if (type == ",") return cont(importSpec, maybeMoreImports);
    }
    function maybeAs(_type, value) {
      if (value == "as") {
        cx.marked = "keyword";return cont(importSpec);
      }
    }
    function maybeFrom(_type, value) {
      if (value == "from") {
        cx.marked = "keyword";return cont(expression);
      }
    }
    function arrayLiteral(type) {
      if (type == "]") return cont();
      return pass(commasep(expressionNoComma, "]"));
    }
    function enumdef() {
      return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
    }
    function enummember() {
      return pass(pattern, maybeAssign);
    }

    function isContinuedStatement(state, textAfter) {
      return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
    }

    function expressionAllowed(stream, state, backUp) {
      return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
    }

    // Interface

    return {
      startState: function (basecolumn) {
        var state = {
          tokenize: tokenBase,
          lastType: "sof",
          cc: [],
          lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
          localVars: parserConfig.localVars,
          context: parserConfig.localVars && { vars: parserConfig.localVars },
          indented: basecolumn || 0
        };
        if (parserConfig.globalVars && typeof parserConfig.globalVars == "object") state.globalVars = parserConfig.globalVars;
        return state;
      },

      token: function (stream, state) {
        if (stream.sol()) {
          if (!state.lexical.hasOwnProperty("align")) state.lexical.align = false;
          state.indented = stream.indentation();
          findFatArrow(stream, state);
        }
        if (state.tokenize != tokenComment && stream.eatSpace()) return null;
        var style = state.tokenize(stream, state);
        if (type == "comment") return style;
        state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
        return parseJS(state, style, type, content, stream);
      },

      indent: function (state, textAfter) {
        if (state.tokenize == tokenComment) return CodeMirror.Pass;
        if (state.tokenize != tokenBase) return 0;
        var firstChar = textAfter && textAfter.charAt(0),
            lexical = state.lexical,
            top;
        // Kludge to prevent 'maybelse' from blocking lexical scope pops
        if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
          var c = state.cc[i];
          if (c == poplex) lexical = lexical.prev;else if (c != maybeelse) break;
        }
        while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter))) lexical = lexical.prev;
        if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat") lexical = lexical.prev;
        var type = lexical.type,
            closing = firstChar == type;

        if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);else if (type == "form" && firstChar == "{") return lexical.indented;else if (type == "form") return lexical.indented + indentUnit;else if (type == "stat") return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false) return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);else if (lexical.align) return lexical.column + (closing ? 0 : 1);else return lexical.indented + (closing ? 0 : indentUnit);
      },

      electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
      blockCommentStart: jsonMode ? null : "/*",
      blockCommentEnd: jsonMode ? null : "*/",
      blockCommentContinue: jsonMode ? null : " * ",
      lineComment: jsonMode ? null : "//",
      fold: "brace",
      closeBrackets: "()[]{}''\"\"``",

      helperType: jsonMode ? "json" : "javascript",
      jsonldMode: jsonldMode,
      jsonMode: jsonMode,

      expressionAllowed: expressionAllowed,

      skipExpression: function (state) {
        var top = state.cc[state.cc.length - 1];
        if (top == expression || top == expressionNoComma) state.cc.pop();
      }
    };
  });

  CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);

  CodeMirror.defineMIME("text/javascript", "javascript");
  CodeMirror.defineMIME("text/ecmascript", "javascript");
  CodeMirror.defineMIME("application/javascript", "javascript");
  CodeMirror.defineMIME("application/x-javascript", "javascript");
  CodeMirror.defineMIME("application/ecmascript", "javascript");
  CodeMirror.defineMIME("application/json", { name: "javascript", json: true });
  CodeMirror.defineMIME("application/x-json", { name: "javascript", json: true });
  CodeMirror.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
  CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
  CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
});

/***/ }),

/***/ "../../node_modules/codemirror/mode/xml/xml.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/mode/xml/xml.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (true) // CommonJS
    mod(__webpack_require__(/*! ../../lib/codemirror */ "../../node_modules/codemirror/lib/codemirror.js"));else {}
})(function (CodeMirror) {
  "use strict";

  var htmlConfig = {
    autoSelfClosers: { 'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
      'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
      'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
      'track': true, 'wbr': true, 'menuitem': true },
    implicitlyClosed: { 'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
      'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
      'th': true, 'tr': true },
    contextGrabbers: {
      'dd': { 'dd': true, 'dt': true },
      'dt': { 'dd': true, 'dt': true },
      'li': { 'li': true },
      'option': { 'option': true, 'optgroup': true },
      'optgroup': { 'optgroup': true },
      'p': { 'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
        'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
        'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
        'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
        'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true },
      'rp': { 'rp': true, 'rt': true },
      'rt': { 'rp': true, 'rt': true },
      'tbody': { 'tbody': true, 'tfoot': true },
      'td': { 'td': true, 'th': true },
      'tfoot': { 'tbody': true },
      'th': { 'td': true, 'th': true },
      'thead': { 'tbody': true, 'tfoot': true },
      'tr': { 'tr': true }
    },
    doNotIndent: { "pre": true },
    allowUnquoted: true,
    allowMissing: true,
    caseFold: true
  };

  var xmlConfig = {
    autoSelfClosers: {},
    implicitlyClosed: {},
    contextGrabbers: {},
    doNotIndent: {},
    allowUnquoted: false,
    allowMissing: false,
    allowMissingTagName: false,
    caseFold: false
  };

  CodeMirror.defineMode("xml", function (editorConf, config_) {
    var indentUnit = editorConf.indentUnit;
    var config = {};
    var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
    for (var prop in defaults) config[prop] = defaults[prop];
    for (var prop in config_) config[prop] = config_[prop];

    // Return variables for tokenizers
    var type, setStyle;

    function inText(stream, state) {
      function chain(parser) {
        state.tokenize = parser;
        return parser(stream, state);
      }

      var ch = stream.next();
      if (ch == "<") {
        if (stream.eat("!")) {
          if (stream.eat("[")) {
            if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));else return null;
          } else if (stream.match("--")) {
            return chain(inBlock("comment", "-->"));
          } else if (stream.match("DOCTYPE", true, true)) {
            stream.eatWhile(/[\w\._\-]/);
            return chain(doctype(1));
          } else {
            return null;
          }
        } else if (stream.eat("?")) {
          stream.eatWhile(/[\w\._\-]/);
          state.tokenize = inBlock("meta", "?>");
          return "meta";
        } else {
          type = stream.eat("/") ? "closeTag" : "openTag";
          state.tokenize = inTag;
          return "tag bracket";
        }
      } else if (ch == "&") {
        var ok;
        if (stream.eat("#")) {
          if (stream.eat("x")) {
            ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
          } else {
            ok = stream.eatWhile(/[\d]/) && stream.eat(";");
          }
        } else {
          ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
        }
        return ok ? "atom" : "error";
      } else {
        stream.eatWhile(/[^&<]/);
        return null;
      }
    }
    inText.isInText = true;

    function inTag(stream, state) {
      var ch = stream.next();
      if (ch == ">" || ch == "/" && stream.eat(">")) {
        state.tokenize = inText;
        type = ch == ">" ? "endTag" : "selfcloseTag";
        return "tag bracket";
      } else if (ch == "=") {
        type = "equals";
        return null;
      } else if (ch == "<") {
        state.tokenize = inText;
        state.state = baseState;
        state.tagName = state.tagStart = null;
        var next = state.tokenize(stream, state);
        return next ? next + " tag error" : "tag error";
      } else if (/[\'\"]/.test(ch)) {
        state.tokenize = inAttribute(ch);
        state.stringStartCol = stream.column();
        return state.tokenize(stream, state);
      } else {
        stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
        return "word";
      }
    }

    function inAttribute(quote) {
      var closure = function (stream, state) {
        while (!stream.eol()) {
          if (stream.next() == quote) {
            state.tokenize = inTag;
            break;
          }
        }
        return "string";
      };
      closure.isInAttribute = true;
      return closure;
    }

    function inBlock(style, terminator) {
      return function (stream, state) {
        while (!stream.eol()) {
          if (stream.match(terminator)) {
            state.tokenize = inText;
            break;
          }
          stream.next();
        }
        return style;
      };
    }
    function doctype(depth) {
      return function (stream, state) {
        var ch;
        while ((ch = stream.next()) != null) {
          if (ch == "<") {
            state.tokenize = doctype(depth + 1);
            return state.tokenize(stream, state);
          } else if (ch == ">") {
            if (depth == 1) {
              state.tokenize = inText;
              break;
            } else {
              state.tokenize = doctype(depth - 1);
              return state.tokenize(stream, state);
            }
          }
        }
        return "meta";
      };
    }

    function Context(state, tagName, startOfLine) {
      this.prev = state.context;
      this.tagName = tagName;
      this.indent = state.indented;
      this.startOfLine = startOfLine;
      if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent) this.noIndent = true;
    }
    function popContext(state) {
      if (state.context) state.context = state.context.prev;
    }
    function maybePopContext(state, nextTagName) {
      var parentTagName;
      while (true) {
        if (!state.context) {
          return;
        }
        parentTagName = state.context.tagName;
        if (!config.contextGrabbers.hasOwnProperty(parentTagName) || !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
          return;
        }
        popContext(state);
      }
    }

    function baseState(type, stream, state) {
      if (type == "openTag") {
        state.tagStart = stream.column();
        return tagNameState;
      } else if (type == "closeTag") {
        return closeTagNameState;
      } else {
        return baseState;
      }
    }
    function tagNameState(type, stream, state) {
      if (type == "word") {
        state.tagName = stream.current();
        setStyle = "tag";
        return attrState;
      } else if (config.allowMissingTagName && type == "endTag") {
        setStyle = "tag bracket";
        return attrState(type, stream, state);
      } else {
        setStyle = "error";
        return tagNameState;
      }
    }
    function closeTagNameState(type, stream, state) {
      if (type == "word") {
        var tagName = stream.current();
        if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(state.context.tagName)) popContext(state);
        if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
          setStyle = "tag";
          return closeState;
        } else {
          setStyle = "tag error";
          return closeStateErr;
        }
      } else if (config.allowMissingTagName && type == "endTag") {
        setStyle = "tag bracket";
        return closeState(type, stream, state);
      } else {
        setStyle = "error";
        return closeStateErr;
      }
    }

    function closeState(type, _stream, state) {
      if (type != "endTag") {
        setStyle = "error";
        return closeState;
      }
      popContext(state);
      return baseState;
    }
    function closeStateErr(type, stream, state) {
      setStyle = "error";
      return closeState(type, stream, state);
    }

    function attrState(type, _stream, state) {
      if (type == "word") {
        setStyle = "attribute";
        return attrEqState;
      } else if (type == "endTag" || type == "selfcloseTag") {
        var tagName = state.tagName,
            tagStart = state.tagStart;
        state.tagName = state.tagStart = null;
        if (type == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(tagName)) {
          maybePopContext(state, tagName);
        } else {
          maybePopContext(state, tagName);
          state.context = new Context(state, tagName, tagStart == state.indented);
        }
        return baseState;
      }
      setStyle = "error";
      return attrState;
    }
    function attrEqState(type, stream, state) {
      if (type == "equals") return attrValueState;
      if (!config.allowMissing) setStyle = "error";
      return attrState(type, stream, state);
    }
    function attrValueState(type, stream, state) {
      if (type == "string") return attrContinuedState;
      if (type == "word" && config.allowUnquoted) {
        setStyle = "string";return attrState;
      }
      setStyle = "error";
      return attrState(type, stream, state);
    }
    function attrContinuedState(type, stream, state) {
      if (type == "string") return attrContinuedState;
      return attrState(type, stream, state);
    }

    return {
      startState: function (baseIndent) {
        var state = { tokenize: inText,
          state: baseState,
          indented: baseIndent || 0,
          tagName: null, tagStart: null,
          context: null };
        if (baseIndent != null) state.baseIndent = baseIndent;
        return state;
      },

      token: function (stream, state) {
        if (!state.tagName && stream.sol()) state.indented = stream.indentation();

        if (stream.eatSpace()) return null;
        type = null;
        var style = state.tokenize(stream, state);
        if ((style || type) && style != "comment") {
          setStyle = null;
          state.state = state.state(type || style, stream, state);
          if (setStyle) style = setStyle == "error" ? style + " error" : setStyle;
        }
        return style;
      },

      indent: function (state, textAfter, fullLine) {
        var context = state.context;
        // Indent multi-line strings (e.g. css).
        if (state.tokenize.isInAttribute) {
          if (state.tagStart == state.indented) return state.stringStartCol + 1;else return state.indented + indentUnit;
        }
        if (context && context.noIndent) return CodeMirror.Pass;
        if (state.tokenize != inTag && state.tokenize != inText) return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
        // Indent the starts of attribute names.
        if (state.tagName) {
          if (config.multilineTagIndentPastTag !== false) return state.tagStart + state.tagName.length + 2;else return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
        }
        if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
        var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
        if (tagAfter && tagAfter[1]) {
          // Closing tag spotted
          while (context) {
            if (context.tagName == tagAfter[2]) {
              context = context.prev;
              break;
            } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
              context = context.prev;
            } else {
              break;
            }
          }
        } else if (tagAfter) {
          // Opening tag spotted
          while (context) {
            var grabbers = config.contextGrabbers[context.tagName];
            if (grabbers && grabbers.hasOwnProperty(tagAfter[2])) context = context.prev;else break;
          }
        }
        while (context && context.prev && !context.startOfLine) context = context.prev;
        if (context) return context.indent + indentUnit;else return state.baseIndent || 0;
      },

      electricInput: /<\/[\s\w:]+>$/,
      blockCommentStart: "<!--",
      blockCommentEnd: "-->",

      configuration: config.htmlMode ? "html" : "xml",
      helperType: config.htmlMode ? "html" : "xml",

      skipAttribute: function (state) {
        if (state.state == attrValueState) state.state = attrState;
      }
    };
  });

  CodeMirror.defineMIME("text/xml", "xml");
  CodeMirror.defineMIME("application/xml", "xml");
  if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) CodeMirror.defineMIME("text/html", { name: "xml", htmlMode: true });
});

/***/ }),

/***/ "../../node_modules/codemirror/theme/base16-dark.css":
/*!*******************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/theme/base16-dark.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--6-1!./base16-dark.css */ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/theme/base16-dark.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../node_modules/component-bind/index.js":
/*!**********************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/component-bind/index.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function (obj, fn) {
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function () {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
};

/***/ }),

/***/ "../../node_modules/component-emitter/index.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/component-emitter/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function (event, fn) {
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1),
      callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function (event) {
  return !!this.listeners(event).length;
};

/***/ }),

/***/ "../../node_modules/component-inherit/index.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/component-inherit/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


module.exports = function (a, b) {
  var fn = function () {};
  fn.prototype = b.prototype;
  a.prototype = new fn();
  a.prototype.constructor = a;
};

/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/addon/scroll/simplescrollbars.css":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!/home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/addon/scroll/simplescrollbars.css ***!
  \*******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".CodeMirror-simplescroll-horizontal div, .CodeMirror-simplescroll-vertical div {\n  position: absolute;\n  background: #ccc;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 1px solid #bbb;\n  border-radius: 2px;\n}\n\n.CodeMirror-simplescroll-horizontal, .CodeMirror-simplescroll-vertical {\n  position: absolute;\n  z-index: 6;\n  background: #eee;\n}\n\n.CodeMirror-simplescroll-horizontal {\n  bottom: 0; left: 0;\n  height: 8px;\n}\n.CodeMirror-simplescroll-horizontal div {\n  bottom: 0;\n  height: 100%;\n}\n\n.CodeMirror-simplescroll-vertical {\n  right: 0; top: 0;\n  width: 8px;\n}\n.CodeMirror-simplescroll-vertical div {\n  right: 0;\n  width: 100%;\n}\n\n\n.CodeMirror-overlayscroll .CodeMirror-scrollbar-filler, .CodeMirror-overlayscroll .CodeMirror-gutter-filler {\n  display: none;\n}\n\n.CodeMirror-overlayscroll-horizontal div, .CodeMirror-overlayscroll-vertical div {\n  position: absolute;\n  background: #bcd;\n  border-radius: 3px;\n}\n\n.CodeMirror-overlayscroll-horizontal, .CodeMirror-overlayscroll-vertical {\n  position: absolute;\n  z-index: 6;\n}\n\n.CodeMirror-overlayscroll-horizontal {\n  bottom: 0; left: 0;\n  height: 6px;\n}\n.CodeMirror-overlayscroll-horizontal div {\n  bottom: 0;\n  height: 100%;\n}\n\n.CodeMirror-overlayscroll-vertical {\n  right: 0; top: 0;\n  width: 6px;\n}\n.CodeMirror-overlayscroll-vertical div {\n  right: 0;\n  width: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/lib/codemirror.css":
/*!****************************************************************************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!/home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/lib/codemirror.css ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* BASICS */\n\n.CodeMirror {\n  /* Set height, width, borders, and global font properties here */\n  font-family: monospace;\n  height: 300px;\n  color: black;\n  direction: ltr;\n}\n\n/* PADDING */\n\n.CodeMirror-lines {\n  padding: 4px 0; /* Vertical padding around content */\n}\n.CodeMirror pre {\n  padding: 0 4px; /* Horizontal padding of content */\n}\n\n.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  background-color: white; /* The little square between H and V scrollbars */\n}\n\n/* GUTTER */\n\n.CodeMirror-gutters {\n  border-right: 1px solid #ddd;\n  background-color: #f7f7f7;\n  white-space: nowrap;\n}\n.CodeMirror-linenumbers {}\n.CodeMirror-linenumber {\n  padding: 0 3px 0 5px;\n  min-width: 20px;\n  text-align: right;\n  color: #999;\n  white-space: nowrap;\n}\n\n.CodeMirror-guttermarker { color: black; }\n.CodeMirror-guttermarker-subtle { color: #999; }\n\n/* CURSOR */\n\n.CodeMirror-cursor {\n  border-left: 1px solid black;\n  border-right: none;\n  width: 0;\n}\n/* Shown when moving in bi-directional text */\n.CodeMirror div.CodeMirror-secondarycursor {\n  border-left: 1px solid silver;\n}\n.cm-fat-cursor .CodeMirror-cursor {\n  width: auto;\n  border: 0 !important;\n  background: #7e7;\n}\n.cm-fat-cursor div.CodeMirror-cursors {\n  z-index: 1;\n}\n.cm-fat-cursor-mark {\n  background-color: rgba(20, 255, 20, 0.5);\n  -webkit-animation: blink 1.06s steps(1) infinite;\n  -moz-animation: blink 1.06s steps(1) infinite;\n  animation: blink 1.06s steps(1) infinite;\n}\n.cm-animate-fat-cursor {\n  width: auto;\n  border: 0;\n  -webkit-animation: blink 1.06s steps(1) infinite;\n  -moz-animation: blink 1.06s steps(1) infinite;\n  animation: blink 1.06s steps(1) infinite;\n  background-color: #7e7;\n}\n@-moz-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@-webkit-keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n@keyframes blink {\n  0% {}\n  50% { background-color: transparent; }\n  100% {}\n}\n\n/* Can style cursor different in overwrite (non-insert) mode */\n.CodeMirror-overwrite .CodeMirror-cursor {}\n\n.cm-tab { display: inline-block; text-decoration: inherit; }\n\n.CodeMirror-rulers {\n  position: absolute;\n  left: 0; right: 0; top: -50px; bottom: -20px;\n  overflow: hidden;\n}\n.CodeMirror-ruler {\n  border-left: 1px solid #ccc;\n  top: 0; bottom: 0;\n  position: absolute;\n}\n\n/* DEFAULT THEME */\n\n.cm-s-default .cm-header {color: blue;}\n.cm-s-default .cm-quote {color: #090;}\n.cm-negative {color: #d44;}\n.cm-positive {color: #292;}\n.cm-header, .cm-strong {font-weight: bold;}\n.cm-em {font-style: italic;}\n.cm-link {text-decoration: underline;}\n.cm-strikethrough {text-decoration: line-through;}\n\n.cm-s-default .cm-keyword {color: #708;}\n.cm-s-default .cm-atom {color: #219;}\n.cm-s-default .cm-number {color: #164;}\n.cm-s-default .cm-def {color: #00f;}\n.cm-s-default .cm-variable,\n.cm-s-default .cm-punctuation,\n.cm-s-default .cm-property,\n.cm-s-default .cm-operator {}\n.cm-s-default .cm-variable-2 {color: #05a;}\n.cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}\n.cm-s-default .cm-comment {color: #a50;}\n.cm-s-default .cm-string {color: #a11;}\n.cm-s-default .cm-string-2 {color: #f50;}\n.cm-s-default .cm-meta {color: #555;}\n.cm-s-default .cm-qualifier {color: #555;}\n.cm-s-default .cm-builtin {color: #30a;}\n.cm-s-default .cm-bracket {color: #997;}\n.cm-s-default .cm-tag {color: #170;}\n.cm-s-default .cm-attribute {color: #00c;}\n.cm-s-default .cm-hr {color: #999;}\n.cm-s-default .cm-link {color: #00c;}\n\n.cm-s-default .cm-error {color: #f00;}\n.cm-invalidchar {color: #f00;}\n\n.CodeMirror-composing { border-bottom: 2px solid; }\n\n/* Default styles for common addons */\n\ndiv.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}\ndiv.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}\n.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }\n.CodeMirror-activeline-background {background: #e8f2ff;}\n\n/* STOP */\n\n/* The rest of this file contains styles related to the mechanics of\n   the editor. You probably shouldn't touch them. */\n\n.CodeMirror {\n  position: relative;\n  overflow: hidden;\n  background: white;\n}\n\n.CodeMirror-scroll {\n  overflow: scroll !important; /* Things will break if this is overridden */\n  /* 30px is the magic margin used to hide the element's real scrollbars */\n  /* See overflow: hidden in .CodeMirror */\n  margin-bottom: -30px; margin-right: -30px;\n  padding-bottom: 30px;\n  height: 100%;\n  outline: none; /* Prevent dragging from highlighting the element */\n  position: relative;\n}\n.CodeMirror-sizer {\n  position: relative;\n  border-right: 30px solid transparent;\n}\n\n/* The fake, visible scrollbars. Used to force redraw during scrolling\n   before actual scrolling happens, thus preventing shaking and\n   flickering artifacts. */\n.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {\n  position: absolute;\n  z-index: 6;\n  display: none;\n}\n.CodeMirror-vscrollbar {\n  right: 0; top: 0;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.CodeMirror-hscrollbar {\n  bottom: 0; left: 0;\n  overflow-y: hidden;\n  overflow-x: scroll;\n}\n.CodeMirror-scrollbar-filler {\n  right: 0; bottom: 0;\n}\n.CodeMirror-gutter-filler {\n  left: 0; bottom: 0;\n}\n\n.CodeMirror-gutters {\n  position: absolute; left: 0; top: 0;\n  min-height: 100%;\n  z-index: 3;\n}\n.CodeMirror-gutter {\n  white-space: normal;\n  height: 100%;\n  display: inline-block;\n  vertical-align: top;\n  margin-bottom: -30px;\n}\n.CodeMirror-gutter-wrapper {\n  position: absolute;\n  z-index: 4;\n  background: none !important;\n  border: none !important;\n}\n.CodeMirror-gutter-background {\n  position: absolute;\n  top: 0; bottom: 0;\n  z-index: 4;\n}\n.CodeMirror-gutter-elt {\n  position: absolute;\n  cursor: default;\n  z-index: 4;\n}\n.CodeMirror-gutter-wrapper ::selection { background-color: transparent }\n.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }\n\n.CodeMirror-lines {\n  cursor: text;\n  min-height: 1px; /* prevents collapsing before first draw */\n}\n.CodeMirror pre {\n  /* Reset some styles that the rest of the page might have set */\n  -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;\n  border-width: 0;\n  background: transparent;\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n  white-space: pre;\n  word-wrap: normal;\n  line-height: inherit;\n  color: inherit;\n  z-index: 2;\n  position: relative;\n  overflow: visible;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-font-variant-ligatures: contextual;\n  font-variant-ligatures: contextual;\n}\n.CodeMirror-wrap pre {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  word-break: normal;\n}\n\n.CodeMirror-linebackground {\n  position: absolute;\n  left: 0; right: 0; top: 0; bottom: 0;\n  z-index: 0;\n}\n\n.CodeMirror-linewidget {\n  position: relative;\n  z-index: 2;\n  padding: 0.1px; /* Force widget margins to stay inside of the container */\n}\n\n.CodeMirror-widget {}\n\n.CodeMirror-rtl pre { direction: rtl; }\n\n.CodeMirror-code {\n  outline: none;\n}\n\n/* Force content-box sizing for the elements where we expect it */\n.CodeMirror-scroll,\n.CodeMirror-sizer,\n.CodeMirror-gutter,\n.CodeMirror-gutters,\n.CodeMirror-linenumber {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n}\n\n.CodeMirror-measure {\n  position: absolute;\n  width: 100%;\n  height: 0;\n  overflow: hidden;\n  visibility: hidden;\n}\n\n.CodeMirror-cursor {\n  position: absolute;\n  pointer-events: none;\n}\n.CodeMirror-measure pre { position: static; }\n\ndiv.CodeMirror-cursors {\n  visibility: hidden;\n  position: relative;\n  z-index: 3;\n}\ndiv.CodeMirror-dragcursors {\n  visibility: visible;\n}\n\n.CodeMirror-focused div.CodeMirror-cursors {\n  visibility: visible;\n}\n\n.CodeMirror-selected { background: #d9d9d9; }\n.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }\n.CodeMirror-crosshair { cursor: crosshair; }\n.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }\n.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }\n\n.cm-searching {\n  background-color: #ffa;\n  background-color: rgba(255, 255, 0, .4);\n}\n\n/* Used to force a border model for a node */\n.cm-force-border { padding-right: .1px; }\n\n@media print {\n  /* Hide the cursor when printing */\n  .CodeMirror div.CodeMirror-cursors {\n    visibility: hidden;\n  }\n}\n\n/* See issue #2901 */\n.cm-tab-wrap-hack:after { content: ''; }\n\n/* Help users use markselection to safely style text background */\nspan.CodeMirror-selectedtext { background: none; }\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!../../node_modules/codemirror/theme/base16-dark.css":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!/home/qualphey/Development/teisine_apsauga/cmbird/node_modules/codemirror/theme/base16-dark.css ***!
  \*******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n\n    Name:       Base16 Default Dark\n    Author:     Chris Kempson (http://chriskempson.com)\n\n    CodeMirror template by Jan T. Sott (https://github.com/idleberg/base16-codemirror)\n    Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16)\n\n*/\n\n.cm-s-base16-dark.CodeMirror { background: #151515; color: #e0e0e0; }\n.cm-s-base16-dark div.CodeMirror-selected { background: #303030; }\n.cm-s-base16-dark .CodeMirror-line::selection, .cm-s-base16-dark .CodeMirror-line > span::selection, .cm-s-base16-dark .CodeMirror-line > span > span::selection { background: rgba(48, 48, 48, .99); }\n.cm-s-base16-dark .CodeMirror-line::-moz-selection, .cm-s-base16-dark .CodeMirror-line > span::-moz-selection, .cm-s-base16-dark .CodeMirror-line > span > span::-moz-selection { background: rgba(48, 48, 48, .99); }\n.cm-s-base16-dark .CodeMirror-gutters { background: #151515; border-right: 0px; }\n.cm-s-base16-dark .CodeMirror-guttermarker { color: #ac4142; }\n.cm-s-base16-dark .CodeMirror-guttermarker-subtle { color: #505050; }\n.cm-s-base16-dark .CodeMirror-linenumber { color: #505050; }\n.cm-s-base16-dark .CodeMirror-cursor { border-left: 1px solid #b0b0b0; }\n\n.cm-s-base16-dark span.cm-comment { color: #8f5536; }\n.cm-s-base16-dark span.cm-atom { color: #aa759f; }\n.cm-s-base16-dark span.cm-number { color: #aa759f; }\n\n.cm-s-base16-dark span.cm-property, .cm-s-base16-dark span.cm-attribute { color: #90a959; }\n.cm-s-base16-dark span.cm-keyword { color: #ac4142; }\n.cm-s-base16-dark span.cm-string { color: #f4bf75; }\n\n.cm-s-base16-dark span.cm-variable { color: #90a959; }\n.cm-s-base16-dark span.cm-variable-2 { color: #6a9fb5; }\n.cm-s-base16-dark span.cm-def { color: #d28445; }\n.cm-s-base16-dark span.cm-bracket { color: #e0e0e0; }\n.cm-s-base16-dark span.cm-tag { color: #ac4142; }\n.cm-s-base16-dark span.cm-link { color: #aa759f; }\n.cm-s-base16-dark span.cm-error { background: #ac4142; color: #b0b0b0; }\n\n.cm-s-base16-dark .CodeMirror-activeline-background { background: #202020; }\n.cm-s-base16-dark .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/codemirror.ui/noscroll.css":
/*!*********************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/codemirror.ui/noscroll.css ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.CodeMirror {\n  /* Set height, width, borders, and global font properties here */\n  min-width: 100%;\n  width: fit-content;\n\n  min-height: 100%;\n  height: fit-content;\n\n  font-family: monospace;\n  color: black;\n  direction: ltr;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/editor.ui/theme.css":
/*!**************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/editor.ui/theme.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.treefm {\n  height: calc(100% - 34px);\n}\n\n.global_local_switch {\n  height: 30px;\n}\n\n.webpack_button {\n  color: transparent;\n  border: 1px solid #0000;\n  background-color: transparent;\n  background-image: url('res/webpack.png');\n  width: 30px;\n  height: 30px;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: contain;\n}\n\n.webpack_button:hover {\n  background-color: transparent;\n  border: 1px solid #BBB;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/split.ui/theme.css":
/*!*************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/split.ui/theme.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.split_ui {\n  width: 100%;\n  height: 100%;\n}\n\n.split_ui_horizontal {\n  display: inline-block;\n  overflow: auto;\n  height: 100%;\n}\n\n.split_ui_horizontal_line {\n  display: inline-block;\n  background-color: #000;\n  width: 3px;\n  height: 100%;\n  cursor: col-resize;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/tabs.ui/horz.css":
/*!***********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/tabs.ui/horz.css ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".tabs_ui_container {\n  height: 100%;\n}\n\n.tabs_ui_container .tabs_ui_menu {\n  display: block;\n  margin: 0 auto;\n  list-style-type: none;\n  padding: 0;\n}\n\n.tabs_ui_display {\n  overflow: auto;\n}\n\n.tabs_ui_menu_item {\n  display: inline-block;\n  background-color: #111;\n  color: #DDD;\n\n  cursor: default;\n\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n   -khtml-user-select: none; /* Konqueror HTML */\n     -moz-user-select: none; /* Firefox */\n      -ms-user-select: none; /* Internet Explorer/Edge */\n          user-select: none; /* Non-prefixed version, currently\n                                supported by Chrome and Opera */\n}\n\n.tabs_ui_menu_item div {\n  display: inline-block;\n  padding: 3px 10px;\n  font-size: 14px;\n}\n\n.tabs_ui_menu_item button {\n  display: inline-block;\n  padding: 3px 5px;\n  font-size: 14px;\n  border: 0;\n  color: #DDD;\n  background-color: transparent;\n}\n\n.tabs_ui_menu_item div:hover, .tabs_ui_menu_item button:hover {\n  background-color: #222;\n}\n\n.tabs_ui_selected {\n  background-color: #151515;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/theme.css":
/*!****************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/theme.css ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "body {\n  overflow: hidden;\n}\n\n.tools {\n  position: fixed;\n  bottom: 0;\n  right: 100px;\n}\n\n.tools button {\n  width: 64px;\n  height: 32px;\n}\n\nbutton {\n  background-color: #222;\n  color: #FFF;\n  border: 1px solid #444;\n}\n\nbutton:hover {\n  background-color: #111;\n}\n\n.edit_switch {\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/treefm.ui/style.css":
/*!**************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/treefm.ui/style.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".treefm {\n  background-color: #111;\n  font-size: 14px;\n  padding: 2px;\n  user-select: none;\n}\n\n.treefm_dir_content {\n  display: none;\n}\n\n.treefm_item {\n  color: #DDD;\n  padding: 2px 10px;\n  white-space: nowrap;\n}\n\n.treefm_item:hover, .treefm_contexmenu div:hover {\n  background-color: #1C1C1C;\n  cursor: default;\n}\n\n.treefm_contexmenu {\n  display: none;\n  position: fixed;\n  background-color: #090909;\n  color: #DDD;\n  cursor: default;\n  font-size: 15px;\n  z-index: 2;\n}\n\n.treefm_contexmenu div {\n  padding: 2px 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/window.ui/sheet.css":
/*!**************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader??ref--6-1!./src/edit/window.ui/sheet.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".window_mod {\n  position: fixed;\n  top: 100px;\n  left: 100px;\n  padding: 0;\n\n  background-color: #000000dd;\n  border: 1px solid #333;\n\n  min-height: 150px;\n  min-width: 250px;\n}\n\n.window_mod header {\n  color: rgb(0, 201, 255);\n  height: 25px;\n  cursor: default;\n  -moz-user-select: none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  line-height: 25px;\n}\n\n.window_mod_titlebar {\n  float:left;\n  line-height: 25px;\n  display: inline-block;\n  padding: 0px 10px;\n  height: 100%;\n  width: calc(100% - 72px);\n}\n\n.window_mod header .window_mod_actions {\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 10px;\n  height: 100%;\n  line-height: 25px;\n  float:right;\n}\n\n.window_mod header button {\n  display: inline-block;\n  background-color: #111;\n  color: #FFF;\n  border: 1px solid #333;\n  margin: 0;\n  padding: 0;\n  width: 18px;\n  height: 18px;\n}\n\n.window_mod header button:hover {\n  background-color: #050505;\n}\n\n.window_mod .window_mod_content {\n  height: calc(100% - 25px);\n  overflow: auto;\n}\n\n/* Resz */\n\n.resizeN {\n  cursor: n-resize;\n  width: calc(100% - 16px);\n  height: 10px;\n  top: -10px;\n  left: 8px;\n}\n\n.resizeNE {\n  cursor: ne-resize;\n  width: 20px;\n  height: 20px;\n  right: -10px;\n  top: -10px;\n}\n\n.resizeE {\n  cursor: e-resize;\n  width: 10px;\n  height: calc(100% - 16px);\n  right: -10px;\n  top: 8px;\n}\n\n.resizeSE {\n  cursor: se-resize;\n  width: 20px;\n  height: 20px;\n  right: -10px;\n  bottom: -10px;\n}\n\n.resizeS {\n  cursor: s-resize;\n  width: calc(100% - 16px);\n  height: 10px;\n  bottom: -10px;\n  left: 8px;\n}\n\n.resizeSW {\n  cursor: sw-resize;\n  width: 20px;\n  height: 20px;\n  left: -10px;\n  bottom: -10px;\n}\n\n.resizeW {\n  cursor: w-resize;\n  width: 10px;\n  height: calc(100% - 16px);\n  left: -10px;\n  top: 8px;\n}\n\n.resizeNW {\n  cursor: nw-resize;\n  width: 20px;\n  height: 20px;\n  left: -10px;\n  top: -10px;\n}\n\n.resize {\n  position: absolute;\n/*  background-color: red;*/\n  z-index: 1;\n}\n\n.mouse_div {\n  position: absolute;\n  left: 0; top: 0; right: 0; bottom: 0;\n  z-index: 99;\n\n  display: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../node_modules/css-loader/lib/css-base.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/css-loader/lib/css-base.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ "../../node_modules/debug/src/browser.js":
/*!*******************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/debug/src/browser.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../../node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/debug/src/debug.js":
/*!*****************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/debug/src/debug.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../../node_modules/ms/index.js");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/index.js":
/*!****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


module.exports = __webpack_require__(/*! ./socket */ "../../node_modules/engine.io-client/lib/socket.js");

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/socket.js":
/*!*****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/socket.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var transports = __webpack_require__(/*! ./transports/index */ "../../node_modules/engine.io-client/lib/transports/index.js");
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:socket');
var index = __webpack_require__(/*! indexof */ "../../node_modules/indexof/index.js");
var parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");
var parseuri = __webpack_require__(/*! parseuri */ "../../node_modules/parseuri/index.js");
var parseqs = __webpack_require__(/*! parseqs */ "../../node_modules/parseqs/index.js");

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket(uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure : global.location && 'https:' === location.protocol;

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = __webpack_require__(/*! ./transport */ "../../node_modules/engine.io-client/lib/transport.js");
Socket.transports = __webpack_require__(/*! ./transports/index */ "../../node_modules/engine.io-client/lib/transports/index.js");
Socket.parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void 0
  });

  return transport;
};

function clone(obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport.on('drain', function () {
    self.onDrain();
  }).on('packet', function (packet) {
    self.onPacket(packet);
  }).on('error', function (e) {
    self.onError(e);
  }).on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen() {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport() {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror(err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose() {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose() {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade(to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup() {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || self.pingInterval + self.pingTimeout);
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close() {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose() {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade() {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transport.js":
/*!********************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transport.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport(opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transports/index.js":
/*!***************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transports/index.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies
 */

var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "../../node_modules/engine.io-client/lib/xmlhttprequest.js");
var XHR = __webpack_require__(/*! ./polling-xhr */ "../../node_modules/engine.io-client/lib/transports/polling-xhr.js");
var JSONP = __webpack_require__(/*! ./polling-jsonp */ "../../node_modules/engine.io-client/lib/transports/polling-jsonp.js");
var websocket = __webpack_require__(/*! ./websocket */ "../../node_modules/engine.io-client/lib/transports/websocket.js");

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling(opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transports/polling-jsonp.js":
/*!***********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transports/polling-jsonp.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module requirements.
 */

var Polling = __webpack_require__(/*! ./polling */ "../../node_modules/engine.io-client/lib/transports/polling.js");
var inherit = __webpack_require__(/*! component-inherit */ "../../node_modules/component-inherit/index.js");

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty() {}

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling(opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete() {
    initIframe();
    fn();
  }

  function initIframe() {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transports/polling-xhr.js":
/*!*********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transports/polling-xhr.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module requirements.
 */

var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "../../node_modules/engine.io-client/lib/xmlhttprequest.js");
var Polling = __webpack_require__(/*! ./polling */ "../../node_modules/engine.io-client/lib/transports/polling.js");
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");
var inherit = __webpack_require__(/*! component-inherit */ "../../node_modules/component-inherit/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty() {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR(opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname || port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request(opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    if (this.supportsBinary) {
      xhr.responseType = 'arraybuffer';
    }

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (contentType !== 'application/octet-stream') {
              xhr.responseType = 'text';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      if (this.xhr.responseType === 'arraybuffer') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
      }
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler() {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transports/polling.js":
/*!*****************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transports/polling.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Transport = __webpack_require__(/*! ../transport */ "../../node_modules/engine.io-client/lib/transport.js");
var parseqs = __webpack_require__(/*! parseqs */ "../../node_modules/parseqs/index.js");
var parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");
var inherit = __webpack_require__(/*! component-inherit */ "../../node_modules/component-inherit/index.js");
var yeast = __webpack_require__(/*! yeast */ "../../node_modules/yeast/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = function () {
  var XMLHttpRequest = __webpack_require__(/*! xmlhttprequest-ssl */ "../../node_modules/engine.io-client/lib/xmlhttprequest.js");
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
}();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause() {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close() {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/transports/websocket.js":
/*!*******************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/transports/websocket.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var Transport = __webpack_require__(/*! ../transport */ "../../node_modules/engine.io-client/lib/transport.js");
var parser = __webpack_require__(/*! engine.io-parser */ "../../node_modules/engine.io-parser/lib/browser.js");
var parseqs = __webpack_require__(/*! parseqs */ "../../node_modules/parseqs/index.js");
var inherit = __webpack_require__(/*! component-inherit */ "../../node_modules/component-inherit/index.js");
var yeast = __webpack_require__(/*! yeast */ "../../node_modules/yeast/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/engine.io-client/node_modules/debug/src/browser.js")('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = __webpack_require__(/*! ws */ 0);
  } catch (e) {}
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS(opts) {
  var forceBase64 = opts && opts.forceBase64;
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done() {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/lib/xmlhttprequest.js":
/*!*************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/lib/xmlhttprequest.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module

var hasCORS = __webpack_require__(/*! has-cors */ "../../node_modules/has-cors/index.js");

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {}

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) {}

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) {}
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/node_modules/debug/src/browser.js":
/*!*************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/node_modules/debug/src/browser.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../../node_modules/engine.io-client/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/engine.io-client/node_modules/debug/src/debug.js":
/*!***********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-client/node_modules/debug/src/debug.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../../node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "../../node_modules/engine.io-parser/lib/browser.js":
/*!******************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-parser/lib/browser.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Module dependencies.
 */

var keys = __webpack_require__(/*! ./keys */ "../../node_modules/engine.io-parser/lib/keys.js");
var hasBinary = __webpack_require__(/*! has-binary2 */ "../../node_modules/has-binary2/index.js");
var sliceBuffer = __webpack_require__(/*! arraybuffer.slice */ "../../node_modules/arraybuffer.slice/index.js");
var after = __webpack_require__(/*! after */ "../../node_modules/after/index.js");
var utf8 = __webpack_require__(/*! ./utf8 */ "../../node_modules/engine.io-parser/lib/utf8.js");

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = __webpack_require__(/*! base64-arraybuffer */ "../../node_modules/base64-arraybuffer/lib/base64-arraybuffer.js");
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
  open: 0 // non-ws
  , close: 1 // non-ws
  , ping: 2,
  pong: 3,
  message: 4,
  upgrade: 5,
  noop: 6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = __webpack_require__(/*! blob */ "../../node_modules/blob/index.js");

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);
};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i + 1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function () {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function (packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function () {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function (msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function (message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function (i, el, cb) {
    each(el, function (error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '',
      n,
      msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || length != (n = Number(length))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }
};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function (packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function (data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function (err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function (acc, p) {
      var len;
      if (typeof p === 'string') {
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function (p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) {
        // not true binary
        resultArray[bufferIndex++] = 0;
      } else {
        // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function (packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function (encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function (err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1;; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function (buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/engine.io-parser/lib/keys.js":
/*!***************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-parser/lib/keys.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys(obj) {
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

/***/ }),

/***/ "../../node_modules/engine.io-parser/lib/utf8.js":
/*!***************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/engine.io-parser/lib/utf8.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function (root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) {
			// 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) {
			// 2-byte sequence
			symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
		} else if ((codePoint & 0xFFFF0000) == 0) {
			// 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
			symbol += createByte(codePoint, 6);
		} else if ((codePoint & 0xFFE00000) == 0) {
			// 4-byte sequence
			symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = (byte1 & 0x1F) << 6 | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return utf8;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else { var key, hasOwnProperty, object; }
})(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/has-binary2/index.js":
/*!*******************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/has-binary2/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* global Blob File */

/*
 * Module requirements.
 */

var isArray = __webpack_require__(/*! isarray */ "../../node_modules/has-binary2/node_modules/isarray/index.js");

var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if (typeof global.Buffer === 'function' && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || typeof global.ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/has-binary2/node_modules/isarray/index.js":
/*!****************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/has-binary2/node_modules/isarray/index.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "../../node_modules/has-cors/index.js":
/*!****************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/has-cors/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

/***/ }),

/***/ "../../node_modules/indexof/index.js":
/*!***************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/indexof/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ "../../node_modules/ms/index.js":
/*!**********************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/ms/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),

/***/ "../../node_modules/parseqs/index.js":
/*!***************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/parseqs/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function (qs) {
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

/***/ }),

/***/ "../../node_modules/parseuri/index.js":
/*!****************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/parseuri/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

module.exports = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

/***/ }),

/***/ "../../node_modules/process/browser.js":
/*!*****************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/process/browser.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),

/***/ "../../node_modules/socket.io-client/lib/index.js":
/*!****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-client/lib/index.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var url = __webpack_require__(/*! ./url */ "../../node_modules/socket.io-client/lib/url.js");
var parser = __webpack_require__(/*! socket.io-parser */ "../../node_modules/socket.io-parser/index.js");
var Manager = __webpack_require__(/*! ./manager */ "../../node_modules/socket.io-client/lib/manager.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js")('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup(uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = __webpack_require__(/*! ./manager */ "../../node_modules/socket.io-client/lib/manager.js");
exports.Socket = __webpack_require__(/*! ./socket */ "../../node_modules/socket.io-client/lib/socket.js");

/***/ }),

/***/ "../../node_modules/socket.io-client/lib/manager.js":
/*!******************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-client/lib/manager.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var eio = __webpack_require__(/*! engine.io-client */ "../../node_modules/engine.io-client/lib/index.js");
var Socket = __webpack_require__(/*! ./socket */ "../../node_modules/socket.io-client/lib/socket.js");
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");
var parser = __webpack_require__(/*! socket.io-parser */ "../../node_modules/socket.io-parser/index.js");
var on = __webpack_require__(/*! ./on */ "../../node_modules/socket.io-client/lib/on.js");
var bind = __webpack_require__(/*! component-bind */ "../../node_modules/component-bind/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js")('socket.io-client:manager');
var indexOf = __webpack_require__(/*! indexof */ "../../node_modules/indexof/index.js");
var Backoff = __webpack_require__(/*! backo2 */ "../../node_modules/backo2/index.js");

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager(uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting() {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else {
    // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close = Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

/***/ }),

/***/ "../../node_modules/socket.io-client/lib/on.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-client/lib/on.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on(obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}

/***/ }),

/***/ "../../node_modules/socket.io-client/lib/socket.js":
/*!*****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-client/lib/socket.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var parser = __webpack_require__(/*! socket.io-parser */ "../../node_modules/socket.io-parser/index.js");
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");
var toArray = __webpack_require__(/*! to-array */ "../../node_modules/to-array/index.js");
var on = __webpack_require__(/*! ./on */ "../../node_modules/socket.io-client/lib/on.js");
var bind = __webpack_require__(/*! component-bind */ "../../node_modules/component-bind/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js")('socket.io-client:socket');
var parseqs = __webpack_require__(/*! parseqs */ "../../node_modules/parseqs/index.js");

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket(io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open = Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = { type: parser.EVENT, data: args };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  delete this.flags;

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({ type: parser.CONNECT, query: query });
    } else {
      this.packet({ type: parser.CONNECT });
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  if (packet.nsp !== this.nsp) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close = Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags = this.flags || {};
  this.flags.compress = compress;
  return this;
};

/***/ }),

/***/ "../../node_modules/socket.io-client/lib/url.js":
/*!**************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-client/lib/url.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module dependencies.
 */

var parseuri = __webpack_require__(/*! parseuri */ "../../node_modules/parseuri/index.js");
var debug = __webpack_require__(/*! debug */ "../../node_modules/debug/src/browser.js")('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url(uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || global.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

  return obj;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/socket.io-parser/binary.js":
/*!*************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/binary.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = __webpack_require__(/*! isarray */ "../../node_modules/socket.io-parser/node_modules/isarray/index.js");
var isBuf = __webpack_require__(/*! ./is-buffer */ "../../node_modules/socket.io-parser/is-buffer.js");
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function (packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return { packet: pack, buffers: buffers };
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function (packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function (data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function () {
        // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        } else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if (! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) {
      // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) {
      // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/socket.io-parser/index.js":
/*!************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(/*! debug */ "../../node_modules/socket.io-parser/node_modules/debug/src/browser.js")('socket.io-parser');
var Emitter = __webpack_require__(/*! component-emitter */ "../../node_modules/component-emitter/index.js");
var hasBin = __webpack_require__(/*! has-binary2 */ "../../node_modules/has-binary2/index.js");
var binary = __webpack_require__(/*! ./binary */ "../../node_modules/socket.io-parser/binary.js");
var isArray = __webpack_require__(/*! isarray */ "../../node_modules/socket.io-parser/node_modules/isarray/index.js");
var isBuf = __webpack_require__(/*! ./is-buffer */ "../../node_modules/socket.io-parser/is-buffer.js");

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function (obj, callback) {
  if ((obj.type === exports.EVENT || obj.type === exports.ACK) && hasBin(obj.data)) {
    obj.type = obj.type === exports.EVENT ? exports.BINARY_EVENT : exports.BINARY_ACK;
  }

  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    str += JSON.stringify(obj.data);
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function (obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
      // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else {
      // non-binary full packet
      this.emit('decoded', packet);
    }
  } else if (isBuf(obj) || obj.base64) {
    // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) {
        // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  } else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function () {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function (binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) {
    // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function () {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}

/***/ }),

/***/ "../../node_modules/socket.io-parser/is-buffer.js":
/*!****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/is-buffer.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
module.exports = isBuf;

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && (obj instanceof ArrayBuffer || ArrayBuffer.isView(obj));
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/socket.io-parser/node_modules/debug/src/browser.js":
/*!*************************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/node_modules/debug/src/browser.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "../../node_modules/socket.io-parser/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../process/browser.js */ "../../node_modules/process/browser.js")))

/***/ }),

/***/ "../../node_modules/socket.io-parser/node_modules/debug/src/debug.js":
/*!***********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/node_modules/debug/src/debug.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "../../node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
      i;

  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy() {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "../../node_modules/socket.io-parser/node_modules/isarray/index.js":
/*!*********************************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/socket.io-parser/node_modules/isarray/index.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "../../node_modules/style-loader/lib/addStyles.js":
/*!****************************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../node_modules/style-loader/lib/urls.js":
/*!***********************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/style-loader/lib/urls.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ "../../node_modules/to-array/index.js":
/*!****************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/to-array/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = toArray;

function toArray(list, index) {
    var array = [];

    index = index || 0;

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i];
    }

    return array;
}

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),

/***/ "../../node_modules/yeast/index.js":
/*!*************************************************************************************!*\
  !*** /home/qualphey/Development/teisine_apsauga/cmbird/node_modules/yeast/index.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
    length = 64,
    map = {},
    seed = 0,
    i = 0,
    prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now + '.' + encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

/***/ }),

/***/ "./src/edit/body.html":
/*!****************************!*\
  !*** ./src/edit/body.html ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"editor_btn\">&lt;&sol;&gt;</button>\n";

/***/ }),

/***/ "./src/edit/codemirror.ui/index.js":
/*!*****************************************!*\
  !*** ./src/edit/codemirror.ui/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//require("./style.css");

const CodeMirror = __webpack_require__(/*! codemirror */ "../../node_modules/codemirror/lib/codemirror.js");

__webpack_require__(/*! codemirror/lib/codemirror.css */ "../../node_modules/codemirror/lib/codemirror.css");
__webpack_require__(/*! codemirror/theme/base16-dark.css */ "../../node_modules/codemirror/theme/base16-dark.css");

__webpack_require__(/*! codemirror/mode/javascript/javascript */ "../../node_modules/codemirror/mode/javascript/javascript.js");
__webpack_require__(/*! codemirror/mode/css/css */ "../../node_modules/codemirror/mode/css/css.js");
__webpack_require__(/*! codemirror/addon/edit/closebrackets */ "../../node_modules/codemirror/addon/edit/closebrackets.js");
__webpack_require__(/*! codemirror/addon/edit/matchbrackets */ "../../node_modules/codemirror/addon/edit/matchbrackets.js");

__webpack_require__(/*! codemirror/mode/xml/xml */ "../../node_modules/codemirror/mode/xml/xml.js");
__webpack_require__(/*! codemirror/mode/htmlmixed/htmlmixed */ "../../node_modules/codemirror/mode/htmlmixed/htmlmixed.js");

__webpack_require__(/*! codemirror/addon/edit/closetag */ "../../node_modules/codemirror/addon/edit/closetag.js");
__webpack_require__(/*! codemirror/addon/edit/matchtags */ "../../node_modules/codemirror/addon/edit/matchtags.js");

__webpack_require__(/*! codemirror/addon/scroll/simplescrollbars.css */ "../../node_modules/codemirror/addon/scroll/simplescrollbars.css");
__webpack_require__(/*! codemirror/addon/scroll/simplescrollbars.js */ "../../node_modules/codemirror/addon/scroll/simplescrollbars.js");

var XHR = __webpack_require__(/*! ../../utils/xhr.js */ "./src/utils/xhr.js");

module.exports = class {
  constructor(text, mode, readonly, init_cfg) {
    this.element = document.createElement("div");
    this.element.style.height = "100%";

    console.log("CODEMIRROR INITIALIZED");

    //  parent.appendChild(this.element);

    var textarea = document.createElement("textarea");
    this.element.appendChild(textarea);

    var this_class = this;

    textarea.innerHTML = text;

    var cfg = {
      lineNumbers: true,
      theme: "base16-dark",
      indentWithTabs: true,
      tabSize: 2,
      scrollbarStyle: "native",
      smartIndent: false,
      readOnly: readonly,
      viewportMargin: Infinity
      //  matchTags: true
    };

    if (init_cfg) {
      if (init_cfg.disable_scrollbar) {
        cfg.scrollbarStyle = "null";
        __webpack_require__(/*! ./noscroll.css */ "./src/edit/codemirror.ui/noscroll.css");
      }
    }

    if (readonly) {
      cfg.cursorBlinkRate = -1;
    }

    switch (mode) {
      case 'html':
        cfg.mode = "htmlmixed";
        cfg.autoCloseTags = true;
        //  matchTags: true
        break;
      case 'css':
        cfg.mode = "css";
        cfg.autoCloseBrackets = true;
        cfg.matchBrackets = true;
        break;
      case 'less':
        cfg.mode = "text/x-less";
        cfg.autoCloseBrackets = true;
        cfg.matchBrackets = true;
        break;
      case 'js':
        cfg.mode = "javascript";
        cfg.autoCloseBrackets = true;
        cfg.matchBrackets = true;
        break;
      default:
        cfg.mode = "htmlmixed";
        cfg.autoCloseTags = true;
      //  matchTags: true
    }
    console.log("mode:", cfg.mode);
    this_class.cm = CodeMirror.fromTextArea(textarea, cfg);
    this_class.cm.refresh();
  }
};

/***/ }),

/***/ "./src/edit/codemirror.ui/noscroll.css":
/*!*********************************************!*\
  !*** ./src/edit/codemirror.ui/noscroll.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./noscroll.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/codemirror.ui/noscroll.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/editor.ui/index.js":
/*!*************************************!*\
  !*** ./src/edit/editor.ui/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const XHR = __webpack_require__(/*! ../../utils/xhr.js */ "./src/utils/xhr.js");
const XHRA = __webpack_require__(/*! ../../utils/xhr_async.js */ "./src/utils/xhr_async.js");
const WindowUI = __webpack_require__(/*! ../window.ui/index.js */ "./src/edit/window.ui/index.js");
const SplitUI = __webpack_require__(/*! ../split.ui/index.js */ "./src/edit/split.ui/index.js");

__webpack_require__(/*! ./theme.css */ "./src/edit/editor.ui/theme.css");

const Session = __webpack_require__(/*! ./session.js */ "./src/edit/editor.ui/session.js");

module.exports = class {
  constructor(target, dir, iframe, pathname) {

    var socket = __webpack_require__(/*! socket.io-client */ "../../node_modules/socket.io-client/lib/index.js")('http://127.0.0.1:9639');
    console.log("CONNECTING TO http://127.0.0.1:9369");
    socket.on('connect', function () {
      console.log("CONNECTED");
    });

    socket.on('webpack-done', function (stats) {
      console.log("WEBPACK DONE", stats);
      iframe.contentWindow.location.replace(pathname);
    });

    socket.on('webpack-err', function (err) {
      console.error(err);
    });

    socket.on('disconnect', function () {
      console.log("DISCONNETED");
    });

    this.window = new WindowUI({
      DOM: document.body,
      title: "Editor",
      resize_cb: function () {
        split.auto_resize();
      }
    });
    global.editor_window = this.window;
    this.window.content.style.overflow = "hidden";

    var split = this.split = new SplitUI(this.window.content, "horizontal");
    split.split(2);

    var global_local_switch = document.createElement("button");
    global_local_switch.innerHTML = "Global";
    global_local_switch.classList.add('global_local_switch');
    this.split.list[0].appendChild(global_local_switch);

    var webpack_button = document.createElement("button");
    webpack_button.innerHTML = ".";
    webpack_button.classList.add('webpack_button');
    this.split.list[0].appendChild(webpack_button);

    var state = false;
    webpack_button.style.border = "solid 1px #FF0000";

    webpack_button.addEventListener('click', (() => {
      var _ref = _asyncToGenerator(function* (e) {
        var chstate = state != true;
        console.log({
          command: "webpack-watch",
          value: chstate,
          name: dir
        });
        state = yield XHRA.post("pages.io", {
          command: "webpack-watch",
          value: chstate,
          name: dir
        });

        if (state) {
          webpack_button.style.border = "solid 1px #00FF00";
        } else {
          webpack_button.style.border = "solid 1px #FF0000";
        }
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })());
    var local_session = new Session(target, dir, iframe, pathname);
    this.append_session_elements(local_session);
    var global_session = new Session("globals", ".", iframe, pathname);

    var this_class = this;
    global_local_switch.addEventListener("click", function (e) {
      if (global_local_switch.innerHTML == "Global") {
        local_session.destroy();
        this_class.append_session_elements(global_session);
        global_local_switch.innerHTML = "Local";
      } else {
        global_session.destroy();
        this_class.append_session_elements(local_session);
        global_local_switch.innerHTML = "Global";
      }
    });
  }

  append_session_elements(session) {
    var treefm = session.treefm;
    var tabs = session.tabs;

    this.split.list[0].appendChild(treefm.element);
    this.split.list[1].style.overflow = "hidden";
    this.split.list[1].appendChild(tabs.element);
  }

  destroy() {
    this.window.destroy();
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/edit/editor.ui/session.js":
/*!***************************************!*\
  !*** ./src/edit/editor.ui/session.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const TreeFM = __webpack_require__(/*! ../treefm.ui */ "./src/edit/treefm.ui/index.js");
const TabsUI = __webpack_require__(/*! ../tabs.ui/index.js */ "./src/edit/tabs.ui/index.js");
const CodeMirror = __webpack_require__(/*! ../codemirror.ui/index.js */ "./src/edit/codemirror.ui/index.js");

const template_prefix = "/cmb_admin/t/";
const page_prefix = "/p/";

const XHR = __webpack_require__(/*! ../../utils/xhr.js */ "./src/utils/xhr.js");

module.exports = class {
  constructor(target, dir, iframe, refresh_path) {

    var tabs = this.tabs = new TabsUI();

    var last_save_callback = false;

    var treefm = this.treefm = new TreeFM({
      target: target,
      dir: dir,
      file_cb: function (file) {
        var tab = tabs.select(file.rel_path);
        if (tab) {
          tab.display();
        } else {
          treefm.read_file(file.rel_path, function (file_content) {
            var extension = file.rel_path.substr(file.rel_path.lastIndexOf('.') + 1);
            let original_extension = extension;
            if (extension == "json") extension = "js";
            var html_editor = new CodeMirror(file_content, extension, false, {
              disable_scrollbar: true
            });
            tabs.add({
              text: file.name,
              cb: function (display) {
                display.appendChild(html_editor.element);
                html_editor.cm.refresh();
                if (last_save_callback) {
                  document.body.removeEventListener("keydown", last_save_callback);
                }
                document.body.addEventListener("keydown", save_cur_file);
                last_save_callback = save_cur_file;
              },
              id: file.rel_path
            });
            function save_cur_file(e) {
              if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                treefm.write_file(file.rel_path, html_editor.cm.getValue(), function () {
                  if (original_extension != "js") {
                    iframe.src = iframe.src;
                  }

                  XHR.post("pages.io", {
                    command: "webpack",
                    name: dir
                  }, function (response) {
                    console.log("WEBPACK RES", response);
                    iframe.contentWindow.location.replace(refresh_path);
                  });
                });
              }
            }
          });
        }
      }
    });
  }

  destroy() {
    this.tabs.destroy();
    this.treefm.destroy();
  }
};

/***/ }),

/***/ "./src/edit/editor.ui/theme.css":
/*!**************************************!*\
  !*** ./src/edit/editor.ui/theme.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./theme.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/editor.ui/theme.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/index.js":
/*!***************************!*\
  !*** ./src/edit/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./theme.css */ "./src/edit/theme.css");

const XHR = __webpack_require__(/*! ../utils/xhr.js */ "./src/utils/xhr.js");
const Editor = __webpack_require__(/*! ./editor.ui/index.js */ "./src/edit/editor.ui/index.js");

const template = XHR.getParamByName('template');
const page = XHR.getParamByName('page');

let target_name = encodeURIComponent(template || page);

console.log(page);

var tools = document.createElement("div");
tools.classList.add("tools");
tools.innerHTML = __webpack_require__(/*! ./body.html */ "./src/edit/body.html");
document.body.appendChild(tools);

var editor_btn = tools.querySelector(".editor_btn");
function editor_replaced(n_window) {
  editor_btn.removeEventListener("click", listener);
  editor_btn.addEventListener("click", listener);
  function listener(e) {
    if (n_window.visible) {
      n_window.hide();
    } else {
      n_window.dipslay();
    }
  }
}

var iframe = document.getElementById("cmb_page_display");
var target;
if (template) {
  iframe.src = '/t/' + target_name;
  target = "templates";
} else if (page) {
  iframe.src = '/' + target_name;
  target = "pages";
}

iframe.addEventListener("load", firstLoad);
var floadID = setTimeout(firstLoad, 1000);
function firstLoad() {
  clearTimeout(floadID);
  var editor = new Editor(target, template || page, iframe, iframe.contentWindow.location.pathname);
  editor_replaced(editor.window);
  iframe.removeEventListener("load", firstLoad);

  var last_pathname = iframe.contentWindow.location.pathname;

  iframe.addEventListener("load", socondLoad);
  var sloadID = setTimeout(socondLoad, 1000);
  function socondLoad(e) {
    clearTimeout(sloadID);
    var new_pathname = iframe.contentWindow.location.pathname;
    console.log(last_pathname, new_pathname);
    console.log(last_pathname != new_pathname);
    if (last_pathname != new_pathname) {
      editor.destroy();
      var new_root_dir = decodeURIComponent(iframe.contentWindow.location.pathname).substr(1).slice(0, -1);
      console.log("NEDITOR", new_root_dir, iframe.contentWindow.location.pathname);
      editor = new Editor(target, new_root_dir, iframe);
      editor_replaced(editor.window);
    }
    last_pathname = new_pathname;
  }
}

/***/ }),

/***/ "./src/edit/split.ui/index.js":
/*!************************************!*\
  !*** ./src/edit/split.ui/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./theme.css */ "./src/edit/split.ui/theme.css");

module.exports = class {
  constructor(dom, direction) {
    this.element = document.createElement("div");
    this.element.classList.add("split_ui");
    dom.appendChild(this.element);

    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;

    this.min_piece_width = 50;
    this.min_piece_height = 50;

    this.list = [];
    this.direction = direction;
  }

  split(pieces) {
    if (this.direction == "horizontal") {
      this.pieces = pieces;
      var split_div_width = Math.floor(this.width / pieces);
      for (var p = 0; p < pieces; p++) {
        var piece_width = split_div_width;
        if (p > 0) {
          let resize_line = document.createElement("div");
          resize_line.classList.add("split_ui_horizontal_line");
          this.element.appendChild(resize_line);
          piece_width -= 3;

          var startX;

          var this_class = this;

          resize_line.addEventListener("mousedown", function (e) {
            startX = e.clientX;
            this_class.element.addEventListener('mousemove', resize_drag);
          });

          this.element.addEventListener('mouseup', function (e) {
            this_class.element.removeEventListener('mousemove', resize_drag);
          });

          function resize_drag(e) {
            var deltaX = e.clientX - startX;
            startX = e.clientX;

            var target_left = resize_line.previousSibling;
            var target_right = resize_line.nextSibling;
            if (target_left.offsetWidth + deltaX > 0 && target_right.offsetWidth - deltaX > 0) {
              var left_width = target_left.offsetWidth + deltaX;
              var right_width_dec = 0;
              if (left_width < this_class.min_piece_width) {
                right_width_dec = this_class.min_piece_width - left_width;
                left_width = this_class.min_piece_width;
              }

              var right_width = target_right.offsetWidth - deltaX;
              var left_width_dec = 0;
              if (right_width < this_class.min_piece_width) {
                left_width_dec = this_class.min_piece_width - right_width;
                right_width = this_class.min_piece_width;
              }

              target_left.style.width = left_width - left_width_dec + "px";
              target_right.style.width = right_width - right_width_dec + "px";
            } else {
              startX -= deltaX;
            }
          }
        }
        var split_div = document.createElement("div");
        split_div.classList.add("split_ui_horizontal");
        split_div.style.width = piece_width + "px";
        this.element.appendChild(split_div);
        this.list.push(split_div);
      }
    }
  }

  auto_resize() {
    var old_width = this.width;
    this.width = this.element.offsetWidth;
    var delta_width = this.width - old_width;
    this.height = this.element.offsetHeight;

    if (this.direction == "horizontal") {
      var piece_delta_width = delta_width / this.pieces;
      var next_delta = 0;
      for (var p = 0; p < this.pieces; p++) {
        var new_width;
        if (piece_delta_width > 0) {
          if (p == this.pieces - 1) {
            new_width = this.list[p].offsetWidth + Math.ceil(piece_delta_width);
          } else {
            new_width = this.list[p].offsetWidth + Math.floor(piece_delta_width);
          }
        } else if (piece_delta_width < 0) {
          if (p == this.pieces - 1) {
            new_width = this.list[p].offsetWidth + Math.floor(piece_delta_width);
          } else {
            new_width = this.list[p].offsetWidth + Math.ceil(piece_delta_width);
          }
        } else {
          new_width = this.list[p].offsetWidth;
        }

        this.list[p].style.width = new_width + "px";

        if (new_width < this.min_piece_width) {
          next_delta = this.min_piece_width - new_width;
          new_width = this.min_piece_width;
          this.list[p].style.width = new_width + "px";
        } else {
          this.list[p].style.width = new_width - next_delta + "px";
          next_delta = 0;
        }
      }

      if (next_delta > 0) {
        for (var p = 0; p < this.pieces; p++) {
          var new_width = this.list[p].offsetWidth - next_delta;

          if (new_width < this.min_piece_width) {
            next_delta = this.min_piece_width - new_width;
            new_width = this.min_piece_width;
            this.list[p].style.width = new_width + "px";
          } else {
            this.list[p].style.width = new_width + "px";
            next_delta = 0;
            break;
          }
        }
      }
    }
  }
};

/***/ }),

/***/ "./src/edit/split.ui/theme.css":
/*!*************************************!*\
  !*** ./src/edit/split.ui/theme.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./theme.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/split.ui/theme.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/tabs.ui/horz.css":
/*!***********************************!*\
  !*** ./src/edit/tabs.ui/horz.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./horz.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/tabs.ui/horz.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/tabs.ui/index.js":
/*!***********************************!*\
  !*** ./src/edit/tabs.ui/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./horz.css */ "./src/edit/tabs.ui/horz.css");

var Tab = __webpack_require__(/*! ./tab.js */ "./src/edit/tabs.ui/tab.js");

module.exports = class {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('tabs_ui_container');

    this.menu = document.createElement('div');
    this.menu.classList.add('tabs_ui_menu');
    this.element.appendChild(this.menu);

    this.display_div = document.createElement('div');
    this.display_div.classList.add('tabs_ui_display');
    this.display_div.style.height = "calc(100% - 21px)";
    this.element.appendChild(this.display_div);

    this.list = [];
  }

  add(data) {
    var tab = new Tab(data, this);
    this.menu.appendChild(tab.element);
    this.list.push(tab);
    tab.display();
  }

  remove(tab) {
    this.menu.removeChild(tab.element);
    this.list.splice(this.list.indexOf(tab), 1);
    if (tab.element == this.displayed_tab) {
      if (this.list.length > 0) {
        this.display(this.list[this.list.length - 1]);
      } else {
        this.display_div.innerHTML = "";
      }
    }
  }

  select(id) {
    var result = false;
    for (var t = 0; t < this.list.length; t++) {
      if (this.list[t].id == id) {
        result = this.list[t];
        break;
      }
    }
    return result;
  }

  display(tab) {
    var this_class = this;
    tab.cb(function () {
      if (this_class.displayed_tab) {
        this_class.displayed_tab.classList.remove("tabs_ui_selected");
      }
      this_class.displayed_tab = tab.element;
      this_class.displayed_tab.classList.add("tabs_ui_selected");

      this_class.display_div.innerHTML = "";
      return this_class.display_div;
    }());
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
};

/***/ }),

/***/ "./src/edit/tabs.ui/tab.js":
/*!*********************************!*\
  !*** ./src/edit/tabs.ui/tab.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



module.exports = class {
  constructor(data, tabs) {
    this.id = data.id;
    this.cb = data.cb;
    this.tabs = tabs;

    this.element = document.createElement('div');
    this.element.classList.add("tabs_ui_menu_item");

    var text = document.createElement('div');
    text.innerHTML = data.text;
    this.element.appendChild(text);

    var this_class = this;

    text.addEventListener("click", function (e) {
      this_class.display();
    });

    var close = document.createElement('button');
    close.innerHTML = "⨯";
    this.element.appendChild(close);

    close.addEventListener("click", function (e) {
      this_class.tabs.remove(this_class);
    });
  }

  display() {
    this.tabs.display(this);
  }
};

/***/ }),

/***/ "./src/edit/theme.css":
/*!****************************!*\
  !*** ./src/edit/theme.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!./theme.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/theme.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/treefm.ui/contextmenu.html":
/*!*********************************************!*\
  !*** ./src/edit/treefm.ui/contextmenu.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div name=\"new_file\">New File</div>\n<div name=\"new_folder\">New Folder</div>\n<div name=\"upload\">Upload</div>\n<div name=\"rename\">Rename</div>\n<div name=\"delete\">Delete</div>\n";

/***/ }),

/***/ "./src/edit/treefm.ui/contextmenu.js":
/*!*******************************************!*\
  !*** ./src/edit/treefm.ui/contextmenu.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var html = __webpack_require__(/*! ./contextmenu.html */ "./src/edit/treefm.ui/contextmenu.html");

module.exports = class {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add("treefm_contexmenu");
    document.body.appendChild(this.element);
  }

  display(x, y, callbacks) {
    console.log(callbacks);
    this.element.innerHTML = html;

    for (let name in callbacks) {
      var item = this.element.querySelector('div[name="' + name + '"]');
      if (!callbacks[name]) {
        item.style.display = "none";
      } else {
        item.addEventListener("click", function (e) {
          callbacks[name]();
        });
      }
    }

    this.element.style.display = "block";
    this.element.style.left = x + "px";
    this.element.style.top = y + "px";
  }

  hide() {
    this.element.style.display = "none";
  }
};

/***/ }),

/***/ "./src/edit/treefm.ui/dir.js":
/*!***********************************!*\
  !*** ./src/edit/treefm.ui/dir.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const File = __webpack_require__(/*! ./file.js */ "./src/edit/treefm.ui/file.js");

var padding_left = 10;

var Dir = module.exports = class {
  constructor(data, treefm) {
    this.element = document.createElement('div');
    this.path = data.rel_path;
    this.name = data.name;
    this.padding_index = data.padding_index;

    var this_class = this;

    var name_div = document.createElement("div");
    name_div.classList.add("treefm_item");
    name_div.innerHTML = "▹ " + data.name;
    name_div.style.paddingLeft = this.padding_index * padding_left + padding_left + "px";

    name_div.addEventListener("click", function (e) {
      if (content_div.displayed) {
        var str = name_div.innerHTML;
        name_div.innerHTML = "▹ " + str.substring(2);
        content_div.style.display = "none";
        content_div.displayed = false;
      } else {
        var str = name_div.innerHTML;
        name_div.innerHTML = "▿ " + str.substring(2);
        content_div.style.display = "block";
        content_div.displayed = true;
      }
    });

    name_div.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      var callbacks = {
        new_file: function () {
          content_div.style.display = "block";
          content_div.displayed = true;

          var name_input = document.createElement("input");
          name_input.type = "text";
          name_input.placeholder = "new file name";
          content_div.appendChild(name_input);
          name_input.focus();
          treefm.contextmenu.hide();
          name_input.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
              var file_path = this_class.path + "/" + name_input.value;
              treefm.write_file(file_path, "", function () {
                var new_file = new File({
                  name: name_input.value,
                  rel_path: this_class.path + "/" + name_input.value,
                  padding_index: this_class.padding_index + 1,
                  type: "txt"
                }, treefm);
                content_div.replaceChild(new_file.element, name_input);
              });
            }
          });
        },
        new_folder: function () {
          content_div.style.display = "block";
          content_div.displayed = true;

          var name_input = document.createElement("input");
          name_input.type = "text";
          name_input.placeholder = "new folder name";
          content_div.appendChild(name_input);
          name_input.focus();
          treefm.contextmenu.hide();
          name_input.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
              var file_path = this_class.path + "/" + name_input.value;
              treefm.mkdir(file_path, function () {
                var new_file = new Dir({
                  name: name_input.value,
                  rel_path: this_class.path + "/" + name_input.value,
                  type: "dir",
                  padding_index: this_class.padding_index + 1,
                  content: []
                }, treefm);
                content_div.replaceChild(new_file.element, name_input);
              });
            }
          });
        },
        upload: function () {
          treefm.contextmenu.hide();

          var form = document.createElement('form');
          form.enctype = "multipart/form-data";
          this_class.element.appendChild(form);

          var target_input = document.createElement("input");
          target_input.type = "hidden";
          target_input.name = "target";
          target_input.value = treefm.target;
          form.appendChild(target_input);

          var path_input = document.createElement("input");
          path_input.type = "hidden";
          path_input.name = "path";
          path_input.value = this_class.path;
          form.appendChild(path_input);

          var upload_input = document.createElement("input");
          upload_input.type = "file";
          upload_input.name = "filei";
          upload_input.multiple = "multiple";
          upload_input.style.display = "none";
          form.appendChild(upload_input);

          upload_input.click();
          upload_input.addEventListener("change", function (e) {
            var files = this.files;

            var formData = new FormData(form);

            for (var [key, value] of formData.entries()) {
              console.log(key, value);
            }

            treefm.upload_files(formData, function () {
              for (var f = 0; f < files.length; f++) {
                var new_file = new File({
                  name: files[f].name,
                  rel_path: this_class.path + "/" + files[f].name,
                  padding_index: this_class.padding_index + 1,
                  type: files[f].type
                }, treefm);
                content_div.appendChild(new_file.element);
              }
            });
          }, false);
        },
        rename: function () {
          treefm.contextmenu.hide();
          var name_input = document.createElement("input");
          name_input.type = "text";
          name_input.value = this_class.name;
          this_class.element.replaceChild(name_input, name_div);
          name_input.focus();
          name_input.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
              var dir_arr = this_class.path.split('/');
              dir_arr.pop();
              var file_path = dir_arr.join('/') + "/" + name_input.value;
              treefm.rename(this_class.path, file_path, function () {
                name_div.innerHTML = name_input.value;
                this_class.element.replaceChild(name_div, name_input);
              });
            }
          });
        },
        delete: function () {
          treefm.contextmenu.hide();
          treefm.rm_dir(this_class.path, function () {
            this_class.element.parentNode.removeChild(this_class.element);
          });
        }
      };
      if (data.root) {
        callbacks["rename"] = false;
        callbacks["delete"] = false;
      }
      treefm.contextmenu.display(e.clientX, e.clientY, callbacks);

      global.editor_window.element.addEventListener("click", hide_contextmenu);

      function hide_contextmenu(e) {
        treefm.contextmenu.hide();
        global.editor_window.element.removeEventListener("click", hide_contextmenu);
      }
    });
    this.element.appendChild(name_div);

    var content_div = document.createElement("div");
    content_div.displayed = false;
    content_div.classList.add("treefm_dir_content");
    for (var f = 0; f < data.content.length; f++) {
      let child_file = data.content[f];
      if (child_file.type == "dir") {
        child_file.padding_index = this_class.padding_index + 1;
        var child_dir = new Dir(child_file, treefm);
        content_div.appendChild(child_dir.element);
      } else if (child_file.type == "txt") {
        child_file.padding_index = this_class.padding_index + 1;
        var file = new File(child_file, treefm);
        content_div.appendChild(file.element);
      } else {
        console.error("TreeFM: Unknown file type", child_file.type);
      }
    }

    if (data.root) {
      var str = name_div.innerHTML;
      name_div.innerHTML = "▿ " + str.substring(2);
      content_div.style.display = "block";
      content_div.displayed = true;
    }

    this.element.appendChild(content_div);
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/edit/treefm.ui/file.js":
/*!************************************!*\
  !*** ./src/edit/treefm.ui/file.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var padding_left = 10;

module.exports = class {
  constructor(data, treefm) {
    this.path = data.rel_path;
    this.name = data.name;
    this.padding_index = data.padding_index;

    this.element = document.createElement("div");
    this.element.innerHTML = "⋄ " + data.name;
    this.element.style.paddingLeft = this.padding_index * padding_left + padding_left + "px";
    this.element.classList.add("treefm_item");
    this.element.addEventListener("click", function (e) {
      treefm.file_cb(data);
    });

    var this_class = this;
    this.element.addEventListener('contextmenu', function (e) {
      e.preventDefault();

      var callbacks = {
        new_file: false,
        new_folder: false,
        rename: function () {
          treefm.contextmenu.hide();
          var name_input = document.createElement("input");
          name_input.type = "text";
          name_input.value = this_class.name;
          this_class.element.parentNode.replaceChild(name_input, this_class.element);
          name_input.focus();
          name_input.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
              var dir_arr = this_class.path.split('/');
              dir_arr.pop();
              var file_path = dir_arr.join('/') + "/" + name_input.value;
              treefm.rename(this_class.path, file_path, function () {
                this_class.element.innerHTML = name_input.value;
                name_input.parentNode.replaceChild(this_class.element, name_input);
              });
            }
          });
        },
        delete: function () {
          treefm.contextmenu.hide();
          treefm.rm_file(this_class.path, function () {
            this_class.element.parentNode.removeChild(this_class.element);
          });
        }
      };

      treefm.contextmenu.display(e.clientX, e.clientY, callbacks);

      global.editor_window.element.addEventListener("click", hide_contextmenu);

      function hide_contextmenu(e) {
        treefm.contextmenu.hide();
        global.editor_window.element.removeEventListener("click", hide_contextmenu);
      }
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/edit/treefm.ui/index.js":
/*!*************************************!*\
  !*** ./src/edit/treefm.ui/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const XHR = __webpack_require__(/*! ../../utils/xhr.js */ "./src/utils/xhr.js");
const Dir = __webpack_require__(/*! ./dir.js */ "./src/edit/treefm.ui/dir.js");
const ContextMenu = __webpack_require__(/*! ./contextmenu.js */ "./src/edit/treefm.ui/contextmenu.js");
__webpack_require__(/*! ./style.css */ "./src/edit/treefm.ui/style.css");

module.exports = class {
  constructor(cfg) {
    this.element = document.createElement("div");
    this.element.classList.add("treefm");
    this.file_cb = cfg.file_cb;

    this.target = cfg.target;
    this.dir = cfg.dir;

    this.contextmenu = new ContextMenu();

    var this_class = this;

    console.log("treefm.io read", cfg.target, cfg.dir);
    XHR.get('treefm.io', {
      target: cfg.target,
      command: "read",
      path: cfg.dir
    }, function () {
      var dir_tree = JSON.parse(this.responseText);
      console.log("RESPONSE", dir_tree);
      dir_tree.root = true;
      dir_tree.padding_index = 0;
      var root_dir = new Dir(dir_tree, this_class);
      this_class.element.appendChild(root_dir.element);
    });
  }

  read_file(file_path, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "read",
      path: file_path
    }, function () {
      var file_content = JSON.parse(this.responseText);
      cb(file_content);
    });
  }

  write_file(file_path, content, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "write",
      path: file_path,
      data: content
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  upload_files(formData, cb) {
    XHR.post('treefm.io', {
      formData: formData
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  rm_file(file_path, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "rm",
      path: file_path
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  mkdir(file_path, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "mkdir",
      path: file_path
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  rm_dir(file_path, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "rmdir",
      path: file_path
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  rename(file_path, new_path, cb) {
    XHR.get('treefm.io', {
      target: this.target,
      command: "rename",
      path: file_path,
      data: new_path
    }, function () {
      var response = JSON.parse(this.responseText);
      if (response == "success") {
        cb();
      };
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
};

/***/ }),

/***/ "./src/edit/treefm.ui/style.css":
/*!**************************************!*\
  !*** ./src/edit/treefm.ui/style.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./style.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/treefm.ui/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/edit/window.ui/body.html":
/*!**************************************!*\
  !*** ./src/edit/window.ui/body.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"window_mod_header\">\n  <div class=\"window_mod_titlebar\">New Window</div>\n  <div class=\"window_mod_actions\">\n    <button class=\"window_mod_hide\">-</button>\n    <button class=\"window_mod_min_max_imize\">+</button>\n  </div>\n</header>\n<div class=\"window_mod_content\">\n\n</div>\n\n<div class=\"window_mod_resize_controls\">\n  <div class=\"resizeN resize\"></div>\n  <div class=\"resizeNE resize\"></div>\n  <div class=\"resizeE resize\"></div>\n  <div class=\"resizeSE resize\"></div>\n  <div class=\"resizeS resize\"></div>\n  <div class=\"resizeSW resize\"></div>\n  <div class=\"resizeW resize\"></div>\n  <div class=\"resizeNW resize\"></div>\n</div>\n";

/***/ }),

/***/ "./src/edit/window.ui/index.js":
/*!*************************************!*\
  !*** ./src/edit/window.ui/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {



__webpack_require__(/*! ./sheet.css */ "./src/edit/window.ui/sheet.css");
var html = __webpack_require__(/*! ./src/edit/window.ui/body.html */ "./src/edit/window.ui/body.html");

var min_width = 181;
var min_height = 65;

var init_width = 680;
var init_height = 360;

module.exports = class {
  constructor(cfg) {
    this.element = document.createElement("div");
    this.element.innerHTML = html;
    this.element.style.minWidth = min_width + "px";
    this.element.style.minHeight = min_height + "px";
    this.element.style.width = init_width + "px";
    this.element.style.height = init_height + "px";
    this.element.classList.add('window_mod');
    this.element.classList.add('container_rgb');
    cfg.DOM.appendChild(this.element);

    this.visible = true;
    this.DOM = cfg.DOM;
    this.resize_cb = cfg.resize_cb;

    var this_class = this;

    this.titlebar = this.element.querySelector('.window_mod_titlebar');
    this.titlebar.innerHTML = cfg.title;
    this.titlebar.addEventListener('mousedown', function (e) {
      if (!this_class.maximized) {
        window_mod_move(e);
      }
    });

    var minimize = this.element.querySelector('.window_mod_hide');
    minimize.addEventListener("click", function (e) {
      this_class.hide();
    });

    var maximize = this.element.querySelector('.window_mod_min_max_imize');
    maximize.addEventListener("click", function (e) {
      if (this_class.maximized) {
        this_class.minimize();
      } else {
        this_class.maximize();
      }
    });

    this.content = this.element.querySelector('.window_mod_content');

    this.resize_controls = this.element.querySelector('.window_mod_resize_controls');

    this.element.N = this.element.querySelector('.resizeN');
    this.element.NE = this.element.querySelector('.resizeNE');
    this.element.E = this.element.querySelector('.resizeE');
    this.element.SE = this.element.querySelector('.resizeSE');
    this.element.S = this.element.querySelector('.resizeS');
    this.element.SW = this.element.querySelector('.resizeSW');
    this.element.W = this.element.querySelector('.resizeW');
    this.element.NW = this.element.querySelector('.resizeNW');

    this.mouse_div = document.createElement('div');
    this.mouse_div.classList.add('mouse_div');

    cfg.DOM.appendChild(this.mouse_div);

    var fresh = true;
    function window_mod_init(win) {
      if (fresh) {
        this_class.element = win;

        fresh = false;
      }
    }

    function div_up(next) {
      let up_cb = function (e) {
        this_class.mouse_div.style.display = "none";
        next();
        this_class.mouse_div.removeEventListener('mouseup', up_cb);
      };

      this_class.mouse_div.addEventListener('mouseup', up_cb);
    }

    function window_mod_move(event) {
      var title = event.target;

      this_class.element.startX = event.clientX - this_class.element.offsetLeft;
      this_class.element.startY = event.clientY - this_class.element.offsetTop;
      document.documentElement.addEventListener('mousemove', drag);
      this_class.mouse_div.style.display = "block";
      div_up(stopDrag);

      function drag(e) {
        var eClientX = e.clientX;
        var eClientY = e.clientY;

        var nX = eClientX - this_class.element.startX;
        var nX2 = nX + this_class.element.offsetWidth;

        if (nX < 0) nX = 0;
        if (nX2 > window.innerWidth) {
          nX = window.innerWidth - this_class.element.offsetWidth;
        }

        this_class.element.style.left = nX + 'px';

        var nY = eClientY - this_class.element.startY;
        var nY2 = nY + this_class.element.offsetHeight;

        if (nY < 0) nY = 0;
        if (nY2 > window.innerHeight) {
          nY = window.innerHeight - this_class.element.offsetHeight;
        }

        this_class.element.style.top = nY + 'px';
      }

      function stopDrag(e) {
        console.log('stop');
        document.documentElement.removeEventListener('mousemove', drag);
      }
    }

    // RESZ

    var startX, startY, startWidth, startHeight, curTarget, curFollower;
    var make = function (target, directions, cb) {
      if (directions == '*') {
        makeN(target);
        makeNE(target);
        makeE(target);
        makeSE(target);
        makeS(target);
        makeSW(target);
        makeW(target);
        makeNW(target);
      } else if (Array.isArray(directions)) {
        directions.forEach(function (d) {
          switch (d) {
            case 'N':
              makeN(target);
              break;
            case 'NE':
              makeNE(target);
              break;
            case 'E':
              makeE(target);
              break;
            case 'SE':
              makeSE(target);
              break;
            case 'S':
              makeS(target);
              break;
            case 'SW':
              makeSW(target);
              break;
            case 'W':
              makeW(target);
              break;
            case 'NW':
              makeNW(target);
              break;
            default:
              console.log('cmResizable: Invalid direction: "' + d + '"');
              console.log('NW N NE');
              console.log('W  +  E');
              console.log('SW S SE');
          }
        });
      }

      var screen_padding = 10;

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeN(target) {
        var element = this_class.element.N;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop;
          startHeight = target.offsetHeight;
          document.documentElement.addEventListener('mousemove', dragN);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragN);
        });

        function dragN(e) {
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;

          var nHeight = startHeight + startY - eClientY;
          if (nHeight > min_height) {
            curTarget.style.top = startY + eClientY - startY + 'px';
            curTarget.style.height = nHeight + 'px';
            if (curFollower) {
              curFollower.style.top = startY + eClientY - startY + 'px';
              curFollower.style.height = startHeight + startY - eClientY + 'px';
            }
          }

          cb();
        }

        function stopDragN(e) {
          document.documentElement.removeEventListener('mousemove', dragN);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeNE(target) {
        var element = this_class.element.NE;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop;
          startX = target.offsetLeft + target.offsetWidth;
          startHeight = target.offsetHeight;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragNE);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragNE);
        });

        function dragNE(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;
          if (eClientX > window.innerWidth - screen_padding) {
            eClientX = window.innerWidth;
          };
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;

          var nHeight = startHeight + startY - eClientY;
          if (nHeight > min_height) {
            curTarget.style.top = startY + eClientY - startY + 'px';
            curTarget.style.height = startHeight + startY - eClientY + 'px';
            if (curFollower) {
              curFollower.style.top = startY + eClientY - startY + 'px';
              curFollower.style.height = startHeight + startY - eClientY + 'px';
            }
          }

          curTarget.style.width = startWidth + eClientX - startX + 'px';
          if (curFollower) {
            curFollower.style.width = startWidth + eClientX - startX + 'px';
          }

          cb();
        }

        function stopDragNE(e) {
          document.documentElement.removeEventListener('mousemove', dragNE);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeE(target) {
        var element = this_class.element.E;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startX = target.offsetLeft + target.offsetWidth;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragE);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragE);
        });

        function dragE(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;
          if (eClientX > window.innerWidth - screen_padding) {
            eClientX = window.innerWidth;
          };

          curTarget.style.width = startWidth + eClientX - startX + 'px';
          if (curFollower) {
            curFollower.style.width = startWidth + eClientX - startX + 'px';
          }
          cb();
        }

        function stopDragE(e) {
          document.documentElement.removeEventListener('mousemove', dragE);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeSE(target) {
        var element = this_class.element.SE;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop + target.offsetHeight;
          startX = target.offsetLeft + target.offsetWidth;
          startHeight = target.offsetHeight;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragSE);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragSE);
        });

        function dragSE(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;
          if (eClientX > window.innerWidth - screen_padding) {
            eClientX = window.innerWidth;
          };
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;
          if (eClientY > window.innerHeight - screen_padding) {
            eClientY = window.innerHeight;
          };

          curTarget.style.height = startHeight + eClientY - startY + 'px';
          curTarget.style.width = startWidth + eClientX - startX + 'px';
          if (curFollower) {
            curFollower.style.height = startHeight + eClientY - startY + 'px';
            curFollower.style.width = startWidth + eClientX - startX + 'px';
          }
          cb();
        }

        function stopDragSE(e) {
          document.documentElement.removeEventListener('mousemove', dragSE);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeS(target) {
        var element = this_class.element.S;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop + target.offsetHeight;
          startHeight = target.offsetHeight;
          document.documentElement.addEventListener('mousemove', dragS);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragS);
        });

        function dragS(e) {
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;
          if (eClientY > window.innerHeight - screen_padding) {
            eClientY = window.innerHeight;
          };

          curTarget.style.height = startHeight + eClientY - startY + 'px';
          if (curFollower) {
            curFollower.style.height = startHeight + eClientY - startY + 'px';
          }

          cb();
        }

        function stopDragS(e) {
          document.documentElement.removeEventListener('mousemove', dragS);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeSW(target) {
        var element = this_class.element.SW;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop + target.offsetHeight;
          startX = target.offsetLeft;
          startHeight = target.offsetHeight;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragSW);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragSW);
        });

        function dragSW(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;
          if (eClientY > window.innerHeight - screen_padding) {
            eClientY = window.innerHeight;
          };

          curTarget.style.height = startHeight + eClientY - startY + 'px';
          if (curFollower) {
            curFollower.style.height = startHeight + eClientY - startY + 'px';
          }

          var nWidth = startWidth + startX - eClientX;
          if (nWidth > min_width) {
            curTarget.style.width = startWidth + startX - eClientX + 'px';
            curTarget.style.left = startX + eClientX - startX + 'px';
            if (curFollower) {
              curFollower.style.width = startWidth + startX - eClientX + 'px';
              curFollower.style.left = startX + eClientX - startX + 'px';
            }
          }

          cb();
        }

        function stopDragSW(e) {
          document.documentElement.removeEventListener('mousemove', dragSW);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeW(target) {
        var element = this_class.element.W;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startX = target.offsetLeft;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragW);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragW);
        });

        function dragW(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;

          var nWidth = startWidth + startX - eClientX;
          if (nWidth > min_width) {
            curTarget.style.width = startWidth + startX - eClientX + 'px';
            curTarget.style.left = startX + eClientX - startX + 'px';
            if (curFollower) {
              curFollower.style.width = startWidth + startX - eClientX + 'px';
              curFollower.style.left = startX + eClientX - startX + 'px';
            }
          }
          cb();
        }

        function stopDragW(e) {
          document.documentElement.removeEventListener('mousemove', dragW);
          curFollower = 0;
        }
      }

      //.-'-.-'-.-'-.-'-.-'-.-'-.-'-.-'
      function makeNW(target) {
        var element = this_class.element.NW;

        element.addEventListener('mousedown', function (e) {
          curTarget = target;
          startY = target.offsetTop;
          startHeight = target.offsetHeight;
          startX = target.offsetLeft;
          startWidth = target.offsetWidth;
          document.documentElement.addEventListener('mousemove', dragNW);
          this_class.mouse_div.style.display = "block";
          div_up(stopDragNW);
        });

        function dragNW(e) {
          var eClientX = e.clientX;
          if (eClientX < screen_padding) eClientX = 0;
          var eClientY = e.clientY;
          if (eClientY < screen_padding) eClientY = 0;

          var nHeight = startHeight + startY - eClientY;
          if (nHeight > min_height) {
            curTarget.style.top = startY + eClientY - startY + 'px';
            curTarget.style.height = startHeight + startY - eClientY + 'px';
            if (curFollower) {
              curFollower.style.top = startY + eClientY - startY + 'px';
              curFollower.style.height = startHeight + startY - eClientY + 'px';
            }
          }

          var nWidth = startWidth + startX - eClientX;
          if (nWidth > min_width) {
            curTarget.style.width = startWidth + startX - eClientX + 'px';
            curTarget.style.left = startX + eClientX - startX + 'px';
            if (curFollower) {
              curFollower.style.width = startWidth + startX - eClientX + 'px';
              curFollower.style.left = startX + eClientX - startX + 'px';
            }
          }

          cb();
        }

        function stopDragNW(e) {
          document.documentElement.removeEventListener('mousemove', dragNW);
          curFollower = 0;
        }
      }
    };

    //+++ NodeList forEach hack.
    var arrayMethods = Object.getOwnPropertyNames(Array.prototype);

    arrayMethods.forEach(attachArrayMethodsToNodeList);

    function attachArrayMethodsToNodeList(methodName) {
      if (methodName !== 'length') {
        NodeList.prototype[methodName] = Array.prototype[methodName];
      }
    };

    //+++ isArray Check
    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }

    make(this_class.element, '*', cfg.resize_cb);
  }

  maximize() {
    if (!this.maximized) {
      this.mem_layout = {
        width: this.element.offsetWidth,
        height: this.element.offsetHeight,
        top: this.element.offsetTop,
        left: this.element.offsetLeft
      };
      console.log(this.mem_layout);

      this.element.style.width = "auto";
      this.element.style.height = "auto";
      this.element.style.top = 0;
      this.element.style.left = 0;
      this.element.style.right = 0;
      this.element.style.bottom = 0;

      this.element.removeChild(this.resize_controls);

      this.maximized = true;

      this.resize_cb();
    }
  }

  minimize() {
    if (this.maximized) {
      console.log(this.mem_layout);
      this.element.style.width = this.mem_layout.width + "px";
      this.element.style.height = this.mem_layout.height + "px";
      this.element.style.top = this.mem_layout.top + "px";
      this.element.style.left = this.mem_layout.left + "px";
      this.element.style.right = "auto";
      this.element.style.bottom = "auto";

      this.element.appendChild(this.resize_controls);

      this.resize_controls.style.display = "auto";

      this.maximized = false;

      this.resize_cb();
    }
  }

  dipslay() {
    if (!this.visible) {
      this.DOM.appendChild(this.element);
      this.visible = true;
    }
  }

  hide() {
    if (this.visible) {
      this.DOM.removeChild(this.element);
      this.visible = false;
    }
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
};

/***/ }),

/***/ "./src/edit/window.ui/sheet.css":
/*!**************************************!*\
  !*** ./src/edit/window.ui/sheet.css ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!./sheet.css */ "../../node_modules/css-loader/index.js??ref--6-1!./src/edit/window.ui/sheet.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/utils/xhr.js":
/*!**************************!*\
  !*** ./src/utils/xhr.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = class {
  static get(url, params, callback) {
    if (params) {
      url += "?data=" + encodeURIComponent(JSON.stringify(params));
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", callback);
    xhr.open("GET", url);
    xhr.send();

    console.log(url);
  }

  static post(url, params, callback) {
    if (params.formData) {
      console.log("FORM DATA");
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      //  xhr.setRequestHeader("Content-Type","multipart/form-data");
      xhr.send(params.formData);
      xhr.addEventListener("load", callback);
      console.log(url);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);

      //Send the proper header information along with the request
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      xhr.onreadystatechange = function () {
        //Call a function when the state changes.
        if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseText);
        }
      };

      var json = JSON.stringify(params);
      var param_str = 'data=' + encodeURIComponent(json);

      if (params.access_token) {
        param_str += '&access_token=' + params.access_token;
      }
      xhr.send(param_str);
    }
  }

  static getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
};

/***/ }),

/***/ "./src/utils/xhr_async.js":
/*!********************************!*\
  !*** ./src/utils/xhr_async.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = class {
  static get(url, params) {
    return _asyncToGenerator(function* () {
      try {
        return yield new Promise(function (resolve) {
          if (params) {
            url += "?data=" + encodeURIComponent(JSON.stringify(params));
          }

          var xhr = new XMLHttpRequest();

          xhr.addEventListener("load", function () {
            resolve(JSON.parse(this.responseText));
          });
          xhr.open("GET", url);
          xhr.send();
        });
      } catch (e) {
        console.error(e);
        return undefined;
      }
    })();
  }

  static post(url, params) {
    return _asyncToGenerator(function* () {
      try {
        return yield new Promise(function (resolve) {
          if (params.formData) {
            console.log("FORM DATA");
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            //  xhr.setRequestHeader("Content-Type","multipart/form-data");
            xhr.send(params.formData);
            xhr.addEventListener("load", function () {
              resolve(JSON.parse(xhr.responseText));
            });
            console.log(url);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);

            //Send the proper header information along with the request
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function () {
              //Call a function when the state changes.
              if (xhr.readyState == 4 && xhr.status == 200) {
                try {
                  let obj = JSON.parse(xhr.responseText);
                  resolve(obj);
                } catch (e) {
                  resolve(xhr.responseText);
                }
              }
            };

            const token = localStorage.getItem("access_token");

            if (token) {
              var json = JSON.stringify(params);
              var param_str = 'data=' + encodeURIComponent(json) + '&access_token=' + token;
              xhr.send(param_str);
            } else {
              console.error("Token not found");
              resolve(undefined);
            }
          }
        });
      } catch (e) {
        console.error(e);
        return undefined;
      }
    })();
  }

  static getParamByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
};

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=edit.js.map