"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/webidl-conversions";
exports.ids = ["vendor-chunks/webidl-conversions"];
exports.modules = {

/***/ "(ssr)/./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\nvar conversions = {};\nmodule.exports = conversions;\nfunction sign(x) {\n    return x < 0 ? -1 : 1;\n}\nfunction evenRound(x) {\n    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.\n    if (x % 1 === 0.5 && (x & 1) === 0) {\n        return Math.floor(x);\n    } else {\n        return Math.round(x);\n    }\n}\nfunction createNumberConversion(bitLength, typeOpts) {\n    if (!typeOpts.unsigned) {\n        --bitLength;\n    }\n    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);\n    const upperBound = Math.pow(2, bitLength) - 1;\n    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);\n    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);\n    return function(V, opts) {\n        if (!opts) opts = {};\n        let x = +V;\n        if (opts.enforceRange) {\n            if (!Number.isFinite(x)) {\n                throw new TypeError(\"Argument is not a finite number\");\n            }\n            x = sign(x) * Math.floor(Math.abs(x));\n            if (x < lowerBound || x > upperBound) {\n                throw new TypeError(\"Argument is not in byte range\");\n            }\n            return x;\n        }\n        if (!isNaN(x) && opts.clamp) {\n            x = evenRound(x);\n            if (x < lowerBound) x = lowerBound;\n            if (x > upperBound) x = upperBound;\n            return x;\n        }\n        if (!Number.isFinite(x) || x === 0) {\n            return 0;\n        }\n        x = sign(x) * Math.floor(Math.abs(x));\n        x = x % moduloVal;\n        if (!typeOpts.unsigned && x >= moduloBound) {\n            return x - moduloVal;\n        } else if (typeOpts.unsigned) {\n            if (x < 0) {\n                x += moduloVal;\n            } else if (x === -0) {\n                return 0;\n            }\n        }\n        return x;\n    };\n}\nconversions[\"void\"] = function() {\n    return undefined;\n};\nconversions[\"boolean\"] = function(val) {\n    return !!val;\n};\nconversions[\"byte\"] = createNumberConversion(8, {\n    unsigned: false\n});\nconversions[\"octet\"] = createNumberConversion(8, {\n    unsigned: true\n});\nconversions[\"short\"] = createNumberConversion(16, {\n    unsigned: false\n});\nconversions[\"unsigned short\"] = createNumberConversion(16, {\n    unsigned: true\n});\nconversions[\"long\"] = createNumberConversion(32, {\n    unsigned: false\n});\nconversions[\"unsigned long\"] = createNumberConversion(32, {\n    unsigned: true\n});\nconversions[\"long long\"] = createNumberConversion(32, {\n    unsigned: false,\n    moduloBitLength: 64\n});\nconversions[\"unsigned long long\"] = createNumberConversion(32, {\n    unsigned: true,\n    moduloBitLength: 64\n});\nconversions[\"double\"] = function(V) {\n    const x = +V;\n    if (!Number.isFinite(x)) {\n        throw new TypeError(\"Argument is not a finite floating-point value\");\n    }\n    return x;\n};\nconversions[\"unrestricted double\"] = function(V) {\n    const x = +V;\n    if (isNaN(x)) {\n        throw new TypeError(\"Argument is NaN\");\n    }\n    return x;\n};\n// not quite valid, but good enough for JS\nconversions[\"float\"] = conversions[\"double\"];\nconversions[\"unrestricted float\"] = conversions[\"unrestricted double\"];\nconversions[\"DOMString\"] = function(V, opts) {\n    if (!opts) opts = {};\n    if (opts.treatNullAsEmptyString && V === null) {\n        return \"\";\n    }\n    return String(V);\n};\nconversions[\"ByteString\"] = function(V, opts) {\n    const x = String(V);\n    let c = undefined;\n    for(let i = 0; (c = x.codePointAt(i)) !== undefined; ++i){\n        if (c > 255) {\n            throw new TypeError(\"Argument is not a valid bytestring\");\n        }\n    }\n    return x;\n};\nconversions[\"USVString\"] = function(V) {\n    const S = String(V);\n    const n = S.length;\n    const U = [];\n    for(let i = 0; i < n; ++i){\n        const c = S.charCodeAt(i);\n        if (c < 0xD800 || c > 0xDFFF) {\n            U.push(String.fromCodePoint(c));\n        } else if (0xDC00 <= c && c <= 0xDFFF) {\n            U.push(String.fromCodePoint(0xFFFD));\n        } else {\n            if (i === n - 1) {\n                U.push(String.fromCodePoint(0xFFFD));\n            } else {\n                const d = S.charCodeAt(i + 1);\n                if (0xDC00 <= d && d <= 0xDFFF) {\n                    const a = c & 0x3FF;\n                    const b = d & 0x3FF;\n                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));\n                    ++i;\n                } else {\n                    U.push(String.fromCodePoint(0xFFFD));\n                }\n            }\n        }\n    }\n    return U.join(\"\");\n};\nconversions[\"Date\"] = function(V, opts) {\n    if (!(V instanceof Date)) {\n        throw new TypeError(\"Argument is not a Date object\");\n    }\n    if (isNaN(V)) {\n        return undefined;\n    }\n    return V;\n};\nconversions[\"RegExp\"] = function(V, opts) {\n    if (!(V instanceof RegExp)) {\n        V = new RegExp(V);\n    }\n    return V;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2ViaWRsLWNvbnZlcnNpb25zL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUViLElBQUlBLGNBQWMsQ0FBQztBQUNuQkMsT0FBT0MsT0FBTyxHQUFHRjtBQUVqQixTQUFTRyxLQUFLQyxDQUFDO0lBQ1gsT0FBT0EsSUFBSSxJQUFJLENBQUMsSUFBSTtBQUN4QjtBQUVBLFNBQVNDLFVBQVVELENBQUM7SUFDaEIsNEZBQTRGO0lBQzVGLElBQUksSUFBSyxNQUFPLE9BQU8sQ0FBQ0EsSUFBSSxPQUFPLEdBQUc7UUFDbEMsT0FBT0UsS0FBS0MsS0FBSyxDQUFDSDtJQUN0QixPQUFPO1FBQ0gsT0FBT0UsS0FBS0UsS0FBSyxDQUFDSjtJQUN0QjtBQUNKO0FBRUEsU0FBU0ssdUJBQXVCQyxTQUFTLEVBQUVDLFFBQVE7SUFDL0MsSUFBSSxDQUFDQSxTQUFTQyxRQUFRLEVBQUU7UUFDcEIsRUFBRUY7SUFDTjtJQUNBLE1BQU1HLGFBQWFGLFNBQVNDLFFBQVEsR0FBRyxJQUFJLENBQUNOLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUN4RCxNQUFNSyxhQUFhVCxLQUFLUSxHQUFHLENBQUMsR0FBR0osYUFBYTtJQUU1QyxNQUFNTSxZQUFZTCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLElBQUlYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSjtJQUNqRyxNQUFNUSxjQUFjUCxTQUFTTSxlQUFlLEdBQUdYLEtBQUtRLEdBQUcsQ0FBQyxHQUFHSCxTQUFTTSxlQUFlLEdBQUcsS0FBS1gsS0FBS1EsR0FBRyxDQUFDLEdBQUdKLFlBQVk7SUFFbkgsT0FBTyxTQUFTUyxDQUFDLEVBQUVDLElBQUk7UUFDbkIsSUFBSSxDQUFDQSxNQUFNQSxPQUFPLENBQUM7UUFFbkIsSUFBSWhCLElBQUksQ0FBQ2U7UUFFVCxJQUFJQyxLQUFLQyxZQUFZLEVBQUU7WUFDbkIsSUFBSSxDQUFDQyxPQUFPQyxRQUFR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QUlDO29CQUN2RCxFQUFFWDtnQkFDTixPQUFPO29CQUNISyxFQUFFRSxJQUFJLENBQUNULE9BQU9VLGFBQWEsQ0FBQztnQkFDaEM7WUFDSjtRQUNKO0lBQ0o7SUFFQSxPQUFPSCxFQUFFTyxJQUFJLENBQUM7QUFDbEI7QUFFQTdDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsU0FBVW1CLENBQUMsRUFBRUMsSUFBSTtJQUNuQyxJQUFJLENBQUVELENBQUFBLGFBQWEyQixJQUFHLEdBQUk7UUFDdEIsTUFBTSxJQUFJdEIsVUFBVTtJQUN4QjtJQUNBLElBQUlFLE1BQU1QLElBQUk7UUFDVixPQUFPUztJQUNYO0lBRUEsT0FBT1Q7QUFDWDtBQUVBbkIsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFVbUIsQ0FBQyxFQUFFQyxJQUFJO0lBQ3JDLElBQUksQ0FBRUQsQ0FBQUEsYUFBYTRCLE1BQUssR0FBSTtRQUN4QjVCLElBQUksSUFBSTRCLE9BQU81QjtJQUNuQjtJQUVBLE9BQU9BO0FBQ1giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3J5Z2VkZGVzLWV0aC8uL25vZGVfbW9kdWxlcy93ZWJpZGwtY29udmVyc2lvbnMvbGliL2luZGV4LmpzPzBmNzYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb252ZXJzaW9ucyA9IHt9O1xubW9kdWxlLmV4cG9ydHMgPSBjb252ZXJzaW9ucztcblxuZnVuY3Rpb24gc2lnbih4KSB7XG4gICAgcmV0dXJuIHggPCAwID8gLTEgOiAxO1xufVxuXG5mdW5jdGlvbiBldmVuUm91bmQoeCkge1xuICAgIC8vIFJvdW5kIHggdG8gdGhlIG5lYXJlc3QgaW50ZWdlciwgY2hvb3NpbmcgdGhlIGV2ZW4gaW50ZWdlciBpZiBpdCBsaWVzIGhhbGZ3YXkgYmV0d2VlbiB0d28uXG4gICAgaWYgKCh4ICUgMSkgPT09IDAuNSAmJiAoeCAmIDEpID09PSAwKSB7IC8vIFtldmVuIG51bWJlcl0uNTsgcm91bmQgZG93biAoaS5lLiBmbG9vcilcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoeCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKGJpdExlbmd0aCwgdHlwZU9wdHMpIHtcbiAgICBpZiAoIXR5cGVPcHRzLnVuc2lnbmVkKSB7XG4gICAgICAgIC0tYml0TGVuZ3RoO1xuICAgIH1cbiAgICBjb25zdCBsb3dlckJvdW5kID0gdHlwZU9wdHMudW5zaWduZWQgPyAwIDogLU1hdGgucG93KDIsIGJpdExlbmd0aCk7XG4gICAgY29uc3QgdXBwZXJCb3VuZCA9IE1hdGgucG93KDIsIGJpdExlbmd0aCkgLSAxO1xuXG4gICAgY29uc3QgbW9kdWxvVmFsID0gdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoID8gTWF0aC5wb3coMiwgdHlwZU9wdHMubW9kdWxvQml0TGVuZ3RoKSA6IE1hdGgucG93KDIsIGJpdExlbmd0aCk7XG4gICAgY29uc3QgbW9kdWxvQm91bmQgPSB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGggPyBNYXRoLnBvdygyLCB0eXBlT3B0cy5tb2R1bG9CaXRMZW5ndGggLSAxKSA6IE1hdGgucG93KDIsIGJpdExlbmd0aCAtIDEpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKFYsIG9wdHMpIHtcbiAgICAgICAgaWYgKCFvcHRzKSBvcHRzID0ge307XG5cbiAgICAgICAgbGV0IHggPSArVjtcblxuICAgICAgICBpZiAob3B0cy5lbmZvcmNlUmFuZ2UpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIGZpbml0ZSBudW1iZXJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHggPSBzaWduKHgpICogTWF0aC5mbG9vcihNYXRoLmFicyh4KSk7XG4gICAgICAgICAgICBpZiAoeCA8IGxvd2VyQm91bmQgfHwgeCA+IHVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGluIGJ5dGUgcmFuZ2VcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc05hTih4KSAmJiBvcHRzLmNsYW1wKSB7XG4gICAgICAgICAgICB4ID0gZXZlblJvdW5kKHgpO1xuXG4gICAgICAgICAgICBpZiAoeCA8IGxvd2VyQm91bmQpIHggPSBsb3dlckJvdW5kO1xuICAgICAgICAgICAgaWYgKHggPiB1cHBlckJvdW5kKSB4ID0gdXBwZXJCb3VuZDtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkgfHwgeCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICB4ID0gc2lnbih4KSAqIE1hdGguZmxvb3IoTWF0aC5hYnMoeCkpO1xuICAgICAgICB4ID0geCAlIG1vZHVsb1ZhbDtcblxuICAgICAgICBpZiAoIXR5cGVPcHRzLnVuc2lnbmVkICYmIHggPj0gbW9kdWxvQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB4IC0gbW9kdWxvVmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVPcHRzLnVuc2lnbmVkKSB7XG4gICAgICAgICAgICBpZiAoeCA8IDApIHtcbiAgICAgICAgICAgICAgeCArPSBtb2R1bG9WYWw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHggPT09IC0wKSB7IC8vIGRvbid0IHJldHVybiBuZWdhdGl2ZSB6ZXJvXG4gICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxufVxuXG5jb252ZXJzaW9uc1tcInZvaWRcIl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnZlcnNpb25zW1wiYm9vbGVhblwiXSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICByZXR1cm4gISF2YWw7XG59O1xuXG5jb252ZXJzaW9uc1tcImJ5dGVcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDgsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuY29udmVyc2lvbnNbXCJvY3RldFwiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oOCwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuY29udmVyc2lvbnNbXCJzaG9ydFwiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMTYsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuY29udmVyc2lvbnNbXCJ1bnNpZ25lZCBzaG9ydFwiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMTYsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmNvbnZlcnNpb25zW1wibG9uZ1wiXSA9IGNyZWF0ZU51bWJlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuY29udmVyc2lvbnNbXCJ1bnNpZ25lZCBsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuY29udmVyc2lvbnNbXCJsb25nIGxvbmdcIl0gPSBjcmVhdGVOdW1iZXJDb252ZXJzaW9uKDMyLCB7IHVuc2lnbmVkOiBmYWxzZSwgbW9kdWxvQml0TGVuZ3RoOiA2NCB9KTtcbmNvbnZlcnNpb25zW1widW5zaWduZWQgbG9uZyBsb25nXCJdID0gY3JlYXRlTnVtYmVyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogdHJ1ZSwgbW9kdWxvQml0TGVuZ3RoOiA2NCB9KTtcblxuY29udmVyc2lvbnNbXCJkb3VibGVcIl0gPSBmdW5jdGlvbiAoVikge1xuICAgIGNvbnN0IHggPSArVjtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBpcyBub3QgYSBmaW5pdGUgZmxvYXRpbmctcG9pbnQgdmFsdWVcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5jb252ZXJzaW9uc1tcInVucmVzdHJpY3RlZCBkb3VibGVcIl0gPSBmdW5jdGlvbiAoVikge1xuICAgIGNvbnN0IHggPSArVjtcblxuICAgIGlmIChpc05hTih4KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgTmFOXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB4O1xufTtcblxuLy8gbm90IHF1aXRlIHZhbGlkLCBidXQgZ29vZCBlbm91Z2ggZm9yIEpTXG5jb252ZXJzaW9uc1tcImZsb2F0XCJdID0gY29udmVyc2lvbnNbXCJkb3VibGVcIl07XG5jb252ZXJzaW9uc1tcInVucmVzdHJpY3RlZCBmbG9hdFwiXSA9IGNvbnZlcnNpb25zW1widW5yZXN0cmljdGVkIGRvdWJsZVwiXTtcblxuY29udmVyc2lvbnNbXCJET01TdHJpbmdcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuXG4gICAgaWYgKG9wdHMudHJlYXROdWxsQXNFbXB0eVN0cmluZyAmJiBWID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHJldHVybiBTdHJpbmcoVik7XG59O1xuXG5jb252ZXJzaW9uc1tcIkJ5dGVTdHJpbmdcIl0gPSBmdW5jdGlvbiAoViwgb3B0cykge1xuICAgIGNvbnN0IHggPSBTdHJpbmcoVik7XG4gICAgbGV0IGMgPSB1bmRlZmluZWQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IChjID0geC5jb2RlUG9pbnRBdChpKSkgIT09IHVuZGVmaW5lZDsgKytpKSB7XG4gICAgICAgIGlmIChjID4gMjU1KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnQgaXMgbm90IGEgdmFsaWQgYnl0ZXN0cmluZ1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB4O1xufTtcblxuY29udmVyc2lvbnNbXCJVU1ZTdHJpbmdcIl0gPSBmdW5jdGlvbiAoVikge1xuICAgIGNvbnN0IFMgPSBTdHJpbmcoVik7XG4gICAgY29uc3QgbiA9IFMubGVuZ3RoO1xuICAgIGNvbnN0IFUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBjb25zdCBjID0gUy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID4gMHhERkZGKSB7XG4gICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoYykpO1xuICAgICAgICB9IGVsc2UgaWYgKDB4REMwMCA8PSBjICYmIGMgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoMHhGRkZEKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcbiAgICAgICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoMHhGRkZEKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBTLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgICAgICAgIGlmICgweERDMDAgPD0gZCAmJiBkIDw9IDB4REZGRikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gYyAmIDB4M0ZGO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gZCAmIDB4M0ZGO1xuICAgICAgICAgICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoKDIgPDwgMTUpICsgKDIgPDwgOSkgKiBhICsgYikpO1xuICAgICAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVS5wdXNoKFN0cmluZy5mcm9tQ29kZVBvaW50KDB4RkZGRCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBVLmpvaW4oJycpO1xufTtcblxuY29udmVyc2lvbnNbXCJEYXRlXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBpZiAoIShWIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IGlzIG5vdCBhIERhdGUgb2JqZWN0XCIpO1xuICAgIH1cbiAgICBpZiAoaXNOYU4oVikpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gVjtcbn07XG5cbmNvbnZlcnNpb25zW1wiUmVnRXhwXCJdID0gZnVuY3Rpb24gKFYsIG9wdHMpIHtcbiAgICBpZiAoIShWIGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICBWID0gbmV3IFJlZ0V4cChWKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVjtcbn07XG4iXSwibmFtZXMiOlsiY29udmVyc2lvbnMiLCJtb2R1bGUiLCJleHBvcnRzIiwic2lnbiIsIngiLCJldmVuUm91bmQiLCJNYXRoIiwiZmxvb3IiLCJyb3VuZCIsImNyZWF0ZU51bWJlckNvbnZlcnNpb24iLCJiaXRMZW5ndGgiLCJ0eXBlT3B0cyIsInVuc2lnbmVkIiwibG93ZXJCb3VuZCIsInBvdyIsInVwcGVyQm91bmQiLCJtb2R1bG9WYWwiLCJtb2R1bG9CaXRMZW5ndGgiLCJtb2R1bG9Cb3VuZCIsIlYiLCJvcHRzIiwiZW5mb3JjZVJhbmdlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJUeXBlRXJyb3IiLCJhYnMiLCJpc05hTiIsImNsYW1wIiwidW5kZWZpbmVkIiwidmFsIiwidHJlYXROdWxsQXNFbXB0eVN0cmluZyIsIlN0cmluZyIsImMiLCJpIiwiY29kZVBvaW50QXQiLCJTIiwibiIsImxlbmd0aCIsIlUiLCJjaGFyQ29kZUF0IiwicHVzaCIsImZyb21Db2RlUG9pbnQiLCJkIiwiYSIsImIiLCJqb2luIiwiRGF0ZSIsIlJlZ0V4cCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/webidl-conversions/lib/index.js\n");

/***/ })

};
;