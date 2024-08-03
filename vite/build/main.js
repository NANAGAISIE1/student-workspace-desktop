import { app, ipcMain, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import { Amplify as Amplify$1 } from "aws-amplify";
import Store from "electron-store";
import { Buffer as Buffer$1 } from "buffer";
import { fileURLToPath } from "node:url";
function _typeof$3(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$3 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$3 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$3(obj);
}
function isObjectLike(value) {
  return _typeof$3(value) == "object" && value !== null;
}
var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";
function getLocation(source, position) {
  var lineRegexp = /\r\n|[\n\r]/g;
  var line = 1;
  var column = position + 1;
  var match;
  while ((match = lineRegexp.exec(source.body)) && match.index < position) {
    line += 1;
    column = position + 1 - (match.index + match[0].length);
  }
  return {
    line,
    column
  };
}
function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
  var firstLineColumnOffset = source.locationOffset.column - 1;
  var body = whitespace(firstLineColumnOffset) + source.body;
  var lineIndex = sourceLocation.line - 1;
  var lineOffset = source.locationOffset.line - 1;
  var lineNum = sourceLocation.line + lineOffset;
  var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  var columnNum = sourceLocation.column + columnOffset;
  var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
  var lines = body.split(/\r\n|[\n\r]/g);
  var locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    var subLineIndex = Math.floor(columnNum / 80);
    var subLineColumnNum = columnNum % 80;
    var subLines = [];
    for (var i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
      return ["", subLine];
    }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
  }
  return locationStr + printPrefixedLines([
    // Lines specified like this: ["prefix", "string"],
    ["".concat(lineNum - 1), lines[lineIndex - 1]],
    ["".concat(lineNum), locationLine],
    ["", whitespace(columnNum - 1) + "^"],
    ["".concat(lineNum + 1), lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  var existingLines = lines.filter(function(_ref) {
    _ref[0];
    var line = _ref[1];
    return line !== void 0;
  });
  var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
    var prefix = _ref2[0];
    return prefix.length;
  }));
  return existingLines.map(function(_ref3) {
    var prefix = _ref3[0], line = _ref3[1];
    return leftPad(padLen, prefix) + (line ? " | " + line : " |");
  }).join("\n");
}
function whitespace(len) {
  return Array(len + 1).join(" ");
}
function leftPad(len, str) {
  return whitespace(len - str.length) + str;
}
function _typeof$2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$2 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$2 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$2(obj);
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var GraphQLError = /* @__PURE__ */ function(_Error) {
  _inherits(GraphQLError2, _Error);
  var _super = _createSuper(GraphQLError2);
  function GraphQLError2(message, nodes, source, positions, path2, originalError, extensions) {
    var _nodeLocations, _nodeLocations2, _nodeLocations3;
    var _this;
    _classCallCheck(this, GraphQLError2);
    _this = _super.call(this, message);
    _this.name = "GraphQLError";
    _this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0);
    var nodeLocations = [];
    for (var _i2 = 0, _ref3 = (_this$nodes = _this.nodes) !== null && _this$nodes !== void 0 ? _this$nodes : []; _i2 < _ref3.length; _i2++) {
      var _this$nodes;
      var _ref4 = _ref3[_i2];
      var loc = _ref4.loc;
      if (loc != null) {
        nodeLocations.push(loc);
      }
    }
    nodeLocations = undefinedIfEmpty(nodeLocations);
    _this.source = source !== null && source !== void 0 ? source : (_nodeLocations = nodeLocations) === null || _nodeLocations === void 0 ? void 0 : _nodeLocations[0].source;
    _this.positions = positions !== null && positions !== void 0 ? positions : (_nodeLocations2 = nodeLocations) === null || _nodeLocations2 === void 0 ? void 0 : _nodeLocations2.map(function(loc2) {
      return loc2.start;
    });
    _this.locations = positions && source ? positions.map(function(pos) {
      return getLocation(source, pos);
    }) : (_nodeLocations3 = nodeLocations) === null || _nodeLocations3 === void 0 ? void 0 : _nodeLocations3.map(function(loc2) {
      return getLocation(loc2.source, loc2.start);
    });
    _this.path = path2 !== null && path2 !== void 0 ? path2 : void 0;
    var originalExtensions = originalError === null || originalError === void 0 ? void 0 : originalError.extensions;
    if (extensions == null && isObjectLike(originalExtensions)) {
      _this.extensions = _objectSpread({}, originalExtensions);
    } else {
      _this.extensions = extensions !== null && extensions !== void 0 ? extensions : {};
    }
    Object.defineProperties(_assertThisInitialized(_this), {
      message: {
        enumerable: true
      },
      locations: {
        enumerable: _this.locations != null
      },
      path: {
        enumerable: _this.path != null
      },
      extensions: {
        enumerable: _this.extensions != null && Object.keys(_this.extensions).length > 0
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
      return _possibleConstructorReturn(_this);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError2);
    } else {
      Object.defineProperty(_assertThisInitialized(_this), "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
    return _this;
  }
  _createClass$1(GraphQLError2, [{
    key: "toString",
    value: function toString() {
      return printError(this);
    }
    // FIXME: workaround to not break chai comparisons, should be remove in v16
    // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
  }, {
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return "Object";
    }
  }]);
  return GraphQLError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}
function printError(error) {
  var output = error.message;
  if (error.nodes) {
    for (var _i4 = 0, _error$nodes2 = error.nodes; _i4 < _error$nodes2.length; _i4++) {
      var node = _error$nodes2[_i4];
      if (node.loc) {
        output += "\n\n" + printLocation(node.loc);
      }
    }
  } else if (error.source && error.locations) {
    for (var _i6 = 0, _error$locations2 = error.locations; _i6 < _error$locations2.length; _i6++) {
      var location = _error$locations2[_i6];
      output += "\n\n" + printSourceLocation(error.source, location);
    }
  }
  return output;
}
function syntaxError(source, position, description) {
  return new GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
}
var Kind = Object.freeze({
  // Name
  NAME: "Name",
  // Document
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  // Fragments
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  // Values
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  // Directives
  DIRECTIVE: "Directive",
  // Types
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType",
  // Type System Definitions
  SCHEMA_DEFINITION: "SchemaDefinition",
  OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
  // Type Definitions
  SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
  OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
  FIELD_DEFINITION: "FieldDefinition",
  INPUT_VALUE_DEFINITION: "InputValueDefinition",
  INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
  UNION_TYPE_DEFINITION: "UnionTypeDefinition",
  ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
  ENUM_VALUE_DEFINITION: "EnumValueDefinition",
  INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
  // Directive Definitions
  DIRECTIVE_DEFINITION: "DirectiveDefinition",
  // Type System Extensions
  SCHEMA_EXTENSION: "SchemaExtension",
  // Type Extensions
  SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
  OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
  INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
  UNION_TYPE_EXTENSION: "UnionTypeExtension",
  ENUM_TYPE_EXTENSION: "EnumTypeExtension",
  INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
});
function invariant(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error("Unexpected invariant triggered.");
  }
}
var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
function defineInspect(classObject) {
  var fn = classObject.prototype.toJSON;
  typeof fn === "function" || invariant(0);
  classObject.prototype.inspect = fn;
  if (nodejsCustomInspectSymbol) {
    classObject.prototype[nodejsCustomInspectSymbol] = fn;
  }
}
var Location = /* @__PURE__ */ function() {
  function Location2(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  var _proto = Location2.prototype;
  _proto.toJSON = function toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  };
  return Location2;
}();
defineInspect(Location);
var Token = /* @__PURE__ */ function() {
  function Token2(kind, start, end, line, column, prev, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = prev;
    this.next = null;
  }
  var _proto2 = Token2.prototype;
  _proto2.toJSON = function toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  };
  return Token2;
}();
defineInspect(Token);
function isNode(maybeNode) {
  return maybeNode != null && typeof maybeNode.kind === "string";
}
var TokenKind = Object.freeze({
  SOF: "<SOF>",
  EOF: "<EOF>",
  BANG: "!",
  DOLLAR: "$",
  AMP: "&",
  PAREN_L: "(",
  PAREN_R: ")",
  SPREAD: "...",
  COLON: ":",
  EQUALS: "=",
  AT: "@",
  BRACKET_L: "[",
  BRACKET_R: "]",
  BRACE_L: "{",
  PIPE: "|",
  BRACE_R: "}",
  NAME: "Name",
  INT: "Int",
  FLOAT: "Float",
  STRING: "String",
  BLOCK_STRING: "BlockString",
  COMMENT: "Comment"
});
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (_typeof$1(value)) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? "[function ".concat(value.name, "]") : "[function]";
    case "object":
      if (value === null) {
        return "null";
      }
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (previouslySeenValues.indexOf(value) !== -1) {
    return "[Circular]";
  }
  var seenValues = [].concat(previouslySeenValues, [value]);
  var customInspectFn = getCustomFn(value);
  if (customInspectFn !== void 0) {
    var customValue = customInspectFn.call(value);
    if (customValue !== value) {
      return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
  var keys = Object.keys(object);
  if (keys.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  var properties = keys.map(function(key) {
    var value = formatValue(object[key], seenValues);
    return key + ": " + value;
  });
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  var len = Math.min(MAX_ARRAY_LENGTH, array.length);
  var remaining = array.length - len;
  var items = [];
  for (var i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push("... ".concat(remaining, " more items"));
  }
  return "[" + items.join(", ") + "]";
}
function getCustomFn(object) {
  var customInspectFn = object[String(nodejsCustomInspectSymbol)];
  if (typeof customInspectFn === "function") {
    return customInspectFn;
  }
  if (typeof object.inspect === "function") {
    return object.inspect;
  }
}
function getObjectTag(object) {
  var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    var name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}
function devAssert(condition, message) {
  var booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
const instanceOf = process.env.NODE_ENV === "production" ? (
  // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
  // eslint-disable-next-line no-shadow
  function instanceOf2(value, constructor) {
    return value instanceof constructor;
  }
) : (
  // eslint-disable-next-line no-shadow
  function instanceOf3(value, constructor) {
    if (value instanceof constructor) {
      return true;
    }
    if (_typeof(value) === "object" && value !== null) {
      var _value$constructor;
      var className = constructor.prototype[Symbol.toStringTag];
      var valueClassName = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name
      );
      if (className === valueClassName) {
        var stringifiedValue = inspect(value);
        throw new Error("Cannot use ".concat(className, ' "').concat(stringifiedValue, '" from another module or realm.\n\nEnsure that there is only one instance of "graphql" in the node_modules\ndirectory. If different versions of "graphql" are the dependencies of other\nrelied on modules, use "resolutions" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate "graphql" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results.'));
      }
    }
    return false;
  }
);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  return Constructor;
}
var Source = /* @__PURE__ */ function() {
  function Source2(body) {
    var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
    var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      line: 1,
      column: 1
    };
    typeof body === "string" || devAssert(0, "Body must be a string. Received: ".concat(inspect(body), "."));
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(0, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(0, "column in locationOffset is 1-indexed and must be positive.");
  }
  _createClass(Source2, [{
    key: SYMBOL_TO_STRING_TAG,
    get: function get() {
      return "Source";
    }
  }]);
  return Source2;
}();
function isSource(source) {
  return instanceOf(source, Source);
}
var DirectiveLocation = Object.freeze({
  // Request Definitions
  QUERY: "QUERY",
  MUTATION: "MUTATION",
  SUBSCRIPTION: "SUBSCRIPTION",
  FIELD: "FIELD",
  FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
  FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
  INLINE_FRAGMENT: "INLINE_FRAGMENT",
  VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
  // Type System Definitions
  SCHEMA: "SCHEMA",
  SCALAR: "SCALAR",
  OBJECT: "OBJECT",
  FIELD_DEFINITION: "FIELD_DEFINITION",
  ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
  INTERFACE: "INTERFACE",
  UNION: "UNION",
  ENUM: "ENUM",
  ENUM_VALUE: "ENUM_VALUE",
  INPUT_OBJECT: "INPUT_OBJECT",
  INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
});
function dedentBlockStringValue(rawString) {
  var lines = rawString.split(/\r\n|[\n\r]/g);
  var commonIndent = getBlockStringIndentation(rawString);
  if (commonIndent !== 0) {
    for (var i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  var startLine = 0;
  while (startLine < lines.length && isBlank(lines[startLine])) {
    ++startLine;
  }
  var endLine = lines.length;
  while (endLine > startLine && isBlank(lines[endLine - 1])) {
    --endLine;
  }
  return lines.slice(startLine, endLine).join("\n");
}
function isBlank(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str[i] !== " " && str[i] !== "	") {
      return false;
    }
  }
  return true;
}
function getBlockStringIndentation(value) {
  var _commonIndent;
  var isFirstLine = true;
  var isEmptyLine = true;
  var indent2 = 0;
  var commonIndent = null;
  for (var i = 0; i < value.length; ++i) {
    switch (value.charCodeAt(i)) {
      case 13:
        if (value.charCodeAt(i + 1) === 10) {
          ++i;
        }
      case 10:
        isFirstLine = false;
        isEmptyLine = true;
        indent2 = 0;
        break;
      case 9:
      case 32:
        ++indent2;
        break;
      default:
        if (isEmptyLine && !isFirstLine && (commonIndent === null || indent2 < commonIndent)) {
          commonIndent = indent2;
        }
        isEmptyLine = false;
    }
  }
  return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
  var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isSingleLine = value.indexOf("\n") === -1;
  var hasLeadingSpace = value[0] === " " || value[0] === "	";
  var hasTrailingQuote = value[value.length - 1] === '"';
  var hasTrailingSlash = value[value.length - 1] === "\\";
  var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
  var result = "";
  if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
    result += "\n" + indentation;
  }
  result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
  if (printAsMultipleLines) {
    result += "\n";
  }
  return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}
var Lexer = /* @__PURE__ */ function() {
  function Lexer2(source) {
    var startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0, null);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  var _proto = Lexer2.prototype;
  _proto.advance = function advance() {
    this.lastToken = this.token;
    var token = this.token = this.lookahead();
    return token;
  };
  _proto.lookahead = function lookahead() {
    var token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        var _token$next;
        token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  };
  return Lexer2;
}();
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function printCharCode(code) {
  return (
    // NaN/undefined represents access beyond the end of the file.
    isNaN(code) ? TokenKind.EOF : (
      // Trust JSON for ASCII.
      code < 127 ? JSON.stringify(String.fromCharCode(code)) : (
        // Otherwise print the escaped form.
        '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"')
      )
    )
  );
}
function readToken(lexer, prev) {
  var source = lexer.source;
  var body = source.body;
  var bodyLength = body.length;
  var pos = prev.end;
  while (pos < bodyLength) {
    var code = body.charCodeAt(pos);
    var _line = lexer.line;
    var _col = 1 + pos - lexer.lineStart;
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++pos;
        continue;
      case 10:
        ++pos;
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 13:
        if (body.charCodeAt(pos + 1) === 10) {
          pos += 2;
        } else {
          ++pos;
        }
        ++lexer.line;
        lexer.lineStart = pos;
        continue;
      case 33:
        return new Token(TokenKind.BANG, pos, pos + 1, _line, _col, prev);
      case 35:
        return readComment(source, pos, _line, _col, prev);
      case 36:
        return new Token(TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
      case 38:
        return new Token(TokenKind.AMP, pos, pos + 1, _line, _col, prev);
      case 40:
        return new Token(TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
      case 41:
        return new Token(TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
      case 46:
        if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
          return new Token(TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
        }
        break;
      case 58:
        return new Token(TokenKind.COLON, pos, pos + 1, _line, _col, prev);
      case 61:
        return new Token(TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
      case 64:
        return new Token(TokenKind.AT, pos, pos + 1, _line, _col, prev);
      case 91:
        return new Token(TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
      case 93:
        return new Token(TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
      case 123:
        return new Token(TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
      case 124:
        return new Token(TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
      case 125:
        return new Token(TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
      case 34:
        if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
          return readBlockString(source, pos, _line, _col, prev, lexer);
        }
        return readString(source, pos, _line, _col, prev);
      case 45:
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return readNumber(source, pos, code, _line, _col, prev);
      case 65:
      case 66:
      case 67:
      case 68:
      case 69:
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 76:
      case 77:
      case 78:
      case 79:
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
      case 90:
      case 95:
      case 97:
      case 98:
      case 99:
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 109:
      case 110:
      case 111:
      case 112:
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
        return readName(source, pos, _line, _col, prev);
    }
    throw syntaxError(source, pos, unexpectedCharacterMessage(code));
  }
  var line = lexer.line;
  var col = 1 + pos - lexer.lineStart;
  return new Token(TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
}
function unexpectedCharacterMessage(code) {
  if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
    return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
  }
  if (code === 39) {
    return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
  }
  return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
function readComment(source, start, line, col, prev) {
  var body = source.body;
  var code;
  var position = start;
  do {
    code = body.charCodeAt(++position);
  } while (!isNaN(code) && // SourceCharacter but not LineTerminator
  (code > 31 || code === 9));
  return new Token(TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
function readNumber(source, start, firstCode, line, col, prev) {
  var body = source.body;
  var code = firstCode;
  var position = start;
  var isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (code >= 48 && code <= 57) {
      throw syntaxError(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
    }
  } else {
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(source, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
  }
  return new Token(isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
}
function readDigits(source, start, firstCode) {
  var body = source.body;
  var position = start;
  var code = firstCode;
  if (code >= 48 && code <= 57) {
    do {
      code = body.charCodeAt(++position);
    } while (code >= 48 && code <= 57);
    return position;
  }
  throw syntaxError(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
function readString(source, start, line, col, prev) {
  var body = source.body;
  var position = start + 1;
  var chunkStart = position;
  var code = 0;
  var value = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
  code !== 10 && code !== 13) {
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return new Token(TokenKind.STRING, start, position + 1, line, col, prev, value);
    }
    if (code < 32 && code !== 9) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    ++position;
    if (code === 92) {
      value += body.slice(chunkStart, position - 1);
      code = body.charCodeAt(position);
      switch (code) {
        case 34:
          value += '"';
          break;
        case 47:
          value += "/";
          break;
        case 92:
          value += "\\";
          break;
        case 98:
          value += "\b";
          break;
        case 102:
          value += "\f";
          break;
        case 110:
          value += "\n";
          break;
        case 114:
          value += "\r";
          break;
        case 116:
          value += "	";
          break;
        case 117: {
          var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
          if (charCode < 0) {
            var invalidSequence = body.slice(position + 1, position + 5);
            throw syntaxError(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
          }
          value += String.fromCharCode(charCode);
          position += 4;
          break;
        }
        default:
          throw syntaxError(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
      }
      ++position;
      chunkStart = position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function readBlockString(source, start, line, col, prev, lexer) {
  var body = source.body;
  var position = start + 3;
  var chunkStart = position;
  var code = 0;
  var rawValue = "";
  while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      rawValue += body.slice(chunkStart, position);
      return new Token(TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, dedentBlockStringValue(rawValue));
    }
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
      throw syntaxError(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
    }
    if (code === 10) {
      ++position;
      ++lexer.line;
      lexer.lineStart = position;
    } else if (code === 13) {
      if (body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      ++lexer.line;
      lexer.lineStart = position;
    } else if (
      // Escape Triple-Quote (\""")
      code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34
    ) {
      rawValue += body.slice(chunkStart, position) + '"""';
      position += 4;
      chunkStart = position;
    } else {
      ++position;
    }
  }
  throw syntaxError(source, position, "Unterminated string.");
}
function uniCharCode(a, b, c, d) {
  return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
function char2hex(a) {
  return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 70 ? a - 55 : a >= 97 && a <= 102 ? a - 87 : -1;
}
function readName(source, start, line, col, prev) {
  var body = source.body;
  var bodyLength = body.length;
  var position = start + 1;
  var code = 0;
  while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
  code >= 48 && code <= 57 || // 0-9
  code >= 65 && code <= 90 || // A-Z
  code >= 97 && code <= 122)) {
    ++position;
  }
  return new Token(TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
}
function isNameStart(code) {
  return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
function parse(source, options) {
  var parser = new Parser(source, options);
  return parser.parseDocument();
}
var Parser = /* @__PURE__ */ function() {
  function Parser2(source, options) {
    var sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
  }
  var _proto = Parser2.prototype;
  _proto.parseName = function parseName() {
    var token = this.expectToken(TokenKind.NAME);
    return {
      kind: Kind.NAME,
      value: token.value,
      loc: this.loc(token)
    };
  };
  _proto.parseDocument = function parseDocument() {
    var start = this._lexer.token;
    return {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF),
      loc: this.loc(start)
    };
  };
  _proto.parseDefinition = function parseDefinition() {
    if (this.peek(TokenKind.NAME)) {
      switch (this._lexer.token.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "schema":
        case "scalar":
        case "type":
        case "interface":
        case "union":
        case "enum":
        case "input":
        case "directive":
          return this.parseTypeSystemDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    } else if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } else if (this.peekDescription()) {
      return this.parseTypeSystemDefinition();
    }
    throw this.unexpected();
  };
  _proto.parseOperationDefinition = function parseOperationDefinition() {
    var start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return {
        kind: Kind.OPERATION_DEFINITION,
        operation: "query",
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    var operation = this.parseOperationType();
    var name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseOperationType = function parseOperationType() {
    var operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return "query";
      case "mutation":
        return "mutation";
      case "subscription":
        return "subscription";
    }
    throw this.unexpected(operationToken);
  };
  _proto.parseVariableDefinitions = function parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  };
  _proto.parseVariableDefinition = function parseVariableDefinition() {
    var start = this._lexer.token;
    return {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
      directives: this.parseDirectives(true),
      loc: this.loc(start)
    };
  };
  _proto.parseVariable = function parseVariable() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return {
      kind: Kind.VARIABLE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseSelectionSet = function parseSelectionSet() {
    var start = this._lexer.token;
    return {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseSelection = function parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  };
  _proto.parseField = function parseField() {
    var start = this._lexer.token;
    var nameOrAlias = this.parseName();
    var alias;
    var name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
      loc: this.loc(start)
    };
  };
  _proto.parseArguments = function parseArguments(isConst) {
    var item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  };
  _proto.parseArgument = function parseArgument() {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(false),
      loc: this.loc(start)
    };
  };
  _proto.parseConstArgument = function parseConstArgument() {
    var start = this._lexer.token;
    return {
      kind: Kind.ARGUMENT,
      name: this.parseName(),
      value: (this.expectToken(TokenKind.COLON), this.parseValueLiteral(true)),
      loc: this.loc(start)
    };
  };
  _proto.parseFragment = function parseFragment() {
    var start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    var hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentDefinition = function parseFragmentDefinition() {
    var _this$_options;
    var start = this._lexer.token;
    this.expectKeyword("fragment");
    if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
      return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
        loc: this.loc(start)
      };
    }
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
      loc: this.loc(start)
    };
  };
  _proto.parseFragmentName = function parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  };
  _proto.parseValueLiteral = function parseValueLiteral(isConst) {
    var token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this._lexer.advance();
        return {
          kind: Kind.INT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.FLOAT:
        this._lexer.advance();
        return {
          kind: Kind.FLOAT,
          value: token.value,
          loc: this.loc(token)
        };
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this._lexer.advance();
        switch (token.value) {
          case "true":
            return {
              kind: Kind.BOOLEAN,
              value: true,
              loc: this.loc(token)
            };
          case "false":
            return {
              kind: Kind.BOOLEAN,
              value: false,
              loc: this.loc(token)
            };
          case "null":
            return {
              kind: Kind.NULL,
              loc: this.loc(token)
            };
          default:
            return {
              kind: Kind.ENUM,
              value: token.value,
              loc: this.loc(token)
            };
        }
      case TokenKind.DOLLAR:
        if (!isConst) {
          return this.parseVariable();
        }
        break;
    }
    throw this.unexpected();
  };
  _proto.parseStringLiteral = function parseStringLiteral() {
    var token = this._lexer.token;
    this._lexer.advance();
    return {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
      loc: this.loc(token)
    };
  };
  _proto.parseList = function parseList(isConst) {
    var _this = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this.parseValueLiteral(isConst);
    };
    return {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObject = function parseObject(isConst) {
    var _this2 = this;
    var start = this._lexer.token;
    var item = function item2() {
      return _this2.parseObjectField(isConst);
    };
    return {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
      loc: this.loc(start)
    };
  };
  _proto.parseObjectField = function parseObjectField(isConst) {
    var start = this._lexer.token;
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseDirectives = function parseDirectives(isConst) {
    var directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  };
  _proto.parseDirective = function parseDirective(isConst) {
    var start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeReference = function parseTypeReference() {
    var start = this._lexer.token;
    var type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      type = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = {
        kind: Kind.LIST_TYPE,
        type,
        loc: this.loc(start)
      };
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return {
        kind: Kind.NON_NULL_TYPE,
        type,
        loc: this.loc(start)
      };
    }
    return type;
  };
  _proto.parseNamedType = function parseNamedType() {
    var start = this._lexer.token;
    return {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
      loc: this.loc(start)
    };
  };
  _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
    var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.peekDescription = function peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  };
  _proto.parseDescription = function parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  };
  _proto.parseSchemaDefinition = function parseSchemaDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
    var start = this._lexer.token;
    var operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    var type = this.parseNamedType();
    return {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
    var _this$_options2;
    if (!this.expectOptionalKeyword("implements")) {
      return [];
    }
    if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
      var types = [];
      this.expectOptionalToken(TokenKind.AMP);
      do {
        types.push(this.parseNamedType());
      } while (this.expectOptionalToken(TokenKind.AMP) || this.peek(TokenKind.NAME));
      return types;
    }
    return this.delimitedMany(TokenKind.AMP, this.parseNamedType);
  };
  _proto.parseFieldsDefinition = function parseFieldsDefinition() {
    var _this$_options3;
    if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(TokenKind.BRACE_L) && this._lexer.lookahead().kind === TokenKind.BRACE_R) {
      this._lexer.advance();
      this._lexer.advance();
      return [];
    }
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  };
  _proto.parseFieldDefinition = function parseFieldDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseArgumentDefs = function parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  };
  _proto.parseInputValueDef = function parseInputValueDef() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    this.expectToken(TokenKind.COLON);
    var type = this.parseTypeReference();
    var defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseValueLiteral(true);
    }
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    return {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    return {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  };
  _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    return {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  };
  _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    return {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  };
  _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
    var keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  };
  _proto.parseSchemaExtension = function parseSchemaExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    var directives = this.parseDirectives(true);
    var operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
      loc: this.loc(start)
    };
  };
  _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
      loc: this.loc(start)
    };
  };
  _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    var name = this.parseName();
    var interfaces = this.parseImplementsInterfaces();
    var directives = this.parseDirectives(true);
    var fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
      loc: this.loc(start)
    };
  };
  _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
      loc: this.loc(start)
    };
  };
  _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
    var start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    var name = this.parseName();
    var directives = this.parseDirectives(true);
    var fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
    var start = this._lexer.token;
    var description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    var name = this.parseName();
    var args = this.parseArgumentDefs();
    var repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    var locations = this.parseDirectiveLocations();
    return {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
      loc: this.loc(start)
    };
  };
  _proto.parseDirectiveLocations = function parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  };
  _proto.parseDirectiveLocation = function parseDirectiveLocation() {
    var start = this._lexer.token;
    var name = this.parseName();
    if (DirectiveLocation[name.value] !== void 0) {
      return name;
    }
    throw this.unexpected(start);
  };
  _proto.loc = function loc(startToken) {
    var _this$_options4;
    if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
      return new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
  };
  _proto.peek = function peek(kind) {
    return this._lexer.token.kind === kind;
  };
  _proto.expectToken = function expectToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
  };
  _proto.expectOptionalToken = function expectOptionalToken(kind) {
    var token = this._lexer.token;
    if (token.kind === kind) {
      this._lexer.advance();
      return token;
    }
    return void 0;
  };
  _proto.expectKeyword = function expectKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
    } else {
      throw syntaxError(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
    }
  };
  _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
    var token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this._lexer.advance();
      return true;
    }
    return false;
  };
  _proto.unexpected = function unexpected(atToken) {
    var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
  };
  _proto.any = function any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  };
  _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      var nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  };
  _proto.many = function many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  };
  _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    var nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  };
  return Parser2;
}();
function getTokenDesc(token) {
  var value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? '"'.concat(kind, '"') : kind;
}
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are experimental and may be changed
    // or removed in the future.
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: ["description", "name", "type", "defaultValue", "directives"],
  InterfaceTypeDefinition: ["description", "name", "interfaces", "directives", "fields"],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : QueryDocumentKeys;
  var stack = void 0;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = void 0;
  var key = void 0;
  var parent = void 0;
  var path2 = [];
  var ancestors = [];
  var newRoot = root;
  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path2[path2.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};
          for (var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++) {
            var k = _Object$keys2[_i2];
            clone[k] = node[k];
          }
          node = clone;
        }
        var editOffset = 0;
        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];
          if (inArray) {
            editKey -= editOffset;
          }
          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : void 0;
      node = parent ? parent[key] : newRoot;
      if (node === null || node === void 0) {
        continue;
      }
      if (parent) {
        path2.push(key);
      }
    }
    var result = void 0;
    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error("Invalid AST Node: ".concat(inspect(node), "."));
      }
      var visitFn = getVisitFn(visitor, node.kind, isLeaving);
      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path2, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path2.pop();
            continue;
          }
        } else if (result !== void 0) {
          edits.push([key, result]);
          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path2.pop();
              continue;
            }
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path2.pop();
    } else {
      var _visitorKeys$node$kin;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }
  return newRoot;
}
function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];
  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === "function") {
      return kindVisitor;
    }
    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
    if (typeof kindSpecificVisitor === "function") {
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
    if (specificVisitor) {
      if (typeof specificVisitor === "function") {
        return specificVisitor;
      }
      var specificKindVisitor = specificVisitor[kind];
      if (typeof specificKindVisitor === "function") {
        return specificKindVisitor;
      }
    }
  }
}
function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return "$" + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, "\n\n") + "\n";
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
    var directives = join(node.directives, " ");
    var selectionSet = node.selectionSet;
    return !name && !directives && !varDefs && op === "query" ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], " ");
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
    return variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
    var prefix = wrap("", alias, ": ") + name;
    var argsLine = prefix + wrap("(", join(args, ", "), ")");
    if (argsLine.length > MAX_LINE_LENGTH) {
      argsLine = prefix + wrap("(\n", indent(join(args, "\n")), "\n)");
    }
    return join([argsLine, join(directives, " "), selectionSet], " ");
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name, value = _ref4.value;
    return name + ": " + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name, directives = _ref5.directives;
    return "..." + name + wrap(" ", join(directives, " "));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
    return join(["...", wrap("on ", typeCondition), join(directives, " "), selectionSet], " ");
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
    return (
      // Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap("(", join(variableDefinitions, ", "), ")"), " ") + "on ".concat(typeCondition, " ").concat(wrap("", join(directives, " "), " ")) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value, isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === "description" ? "" : "  ") : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? "true" : "false";
  },
  NullValue: function NullValue() {
    return "null";
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return "[" + join(values, ", ") + "]";
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return "{" + join(fields, ", ") + "}";
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name, value = _ref15.value;
    return name + ": " + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name, args = _ref16.arguments;
    return "@" + name + wrap("(", join(args, ", "), ")");
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return "[" + type + "]";
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + "!";
  },
  // Type System Definitions
  SchemaDefinition: addDescription(function(_ref20) {
    var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
    return join(["schema", join(directives, " "), block(operationTypes)], " ");
  }),
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation, type = _ref21.type;
    return operation + ": " + type;
  },
  ScalarTypeDefinition: addDescription(function(_ref22) {
    var name = _ref22.name, directives = _ref22.directives;
    return join(["scalar", name, join(directives, " ")], " ");
  }),
  ObjectTypeDefinition: addDescription(function(_ref23) {
    var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
    return join(["type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  FieldDefinition: addDescription(function(_ref24) {
    var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
    return name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "));
  }),
  InputValueDefinition: addDescription(function(_ref25) {
    var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
    return join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ");
  }),
  InterfaceTypeDefinition: addDescription(function(_ref26) {
    var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
    return join(["interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  }),
  UnionTypeDefinition: addDescription(function(_ref27) {
    var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
    return join(["union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  }),
  EnumTypeDefinition: addDescription(function(_ref28) {
    var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
    return join(["enum", name, join(directives, " "), block(values)], " ");
  }),
  EnumValueDefinition: addDescription(function(_ref29) {
    var name = _ref29.name, directives = _ref29.directives;
    return join([name, join(directives, " ")], " ");
  }),
  InputObjectTypeDefinition: addDescription(function(_ref30) {
    var name = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
    return join(["input", name, join(directives, " "), block(fields)], " ");
  }),
  DirectiveDefinition: addDescription(function(_ref31) {
    var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
    return "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ");
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
    return join(["extend schema", join(directives, " "), block(operationTypes)], " ");
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name, directives = _ref33.directives;
    return join(["extend scalar", name, join(directives, " ")], " ");
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
    return join(["extend type", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
    return join(["extend interface", name, wrap("implements ", join(interfaces, " & ")), join(directives, " "), block(fields)], " ");
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
    return join(["extend union", name, join(directives, " "), types && types.length !== 0 ? "= " + join(types, " | ") : ""], " ");
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
    return join(["extend enum", name, join(directives, " "), block(values)], " ");
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
    return join(["extend input", name, join(directives, " "), block(fields)], " ");
  }
};
function addDescription(cb) {
  return function(node) {
    return join([node.description, cb(node)], "\n");
  };
}
function join(maybeArray) {
  var _maybeArray$filter$jo;
  var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
    return x;
  }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString) {
  var end = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function isMultiline(str) {
  return str.indexOf("\n") !== -1;
}
function hasMultilineItems(maybeArray) {
  return maybeArray != null && maybeArray.some(isMultiline);
}
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from2.length, ar; i < l; i++) {
    if (ar || !(i in from2)) {
      if (!ar) ar = Array.prototype.slice.call(from2, 0, i);
      ar[i] = from2[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
function errorContext(cb) {
  {
    cb();
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x) {
  return x;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process$1(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$1(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2) throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a;
        var value;
        var done;
        try {
          _a = iterator$1.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function map(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
function filter(predicate, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
function catchError(selector) {
  return operate(function(source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
const AWS_CLOUDWATCH_CATEGORY = "Logging";
const USER_AGENT_HEADER$1 = "x-amz-user-agent";
const NO_HUBCALLBACK_PROVIDED_EXCEPTION = "NoHubcallbackProvidedException";
var LogType;
(function(LogType2) {
  LogType2["DEBUG"] = "DEBUG";
  LogType2["ERROR"] = "ERROR";
  LogType2["INFO"] = "INFO";
  LogType2["WARN"] = "WARN";
  LogType2["VERBOSE"] = "VERBOSE";
  LogType2["NONE"] = "NONE";
})(LogType || (LogType = {}));
const LOG_LEVELS = {
  VERBOSE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  NONE: 6
};
class ConsoleLogger {
  /**
   * @constructor
   * @param {string} name - Name of the logger
   */
  constructor(name, level = LogType.WARN) {
    this.name = name;
    this.level = level;
    this._pluggables = [];
  }
  _padding(n) {
    return n < 10 ? "0" + n : "" + n;
  }
  _ts() {
    const dt = /* @__PURE__ */ new Date();
    return [this._padding(dt.getMinutes()), this._padding(dt.getSeconds())].join(":") + "." + dt.getMilliseconds();
  }
  configure(config2) {
    if (!config2)
      return this._config;
    this._config = config2;
    return this._config;
  }
  /**
   * Write log
   * @method
   * @memeberof Logger
   * @param {LogType|string} type - log type, default INFO
   * @param {string|object} msg - Logging message or object
   */
  _log(type, ...msg) {
    let loggerLevelName = this.level;
    if (ConsoleLogger.LOG_LEVEL) {
      loggerLevelName = ConsoleLogger.LOG_LEVEL;
    }
    if (typeof window !== "undefined" && window.LOG_LEVEL) {
      loggerLevelName = window.LOG_LEVEL;
    }
    const loggerLevel = LOG_LEVELS[loggerLevelName];
    const typeLevel = LOG_LEVELS[type];
    if (!(typeLevel >= loggerLevel)) {
      return;
    }
    let log = console.log.bind(console);
    if (type === LogType.ERROR && console.error) {
      log = console.error.bind(console);
    }
    if (type === LogType.WARN && console.warn) {
      log = console.warn.bind(console);
    }
    if (ConsoleLogger.BIND_ALL_LOG_LEVELS) {
      if (type === LogType.INFO && console.info) {
        log = console.info.bind(console);
      }
      if (type === LogType.DEBUG && console.debug) {
        log = console.debug.bind(console);
      }
    }
    const prefix = `[${type}] ${this._ts()} ${this.name}`;
    let message = "";
    if (msg.length === 1 && typeof msg[0] === "string") {
      message = `${prefix} - ${msg[0]}`;
      log(message);
    } else if (msg.length === 1) {
      message = `${prefix} ${msg[0]}`;
      log(prefix, msg[0]);
    } else if (typeof msg[0] === "string") {
      let obj = msg.slice(1);
      if (obj.length === 1) {
        obj = obj[0];
      }
      message = `${prefix} - ${msg[0]} ${obj}`;
      log(`${prefix} - ${msg[0]}`, obj);
    } else {
      message = `${prefix} ${msg}`;
      log(prefix, msg);
    }
    for (const plugin of this._pluggables) {
      const logEvent = { message, timestamp: Date.now() };
      plugin.pushLogs([logEvent]);
    }
  }
  /**
   * Write General log. Default to INFO
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  log(...msg) {
    this._log(LogType.INFO, ...msg);
  }
  /**
   * Write INFO log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  info(...msg) {
    this._log(LogType.INFO, ...msg);
  }
  /**
   * Write WARN log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  warn(...msg) {
    this._log(LogType.WARN, ...msg);
  }
  /**
   * Write ERROR log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  error(...msg) {
    this._log(LogType.ERROR, ...msg);
  }
  /**
   * Write DEBUG log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  debug(...msg) {
    this._log(LogType.DEBUG, ...msg);
  }
  /**
   * Write VERBOSE log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  verbose(...msg) {
    this._log(LogType.VERBOSE, ...msg);
  }
  addPluggable(pluggable) {
    if (pluggable && pluggable.getCategoryName() === AWS_CLOUDWATCH_CATEGORY) {
      this._pluggables.push(pluggable);
      pluggable.configure(this._config);
    }
  }
  listPluggables() {
    return this._pluggables;
  }
}
ConsoleLogger.LOG_LEVEL = null;
ConsoleLogger.BIND_ALL_LOG_LEVELS = false;
const isWebWorker = () => {
  if (typeof self === "undefined") {
    return false;
  }
  const selfContext = self;
  return typeof selfContext.WorkerGlobalScope !== "undefined" && self instanceof selfContext.WorkerGlobalScope;
};
class NonRetryableError extends Error {
  constructor() {
    super(...arguments);
    this.nonRetryable = true;
  }
}
const isNonRetryableError = (obj) => {
  const key = "nonRetryable";
  return obj && obj[key];
};
const MAX_DELAY_MS$1 = 5 * 60 * 1e3;
function jitteredBackoff$1(maxDelayMs = MAX_DELAY_MS$1) {
  const BASE_TIME_MS = 100;
  const JITTER_FACTOR = 100;
  return (attempt) => {
    const delay = 2 ** attempt * BASE_TIME_MS + JITTER_FACTOR * Math.random();
    return delay > maxDelayMs ? false : delay;
  };
}
const logger$5 = new ConsoleLogger("retryUtil");
async function retry(functionToRetry, args, delayFn, onTerminate) {
  if (typeof functionToRetry !== "function") {
    throw Error("functionToRetry must be a function");
  }
  return new Promise(async (resolve, reject) => {
    let attempt = 0;
    let terminated = false;
    let wakeUp = () => {
    };
    let lastError;
    while (!terminated) {
      attempt++;
      logger$5.debug(`${functionToRetry.name} attempt #${attempt} with this vars: ${JSON.stringify(args)}`);
      try {
        resolve(await functionToRetry(...args));
        return;
      } catch (err) {
        lastError = err;
        logger$5.debug(`error on ${functionToRetry.name}`, err);
        if (isNonRetryableError(err)) {
          logger$5.debug(`${functionToRetry.name} non retryable error`, err);
          reject(err);
          return;
        }
        const retryIn = delayFn(attempt, args, err);
        logger$5.debug(`${functionToRetry.name} retrying in ${retryIn} ms`);
        if (retryIn === false || terminated) {
          reject(err);
          return;
        } else {
          await new Promise((_resolve) => {
            wakeUp = _resolve;
            setTimeout(wakeUp, retryIn);
          });
        }
      }
    }
    reject(lastError);
  });
}
const jitteredExponentialRetry = (functionToRetry, args, maxDelayMs = MAX_DELAY_MS$1, onTerminate) => retry(functionToRetry, args, jitteredBackoff$1(maxDelayMs));
class AmplifyError extends Error {
  /**
   *  Constructs an AmplifyError.
   *
   * @param message text that describes the main problem.
   * @param underlyingError the underlying cause of the error.
   * @param recoverySuggestion suggestion to recover from the error.
   *
   */
  constructor({ message, name, recoverySuggestion, underlyingError }) {
    super(message);
    this.name = name;
    this.underlyingError = underlyingError;
    this.recoverySuggestion = recoverySuggestion;
    this.constructor = AmplifyError;
    Object.setPrototypeOf(this, AmplifyError.prototype);
  }
}
const logger$4 = new ConsoleLogger("parseAWSExports");
const authTypeMapping = {
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AMAZON_COGNITO_USER_POOLS: "userPool",
  OPENID_CONNECT: "oidc",
  NONE: "none",
  AWS_LAMBDA: "lambda",
  // `LAMBDA` is an incorrect value that was added during the v6 rewrite.
  // Keeping it as a valid value until v7 to prevent breaking customers who might
  // be relying on it as a workaround.
  // ref: https://github.com/aws-amplify/amplify-js/pull/12922
  // TODO: @v7 remove next line
  LAMBDA: "lambda"
};
const parseAWSExports = (config2 = {}) => {
  var _a, _b, _c, _d, _e, _f;
  if (!Object.prototype.hasOwnProperty.call(config2, "aws_project_region")) {
    throw new AmplifyError({
      name: "InvalidParameterException",
      message: "Invalid config parameter.",
      recoverySuggestion: "Ensure passing the config object imported from  `amplifyconfiguration.json`."
    });
  }
  const { aws_appsync_apiKey, aws_appsync_authenticationType, aws_appsync_graphqlEndpoint, aws_appsync_region, aws_bots_config, aws_cognito_identity_pool_id, aws_cognito_sign_up_verification_method, aws_cognito_mfa_configuration, aws_cognito_mfa_types, aws_cognito_password_protection_settings, aws_cognito_verification_mechanisms, aws_cognito_signup_attributes, aws_cognito_social_providers, aws_cognito_username_attributes, aws_mandatory_sign_in, aws_mobile_analytics_app_id, aws_mobile_analytics_app_region, aws_user_files_s3_bucket, aws_user_files_s3_bucket_region, aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing, aws_user_pools_id, aws_user_pools_web_client_id, geo, oauth, predictions, aws_cloud_logic_custom, Notifications, modelIntrospection } = config2;
  const amplifyConfig = {};
  if (aws_mobile_analytics_app_id) {
    amplifyConfig.Analytics = {
      Pinpoint: {
        appId: aws_mobile_analytics_app_id,
        region: aws_mobile_analytics_app_region
      }
    };
  }
  const { InAppMessaging, Push } = Notifications ?? {};
  if ((InAppMessaging == null ? void 0 : InAppMessaging.AWSPinpoint) || (Push == null ? void 0 : Push.AWSPinpoint)) {
    if (InAppMessaging == null ? void 0 : InAppMessaging.AWSPinpoint) {
      const { appId, region } = InAppMessaging.AWSPinpoint;
      amplifyConfig.Notifications = {
        InAppMessaging: {
          Pinpoint: {
            appId,
            region
          }
        }
      };
    }
    if (Push == null ? void 0 : Push.AWSPinpoint) {
      const { appId, region } = Push.AWSPinpoint;
      amplifyConfig.Notifications = {
        ...amplifyConfig.Notifications,
        PushNotification: {
          Pinpoint: {
            appId,
            region
          }
        }
      };
    }
  }
  if (Array.isArray(aws_bots_config)) {
    amplifyConfig.Interactions = {
      LexV1: Object.fromEntries(aws_bots_config.map((bot) => [bot.name, bot]))
    };
  }
  if (aws_appsync_graphqlEndpoint) {
    const defaultAuthMode = authTypeMapping[aws_appsync_authenticationType];
    if (!defaultAuthMode) {
      logger$4.debug(`Invalid authentication type ${aws_appsync_authenticationType}. Falling back to IAM.`);
    }
    amplifyConfig.API = {
      GraphQL: {
        endpoint: aws_appsync_graphqlEndpoint,
        apiKey: aws_appsync_apiKey,
        region: aws_appsync_region,
        defaultAuthMode: defaultAuthMode ?? "iam"
      }
    };
    if (modelIntrospection) {
      amplifyConfig.API.GraphQL.modelIntrospection = modelIntrospection;
    }
  }
  const mfaConfig = aws_cognito_mfa_configuration ? {
    status: aws_cognito_mfa_configuration && aws_cognito_mfa_configuration.toLowerCase(),
    totpEnabled: (aws_cognito_mfa_types == null ? void 0 : aws_cognito_mfa_types.includes("TOTP")) ?? false,
    smsEnabled: (aws_cognito_mfa_types == null ? void 0 : aws_cognito_mfa_types.includes("SMS")) ?? false
  } : void 0;
  const passwordFormatConfig = aws_cognito_password_protection_settings ? {
    minLength: aws_cognito_password_protection_settings.passwordPolicyMinLength,
    requireLowercase: ((_a = aws_cognito_password_protection_settings.passwordPolicyCharacters) == null ? void 0 : _a.includes("REQUIRES_LOWERCASE")) ?? false,
    requireUppercase: ((_b = aws_cognito_password_protection_settings.passwordPolicyCharacters) == null ? void 0 : _b.includes("REQUIRES_UPPERCASE")) ?? false,
    requireNumbers: ((_c = aws_cognito_password_protection_settings.passwordPolicyCharacters) == null ? void 0 : _c.includes("REQUIRES_NUMBERS")) ?? false,
    requireSpecialCharacters: ((_d = aws_cognito_password_protection_settings.passwordPolicyCharacters) == null ? void 0 : _d.includes("REQUIRES_SYMBOLS")) ?? false
  } : void 0;
  const mergedUserAttributes = Array.from(/* @__PURE__ */ new Set([
    ...aws_cognito_verification_mechanisms ?? [],
    ...aws_cognito_signup_attributes ?? []
  ]));
  const userAttributes = mergedUserAttributes.reduce((attributes, key) => ({
    ...attributes,
    // All user attributes generated by the CLI are required
    [key.toLowerCase()]: { required: true }
  }), {});
  const loginWithEmailEnabled = (aws_cognito_username_attributes == null ? void 0 : aws_cognito_username_attributes.includes("EMAIL")) ?? false;
  const loginWithPhoneEnabled = (aws_cognito_username_attributes == null ? void 0 : aws_cognito_username_attributes.includes("PHONE_NUMBER")) ?? false;
  if (aws_cognito_identity_pool_id || aws_user_pools_id) {
    amplifyConfig.Auth = {
      Cognito: {
        identityPoolId: aws_cognito_identity_pool_id,
        allowGuestAccess: aws_mandatory_sign_in !== "enable",
        signUpVerificationMethod: aws_cognito_sign_up_verification_method,
        userAttributes,
        userPoolClientId: aws_user_pools_web_client_id,
        userPoolId: aws_user_pools_id,
        mfa: mfaConfig,
        passwordFormat: passwordFormatConfig,
        loginWith: {
          username: !(loginWithEmailEnabled || loginWithPhoneEnabled),
          email: loginWithEmailEnabled,
          phone: loginWithPhoneEnabled
        }
      }
    };
  }
  const hasOAuthConfig = oauth ? Object.keys(oauth).length > 0 : false;
  const hasSocialProviderConfig = aws_cognito_social_providers ? aws_cognito_social_providers.length > 0 : false;
  if (amplifyConfig.Auth && hasOAuthConfig) {
    amplifyConfig.Auth.Cognito.loginWith = {
      ...amplifyConfig.Auth.Cognito.loginWith,
      oauth: {
        ...getOAuthConfig(oauth),
        ...hasSocialProviderConfig && {
          providers: parseSocialProviders(aws_cognito_social_providers)
        }
      }
    };
  }
  if (aws_user_files_s3_bucket) {
    amplifyConfig.Storage = {
      S3: {
        bucket: aws_user_files_s3_bucket,
        region: aws_user_files_s3_bucket_region,
        dangerouslyConnectToHttpEndpointForTesting: aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing
      }
    };
  }
  if (geo) {
    const { amazon_location_service } = geo;
    amplifyConfig.Geo = {
      LocationService: {
        maps: amazon_location_service.maps,
        geofenceCollections: amazon_location_service.geofenceCollections,
        searchIndices: amazon_location_service.search_indices,
        region: amazon_location_service.region
      }
    };
  }
  if (aws_cloud_logic_custom) {
    amplifyConfig.API = {
      ...amplifyConfig.API,
      REST: aws_cloud_logic_custom.reduce((acc, api) => {
        const { name, endpoint, region, service } = api;
        return {
          ...acc,
          [name]: {
            endpoint,
            ...service ? { service } : void 0,
            ...region ? { region } : void 0
          }
        };
      }, {})
    };
  }
  if (predictions) {
    const { VoiceId: voiceId } = ((_f = (_e = predictions == null ? void 0 : predictions.convert) == null ? void 0 : _e.speechGenerator) == null ? void 0 : _f.defaults) ?? {};
    amplifyConfig.Predictions = voiceId ? {
      ...predictions,
      convert: {
        ...predictions.convert,
        speechGenerator: {
          ...predictions.convert.speechGenerator,
          defaults: { voiceId }
        }
      }
    } : predictions;
  }
  return amplifyConfig;
};
const getRedirectUrl = (redirectStr) => (redirectStr == null ? void 0 : redirectStr.split(",")) ?? [];
const getOAuthConfig = ({ domain, scope, redirectSignIn, redirectSignOut, responseType }) => ({
  domain,
  scopes: scope,
  redirectSignIn: getRedirectUrl(redirectSignIn),
  redirectSignOut: getRedirectUrl(redirectSignOut),
  responseType
});
const parseSocialProviders = (aws_cognito_social_providers) => {
  return aws_cognito_social_providers.map((provider) => {
    const updatedProvider = provider.toLowerCase();
    return updatedProvider.charAt(0).toUpperCase() + updatedProvider.slice(1);
  });
};
function isAmplifyOutputs(config2) {
  const { version: version2 } = config2;
  if (!version2) {
    return false;
  }
  return version2.startsWith("1");
}
function parseStorage(amplifyOutputsStorageProperties) {
  if (!amplifyOutputsStorageProperties) {
    return void 0;
  }
  const { bucket_name, aws_region } = amplifyOutputsStorageProperties;
  return {
    S3: {
      bucket: bucket_name,
      region: aws_region
    }
  };
}
function parseAuth(amplifyOutputsAuthProperties) {
  if (!amplifyOutputsAuthProperties) {
    return void 0;
  }
  const { user_pool_id, user_pool_client_id, identity_pool_id, password_policy, mfa_configuration, mfa_methods, unauthenticated_identities_enabled, oauth, username_attributes, standard_required_attributes } = amplifyOutputsAuthProperties;
  const authConfig = {
    Cognito: {
      userPoolId: user_pool_id,
      userPoolClientId: user_pool_client_id
    }
  };
  if (identity_pool_id) {
    authConfig.Cognito = {
      ...authConfig.Cognito,
      identityPoolId: identity_pool_id
    };
  }
  if (password_policy) {
    authConfig.Cognito.passwordFormat = {
      requireLowercase: password_policy.require_lowercase,
      requireNumbers: password_policy.require_numbers,
      requireUppercase: password_policy.require_uppercase,
      requireSpecialCharacters: password_policy.require_symbols,
      minLength: password_policy.min_length ?? 6
    };
  }
  if (mfa_configuration) {
    authConfig.Cognito.mfa = {
      status: getMfaStatus(mfa_configuration),
      smsEnabled: mfa_methods == null ? void 0 : mfa_methods.includes("SMS"),
      totpEnabled: mfa_methods == null ? void 0 : mfa_methods.includes("TOTP")
    };
  }
  if (unauthenticated_identities_enabled) {
    authConfig.Cognito.allowGuestAccess = unauthenticated_identities_enabled;
  }
  if (oauth) {
    authConfig.Cognito.loginWith = {
      oauth: {
        domain: oauth.domain,
        redirectSignIn: oauth.redirect_sign_in_uri,
        redirectSignOut: oauth.redirect_sign_out_uri,
        responseType: oauth.response_type === "token" ? "token" : "code",
        scopes: oauth.scopes,
        providers: getOAuthProviders(oauth.identity_providers)
      }
    };
  }
  if (username_attributes) {
    authConfig.Cognito.loginWith = {
      ...authConfig.Cognito.loginWith,
      email: username_attributes.includes("email"),
      phone: username_attributes.includes("phone_number"),
      // Signing in with a username is not currently supported in Gen2, this should always evaluate to false
      username: username_attributes.includes("username")
    };
  }
  if (standard_required_attributes) {
    authConfig.Cognito.userAttributes = standard_required_attributes.reduce((acc, curr) => ({ ...acc, [curr]: { required: true } }), {});
  }
  return authConfig;
}
function parseAnalytics(amplifyOutputsAnalyticsProperties) {
  if (!(amplifyOutputsAnalyticsProperties == null ? void 0 : amplifyOutputsAnalyticsProperties.amazon_pinpoint)) {
    return void 0;
  }
  const { amazon_pinpoint } = amplifyOutputsAnalyticsProperties;
  return {
    Pinpoint: {
      appId: amazon_pinpoint.app_id,
      region: amazon_pinpoint.aws_region
    }
  };
}
function parseGeo(amplifyOutputsAnalyticsProperties) {
  if (!amplifyOutputsAnalyticsProperties) {
    return void 0;
  }
  const { aws_region, geofence_collections, maps, search_indices } = amplifyOutputsAnalyticsProperties;
  return {
    LocationService: {
      region: aws_region,
      searchIndices: search_indices,
      geofenceCollections: geofence_collections,
      maps
    }
  };
}
function parseData(amplifyOutputsDataProperties) {
  if (!amplifyOutputsDataProperties) {
    return void 0;
  }
  const { aws_region, default_authorization_type, url, api_key, model_introspection } = amplifyOutputsDataProperties;
  const GraphQL = {
    endpoint: url,
    defaultAuthMode: getGraphQLAuthMode(default_authorization_type),
    region: aws_region,
    apiKey: api_key,
    modelIntrospection: model_introspection
  };
  return {
    GraphQL
  };
}
function parseNotifications(amplifyOutputsNotificationsProperties) {
  if (!amplifyOutputsNotificationsProperties) {
    return void 0;
  }
  const { aws_region, channels, amazon_pinpoint_app_id } = amplifyOutputsNotificationsProperties;
  const hasInAppMessaging = channels.includes("IN_APP_MESSAGING");
  const hasPushNotification = channels.includes("APNS") || channels.includes("FCM");
  if (!(hasInAppMessaging || hasPushNotification)) {
    return void 0;
  }
  const notificationsConfig = {};
  if (hasInAppMessaging) {
    notificationsConfig.InAppMessaging = {
      Pinpoint: {
        appId: amazon_pinpoint_app_id,
        region: aws_region
      }
    };
  }
  if (hasPushNotification) {
    notificationsConfig.PushNotification = {
      Pinpoint: {
        appId: amazon_pinpoint_app_id,
        region: aws_region
      }
    };
  }
  return notificationsConfig;
}
function parseAmplifyOutputs(amplifyOutputs) {
  const resourcesConfig = {};
  if (amplifyOutputs.storage) {
    resourcesConfig.Storage = parseStorage(amplifyOutputs.storage);
  }
  if (amplifyOutputs.auth) {
    resourcesConfig.Auth = parseAuth(amplifyOutputs.auth);
  }
  if (amplifyOutputs.analytics) {
    resourcesConfig.Analytics = parseAnalytics(amplifyOutputs.analytics);
  }
  if (amplifyOutputs.geo) {
    resourcesConfig.Geo = parseGeo(amplifyOutputs.geo);
  }
  if (amplifyOutputs.data) {
    resourcesConfig.API = parseData(amplifyOutputs.data);
  }
  if (amplifyOutputs.notifications) {
    resourcesConfig.Notifications = parseNotifications(amplifyOutputs.notifications);
  }
  return resourcesConfig;
}
const authModeNames = {
  AMAZON_COGNITO_USER_POOLS: "userPool",
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AWS_LAMBDA: "lambda",
  OPENID_CONNECT: "oidc"
};
function getGraphQLAuthMode(authType) {
  return authModeNames[authType];
}
const providerNames = {
  GOOGLE: "Google",
  LOGIN_WITH_AMAZON: "Amazon",
  FACEBOOK: "Facebook",
  SIGN_IN_WITH_APPLE: "Apple"
};
function getOAuthProviders(providers = []) {
  return providers.reduce((oAuthProviders, provider) => {
    if (providerNames[provider] !== void 0) {
      oAuthProviders.push(providerNames[provider]);
    }
    return oAuthProviders;
  }, []);
}
function getMfaStatus(mfaConfiguration) {
  if (mfaConfiguration === "OPTIONAL")
    return "optional";
  if (mfaConfiguration === "REQUIRED")
    return "on";
  return "off";
}
const ADD_OAUTH_LISTENER = Symbol("oauth-listener");
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
const amplifyUuid = v4;
const AmplifyUrl = URL;
const parseAmplifyConfig = (amplifyConfig) => {
  if (Object.keys(amplifyConfig).some((key) => key.startsWith("aws_"))) {
    return parseAWSExports(amplifyConfig);
  } else if (isAmplifyOutputs(amplifyConfig)) {
    return parseAmplifyOutputs(amplifyConfig);
  } else {
    return amplifyConfig;
  }
};
const getBtoa = () => {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa;
  }
  if (typeof btoa === "function") {
    return btoa;
  }
  throw new AmplifyError({
    name: "Base64EncoderError",
    message: "Cannot resolve the `btoa` function from the environment."
  });
};
class AuthClass {
  /**
   * Configure Auth category
   *
   * @internal
   *
   * @param authResourcesConfig - Resources configurations required by Auth providers.
   * @param authOptions - Client options used by library
   *
   * @returns void
   */
  configure(authResourcesConfig, authOptions) {
    this.authConfig = authResourcesConfig;
    this.authOptions = authOptions;
  }
  /**
   * Fetch the auth tokens, and the temporary AWS credentials and identity if they are configured. By default it
   * does not refresh the auth tokens or credentials if they are loaded in storage already. You can force a refresh
   * with `{ forceRefresh: true }` input.
   *
   * @param options - Options configuring the fetch behavior.
   *
   * @returns Promise of current auth session {@link AuthSession}.
   */
  async fetchAuthSession(options = {}) {
    var _a, _b, _c, _d, _e, _f;
    let credentialsAndIdentityId;
    let userSub;
    const tokens = await this.getTokens(options);
    if (tokens) {
      userSub = (_b = (_a = tokens.accessToken) == null ? void 0 : _a.payload) == null ? void 0 : _b.sub;
      credentialsAndIdentityId = await ((_d = (_c = this.authOptions) == null ? void 0 : _c.credentialsProvider) == null ? void 0 : _d.getCredentialsAndIdentityId({
        authConfig: this.authConfig,
        tokens,
        authenticated: true,
        forceRefresh: options.forceRefresh
      }));
    } else {
      credentialsAndIdentityId = await ((_f = (_e = this.authOptions) == null ? void 0 : _e.credentialsProvider) == null ? void 0 : _f.getCredentialsAndIdentityId({
        authConfig: this.authConfig,
        authenticated: false,
        forceRefresh: options.forceRefresh
      }));
    }
    return {
      tokens,
      credentials: credentialsAndIdentityId == null ? void 0 : credentialsAndIdentityId.credentials,
      identityId: credentialsAndIdentityId == null ? void 0 : credentialsAndIdentityId.identityId,
      userSub
    };
  }
  async clearCredentials() {
    var _a, _b;
    await ((_b = (_a = this.authOptions) == null ? void 0 : _a.credentialsProvider) == null ? void 0 : _b.clearCredentialsAndIdentityId());
  }
  async getTokens(options) {
    var _a, _b;
    return await ((_b = (_a = this.authOptions) == null ? void 0 : _a.tokenProvider) == null ? void 0 : _b.getTokens(options)) ?? void 0;
  }
}
const getSignedHeaders = (headers) => Object.keys(headers).map((key) => key.toLowerCase()).sort().join(";");
const AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
const TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
const AUTH_HEADER = "authorization";
const HOST_HEADER = "host";
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
const KEY_TYPE_IDENTIFIER = "aws4_request";
const SHA256_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
const SIGNATURE_IDENTIFIER = "AWS4";
const EMPTY_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
const getCredentialScope = (date, region, service) => `${date}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
const getFormattedDates = (date) => {
  const longDate = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
  return {
    longDate,
    shortDate: longDate.slice(0, 8)
  };
};
const getSigningValues = ({ credentials, signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService, uriEscapePath = true }) => {
  const { accessKeyId, secretAccessKey, sessionToken } = credentials;
  const { longDate, shortDate } = getFormattedDates(signingDate);
  const credentialScope = getCredentialScope(shortDate, signingRegion, signingService);
  return {
    accessKeyId,
    credentialScope,
    longDate,
    secretAccessKey,
    sessionToken,
    shortDate,
    signingRegion,
    signingService,
    uriEscapePath
  };
};
var BLOCK_SIZE = 64;
var DIGEST_LENGTH = 32;
var KEY = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var INIT = [
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
];
var MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
var RawSha256 = (
  /** @class */
  function() {
    function RawSha2562() {
      this.state = Int32Array.from(INIT);
      this.temp = new Int32Array(64);
      this.buffer = new Uint8Array(64);
      this.bufferLength = 0;
      this.bytesHashed = 0;
      this.finished = false;
    }
    RawSha2562.prototype.update = function(data2) {
      if (this.finished) {
        throw new Error("Attempted to update an already finished hash.");
      }
      var position = 0;
      var byteLength = data2.byteLength;
      this.bytesHashed += byteLength;
      if (this.bytesHashed * 8 > MAX_HASHABLE_LENGTH) {
        throw new Error("Cannot hash more than 2^53 - 1 bits");
      }
      while (byteLength > 0) {
        this.buffer[this.bufferLength++] = data2[position++];
        byteLength--;
        if (this.bufferLength === BLOCK_SIZE) {
          this.hashBuffer();
          this.bufferLength = 0;
        }
      }
    };
    RawSha2562.prototype.digest = function() {
      if (!this.finished) {
        var bitsHashed = this.bytesHashed * 8;
        var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
        var undecoratedLength = this.bufferLength;
        bufferView.setUint8(this.bufferLength++, 128);
        if (undecoratedLength % BLOCK_SIZE >= BLOCK_SIZE - 8) {
          for (var i = this.bufferLength; i < BLOCK_SIZE; i++) {
            bufferView.setUint8(i, 0);
          }
          this.hashBuffer();
          this.bufferLength = 0;
        }
        for (var i = this.bufferLength; i < BLOCK_SIZE - 8; i++) {
          bufferView.setUint8(i, 0);
        }
        bufferView.setUint32(BLOCK_SIZE - 8, Math.floor(bitsHashed / 4294967296), true);
        bufferView.setUint32(BLOCK_SIZE - 4, bitsHashed);
        this.hashBuffer();
        this.finished = true;
      }
      var out = new Uint8Array(DIGEST_LENGTH);
      for (var i = 0; i < 8; i++) {
        out[i * 4] = this.state[i] >>> 24 & 255;
        out[i * 4 + 1] = this.state[i] >>> 16 & 255;
        out[i * 4 + 2] = this.state[i] >>> 8 & 255;
        out[i * 4 + 3] = this.state[i] >>> 0 & 255;
      }
      return out;
    };
    RawSha2562.prototype.hashBuffer = function() {
      var _a = this, buffer = _a.buffer, state = _a.state;
      var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
      for (var i = 0; i < BLOCK_SIZE; i++) {
        if (i < 16) {
          this.temp[i] = (buffer[i * 4] & 255) << 24 | (buffer[i * 4 + 1] & 255) << 16 | (buffer[i * 4 + 2] & 255) << 8 | buffer[i * 4 + 3] & 255;
        } else {
          var u = this.temp[i - 2];
          var t1_1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
          u = this.temp[i - 15];
          var t2_1 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
          this.temp[i] = (t1_1 + this.temp[i - 7] | 0) + (t2_1 + this.temp[i - 16] | 0);
        }
        var t1 = (((state4 >>> 6 | state4 << 26) ^ (state4 >>> 11 | state4 << 21) ^ (state4 >>> 25 | state4 << 7)) + (state4 & state5 ^ ~state4 & state6) | 0) + (state7 + (KEY[i] + this.temp[i] | 0) | 0) | 0;
        var t2 = ((state0 >>> 2 | state0 << 30) ^ (state0 >>> 13 | state0 << 19) ^ (state0 >>> 22 | state0 << 10)) + (state0 & state1 ^ state0 & state2 ^ state1 & state2) | 0;
        state7 = state6;
        state6 = state5;
        state5 = state4;
        state4 = state3 + t1 | 0;
        state3 = state2;
        state2 = state1;
        state1 = state0;
        state0 = t1 + t2 | 0;
      }
      state[0] += state0;
      state[1] += state1;
      state[2] += state2;
      state[3] += state3;
      state[4] += state4;
      state[5] += state5;
      state[6] += state6;
      state[7] += state7;
    };
    return RawSha2562;
  }()
);
const fromString = (input, encoding) => {
  if (typeof input !== "string") {
    throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
  }
  return Buffer$1.from(input, encoding);
};
const fromUtf8$1 = (input) => {
  const buf = fromString(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
  return Buffer.from(input, "utf8");
} : fromUtf8$1;
function convertToBuffer(data2) {
  if (data2 instanceof Uint8Array)
    return data2;
  if (typeof data2 === "string") {
    return fromUtf8(data2);
  }
  if (ArrayBuffer.isView(data2)) {
    return new Uint8Array(data2.buffer, data2.byteOffset, data2.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data2);
}
function isEmptyData(data2) {
  if (typeof data2 === "string") {
    return data2.length === 0;
  }
  return data2.byteLength === 0;
}
var Sha256 = (
  /** @class */
  function() {
    function Sha2562(secret) {
      this.secret = secret;
      this.hash = new RawSha256();
      this.reset();
    }
    Sha2562.prototype.update = function(toHash) {
      if (isEmptyData(toHash) || this.error) {
        return;
      }
      try {
        this.hash.update(convertToBuffer(toHash));
      } catch (e) {
        this.error = e;
      }
    };
    Sha2562.prototype.digestSync = function() {
      if (this.error) {
        throw this.error;
      }
      if (this.outer) {
        if (!this.outer.finished) {
          this.outer.update(this.hash.digest());
        }
        return this.outer.digest();
      }
      return this.hash.digest();
    };
    Sha2562.prototype.digest = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2, this.digestSync()];
        });
      });
    };
    Sha2562.prototype.reset = function() {
      this.hash = new RawSha256();
      if (this.secret) {
        this.outer = new RawSha256();
        var inner = bufferFromSecret(this.secret);
        var outer = new Uint8Array(BLOCK_SIZE);
        outer.set(inner);
        for (var i = 0; i < BLOCK_SIZE; i++) {
          inner[i] ^= 54;
          outer[i] ^= 92;
        }
        this.hash.update(inner);
        this.outer.update(outer);
        for (var i = 0; i < inner.byteLength; i++) {
          inner[i] = 0;
        }
      }
    };
    return Sha2562;
  }()
);
function bufferFromSecret(secret) {
  var input = convertToBuffer(secret);
  if (input.byteLength > BLOCK_SIZE) {
    var bufferHash = new RawSha256();
    bufferHash.update(input);
    input = bufferHash.digest();
  }
  var buffer = new Uint8Array(BLOCK_SIZE);
  buffer.set(input);
  return buffer;
}
const SHORT_TO_HEX = {};
for (let i = 0; i < 256; i++) {
  let encodedByte = i.toString(16).toLowerCase();
  if (encodedByte.length === 1) {
    encodedByte = `0${encodedByte}`;
  }
  SHORT_TO_HEX[i] = encodedByte;
}
function toHex(bytes) {
  let out = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    out += SHORT_TO_HEX[bytes[i]];
  }
  return out;
}
const getHashedData = (key, data2) => {
  const sha256 = new Sha256(key ?? void 0);
  sha256.update(data2);
  const hashedData = sha256.digestSync();
  return hashedData;
};
const getHashedDataAsHex = (key, data2) => {
  const hashedData = getHashedData(key, data2);
  return toHex(hashedData);
};
const getCanonicalHeaders = (headers) => Object.entries(headers).map(([key, value]) => ({
  key: key.toLowerCase(),
  value: (value == null ? void 0 : value.trim().replace(/\s+/g, " ")) ?? ""
})).sort((a, b) => a.key < b.key ? -1 : 1).map((entry) => `${entry.key}:${entry.value}
`).join("");
const getCanonicalQueryString = (searchParams) => Array.from(searchParams).sort(([keyA, valA], [keyB, valB]) => {
  if (keyA === keyB) {
    return valA < valB ? -1 : 1;
  }
  return keyA < keyB ? -1 : 1;
}).map(([key, val]) => `${escapeUri(key)}=${escapeUri(val)}`).join("&");
const escapeUri = (uri) => encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`;
const getCanonicalUri = (pathname, uriEscapePath = true) => pathname ? uriEscapePath ? encodeURIComponent(pathname).replace(/%2F/g, "/") : pathname : "/";
const getHashedPayload = (body) => {
  if (body == null) {
    return EMPTY_HASH;
  }
  if (isSourceData(body)) {
    const hashedData = getHashedDataAsHex(null, body);
    return hashedData;
  }
  return UNSIGNED_PAYLOAD;
};
const isSourceData = (body) => typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body);
const isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
const getCanonicalRequest = ({ body, headers, method, url }, uriEscapePath = true) => [
  method,
  getCanonicalUri(url.pathname, uriEscapePath),
  getCanonicalQueryString(url.searchParams),
  getCanonicalHeaders(headers),
  getSignedHeaders(headers),
  getHashedPayload(body)
].join("\n");
const getSigningKey = (secretAccessKey, date, region, service) => {
  const key = `${SIGNATURE_IDENTIFIER}${secretAccessKey}`;
  const dateKey = getHashedData(key, date);
  const regionKey = getHashedData(dateKey, region);
  const serviceKey = getHashedData(regionKey, service);
  const signingKey = getHashedData(serviceKey, KEY_TYPE_IDENTIFIER);
  return signingKey;
};
const getStringToSign = (date, credentialScope, hashedRequest) => [SHA256_ALGORITHM_IDENTIFIER, date, credentialScope, hashedRequest].join("\n");
const getSignature = (request, { credentialScope, longDate, secretAccessKey, shortDate, signingRegion, signingService, uriEscapePath }) => {
  const canonicalRequest = getCanonicalRequest(request, uriEscapePath);
  const hashedRequest = getHashedDataAsHex(null, canonicalRequest);
  const stringToSign = getStringToSign(longDate, credentialScope, hashedRequest);
  const signature = getHashedDataAsHex(getSigningKey(secretAccessKey, shortDate, signingRegion, signingService), stringToSign);
  return signature;
};
const signRequest = (request, options) => {
  const signingValues = getSigningValues(options);
  const { accessKeyId, credentialScope, longDate, sessionToken } = signingValues;
  const headers = { ...request.headers };
  headers[HOST_HEADER] = request.url.host;
  headers[AMZ_DATE_HEADER] = longDate;
  if (sessionToken) {
    headers[TOKEN_HEADER] = sessionToken;
  }
  const requestToSign = { ...request, headers };
  const signature = getSignature(requestToSign, signingValues);
  const credentialEntry = `Credential=${accessKeyId}/${credentialScope}`;
  const signedHeadersEntry = `SignedHeaders=${getSignedHeaders(headers)}`;
  const signatureEntry = `Signature=${signature}`;
  headers[AUTH_HEADER] = `${SHA256_ALGORITHM_IDENTIFIER} ${credentialEntry}, ${signedHeadersEntry}, ${signatureEntry}`;
  return requestToSign;
};
var Framework;
(function(Framework2) {
  Framework2["WebUnknown"] = "0";
  Framework2["React"] = "1";
  Framework2["NextJs"] = "2";
  Framework2["Angular"] = "3";
  Framework2["VueJs"] = "4";
  Framework2["Nuxt"] = "5";
  Framework2["Svelte"] = "6";
  Framework2["ServerSideUnknown"] = "100";
  Framework2["ReactSSR"] = "101";
  Framework2["NextJsSSR"] = "102";
  Framework2["AngularSSR"] = "103";
  Framework2["VueJsSSR"] = "104";
  Framework2["NuxtSSR"] = "105";
  Framework2["SvelteSSR"] = "106";
  Framework2["ReactNative"] = "201";
  Framework2["Expo"] = "202";
})(Framework || (Framework = {}));
var Category;
(function(Category2) {
  Category2["API"] = "api";
  Category2["Auth"] = "auth";
  Category2["Analytics"] = "analytics";
  Category2["DataStore"] = "datastore";
  Category2["Geo"] = "geo";
  Category2["InAppMessaging"] = "inappmessaging";
  Category2["Interactions"] = "interactions";
  Category2["Predictions"] = "predictions";
  Category2["PubSub"] = "pubsub";
  Category2["PushNotification"] = "pushnotification";
  Category2["Storage"] = "storage";
})(Category || (Category = {}));
var AnalyticsAction;
(function(AnalyticsAction2) {
  AnalyticsAction2["Record"] = "1";
  AnalyticsAction2["IdentifyUser"] = "2";
})(AnalyticsAction || (AnalyticsAction = {}));
var ApiAction;
(function(ApiAction2) {
  ApiAction2["GraphQl"] = "1";
  ApiAction2["Get"] = "2";
  ApiAction2["Post"] = "3";
  ApiAction2["Put"] = "4";
  ApiAction2["Patch"] = "5";
  ApiAction2["Del"] = "6";
  ApiAction2["Head"] = "7";
})(ApiAction || (ApiAction = {}));
var AuthAction;
(function(AuthAction2) {
  AuthAction2["SignUp"] = "1";
  AuthAction2["ConfirmSignUp"] = "2";
  AuthAction2["ResendSignUpCode"] = "3";
  AuthAction2["SignIn"] = "4";
  AuthAction2["FetchMFAPreference"] = "6";
  AuthAction2["UpdateMFAPreference"] = "7";
  AuthAction2["SetUpTOTP"] = "10";
  AuthAction2["VerifyTOTPSetup"] = "11";
  AuthAction2["ConfirmSignIn"] = "12";
  AuthAction2["DeleteUserAttributes"] = "15";
  AuthAction2["DeleteUser"] = "16";
  AuthAction2["UpdateUserAttributes"] = "17";
  AuthAction2["FetchUserAttributes"] = "18";
  AuthAction2["ConfirmUserAttribute"] = "22";
  AuthAction2["SignOut"] = "26";
  AuthAction2["UpdatePassword"] = "27";
  AuthAction2["ResetPassword"] = "28";
  AuthAction2["ConfirmResetPassword"] = "29";
  AuthAction2["FederatedSignIn"] = "30";
  AuthAction2["RememberDevice"] = "32";
  AuthAction2["ForgetDevice"] = "33";
  AuthAction2["FetchDevices"] = "34";
  AuthAction2["SendUserAttributeVerificationCode"] = "35";
  AuthAction2["SignInWithRedirect"] = "36";
})(AuthAction || (AuthAction = {}));
var DataStoreAction;
(function(DataStoreAction2) {
  DataStoreAction2["Subscribe"] = "1";
  DataStoreAction2["GraphQl"] = "2";
})(DataStoreAction || (DataStoreAction = {}));
var GeoAction;
(function(GeoAction2) {
  GeoAction2["SearchByText"] = "0";
  GeoAction2["SearchByCoordinates"] = "1";
  GeoAction2["SearchForSuggestions"] = "2";
  GeoAction2["SearchByPlaceId"] = "3";
  GeoAction2["SaveGeofences"] = "4";
  GeoAction2["GetGeofence"] = "5";
  GeoAction2["ListGeofences"] = "6";
  GeoAction2["DeleteGeofences"] = "7";
})(GeoAction || (GeoAction = {}));
var InAppMessagingAction;
(function(InAppMessagingAction2) {
  InAppMessagingAction2["SyncMessages"] = "1";
  InAppMessagingAction2["IdentifyUser"] = "2";
  InAppMessagingAction2["NotifyMessageInteraction"] = "3";
})(InAppMessagingAction || (InAppMessagingAction = {}));
var InteractionsAction;
(function(InteractionsAction2) {
  InteractionsAction2["None"] = "0";
})(InteractionsAction || (InteractionsAction = {}));
var PredictionsAction;
(function(PredictionsAction2) {
  PredictionsAction2["Convert"] = "1";
  PredictionsAction2["Identify"] = "2";
  PredictionsAction2["Interpret"] = "3";
})(PredictionsAction || (PredictionsAction = {}));
var PubSubAction;
(function(PubSubAction2) {
  PubSubAction2["Subscribe"] = "1";
})(PubSubAction || (PubSubAction = {}));
var PushNotificationAction;
(function(PushNotificationAction2) {
  PushNotificationAction2["InitializePushNotifications"] = "1";
  PushNotificationAction2["IdentifyUser"] = "2";
})(PushNotificationAction || (PushNotificationAction = {}));
var StorageAction;
(function(StorageAction2) {
  StorageAction2["UploadData"] = "1";
  StorageAction2["DownloadData"] = "2";
  StorageAction2["List"] = "3";
  StorageAction2["Copy"] = "4";
  StorageAction2["Remove"] = "5";
  StorageAction2["GetProperties"] = "6";
  StorageAction2["GetUrl"] = "7";
})(StorageAction || (StorageAction = {}));
const version$1 = "6.4.3";
const globalExists = () => {
  return typeof global !== "undefined";
};
const windowExists = () => {
  return typeof window !== "undefined";
};
const documentExists = () => {
  return typeof document !== "undefined";
};
const processExists = () => {
  return typeof process !== "undefined";
};
const keyPrefixMatch = (object, prefix) => {
  return !!Object.keys(object).find((key) => key.startsWith(prefix));
};
function reactWebDetect() {
  const elementKeyPrefixedWithReact = (key) => {
    return key.startsWith("_react") || key.startsWith("__react");
  };
  const elementIsReactEnabled = (element) => {
    return Object.keys(element).find(elementKeyPrefixedWithReact);
  };
  const allElementsWithId = () => Array.from(document.querySelectorAll("[id]"));
  return documentExists() && allElementsWithId().some(elementIsReactEnabled);
}
function reactSSRDetect() {
  return processExists() && typeof process.env !== "undefined" && !!Object.keys(process.env).find((key) => key.includes("react"));
}
function vueWebDetect() {
  return windowExists() && keyPrefixMatch(window, "__VUE");
}
function vueSSRDetect() {
  return globalExists() && keyPrefixMatch(global, "__VUE");
}
function svelteWebDetect() {
  return windowExists() && keyPrefixMatch(window, "__SVELTE");
}
function svelteSSRDetect() {
  return processExists() && typeof process.env !== "undefined" && !!Object.keys(process.env).find((key) => key.includes("svelte"));
}
function nextWebDetect() {
  return windowExists() && window.next && typeof window.next === "object";
}
function nextSSRDetect() {
  return globalExists() && (keyPrefixMatch(global, "__next") || keyPrefixMatch(global, "__NEXT"));
}
function nuxtWebDetect() {
  return windowExists() && (window.__NUXT__ !== void 0 || window.$nuxt !== void 0);
}
function nuxtSSRDetect() {
  return globalExists() && typeof global.__NUXT_PATHS__ !== "undefined";
}
function angularWebDetect() {
  const angularVersionSetInDocument = Boolean(documentExists() && document.querySelector("[ng-version]"));
  const angularContentSetInWindow = Boolean(windowExists() && typeof window.ng !== "undefined");
  return angularVersionSetInDocument || angularContentSetInWindow;
}
function angularSSRDetect() {
  var _a;
  return processExists() && typeof process.env === "object" && ((_a = process.env.npm_lifecycle_script) == null ? void 0 : _a.startsWith("ng ")) || false;
}
function reactNativeDetect() {
  return typeof navigator !== "undefined" && typeof navigator.product !== "undefined" && navigator.product === "ReactNative";
}
function expoDetect() {
  return globalExists() && typeof global.expo !== "undefined";
}
function webDetect() {
  return windowExists();
}
const detectionMap = [
  // First, detect mobile
  { platform: Framework.Expo, detectionMethod: expoDetect },
  { platform: Framework.ReactNative, detectionMethod: reactNativeDetect },
  // Next, detect web frameworks
  { platform: Framework.NextJs, detectionMethod: nextWebDetect },
  { platform: Framework.Nuxt, detectionMethod: nuxtWebDetect },
  { platform: Framework.Angular, detectionMethod: angularWebDetect },
  { platform: Framework.React, detectionMethod: reactWebDetect },
  { platform: Framework.VueJs, detectionMethod: vueWebDetect },
  { platform: Framework.Svelte, detectionMethod: svelteWebDetect },
  { platform: Framework.WebUnknown, detectionMethod: webDetect },
  // Last, detect ssr frameworks
  { platform: Framework.NextJsSSR, detectionMethod: nextSSRDetect },
  { platform: Framework.NuxtSSR, detectionMethod: nuxtSSRDetect },
  { platform: Framework.ReactSSR, detectionMethod: reactSSRDetect },
  { platform: Framework.VueJsSSR, detectionMethod: vueSSRDetect },
  { platform: Framework.AngularSSR, detectionMethod: angularSSRDetect },
  { platform: Framework.SvelteSSR, detectionMethod: svelteSSRDetect }
];
function detect() {
  var _a;
  return ((_a = detectionMap.find((detectionEntry) => detectionEntry.detectionMethod())) == null ? void 0 : _a.platform) || Framework.ServerSideUnknown;
}
let frameworkCache;
const frameworkChangeObservers = [];
let resetTriggered = false;
const SSR_RESET_TIMEOUT = 10;
const WEB_RESET_TIMEOUT = 10;
const PRIME_FRAMEWORK_DELAY = 1e3;
const detectFramework = () => {
  var _a;
  if (!frameworkCache) {
    frameworkCache = detect();
    if (resetTriggered) {
      while (frameworkChangeObservers.length) {
        (_a = frameworkChangeObservers.pop()) == null ? void 0 : _a();
      }
    } else {
      frameworkChangeObservers.forEach((fcn) => {
        fcn();
      });
    }
    resetTimeout(Framework.ServerSideUnknown, SSR_RESET_TIMEOUT);
    resetTimeout(Framework.WebUnknown, WEB_RESET_TIMEOUT);
  }
  return frameworkCache;
};
function clearCache() {
  frameworkCache = void 0;
}
function resetTimeout(framework, delay) {
  if (frameworkCache === framework && !resetTriggered) {
    setTimeout(() => {
      clearCache();
      resetTriggered = true;
      setTimeout(detectFramework, PRIME_FRAMEWORK_DELAY);
    }, delay);
  }
}
const customUserAgentState = {};
const getCustomUserAgent = (category, api) => {
  var _a, _b;
  return (_b = (_a = customUserAgentState[category]) == null ? void 0 : _a[api]) == null ? void 0 : _b.additionalDetails;
};
const BASE_USER_AGENT = `aws-amplify`;
const getAmplifyUserAgentObject = ({ category, action } = {}) => {
  const userAgent = [[BASE_USER_AGENT, version$1]];
  if (category) {
    userAgent.push([category, action]);
  }
  userAgent.push(["framework", detectFramework()]);
  if (category && action) {
    const customState = getCustomUserAgent(category, action);
    if (customState) {
      customState.forEach((state) => {
        userAgent.push(state);
      });
    }
  }
  return userAgent;
};
const getAmplifyUserAgent = (customUserAgentDetails) => {
  const userAgent = getAmplifyUserAgentObject(customUserAgentDetails);
  const userAgentString = userAgent.map(([agentKey, agentValue]) => agentKey && agentValue ? `${agentKey}/${agentValue}` : agentKey).join(" ");
  return userAgentString;
};
class ApiError extends AmplifyError {
  /**
   * The unwrapped HTTP response causing the given API error.
   */
  get response() {
    return this._response ? replicateApiErrorResponse(this._response) : void 0;
  }
  constructor(params) {
    super(params);
    this.constructor = ApiError;
    Object.setPrototypeOf(this, ApiError.prototype);
    if (params.response) {
      this._response = params.response;
    }
  }
}
const replicateApiErrorResponse = (response) => ({
  ...response,
  headers: { ...response.headers }
});
class Reachability {
  networkMonitor(_) {
    const globalObj = isWebWorker() ? self : typeof window !== "undefined" && window;
    if (!globalObj) {
      return from([{ online: true }]);
    }
    return new Observable((observer) => {
      observer.next({ online: globalObj.navigator.onLine });
      const notifyOnline = () => {
        observer.next({ online: true });
      };
      const notifyOffline = () => {
        observer.next({ online: false });
      };
      globalObj.addEventListener("online", notifyOnline);
      globalObj.addEventListener("offline", notifyOffline);
      Reachability._observers.push(observer);
      return () => {
        globalObj.removeEventListener("online", notifyOnline);
        globalObj.removeEventListener("offline", notifyOffline);
        Reachability._observers = Reachability._observers.filter((_observer) => _observer !== observer);
      };
    });
  }
  // expose observers to simulate offline mode for integration testing
  static _observerOverride(status) {
    for (const observer of this._observers) {
      if (observer.closed) {
        this._observers = this._observers.filter((_observer) => _observer !== observer);
        continue;
      }
      (observer == null ? void 0 : observer.next) && observer.next(status);
    }
  }
}
Reachability._observers = [];
const fetchAuthSession$1 = (amplify, options) => {
  return amplify.Auth.fetchAuthSession(options);
};
const AMPLIFY_SYMBOL = typeof Symbol !== "undefined" ? Symbol("amplify_default") : "@@amplify_default";
const logger$3 = new ConsoleLogger("Hub");
class HubClass {
  constructor(name) {
    this.listeners = /* @__PURE__ */ new Map();
    this.protectedChannels = [
      "core",
      "auth",
      "api",
      "analytics",
      "interactions",
      "pubsub",
      "storage",
      "ui",
      "xr"
    ];
    this.name = name;
  }
  /**
   * Used internally to remove a Hub listener.
   *
   * @remarks
   * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
   */
  _remove(channel, listener) {
    const holder = this.listeners.get(channel);
    if (!holder) {
      logger$3.warn(`No listeners for ${channel}`);
      return;
    }
    this.listeners.set(channel, [
      ...holder.filter(({ callback }) => callback !== listener)
    ]);
  }
  dispatch(channel, payload, source, ampSymbol) {
    if (typeof channel === "string" && this.protectedChannels.indexOf(channel) > -1) {
      const hasAccess = ampSymbol === AMPLIFY_SYMBOL;
      if (!hasAccess) {
        logger$3.warn(`WARNING: ${channel} is protected and dispatching on it can have unintended consequences`);
      }
    }
    const capsule = {
      channel,
      payload: { ...payload },
      source,
      patternInfo: []
    };
    try {
      this._toListeners(capsule);
    } catch (e) {
      logger$3.error(e);
    }
  }
  listen(channel, callback, listenerName = "noname") {
    let cb;
    if (typeof callback !== "function") {
      throw new AmplifyError({
        name: NO_HUBCALLBACK_PROVIDED_EXCEPTION,
        message: "No callback supplied to Hub"
      });
    } else {
      cb = callback;
    }
    let holder = this.listeners.get(channel);
    if (!holder) {
      holder = [];
      this.listeners.set(channel, holder);
    }
    holder.push({
      name: listenerName,
      callback: cb
    });
    return () => {
      this._remove(channel, cb);
    };
  }
  _toListeners(capsule) {
    const { channel, payload } = capsule;
    const holder = this.listeners.get(channel);
    if (holder) {
      holder.forEach((listener) => {
        logger$3.debug(`Dispatching to ${channel} with `, payload);
        try {
          listener.callback(capsule);
        } catch (e) {
          logger$3.error(e);
        }
      });
    }
  }
}
const Hub = new HubClass("__default__");
function bytesToString(input) {
  return Array.from(input, (byte) => String.fromCodePoint(byte)).join("");
}
const base64Encoder = {
  convert(input, { urlSafe } = { urlSafe: false }) {
    const inputStr = typeof input === "string" ? input : bytesToString(input);
    const encodedStr = getBtoa()(inputStr);
    return urlSafe ? encodedStr.replace(/\+/g, "-").replace(/\//g, "_") : encodedStr;
  }
};
class RestApiError extends ApiError {
  constructor(params) {
    super(params);
    this.constructor = RestApiError;
    Object.setPrototypeOf(this, RestApiError.prototype);
  }
}
class CanceledError extends RestApiError {
  constructor(params = {}) {
    super({
      name: "CanceledError",
      message: "Request is canceled by user",
      ...params
    });
    this.constructor = CanceledError;
    Object.setPrototypeOf(this, CanceledError.prototype);
  }
}
const isCancelError$1 = (error) => !!error && error instanceof CanceledError;
const deepFreeze = (object) => {
  const propNames = Reflect.ownKeys(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object" || typeof value === "function") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
};
class AmplifyClass {
  constructor() {
    this.oAuthListener = void 0;
    this.resourcesConfig = {};
    this.libraryOptions = {};
    this.Auth = new AuthClass();
  }
  /**
   * Configures Amplify for use with your back-end resources.
   *
   * @remarks
   * This API does not perform any merging of either `resourcesConfig` or `libraryOptions`. The most recently
   * provided values will be used after configuration.
   *
   * @remarks
   * `configure` can be used to specify additional library options where available for supported categories.
   *
   * @param resourceConfig - Back-end resource configuration. Typically provided via the `aws-exports.js` file.
   * @param libraryOptions - Additional options for customizing the behavior of the library.
   */
  configure(resourcesConfig, libraryOptions) {
    const resolvedResourceConfig = parseAmplifyConfig(resourcesConfig);
    this.resourcesConfig = resolvedResourceConfig;
    if (libraryOptions) {
      this.libraryOptions = libraryOptions;
    }
    this.resourcesConfig = deepFreeze(this.resourcesConfig);
    this.Auth.configure(this.resourcesConfig.Auth, this.libraryOptions.Auth);
    Hub.dispatch("core", {
      event: "configure",
      data: this.resourcesConfig
    }, "Configure", AMPLIFY_SYMBOL);
    this.notifyOAuthListener();
  }
  /**
   * Provides access to the current back-end resource configuration for the Library.
   *
   * @returns Returns the immutable back-end resource configuration.
   */
  getConfig() {
    return this.resourcesConfig;
  }
  /** @internal */
  [ADD_OAUTH_LISTENER](listener) {
    var _a, _b, _c;
    if ((_b = (_a = this.resourcesConfig.Auth) == null ? void 0 : _a.Cognito.loginWith) == null ? void 0 : _b.oauth) {
      listener((_c = this.resourcesConfig.Auth) == null ? void 0 : _c.Cognito);
    } else {
      this.oAuthListener = listener;
    }
  }
  notifyOAuthListener() {
    var _a, _b, _c;
    if (!((_b = (_a = this.resourcesConfig.Auth) == null ? void 0 : _a.Cognito.loginWith) == null ? void 0 : _b.oauth) || !this.oAuthListener) {
      return;
    }
    this.oAuthListener((_c = this.resourcesConfig.Auth) == null ? void 0 : _c.Cognito);
    this.oAuthListener = void 0;
  }
}
const Amplify = new AmplifyClass();
const fetchAuthSession = (options) => {
  return fetchAuthSession$1(Amplify, options);
};
const parseMetadata = (response) => {
  const { headers, statusCode } = response;
  return {
    ...isMetadataBearer(response) ? response.$metadata : {},
    httpStatusCode: statusCode,
    requestId: headers["x-amzn-requestid"] ?? headers["x-amzn-request-id"] ?? headers["x-amz-request-id"],
    extendedRequestId: headers["x-amz-id-2"],
    cfId: headers["x-amz-cf-id"]
  };
};
const isMetadataBearer = (response) => typeof (response == null ? void 0 : response.$metadata) === "object";
const parseJsonError = async (response) => {
  if (!response || response.statusCode < 300) {
    return;
  }
  const body = await parseJsonBody(response);
  const sanitizeErrorCode = (rawValue) => {
    const [cleanValue] = rawValue.toString().split(/[,:]+/);
    if (cleanValue.includes("#")) {
      return cleanValue.split("#")[1];
    }
    return cleanValue;
  };
  const code = sanitizeErrorCode(response.headers["x-amzn-errortype"] ?? body.code ?? body.__type ?? "UnknownError");
  const message = body.message ?? body.Message ?? "Unknown error";
  const error = new Error(message);
  return Object.assign(error, {
    name: code,
    $metadata: parseMetadata(response)
  });
};
const parseJsonBody = async (response) => {
  if (!response.body) {
    throw new Error("Missing response payload");
  }
  const output = await response.body.json();
  return Object.assign(output, {
    $metadata: parseMetadata(response)
  });
};
const DEFAULT_RETRY_ATTEMPTS = 3;
const retryMiddlewareFactory = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS, retryDecider, computeDelay, abortSignal }) => {
  if (maxAttempts < 1) {
    throw new Error("maxAttempts must be greater than 0");
  }
  return (next, context) => async function retryMiddleware(request) {
    let error;
    let attemptsCount = context.attemptsCount ?? 0;
    let response;
    const handleTerminalErrorOrResponse = () => {
      if (response) {
        addOrIncrementMetadataAttempts(response, attemptsCount);
        return response;
      } else {
        addOrIncrementMetadataAttempts(error, attemptsCount);
        throw error;
      }
    };
    while (!(abortSignal == null ? void 0 : abortSignal.aborted) && attemptsCount < maxAttempts) {
      try {
        response = await next(request);
        error = void 0;
      } catch (e) {
        error = e;
        response = void 0;
      }
      attemptsCount = (context.attemptsCount ?? 0) > attemptsCount ? context.attemptsCount ?? 0 : attemptsCount + 1;
      context.attemptsCount = attemptsCount;
      if (await retryDecider(response, error)) {
        if (!(abortSignal == null ? void 0 : abortSignal.aborted) && attemptsCount < maxAttempts) {
          const delay = computeDelay(attemptsCount);
          await cancellableSleep(delay, abortSignal);
        }
        continue;
      } else {
        return handleTerminalErrorOrResponse();
      }
    }
    if (abortSignal == null ? void 0 : abortSignal.aborted) {
      throw new Error("Request aborted.");
    } else {
      return handleTerminalErrorOrResponse();
    }
  };
};
const cancellableSleep = (timeoutMs, abortSignal) => {
  if (abortSignal == null ? void 0 : abortSignal.aborted) {
    return Promise.resolve();
  }
  let timeoutId;
  let sleepPromiseResolveFn;
  const sleepPromise = new Promise((resolve) => {
    sleepPromiseResolveFn = resolve;
    timeoutId = setTimeout(resolve, timeoutMs);
  });
  abortSignal == null ? void 0 : abortSignal.addEventListener("abort", function cancelSleep(_) {
    clearTimeout(timeoutId);
    abortSignal == null ? void 0 : abortSignal.removeEventListener("abort", cancelSleep);
    sleepPromiseResolveFn();
  });
  return sleepPromise;
};
const addOrIncrementMetadataAttempts = (nextHandlerOutput, attempts) => {
  if (Object.prototype.toString.call(nextHandlerOutput) !== "[object Object]") {
    return;
  }
  nextHandlerOutput.$metadata = {
    ...nextHandlerOutput.$metadata ?? {},
    attempts
  };
};
const userAgentMiddlewareFactory = ({ userAgentHeader = "x-amz-user-agent", userAgentValue = "" }) => (next) => {
  return async function userAgentMiddleware(request) {
    if (userAgentValue.trim().length === 0) {
      const result = await next(request);
      return result;
    } else {
      const headerName = userAgentHeader.toLowerCase();
      request.headers[headerName] = request.headers[headerName] ? `${request.headers[headerName]} ${userAgentValue}` : userAgentValue;
      const response = await next(request);
      return response;
    }
  };
};
const composeTransferHandler = (coreHandler, middleware) => (request, options) => {
  const context = {};
  let composedHandler = (composeHandlerRequest) => coreHandler(composeHandlerRequest, options);
  for (let i = middleware.length - 1; i >= 0; i--) {
    const m = middleware[i];
    const resolvedMiddleware = m(options);
    composedHandler = resolvedMiddleware(composedHandler, context);
  }
  return composedHandler(request);
};
const withMemoization = (payloadAccessor) => {
  let cached;
  return () => {
    if (!cached) {
      cached = payloadAccessor();
    }
    return cached;
  };
};
const shouldSendBody = (method) => !["HEAD", "GET", "DELETE"].includes(method.toUpperCase());
const fetchTransferHandler = async ({ url, method, headers, body }, { abortSignal, cache, withCrossDomainCredentials }) => {
  var _a;
  let resp;
  try {
    resp = await fetch(url, {
      method,
      headers,
      body: shouldSendBody(method) ? body : void 0,
      signal: abortSignal,
      cache,
      credentials: withCrossDomainCredentials ? "include" : "same-origin"
    });
  } catch (e) {
    if (e instanceof TypeError) {
      throw new Error("Network error");
    }
    throw e;
  }
  const responseHeaders = {};
  (_a = resp.headers) == null ? void 0 : _a.forEach((value, key) => {
    responseHeaders[key.toLowerCase()] = value;
  });
  const httpResponse = {
    statusCode: resp.status,
    headers: responseHeaders,
    body: null
  };
  const bodyWithMixin = Object.assign(resp.body ?? {}, {
    text: withMemoization(() => resp.text()),
    blob: withMemoization(() => resp.blob()),
    json: withMemoization(() => resp.json())
  });
  return {
    ...httpResponse,
    body: bodyWithMixin
  };
};
const unauthenticatedHandler = composeTransferHandler(fetchTransferHandler, [userAgentMiddlewareFactory, retryMiddlewareFactory]);
const DEFAULT_MAX_DELAY_MS = 5 * 60 * 1e3;
const jitteredBackoff = (attempt) => {
  const delayFunction = jitteredBackoff$1(DEFAULT_MAX_DELAY_MS);
  const delay = delayFunction(attempt);
  return delay === false ? DEFAULT_MAX_DELAY_MS : delay;
};
const CLOCK_SKEW_ERROR_CODES = [
  "AuthFailure",
  "InvalidSignatureException",
  "RequestExpired",
  "RequestInTheFuture",
  "RequestTimeTooSkewed",
  "SignatureDoesNotMatch",
  "BadRequestException"
  // API Gateway
];
const isClockSkewError = (errorCode) => !!errorCode && CLOCK_SKEW_ERROR_CODES.includes(errorCode);
const getRetryDecider = (errorParser) => async (response, error) => {
  const parsedError = error ?? await errorParser(response) ?? void 0;
  const errorCode = (parsedError == null ? void 0 : parsedError.code) || (parsedError == null ? void 0 : parsedError.name);
  const statusCode = response == null ? void 0 : response.statusCode;
  return isConnectionError(error) || isThrottlingError(statusCode, errorCode) || isClockSkewError(errorCode) || isServerSideError(statusCode, errorCode);
};
const THROTTLING_ERROR_CODES = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException"
];
const TIMEOUT_ERROR_CODES = [
  "TimeoutError",
  "RequestTimeout",
  "RequestTimeoutException"
];
const isThrottlingError = (statusCode, errorCode) => statusCode === 429 || !!errorCode && THROTTLING_ERROR_CODES.includes(errorCode);
const isConnectionError = (error) => (error == null ? void 0 : error.name) === "Network error";
const isServerSideError = (statusCode, errorCode) => !!statusCode && [500, 502, 503, 504].includes(statusCode) || !!errorCode && TIMEOUT_ERROR_CODES.includes(errorCode);
const getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
const SKEW_WINDOW = 5 * 60 * 1e3;
const isClockSkewed = (clockTimeInMilliseconds, clockOffsetInMilliseconds) => Math.abs(getSkewCorrectedDate(clockOffsetInMilliseconds).getTime() - clockTimeInMilliseconds) >= SKEW_WINDOW;
const getUpdatedSystemClockOffset = (clockTimeInMilliseconds, currentSystemClockOffset) => {
  if (isClockSkewed(clockTimeInMilliseconds, currentSystemClockOffset)) {
    return clockTimeInMilliseconds - Date.now();
  }
  return currentSystemClockOffset;
};
const signingMiddlewareFactory = ({ credentials, region, service, uriEscapePath = true }) => {
  let currentSystemClockOffset;
  return (next) => async function signingMiddleware(request) {
    currentSystemClockOffset = currentSystemClockOffset ?? 0;
    const signRequestOptions = {
      credentials: typeof credentials === "function" ? await credentials() : credentials,
      signingDate: getSkewCorrectedDate(currentSystemClockOffset),
      signingRegion: region,
      signingService: service,
      uriEscapePath
    };
    const signedRequest = await signRequest(request, signRequestOptions);
    const response = await next(signedRequest);
    const dateString = getDateHeader(response);
    if (dateString) {
      currentSystemClockOffset = getUpdatedSystemClockOffset(Date.parse(dateString), currentSystemClockOffset);
    }
    return response;
  };
};
const getDateHeader = ({ headers } = {}) => (headers == null ? void 0 : headers.date) ?? (headers == null ? void 0 : headers.Date) ?? (headers == null ? void 0 : headers["x-amz-date"]);
const authenticatedHandler = composeTransferHandler(fetchTransferHandler, [
  userAgentMiddlewareFactory,
  retryMiddlewareFactory,
  signingMiddlewareFactory
]);
var RestApiValidationErrorCode;
(function(RestApiValidationErrorCode2) {
  RestApiValidationErrorCode2["InvalidApiName"] = "InvalidApiName";
})(RestApiValidationErrorCode || (RestApiValidationErrorCode = {}));
({
  [RestApiValidationErrorCode.InvalidApiName]: {
    message: "API name is invalid.",
    recoverySuggestion: "Check if the API name matches the one in your configuration or `aws-exports.js`"
  }
});
const parseRestApiServiceError = async (response) => {
  var _a;
  if (!response) {
    return;
  }
  const parsedAwsError = await parseJsonError(stubErrorResponse(response));
  if (!parsedAwsError) ;
  else {
    const bodyText = await ((_a = response.body) == null ? void 0 : _a.text());
    return buildRestApiError(parsedAwsError, {
      statusCode: response.statusCode,
      headers: response.headers,
      body: bodyText
    });
  }
};
const stubErrorResponse = (response) => {
  let bodyTextPromise;
  const bodyProxy = new Proxy(response.body, {
    get(target, prop, receiver) {
      if (prop === "json") {
        return async () => {
          if (!bodyTextPromise) {
            bodyTextPromise = target.text();
          }
          try {
            return JSON.parse(await bodyTextPromise);
          } catch (error) {
            return {};
          }
        };
      } else if (prop === "text") {
        return async () => {
          if (!bodyTextPromise) {
            bodyTextPromise = target.text();
          }
          return bodyTextPromise;
        };
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  const responseProxy = new Proxy(response, {
    get(target, prop, receiver) {
      if (prop === "body") {
        return bodyProxy;
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  return responseProxy;
};
const buildRestApiError = (error, response) => {
  const restApiError = new RestApiError({
    name: error == null ? void 0 : error.name,
    message: error.message,
    underlyingError: error,
    response
  });
  return Object.assign(restApiError, { $metadata: error.$metadata });
};
const logger$2 = new ConsoleLogger("RestApis");
function createCancellableOperation(handler, abortController) {
  const isInternalPost = (targetHandler) => !!abortController;
  const publicApisAbortController = new AbortController();
  const publicApisAbortSignal = publicApisAbortController.signal;
  const internalPostAbortSignal = abortController == null ? void 0 : abortController.signal;
  let abortReason;
  const job = async () => {
    try {
      const response = await (isInternalPost(handler) ? handler() : handler(publicApisAbortSignal));
      if (response.statusCode >= 300) {
        throw await parseRestApiServiceError(response);
      }
      return response;
    } catch (error) {
      const abortSignal = internalPostAbortSignal ?? publicApisAbortSignal;
      const message = abortReason ?? abortSignal.reason;
      if (error.name === "AbortError" || (abortSignal == null ? void 0 : abortSignal.aborted) === true) {
        const canceledError = new CanceledError({
          ...message && { message },
          underlyingError: error,
          recoverySuggestion: "The API request was explicitly canceled. If this is not intended, validate if you called the `cancel()` function on the API request erroneously."
        });
        logger$2.debug(error);
        throw canceledError;
      }
      logger$2.debug(error);
      throw error;
    }
  };
  if (isInternalPost()) {
    return job();
  } else {
    const cancel2 = (abortMessage) => {
      if (publicApisAbortSignal.aborted === true) {
        return;
      }
      publicApisAbortController.abort(abortMessage);
      if (abortMessage && publicApisAbortSignal.reason !== abortMessage) {
        abortReason = abortMessage;
      }
    };
    return { response: job(), cancel: cancel2 };
  }
}
const DEFAULT_REST_IAM_SIGNING_SERVICE = "execute-api";
const DEFAULT_IAM_SIGNING_REGION = "us-east-1";
const APIG_HOSTNAME_PATTERN = /^.+\.([a-z0-9-]+)\.([a-z0-9-]+)\.amazonaws\.com/;
const parseSigningInfo = (url, restApiOptions) => {
  const { service: signingService = DEFAULT_REST_IAM_SIGNING_SERVICE, region: signingRegion = DEFAULT_IAM_SIGNING_REGION } = {};
  const { hostname } = url;
  const [, service, region] = APIG_HOSTNAME_PATTERN.exec(hostname) ?? [];
  if (service === DEFAULT_REST_IAM_SIGNING_SERVICE) {
    return {
      service,
      region: region ?? signingRegion
    };
  } else if (service === "appsync-api") {
    return {
      service: "appsync",
      region: region ?? signingRegion
    };
  } else {
    return {
      service: signingService,
      region: signingRegion
    };
  }
};
const resolveHeaders = (headers, body) => {
  const normalizedHeaders = {};
  for (const key in headers) {
    normalizedHeaders[key.toLowerCase()] = headers[key];
  }
  if (body) {
    normalizedHeaders["content-type"] = "application/json; charset=UTF-8";
    if (body instanceof FormData) {
      delete normalizedHeaders["content-type"];
    }
  }
  return normalizedHeaders;
};
const transferHandler = async (amplify, options, signingServiceInfo) => {
  const { url, method, headers, body, withCredentials, abortSignal } = options;
  const resolvedBody = body ? body instanceof FormData ? body : JSON.stringify(body ?? "") : void 0;
  const resolvedHeaders = resolveHeaders(headers, body);
  const request = {
    url,
    headers: resolvedHeaders,
    method,
    body: resolvedBody
  };
  const baseOptions = {
    retryDecider: getRetryDecider(parseRestApiServiceError),
    computeDelay: jitteredBackoff,
    withCrossDomainCredentials: withCredentials,
    abortSignal
  };
  const isIamAuthApplicable = iamAuthApplicable(request, signingServiceInfo);
  let response;
  const credentials = await resolveCredentials(amplify);
  if (isIamAuthApplicable && credentials) {
    const signingInfoFromUrl = parseSigningInfo(url);
    const signingService = (signingServiceInfo == null ? void 0 : signingServiceInfo.service) ?? signingInfoFromUrl.service;
    const signingRegion = (signingServiceInfo == null ? void 0 : signingServiceInfo.region) ?? signingInfoFromUrl.region;
    response = await authenticatedHandler(request, {
      ...baseOptions,
      credentials,
      region: signingRegion,
      service: signingService
    });
  } else {
    response = await unauthenticatedHandler(request, {
      ...baseOptions
    });
  }
  return {
    statusCode: response.statusCode,
    headers: response.headers,
    body: response.body
  };
};
const iamAuthApplicable = ({ headers }, signingServiceInfo) => !headers.authorization && !headers["x-api-key"] && !!signingServiceInfo;
const resolveCredentials = async (amplify) => {
  try {
    const { credentials } = await amplify.Auth.fetchAuthSession();
    if (credentials) {
      return credentials;
    }
  } catch (e) {
    logger$2.debug("No credentials available, the request will be unsigned.");
  }
  return null;
};
const cancelTokenMap = /* @__PURE__ */ new WeakMap();
const post = (amplify, { url, options, abortController }) => {
  const controller = abortController ?? new AbortController();
  const responsePromise = createCancellableOperation(async () => {
    const response = transferHandler(amplify, {
      url,
      method: "POST",
      ...options,
      abortSignal: controller.signal
    }, options == null ? void 0 : options.signingServiceInfo);
    return response;
  }, controller);
  const responseWithCleanUp = responsePromise.finally(() => {
    cancelTokenMap.delete(responseWithCleanUp);
  });
  return responseWithCleanUp;
};
const cancel$1 = (promise, message) => {
  const controller = cancelTokenMap.get(promise);
  if (controller) {
    controller.abort(message);
    if (message && controller.signal.reason !== message) {
      controller.signal.reason = message;
    }
    return true;
  }
  return false;
};
const updateRequestToBeCancellable = (promise, controller) => {
  cancelTokenMap.set(promise, controller);
};
var CONTROL_MSG;
(function(CONTROL_MSG2) {
  CONTROL_MSG2["CONNECTION_CLOSED"] = "Connection closed";
  CONTROL_MSG2["CONNECTION_FAILED"] = "Connection failed";
  CONTROL_MSG2["REALTIME_SUBSCRIPTION_INIT_ERROR"] = "AppSync Realtime subscription init error";
  CONTROL_MSG2["SUBSCRIPTION_ACK"] = "Subscription ack";
  CONTROL_MSG2["TIMEOUT_DISCONNECT"] = "Timeout disconnect";
})(CONTROL_MSG || (CONTROL_MSG = {}));
var ConnectionState;
(function(ConnectionState2) {
  ConnectionState2["Connected"] = "Connected";
  ConnectionState2["ConnectedPendingNetwork"] = "ConnectedPendingNetwork";
  ConnectionState2["ConnectionDisrupted"] = "ConnectionDisrupted";
  ConnectionState2["ConnectionDisruptedPendingNetwork"] = "ConnectionDisruptedPendingNetwork";
  ConnectionState2["Connecting"] = "Connecting";
  ConnectionState2["ConnectedPendingDisconnect"] = "ConnectedPendingDisconnect";
  ConnectionState2["Disconnected"] = "Disconnected";
  ConnectionState2["ConnectedPendingKeepAlive"] = "ConnectedPendingKeepAlive";
})(ConnectionState || (ConnectionState = {}));
const MAX_DELAY_MS = 5e3;
const NON_RETRYABLE_CODES = [400, 401, 403];
const CONNECTION_STATE_CHANGE = "ConnectionStateChange";
var MESSAGE_TYPES;
(function(MESSAGE_TYPES2) {
  MESSAGE_TYPES2["GQL_CONNECTION_INIT"] = "connection_init";
  MESSAGE_TYPES2["GQL_CONNECTION_ERROR"] = "connection_error";
  MESSAGE_TYPES2["GQL_CONNECTION_ACK"] = "connection_ack";
  MESSAGE_TYPES2["GQL_START"] = "start";
  MESSAGE_TYPES2["GQL_START_ACK"] = "start_ack";
  MESSAGE_TYPES2["GQL_DATA"] = "data";
  MESSAGE_TYPES2["GQL_CONNECTION_KEEP_ALIVE"] = "ka";
  MESSAGE_TYPES2["GQL_STOP"] = "stop";
  MESSAGE_TYPES2["GQL_COMPLETE"] = "complete";
  MESSAGE_TYPES2["GQL_ERROR"] = "error";
})(MESSAGE_TYPES || (MESSAGE_TYPES = {}));
var SUBSCRIPTION_STATUS;
(function(SUBSCRIPTION_STATUS2) {
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["PENDING"] = 0] = "PENDING";
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["CONNECTED"] = 1] = "CONNECTED";
  SUBSCRIPTION_STATUS2[SUBSCRIPTION_STATUS2["FAILED"] = 2] = "FAILED";
})(SUBSCRIPTION_STATUS || (SUBSCRIPTION_STATUS = {}));
var SOCKET_STATUS;
(function(SOCKET_STATUS2) {
  SOCKET_STATUS2[SOCKET_STATUS2["CLOSED"] = 0] = "CLOSED";
  SOCKET_STATUS2[SOCKET_STATUS2["READY"] = 1] = "READY";
  SOCKET_STATUS2[SOCKET_STATUS2["CONNECTING"] = 2] = "CONNECTING";
})(SOCKET_STATUS || (SOCKET_STATUS = {}));
const AWS_APPSYNC_REALTIME_HEADERS = {
  accept: "application/json, text/javascript",
  "content-encoding": "amz-1.0",
  "content-type": "application/json; charset=UTF-8"
};
const CONNECTION_INIT_TIMEOUT = 15e3;
const START_ACK_TIMEOUT = 15e3;
const DEFAULT_KEEP_ALIVE_TIMEOUT = 5 * 60 * 1e3;
const DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT = 65 * 1e3;
const RECONNECT_DELAY = 5 * 1e3;
const RECONNECT_INTERVAL = 60 * 1e3;
const ReachabilityMonitor = () => new Reachability().networkMonitor();
const CONNECTION_CHANGE = {
  KEEP_ALIVE_MISSED: { keepAliveState: "unhealthy" },
  KEEP_ALIVE: { keepAliveState: "healthy" },
  CONNECTION_ESTABLISHED: { connectionState: "connected" },
  CONNECTION_FAILED: {
    intendedConnectionState: "disconnected",
    connectionState: "disconnected"
  },
  CLOSING_CONNECTION: { intendedConnectionState: "disconnected" },
  OPENING_CONNECTION: {
    intendedConnectionState: "connected",
    connectionState: "connecting"
  },
  CLOSED: { connectionState: "disconnected" },
  ONLINE: { networkState: "connected" },
  OFFLINE: { networkState: "disconnected" }
};
class ConnectionStateMonitor {
  constructor() {
    this._networkMonitoringSubscription = void 0;
    this._linkedConnectionState = {
      networkState: "connected",
      connectionState: "disconnected",
      intendedConnectionState: "disconnected",
      keepAliveState: "healthy"
    };
    this._initialNetworkStateSubscription = ReachabilityMonitor().subscribe(({ online }) => {
      var _a;
      this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
      (_a = this._initialNetworkStateSubscription) == null ? void 0 : _a.unsubscribe();
    });
    this._linkedConnectionStateObservable = new Observable((connectionStateObserver) => {
      connectionStateObserver.next(this._linkedConnectionState);
      this._linkedConnectionStateObserver = connectionStateObserver;
    });
  }
  /**
   * Turn network state monitoring on if it isn't on already
   */
  enableNetworkMonitoring() {
    var _a;
    (_a = this._initialNetworkStateSubscription) == null ? void 0 : _a.unsubscribe();
    if (this._networkMonitoringSubscription === void 0) {
      this._networkMonitoringSubscription = ReachabilityMonitor().subscribe(({ online }) => {
        this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
      });
    }
  }
  /**
   * Turn network state monitoring off if it isn't off already
   */
  disableNetworkMonitoring() {
    var _a;
    (_a = this._networkMonitoringSubscription) == null ? void 0 : _a.unsubscribe();
    this._networkMonitoringSubscription = void 0;
  }
  /**
   * Get the observable that allows us to monitor the connection state
   *
   * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
   */
  get connectionStateObservable() {
    let previous;
    return this._linkedConnectionStateObservable.pipe(map((value) => {
      return this.connectionStatesTranslator(value);
    })).pipe(filter((current) => {
      const toInclude = current !== previous;
      previous = current;
      return toInclude;
    }));
  }
  /*
   * Updates local connection state and emits the full state to the observer.
   */
  record(statusUpdates) {
    var _a;
    if (statusUpdates.intendedConnectionState === "connected") {
      this.enableNetworkMonitoring();
    } else if (statusUpdates.intendedConnectionState === "disconnected") {
      this.disableNetworkMonitoring();
    }
    const newSocketStatus = {
      ...this._linkedConnectionState,
      ...statusUpdates
    };
    this._linkedConnectionState = { ...newSocketStatus };
    (_a = this._linkedConnectionStateObserver) == null ? void 0 : _a.next(this._linkedConnectionState);
  }
  /*
   * Translate the ConnectionState structure into a specific ConnectionState string literal union
   */
  connectionStatesTranslator({ connectionState, networkState, intendedConnectionState, keepAliveState }) {
    if (connectionState === "connected" && networkState === "disconnected")
      return ConnectionState.ConnectedPendingNetwork;
    if (connectionState === "connected" && intendedConnectionState === "disconnected")
      return ConnectionState.ConnectedPendingDisconnect;
    if (connectionState === "disconnected" && intendedConnectionState === "connected" && networkState === "disconnected")
      return ConnectionState.ConnectionDisruptedPendingNetwork;
    if (connectionState === "disconnected" && intendedConnectionState === "connected")
      return ConnectionState.ConnectionDisrupted;
    if (connectionState === "connected" && keepAliveState === "unhealthy")
      return ConnectionState.ConnectedPendingKeepAlive;
    if (connectionState === "connecting")
      return ConnectionState.Connecting;
    if (connectionState === "disconnected")
      return ConnectionState.Disconnected;
    return ConnectionState.Connected;
  }
}
var ReconnectEvent;
(function(ReconnectEvent2) {
  ReconnectEvent2["START_RECONNECT"] = "START_RECONNECT";
  ReconnectEvent2["HALT_RECONNECT"] = "HALT_RECONNECT";
})(ReconnectEvent || (ReconnectEvent = {}));
class ReconnectionMonitor {
  constructor() {
    this.reconnectObservers = [];
  }
  /**
   * Add reconnect observer to the list of observers to alert on reconnect
   */
  addObserver(reconnectObserver) {
    this.reconnectObservers.push(reconnectObserver);
  }
  /**
   * Given a reconnect event, start the appropriate behavior
   */
  record(event) {
    if (event === ReconnectEvent.START_RECONNECT) {
      if (this.reconnectSetTimeoutId === void 0 && this.reconnectIntervalId === void 0) {
        this.reconnectSetTimeoutId = setTimeout(() => {
          this._triggerReconnect();
          this.reconnectIntervalId = setInterval(() => {
            this._triggerReconnect();
          }, RECONNECT_INTERVAL);
        }, RECONNECT_DELAY);
      }
    }
    if (event === ReconnectEvent.HALT_RECONNECT) {
      if (this.reconnectIntervalId) {
        clearInterval(this.reconnectIntervalId);
        this.reconnectIntervalId = void 0;
      }
      if (this.reconnectSetTimeoutId) {
        clearTimeout(this.reconnectSetTimeoutId);
        this.reconnectSetTimeoutId = void 0;
      }
    }
  }
  /**
   * Complete all reconnect observers
   */
  close() {
    this.reconnectObservers.forEach((reconnectObserver) => {
      var _a;
      (_a = reconnectObserver.complete) == null ? void 0 : _a.call(reconnectObserver);
    });
  }
  _triggerReconnect() {
    this.reconnectObservers.forEach((reconnectObserver) => {
      var _a;
      (_a = reconnectObserver.next) == null ? void 0 : _a.call(reconnectObserver);
    });
  }
}
const logger$1 = new ConsoleLogger("AWSAppSyncRealTimeProvider");
const dispatchApiEvent = (payload) => {
  Hub.dispatch("api", payload, "PubSub", AMPLIFY_SYMBOL);
};
const standardDomainPattern = /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i;
const customDomainPath = "/realtime";
class AWSAppSyncRealTimeProvider {
  constructor() {
    this.socketStatus = SOCKET_STATUS.CLOSED;
    this.keepAliveTimeout = DEFAULT_KEEP_ALIVE_TIMEOUT;
    this.subscriptionObserverMap = /* @__PURE__ */ new Map();
    this.promiseArray = [];
    this.connectionStateMonitor = new ConnectionStateMonitor();
    this.reconnectionMonitor = new ReconnectionMonitor();
    this.connectionStateMonitorSubscription = this.connectionStateMonitor.connectionStateObservable.subscribe((connectionState) => {
      dispatchApiEvent({
        event: CONNECTION_STATE_CHANGE,
        data: {
          provider: this,
          connectionState
        },
        message: `Connection state is ${connectionState}`
      });
      this.connectionState = connectionState;
      if (connectionState === ConnectionState.ConnectionDisrupted) {
        this.reconnectionMonitor.record(ReconnectEvent.START_RECONNECT);
      }
      if ([
        ConnectionState.Connected,
        ConnectionState.ConnectedPendingDisconnect,
        ConnectionState.ConnectedPendingKeepAlive,
        ConnectionState.ConnectedPendingNetwork,
        ConnectionState.ConnectionDisruptedPendingNetwork,
        ConnectionState.Disconnected
      ].includes(connectionState)) {
        this.reconnectionMonitor.record(ReconnectEvent.HALT_RECONNECT);
      }
    });
  }
  /**
   * Mark the socket closed and release all active listeners
   */
  close() {
    this.socketStatus = SOCKET_STATUS.CLOSED;
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_FAILED);
    this.connectionStateMonitorSubscription.unsubscribe();
    this.reconnectionMonitor.close();
  }
  getNewWebSocket(url, protocol) {
    return new WebSocket(url, protocol);
  }
  getProviderName() {
    return "AWSAppSyncRealTimeProvider";
  }
  // Check if url matches standard domain pattern
  isCustomDomain(url) {
    return url.match(standardDomainPattern) === null;
  }
  subscribe(options, customUserAgentDetails) {
    const { appSyncGraphqlEndpoint, region, query, variables, authenticationType, additionalHeaders, apiKey, authToken, libraryConfigHeaders } = options || {};
    return new Observable((observer) => {
      if (!options || !appSyncGraphqlEndpoint) {
        observer.error({
          errors: [
            {
              ...new GraphQLError(`Subscribe only available for AWS AppSync endpoint`)
            }
          ]
        });
        observer.complete();
      } else {
        let subscriptionStartActive = false;
        const subscriptionId = amplifyUuid();
        const startSubscription = () => {
          if (!subscriptionStartActive) {
            subscriptionStartActive = true;
            const startSubscriptionPromise = this._startSubscriptionWithAWSAppSyncRealTime({
              options: {
                query,
                variables,
                region,
                authenticationType,
                appSyncGraphqlEndpoint,
                additionalHeaders,
                apiKey,
                authToken,
                libraryConfigHeaders
              },
              observer,
              subscriptionId,
              customUserAgentDetails
            }).catch((err) => {
              logger$1.debug(`${CONTROL_MSG.REALTIME_SUBSCRIPTION_INIT_ERROR}: ${err}`);
              this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
            });
            startSubscriptionPromise.finally(() => {
              subscriptionStartActive = false;
            });
          }
        };
        const reconnectSubscription = new Observable((reconnectSubscriptionObserver) => {
          this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
        }).subscribe(() => {
          startSubscription();
        });
        startSubscription();
        return async () => {
          reconnectSubscription == null ? void 0 : reconnectSubscription.unsubscribe();
          try {
            await this._waitForSubscriptionToBeConnected(subscriptionId);
            const { subscriptionState } = this.subscriptionObserverMap.get(subscriptionId) || {};
            if (!subscriptionState) {
              return;
            }
            if (subscriptionState === SUBSCRIPTION_STATUS.CONNECTED) {
              this._sendUnsubscriptionMessage(subscriptionId);
            } else {
              throw new Error("Subscription never connected");
            }
          } catch (err) {
            logger$1.debug(`Error while unsubscribing ${err}`);
          } finally {
            this._removeSubscriptionObserver(subscriptionId);
          }
        };
      }
    });
  }
  async _startSubscriptionWithAWSAppSyncRealTime({ options, observer, subscriptionId, customUserAgentDetails }) {
    const { appSyncGraphqlEndpoint, authenticationType, query, variables, apiKey, region, libraryConfigHeaders = () => ({}), additionalHeaders = {}, authToken } = options;
    let additionalCustomHeaders = {};
    if (typeof additionalHeaders === "function") {
      const requestOptions = {
        url: appSyncGraphqlEndpoint || "",
        queryString: query || ""
      };
      additionalCustomHeaders = await additionalHeaders(requestOptions);
    } else {
      additionalCustomHeaders = additionalHeaders;
    }
    if (authToken) {
      additionalCustomHeaders = {
        ...additionalCustomHeaders,
        Authorization: authToken
      };
    }
    const subscriptionState = SUBSCRIPTION_STATUS.PENDING;
    const data2 = {
      query,
      variables
    };
    this.subscriptionObserverMap.set(subscriptionId, {
      observer,
      query: query ?? "",
      variables: variables ?? {},
      subscriptionState,
      startAckTimeoutId: void 0
    });
    const dataString = JSON.stringify(data2);
    const headerObj = {
      ...await this._awsRealTimeHeaderBasedAuth({
        apiKey,
        appSyncGraphqlEndpoint,
        authenticationType,
        payload: dataString,
        canonicalUri: "",
        region,
        additionalCustomHeaders
      }),
      ...await libraryConfigHeaders(),
      ...additionalCustomHeaders,
      [USER_AGENT_HEADER$1]: getAmplifyUserAgent(customUserAgentDetails)
    };
    const subscriptionMessage = {
      id: subscriptionId,
      payload: {
        data: dataString,
        extensions: {
          authorization: {
            ...headerObj
          }
        }
      },
      type: MESSAGE_TYPES.GQL_START
    };
    const stringToAWSRealTime = JSON.stringify(subscriptionMessage);
    try {
      this.connectionStateMonitor.record(CONNECTION_CHANGE.OPENING_CONNECTION);
      await this._initializeWebSocketConnection({
        apiKey,
        appSyncGraphqlEndpoint,
        authenticationType,
        region,
        additionalCustomHeaders
      });
    } catch (err) {
      this._logStartSubscriptionError(subscriptionId, observer, err);
      return;
    }
    const { subscriptionFailedCallback, subscriptionReadyCallback } = this.subscriptionObserverMap.get(subscriptionId) ?? {};
    this.subscriptionObserverMap.set(subscriptionId, {
      observer,
      subscriptionState,
      query: query ?? "",
      variables: variables ?? {},
      subscriptionReadyCallback,
      subscriptionFailedCallback,
      startAckTimeoutId: setTimeout(() => {
        this._timeoutStartSubscriptionAck(subscriptionId);
      }, START_ACK_TIMEOUT)
    });
    if (this.awsRealTimeSocket) {
      this.awsRealTimeSocket.send(stringToAWSRealTime);
    }
  }
  // Log logic for start subscription failures
  _logStartSubscriptionError(subscriptionId, observer, err) {
    logger$1.debug({ err });
    const message = String(err.message ?? "");
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
    if (this.connectionState !== ConnectionState.ConnectionDisruptedPendingNetwork) {
      if (isNonRetryableError(err)) {
        observer.error({
          errors: [
            {
              ...new GraphQLError(`${CONTROL_MSG.CONNECTION_FAILED}: ${message}`)
            }
          ]
        });
      } else {
        logger$1.debug(`${CONTROL_MSG.CONNECTION_FAILED}: ${message}`);
      }
      const { subscriptionFailedCallback } = this.subscriptionObserverMap.get(subscriptionId) || {};
      if (typeof subscriptionFailedCallback === "function") {
        subscriptionFailedCallback();
      }
    }
  }
  // Waiting that subscription has been connected before trying to unsubscribe
  async _waitForSubscriptionToBeConnected(subscriptionId) {
    const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
    if (subscriptionObserver) {
      const { subscriptionState } = subscriptionObserver;
      if (subscriptionState === SUBSCRIPTION_STATUS.PENDING) {
        return new Promise((resolve, reject) => {
          const { observer, subscriptionState: observedSubscriptionState, variables, query } = subscriptionObserver;
          this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            subscriptionState: observedSubscriptionState,
            variables,
            query,
            subscriptionReadyCallback: resolve,
            subscriptionFailedCallback: reject
          });
        });
      }
    }
  }
  _sendUnsubscriptionMessage(subscriptionId) {
    try {
      if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN && this.socketStatus === SOCKET_STATUS.READY) {
        const unsubscribeMessage = {
          id: subscriptionId,
          type: MESSAGE_TYPES.GQL_STOP
        };
        const stringToAWSRealTime = JSON.stringify(unsubscribeMessage);
        this.awsRealTimeSocket.send(stringToAWSRealTime);
      }
    } catch (err) {
      logger$1.debug({ err });
    }
  }
  _removeSubscriptionObserver(subscriptionId) {
    this.subscriptionObserverMap.delete(subscriptionId);
    setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
  }
  _closeSocketIfRequired() {
    if (this.subscriptionObserverMap.size > 0) {
      return;
    }
    if (!this.awsRealTimeSocket) {
      this.socketStatus = SOCKET_STATUS.CLOSED;
      return;
    }
    this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSING_CONNECTION);
    if (this.awsRealTimeSocket.bufferedAmount > 0) {
      setTimeout(this._closeSocketIfRequired.bind(this), 1e3);
    } else {
      logger$1.debug("closing WebSocket...");
      if (this.keepAliveTimeoutId) {
        clearTimeout(this.keepAliveTimeoutId);
      }
      if (this.keepAliveAlertTimeoutId) {
        clearTimeout(this.keepAliveAlertTimeoutId);
      }
      const tempSocket = this.awsRealTimeSocket;
      tempSocket.onclose = null;
      tempSocket.onerror = null;
      tempSocket.close(1e3);
      this.awsRealTimeSocket = void 0;
      this.socketStatus = SOCKET_STATUS.CLOSED;
      this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
    }
  }
  _handleIncomingSubscriptionMessage(message) {
    if (typeof message.data !== "string") {
      return;
    }
    logger$1.debug(`subscription message from AWS AppSync RealTime: ${message.data}`);
    const { id = "", payload, type } = JSON.parse(String(message.data));
    const { observer = null, query = "", variables = {}, startAckTimeoutId, subscriptionReadyCallback, subscriptionFailedCallback } = this.subscriptionObserverMap.get(id) || {};
    logger$1.debug({ id, observer, query, variables });
    if (type === MESSAGE_TYPES.GQL_DATA && payload && payload.data) {
      if (observer) {
        observer.next(payload);
      } else {
        logger$1.debug(`observer not found for id: ${id}`);
      }
      return;
    }
    if (type === MESSAGE_TYPES.GQL_START_ACK) {
      logger$1.debug(`subscription ready for ${JSON.stringify({ query, variables })}`);
      if (typeof subscriptionReadyCallback === "function") {
        subscriptionReadyCallback();
      }
      if (startAckTimeoutId)
        clearTimeout(startAckTimeoutId);
      dispatchApiEvent({
        event: CONTROL_MSG.SUBSCRIPTION_ACK,
        data: { query, variables },
        message: "Connection established for subscription"
      });
      const subscriptionState = SUBSCRIPTION_STATUS.CONNECTED;
      if (observer) {
        this.subscriptionObserverMap.set(id, {
          observer,
          query,
          variables,
          startAckTimeoutId: void 0,
          subscriptionState,
          subscriptionReadyCallback,
          subscriptionFailedCallback
        });
      }
      this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_ESTABLISHED);
      return;
    }
    if (type === MESSAGE_TYPES.GQL_CONNECTION_KEEP_ALIVE) {
      if (this.keepAliveTimeoutId)
        clearTimeout(this.keepAliveTimeoutId);
      if (this.keepAliveAlertTimeoutId)
        clearTimeout(this.keepAliveAlertTimeoutId);
      this.keepAliveTimeoutId = setTimeout(() => {
        this._errorDisconnect(CONTROL_MSG.TIMEOUT_DISCONNECT);
      }, this.keepAliveTimeout);
      this.keepAliveAlertTimeoutId = setTimeout(() => {
        this.connectionStateMonitor.record(CONNECTION_CHANGE.KEEP_ALIVE_MISSED);
      }, DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT);
      this.connectionStateMonitor.record(CONNECTION_CHANGE.KEEP_ALIVE);
      return;
    }
    if (type === MESSAGE_TYPES.GQL_ERROR) {
      const subscriptionState = SUBSCRIPTION_STATUS.FAILED;
      if (observer) {
        this.subscriptionObserverMap.set(id, {
          observer,
          query,
          variables,
          startAckTimeoutId,
          subscriptionReadyCallback,
          subscriptionFailedCallback,
          subscriptionState
        });
        logger$1.debug(`${CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload)}`);
        observer.error({
          errors: [
            {
              ...new GraphQLError(`${CONTROL_MSG.CONNECTION_FAILED}: ${JSON.stringify(payload)}`)
            }
          ]
        });
        if (startAckTimeoutId)
          clearTimeout(startAckTimeoutId);
        if (typeof subscriptionFailedCallback === "function") {
          subscriptionFailedCallback();
        }
      }
    }
  }
  _errorDisconnect(msg) {
    logger$1.debug(`Disconnect error: ${msg}`);
    if (this.awsRealTimeSocket) {
      this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
      this.awsRealTimeSocket.close();
    }
    this.socketStatus = SOCKET_STATUS.CLOSED;
  }
  _timeoutStartSubscriptionAck(subscriptionId) {
    const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
    if (subscriptionObserver) {
      const { observer, query, variables } = subscriptionObserver;
      if (!observer) {
        return;
      }
      this.subscriptionObserverMap.set(subscriptionId, {
        observer,
        query,
        variables,
        subscriptionState: SUBSCRIPTION_STATUS.FAILED
      });
      this.connectionStateMonitor.record(CONNECTION_CHANGE.CLOSED);
      logger$1.debug("timeoutStartSubscription", JSON.stringify({ query, variables }));
    }
  }
  _initializeWebSocketConnection({ appSyncGraphqlEndpoint, authenticationType, apiKey, region, additionalCustomHeaders }) {
    if (this.socketStatus === SOCKET_STATUS.READY) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      this.promiseArray.push({ res: resolve, rej: reject });
      if (this.socketStatus === SOCKET_STATUS.CLOSED) {
        try {
          this.socketStatus = SOCKET_STATUS.CONNECTING;
          const payloadString = "{}";
          const authHeader = await this._awsRealTimeHeaderBasedAuth({
            authenticationType,
            payload: payloadString,
            canonicalUri: "/connect",
            apiKey,
            appSyncGraphqlEndpoint,
            region,
            additionalCustomHeaders
          });
          const headerString = authHeader ? JSON.stringify(authHeader) : "";
          const headerQs = base64Encoder.convert(headerString);
          const payloadQs = base64Encoder.convert(payloadString);
          let discoverableEndpoint = appSyncGraphqlEndpoint ?? "";
          if (this.isCustomDomain(discoverableEndpoint)) {
            discoverableEndpoint = discoverableEndpoint.concat(customDomainPath);
          } else {
            discoverableEndpoint = discoverableEndpoint.replace("appsync-api", "appsync-realtime-api").replace("gogi-beta", "grt-beta");
          }
          const protocol = "wss://";
          discoverableEndpoint = discoverableEndpoint.replace("https://", protocol).replace("http://", protocol);
          const awsRealTimeUrl = `${discoverableEndpoint}?header=${headerQs}&payload=${payloadQs}`;
          await this._initializeRetryableHandshake(awsRealTimeUrl);
          this.promiseArray.forEach(({ res }) => {
            logger$1.debug("Notifying connection successful");
            res();
          });
          this.socketStatus = SOCKET_STATUS.READY;
          this.promiseArray = [];
        } catch (err) {
          logger$1.debug("Connection exited with", err);
          this.promiseArray.forEach(({ rej }) => {
            rej(err);
          });
          this.promiseArray = [];
          if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN) {
            this.awsRealTimeSocket.close(3001);
          }
          this.awsRealTimeSocket = void 0;
          this.socketStatus = SOCKET_STATUS.CLOSED;
        }
      }
    });
  }
  async _initializeRetryableHandshake(awsRealTimeUrl) {
    logger$1.debug(`Initializaling retryable Handshake`);
    await jitteredExponentialRetry(this._initializeHandshake.bind(this), [awsRealTimeUrl], MAX_DELAY_MS);
  }
  async _initializeHandshake(awsRealTimeUrl) {
    logger$1.debug(`Initializing handshake ${awsRealTimeUrl}`);
    try {
      await (() => {
        return new Promise((resolve, reject) => {
          const newSocket = this.getNewWebSocket(awsRealTimeUrl, "graphql-ws");
          newSocket.onerror = () => {
            logger$1.debug(`WebSocket connection error`);
          };
          newSocket.onclose = () => {
            reject(new Error("Connection handshake error"));
          };
          newSocket.onopen = () => {
            this.awsRealTimeSocket = newSocket;
            resolve();
          };
        });
      })();
      await (() => {
        return new Promise((resolve, reject) => {
          if (this.awsRealTimeSocket) {
            let ackOk = false;
            this.awsRealTimeSocket.onerror = (error) => {
              logger$1.debug(`WebSocket error ${JSON.stringify(error)}`);
            };
            this.awsRealTimeSocket.onclose = (event) => {
              logger$1.debug(`WebSocket closed ${event.reason}`);
              reject(new Error(JSON.stringify(event)));
            };
            this.awsRealTimeSocket.onmessage = (message) => {
              if (typeof message.data !== "string") {
                return;
              }
              logger$1.debug(`subscription message from AWS AppSyncRealTime: ${message.data} `);
              const data2 = JSON.parse(message.data);
              const { type, payload: { connectionTimeoutMs = DEFAULT_KEEP_ALIVE_TIMEOUT } = {} } = data2;
              if (type === MESSAGE_TYPES.GQL_CONNECTION_ACK) {
                ackOk = true;
                if (this.awsRealTimeSocket) {
                  this.keepAliveTimeout = connectionTimeoutMs;
                  this.awsRealTimeSocket.onmessage = this._handleIncomingSubscriptionMessage.bind(this);
                  this.awsRealTimeSocket.onerror = (err) => {
                    logger$1.debug(err);
                    this._errorDisconnect(CONTROL_MSG.CONNECTION_CLOSED);
                  };
                  this.awsRealTimeSocket.onclose = (event) => {
                    logger$1.debug(`WebSocket closed ${event.reason}`);
                    this._errorDisconnect(CONTROL_MSG.CONNECTION_CLOSED);
                  };
                }
                resolve("Cool, connected to AWS AppSyncRealTime");
                return;
              }
              if (type === MESSAGE_TYPES.GQL_CONNECTION_ERROR) {
                const { payload: { errors: [{ errorType = "", errorCode = 0 } = {}] = [] } = {} } = data2;
                reject({ errorType, errorCode });
              }
            };
            const gqlInit = {
              type: MESSAGE_TYPES.GQL_CONNECTION_INIT
            };
            this.awsRealTimeSocket.send(JSON.stringify(gqlInit));
            const checkAckOk = (targetAckOk) => {
              if (!targetAckOk) {
                this.connectionStateMonitor.record(CONNECTION_CHANGE.CONNECTION_FAILED);
                reject(new Error(`Connection timeout: ack from AWSAppSyncRealTime was not received after ${CONNECTION_INIT_TIMEOUT} ms`));
              }
            };
            setTimeout(() => {
              checkAckOk(ackOk);
            }, CONNECTION_INIT_TIMEOUT);
          }
        });
      })();
    } catch (err) {
      const { errorType, errorCode } = err;
      if (NON_RETRYABLE_CODES.includes(errorCode)) {
        throw new NonRetryableError(errorType);
      } else if (errorType) {
        throw new Error(errorType);
      } else {
        throw err;
      }
    }
  }
  async _awsRealTimeHeaderBasedAuth({ apiKey, authenticationType, payload, canonicalUri, appSyncGraphqlEndpoint, region, additionalCustomHeaders }) {
    const headerHandler = {
      apiKey: this._awsRealTimeApiKeyHeader.bind(this),
      iam: this._awsRealTimeIAMHeader.bind(this),
      oidc: this._awsAuthTokenHeader.bind(this),
      userPool: this._awsAuthTokenHeader.bind(this),
      lambda: this._customAuthHeader,
      none: this._customAuthHeader
    };
    if (!authenticationType || !headerHandler[authenticationType]) {
      logger$1.debug(`Authentication type ${authenticationType} not supported`);
      return void 0;
    } else {
      const handler = headerHandler[authenticationType];
      const host = appSyncGraphqlEndpoint ? new AmplifyUrl(appSyncGraphqlEndpoint).host : void 0;
      logger$1.debug(`Authenticating with ${JSON.stringify(authenticationType)}`);
      let resolvedApiKey;
      if (authenticationType === "apiKey") {
        resolvedApiKey = apiKey;
      }
      const result = await handler({
        payload,
        canonicalUri,
        appSyncGraphqlEndpoint,
        apiKey: resolvedApiKey,
        region,
        host,
        additionalCustomHeaders
      });
      return result;
    }
  }
  async _awsAuthTokenHeader({ host }) {
    var _a, _b;
    const session = await fetchAuthSession();
    return {
      Authorization: (_b = (_a = session == null ? void 0 : session.tokens) == null ? void 0 : _a.accessToken) == null ? void 0 : _b.toString(),
      host
    };
  }
  async _awsRealTimeApiKeyHeader({ apiKey, host }) {
    const dt = /* @__PURE__ */ new Date();
    const dtStr = dt.toISOString().replace(/[:-]|\.\d{3}/g, "");
    return {
      host,
      "x-amz-date": dtStr,
      "x-api-key": apiKey
    };
  }
  async _awsRealTimeIAMHeader({ payload, canonicalUri, appSyncGraphqlEndpoint, region }) {
    const endpointInfo = {
      region,
      service: "appsync"
    };
    const creds = (await fetchAuthSession()).credentials;
    const request = {
      url: `${appSyncGraphqlEndpoint}${canonicalUri}`,
      data: payload,
      method: "POST",
      headers: { ...AWS_APPSYNC_REALTIME_HEADERS }
    };
    const signedParams = signRequest({
      headers: request.headers,
      method: request.method,
      url: new AmplifyUrl(request.url),
      body: request.data
    }, {
      // TODO: What do we need to do to remove these !'s?
      credentials: creds,
      signingRegion: endpointInfo.region,
      signingService: endpointInfo.service
    });
    return signedParams.headers;
  }
  _customAuthHeader({ host, additionalCustomHeaders }) {
    if (!(additionalCustomHeaders == null ? void 0 : additionalCustomHeaders.Authorization)) {
      throw new Error("No auth token specified");
    }
    return {
      Authorization: additionalCustomHeaders.Authorization,
      host
    };
  }
}
class GraphQLApiError extends AmplifyError {
  constructor(params) {
    super(params);
    this.constructor = GraphQLApiError;
    Object.setPrototypeOf(this, GraphQLApiError.prototype);
  }
}
var APIValidationErrorCode;
(function(APIValidationErrorCode2) {
  APIValidationErrorCode2["NoAuthSession"] = "NoAuthSession";
  APIValidationErrorCode2["NoRegion"] = "NoRegion";
  APIValidationErrorCode2["NoCustomEndpoint"] = "NoCustomEndpoint";
})(APIValidationErrorCode || (APIValidationErrorCode = {}));
const validationErrorMap = {
  [APIValidationErrorCode.NoAuthSession]: {
    message: "Auth session should not be empty."
  },
  // TODO: re-enable when working in all test environments:
  // [APIValidationErrorCode.NoEndpoint]: {
  // 	message: 'Missing endpoint',
  // },
  [APIValidationErrorCode.NoRegion]: {
    message: "Missing region."
  },
  [APIValidationErrorCode.NoCustomEndpoint]: {
    message: "Custom endpoint region is present without custom endpoint."
  }
};
function assertValidationError(assertion, name) {
  const { message, recoverySuggestion } = validationErrorMap[name];
  if (!assertion) {
    throw new GraphQLApiError({ name, message, recoverySuggestion });
  }
}
const logger = new ConsoleLogger("GraphQLAPI resolveConfig");
const resolveConfig = (amplify) => {
  var _a, _b;
  const config2 = amplify.getConfig();
  if (!((_a = config2.API) == null ? void 0 : _a.GraphQL)) {
    logger.warn("The API configuration is missing. This is likely due to Amplify.configure() not being called prior to generateClient().");
  }
  const { apiKey, customEndpoint, customEndpointRegion, defaultAuthMode, endpoint, region } = ((_b = config2.API) == null ? void 0 : _b.GraphQL) ?? {};
  assertValidationError(!(!customEndpoint && customEndpointRegion), APIValidationErrorCode.NoCustomEndpoint);
  return {
    apiKey,
    customEndpoint,
    customEndpointRegion,
    defaultAuthMode,
    endpoint,
    region
  };
};
const resolveLibraryOptions = (amplify) => {
  var _a, _b, _c, _d, _e, _f;
  const headers = (_c = (_b = (_a = amplify.libraryOptions) == null ? void 0 : _a.API) == null ? void 0 : _b.GraphQL) == null ? void 0 : _c.headers;
  const withCredentials = (_f = (_e = (_d = amplify.libraryOptions) == null ? void 0 : _d.API) == null ? void 0 : _e.GraphQL) == null ? void 0 : _f.withCredentials;
  return { headers, withCredentials };
};
function repackageUnauthorizedError(content) {
  if (content.errors && Array.isArray(content.errors)) {
    content.errors.forEach((e) => {
      if (isUnauthorizedError(e)) {
        e.message = "Unauthorized";
        e.recoverySuggestion = `If you're calling an Amplify-generated API, make sure to set the "authMode" in generateClient({ authMode: '...' }) to the backend authorization rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')`;
      }
    });
  }
  return content;
}
function isUnauthorizedError(error) {
  var _a, _b, _c, _d;
  if ((_b = (_a = error == null ? void 0 : error.originalError) == null ? void 0 : _a.name) == null ? void 0 : _b.startsWith("UnauthorizedException")) {
    return true;
  }
  if (((_c = error.message) == null ? void 0 : _c.startsWith("Connection failed:")) && ((_d = error.message) == null ? void 0 : _d.includes("Permission denied"))) {
    return true;
  }
  return false;
}
var GraphQLAuthError;
(function(GraphQLAuthError2) {
  GraphQLAuthError2["NO_API_KEY"] = "No api-key configured";
  GraphQLAuthError2["NO_CURRENT_USER"] = "No current user";
  GraphQLAuthError2["NO_CREDENTIALS"] = "No credentials";
  GraphQLAuthError2["NO_FEDERATED_JWT"] = "No federated jwt";
  GraphQLAuthError2["NO_AUTH_TOKEN"] = "No auth token specified";
})(GraphQLAuthError || (GraphQLAuthError = {}));
const __amplify = Symbol("amplify");
const __authMode = Symbol("authMode");
const __authToken = Symbol("authToken");
const __headers = Symbol("headers");
function getInternals(client2) {
  const c = client2;
  return {
    amplify: c[__amplify],
    authMode: c[__authMode],
    authToken: c[__authToken],
    headers: c[__headers]
  };
}
const NO_API_KEY = {
  name: "NoApiKey",
  // ideal: No API key configured.
  message: GraphQLAuthError.NO_API_KEY,
  recoverySuggestion: 'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.'
};
const NO_VALID_CREDENTIALS = {
  name: "NoCredentials",
  // ideal: No auth credentials available.
  message: GraphQLAuthError.NO_CREDENTIALS,
  recoverySuggestion: `The API request was made with \`authMode: "iam"\` but no authentication credentials are available.

If you intended to make a request using an authenticated role, review if your user is signed in before making the request.

If you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the \`Amplify.configure()\` function.`
};
const NO_VALID_AUTH_TOKEN = {
  name: "NoValidAuthTokens",
  // ideal: No valid JWT auth token provided to make the API request..
  message: GraphQLAuthError.NO_FEDERATED_JWT,
  recoverySuggestion: "If you intended to make an authenticated API request, review if the current user is signed in."
};
const NO_SIGNED_IN_USER = {
  name: "NoSignedUser",
  // ideal: Couldn't retrieve authentication credentials to make the API request.
  message: GraphQLAuthError.NO_CURRENT_USER,
  recoverySuggestion: "Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in."
};
const NO_AUTH_TOKEN_HEADER = {
  name: "NoAuthorizationHeader",
  // ideal: Authorization header not specified.
  message: GraphQLAuthError.NO_AUTH_TOKEN,
  recoverySuggestion: 'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.'
};
const NO_ENDPOINT = {
  name: "NoEndpoint",
  message: "No GraphQL endpoint configured in `Amplify.configure()`.",
  recoverySuggestion: "Review if the GraphQL API endpoint is set in the `Amplify.configure()` function."
};
const createGraphQLResultWithError = (error) => {
  return {
    data: {},
    errors: [new GraphQLError(error.message, null, null, null, null, error)]
  };
};
function isGraphQLResponseWithErrors(response) {
  if (!response) {
    return false;
  }
  const r = response;
  return Array.isArray(r.errors) && r.errors.length > 0;
}
const USER_AGENT_HEADER = "x-amz-user-agent";
const isAmplifyInstance = (amplify) => {
  return typeof amplify !== "function";
};
class InternalGraphQLAPIClass {
  constructor() {
    this.appSyncRealTime = new AWSAppSyncRealTimeProvider();
    this._api = {
      post,
      cancelREST: cancel$1,
      isCancelErrorREST: isCancelError$1,
      updateRequestToBeCancellable
    };
  }
  getModuleName() {
    return "InternalGraphQLAPI";
  }
  async _headerBasedAuth(amplify, authMode, additionalHeaders = {}) {
    var _a;
    const { apiKey } = resolveConfig(amplify);
    let headers = {};
    switch (authMode) {
      case "apiKey":
        if (!apiKey) {
          throw new GraphQLApiError(NO_API_KEY);
        }
        headers = {
          "X-Api-Key": apiKey
        };
        break;
      case "iam": {
        const session = await amplify.Auth.fetchAuthSession();
        if (session.credentials === void 0) {
          throw new GraphQLApiError(NO_VALID_CREDENTIALS);
        }
        break;
      }
      case "oidc":
      case "userPool": {
        let token;
        try {
          token = (_a = (await amplify.Auth.fetchAuthSession()).tokens) == null ? void 0 : _a.accessToken.toString();
        } catch (e) {
          throw new GraphQLApiError({
            ...NO_SIGNED_IN_USER,
            underlyingError: e
          });
        }
        if (!token) {
          throw new GraphQLApiError(NO_VALID_AUTH_TOKEN);
        }
        headers = {
          Authorization: token
        };
        break;
      }
      case "lambda":
        if (typeof additionalHeaders === "object" && !additionalHeaders.Authorization) {
          throw new GraphQLApiError(NO_AUTH_TOKEN_HEADER);
        }
        headers = {
          Authorization: additionalHeaders.Authorization
        };
        break;
    }
    return headers;
  }
  /**
   * to get the operation type
   * @param operation
   */
  getGraphqlOperationType(operation) {
    const doc = parse(operation);
    const definitions = doc.definitions;
    const [{ operation: operationType }] = definitions;
    return operationType;
  }
  /**
   * Executes a GraphQL operation
   *
   * @param options - GraphQL Options
   * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
   * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
   */
  graphql(amplify, { query: paramQuery, variables = {}, authMode, authToken }, additionalHeaders, customUserAgentDetails) {
    const query = typeof paramQuery === "string" ? parse(paramQuery) : parse(print(paramQuery));
    const [operationDef = {}] = query.definitions.filter((def) => def.kind === "OperationDefinition");
    const { operation: operationType } = operationDef;
    const headers = additionalHeaders || {};
    switch (operationType) {
      case "query":
      case "mutation": {
        const abortController = new AbortController();
        let responsePromise;
        if (isAmplifyInstance(amplify)) {
          responsePromise = this._graphql(amplify, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
        } else {
          const wrapper = async (amplifyInstance) => {
            const result = await this._graphql(amplifyInstance, { query, variables, authMode }, headers, abortController, customUserAgentDetails, authToken);
            return result;
          };
          responsePromise = amplify(wrapper);
        }
        this._api.updateRequestToBeCancellable(responsePromise, abortController);
        return responsePromise;
      }
      case "subscription":
        return this._graphqlSubscribe(amplify, { query, variables, authMode }, headers, customUserAgentDetails, authToken);
      default:
        throw new Error(`invalid operation type: ${operationType}`);
    }
  }
  async _graphql(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, abortController, customUserAgentDetails, authToken) {
    const { region, endpoint: appSyncGraphqlEndpoint, customEndpoint, customEndpointRegion, defaultAuthMode } = resolveConfig(amplify);
    const initialAuthMode = explicitAuthMode || defaultAuthMode || "iam";
    const authMode = initialAuthMode === "identityPool" ? "iam" : initialAuthMode;
    const { headers: customHeaders, withCredentials } = resolveLibraryOptions(amplify);
    let additionalCustomHeaders;
    if (typeof additionalHeaders === "function") {
      const requestOptions = {
        method: "POST",
        url: new AmplifyUrl(customEndpoint || appSyncGraphqlEndpoint || "").toString(),
        queryString: print(query)
      };
      additionalCustomHeaders = await additionalHeaders(requestOptions);
    } else {
      additionalCustomHeaders = additionalHeaders;
    }
    if (authToken) {
      additionalCustomHeaders = {
        ...additionalCustomHeaders,
        Authorization: authToken
      };
    }
    const headers = {
      ...!customEndpoint && await this._headerBasedAuth(amplify, authMode, additionalCustomHeaders),
      /**
       * Custom endpoint headers.
       * If there is both a custom endpoint and custom region present, we get the headers.
       * If there is a custom endpoint but no region, we return an empty object.
       * If neither are present, we return an empty object.
       */
      ...customEndpoint && (customEndpointRegion ? await this._headerBasedAuth(amplify, authMode, additionalCustomHeaders) : {}) || {},
      // Custom headers included in Amplify configuration options:
      ...customHeaders && await customHeaders({
        query: print(query),
        variables
      }),
      // Custom headers from individual requests or API client configuration:
      ...additionalCustomHeaders,
      // User agent headers:
      ...!customEndpoint && {
        [USER_AGENT_HEADER]: getAmplifyUserAgent(customUserAgentDetails)
      }
    };
    const body = {
      query: print(query),
      variables: variables || null
    };
    let signingServiceInfo;
    if (customEndpoint && !customEndpointRegion || authMode !== "oidc" && authMode !== "userPool" && authMode !== "iam" && authMode !== "lambda") {
      signingServiceInfo = void 0;
    } else {
      signingServiceInfo = {
        service: !customEndpointRegion ? "appsync" : "execute-api",
        region: !customEndpointRegion ? region : customEndpointRegion
      };
    }
    const endpoint = customEndpoint || appSyncGraphqlEndpoint;
    if (!endpoint) {
      throw createGraphQLResultWithError(new GraphQLApiError(NO_ENDPOINT));
    }
    let response;
    try {
      const { body: responseBody } = await this._api.post(amplify, {
        url: new AmplifyUrl(endpoint),
        options: {
          headers,
          body,
          signingServiceInfo,
          withCredentials
        },
        abortController
      });
      response = await responseBody.json();
    } catch (error) {
      if (this.isCancelError(error)) {
        throw error;
      }
      response = createGraphQLResultWithError(error);
    }
    if (isGraphQLResponseWithErrors(response)) {
      throw repackageUnauthorizedError(response);
    }
    return response;
  }
  /**
   * Checks to see if an error thrown is from an api request cancellation
   * @param {any} error - Any error
   * @return {boolean} - A boolean indicating if the error was from an api request cancellation
   */
  isCancelError(error) {
    return this._api.isCancelErrorREST(error);
  }
  /**
   * Cancels an inflight request. Only applicable for graphql queries and mutations
   * @param {any} request - request to cancel
   * @returns - A boolean indicating if the request was cancelled
   */
  cancel(request, message) {
    return this._api.cancelREST(request, message);
  }
  _graphqlSubscribe(amplify, { query, variables, authMode: explicitAuthMode }, additionalHeaders = {}, customUserAgentDetails, authToken) {
    const config2 = resolveConfig(amplify);
    const initialAuthMode = explicitAuthMode || (config2 == null ? void 0 : config2.defaultAuthMode) || "iam";
    const authMode = initialAuthMode === "identityPool" ? "iam" : initialAuthMode;
    const { headers: libraryConfigHeaders } = resolveLibraryOptions(amplify);
    return this.appSyncRealTime.subscribe({
      query: print(query),
      variables,
      appSyncGraphqlEndpoint: config2 == null ? void 0 : config2.endpoint,
      region: config2 == null ? void 0 : config2.region,
      authenticationType: authMode,
      apiKey: config2 == null ? void 0 : config2.apiKey,
      additionalHeaders,
      authToken,
      libraryConfigHeaders
    }, customUserAgentDetails).pipe(catchError((e) => {
      if (e.errors) {
        throw repackageUnauthorizedError(e);
      }
      throw e;
    }));
  }
}
new InternalGraphQLAPIClass();
class GraphQLAPIClass extends InternalGraphQLAPIClass {
  getModuleName() {
    return "GraphQLAPI";
  }
  /**
   * Executes a GraphQL operation
   *
   * @param options - GraphQL Options
   * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
   * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
   */
  graphql(amplify, options, additionalHeaders) {
    return super.graphql(amplify, options, additionalHeaders, {
      category: Category.API,
      action: ApiAction.GraphQl
    });
  }
  /**
   * Checks to see if an error thrown is from an api request cancellation
   * @param error - Any error
   * @returns A boolean indicating if the error was from an api request cancellation
   */
  isCancelError(error) {
    return super.isCancelError(error);
  }
  /**
   * Cancels an inflight request. Only applicable for graphql queries and mutations
   * @param {any} request - request to cancel
   * @returns A boolean indicating if the request was cancelled
   */
  cancel(request, message) {
    return super.cancel(request, message);
  }
}
const GraphQLAPI = new GraphQLAPIClass();
function graphql(options, additionalHeaders) {
  const internals = getInternals(this);
  options.authMode = options.authMode || internals.authMode;
  options.authToken = options.authToken || internals.authToken;
  const result = GraphQLAPI.graphql(
    // TODO: move V6Client back into this package?
    internals.amplify,
    options,
    additionalHeaders
  );
  return result;
}
function cancel(promise, message) {
  return GraphQLAPI.cancel(promise, message);
}
function isCancelError(error) {
  return GraphQLAPI.isCancelError(error);
}
function resolveOwnerFields(model) {
  const ownerFields = /* @__PURE__ */ new Set();
  for (const attr of model.attributes || []) {
    if (isAuthAttribute(attr)) {
      for (const rule of attr.properties.rules) {
        if (rule.allow === "owner") {
          ownerFields.add(rule.ownerField || "owner");
        } else if (rule.allow === "groups" && rule.groupsField !== void 0) {
          ownerFields.add(rule.groupsField);
        }
      }
    }
  }
  return Array.from(ownerFields);
}
function isAuthAttribute(attribute) {
  var _a, _b;
  if ((attribute == null ? void 0 : attribute.type) === "auth") {
    if (typeof (attribute == null ? void 0 : attribute.properties) === "object") {
      if (Array.isArray((_a = attribute == null ? void 0 : attribute.properties) == null ? void 0 : _a.rules)) {
        return ((_b = attribute == null ? void 0 : attribute.properties) == null ? void 0 : _b.rules).every((rule) => !!rule.allow);
      }
    }
  }
  return false;
}
function capitalize(s) {
  return `${s[0].toUpperCase()}${s.slice(1)}`;
}
const connectionType = {
  HAS_ONE: "HAS_ONE",
  HAS_MANY: "HAS_MANY",
  BELONGS_TO: "BELONGS_TO"
};
const skGraphQlFieldTypeMap = {
  ID: "ID",
  String: "String",
  AWSDate: "String",
  AWSTime: "String",
  AWSDateTime: "String",
  AWSTimestamp: "Int",
  AWSEmail: "String",
  AWSPhone: "String",
  AWSURL: "String",
  AWSIPAddress: "String",
  AWSJSON: "String",
  Boolean: "Boolean",
  Int: "Int",
  Float: "Float"
};
const resolvedSkName = (sk) => {
  if (sk.length === 1) {
    return sk[0];
  } else {
    return sk.reduce((acc, curr, idx) => {
      if (idx === 0) {
        return curr;
      } else {
        return acc + capitalize(curr);
      }
    }, "");
  }
};
const flattenItems = (modelIntrospection, modelName, modelRecord) => {
  var _a;
  if (!modelRecord)
    return null;
  const mapped = {};
  for (const [fieldName, value] of Object.entries(modelRecord)) {
    const fieldDef = modelName ? (_a = modelIntrospection.models[modelName]) == null ? void 0 : _a.fields[fieldName] : void 0;
    const dvPair = { fieldDef, value };
    if (isRelatedModelItemsArrayPair(dvPair)) {
      mapped[fieldName] = dvPair.value.items.map((itemValue) => flattenItems(modelIntrospection, dvPair.fieldDef.type.model, itemValue));
    } else if (isRelatedModelProperty(fieldDef)) {
      mapped[fieldName] = flattenItems(modelIntrospection, fieldDef.type.model, value);
    } else {
      mapped[fieldName] = value;
    }
  }
  return mapped;
};
function isRelatedModelItemsArrayPair(dv) {
  var _a, _b;
  return typeof ((_a = dv.fieldDef) == null ? void 0 : _a.type) === "object" && "model" in dv.fieldDef.type && typeof dv.fieldDef.type.model === "string" && dv.fieldDef.isArray && Array.isArray((_b = dv.value) == null ? void 0 : _b.items);
}
function isRelatedModelProperty(fieldDef) {
  return typeof (fieldDef == null ? void 0 : fieldDef.type) === "object" && "model" in fieldDef.type && typeof fieldDef.type.model === "string";
}
function initializeModel(client2, modelName, result, modelIntrospection, authMode, authToken, context = false) {
  const introModel = modelIntrospection.models[modelName];
  const introModelFields = introModel.fields;
  const modelFields = Object.entries(introModelFields).filter(([_, field]) => {
    var _a;
    return ((_a = field == null ? void 0 : field.type) == null ? void 0 : _a.model) !== void 0;
  }).map(([fieldName]) => fieldName);
  return result.map((record) => {
    var _a, _b;
    const initializedRelationalFields = {};
    for (const fieldName of modelFields) {
      const modelField = introModelFields[fieldName];
      const modelFieldType = modelField == null ? void 0 : modelField.type;
      const relatedModelName = modelFieldType.model;
      const relatedModel = modelIntrospection.models[relatedModelName];
      const relatedModelPKFieldName = relatedModel.primaryKeyInfo.primaryKeyFieldName;
      const relatedModelSKFieldNames = relatedModel.primaryKeyInfo.sortKeyFieldNames;
      const relationType = (_a = modelField.association) == null ? void 0 : _a.connectionType;
      let connectionFields = [];
      if (modelField.association && "associatedWith" in modelField.association) {
        connectionFields = modelField.association.associatedWith;
      }
      const targetNames = [];
      if (modelField.association && "targetNames" in modelField.association) {
        targetNames.push(...modelField.association.targetNames);
      }
      switch (relationType) {
        case connectionType.BELONGS_TO: {
          const sortKeyValues = relatedModelSKFieldNames.reduce(
            // TODO(Eslint): is this implementation correct?
            // eslint-disable-next-line array-callback-return
            (acc, curVal) => {
              if (record[curVal]) {
                return acc[curVal] = record[curVal];
              }
            },
            {}
          );
          if (context) {
            initializedRelationalFields[fieldName] = (contextSpec, options) => {
              if (record[targetNames[0]]) {
                return client2.models[relatedModelName].get(contextSpec, {
                  [relatedModelPKFieldName]: record[targetNames[0]],
                  ...sortKeyValues
                }, {
                  authMode: (options == null ? void 0 : options.authMode) || authMode,
                  authToken: (options == null ? void 0 : options.authToken) || authToken
                });
              }
              return { data: null };
            };
          } else {
            initializedRelationalFields[fieldName] = (options) => {
              if (record[targetNames[0]]) {
                return client2.models[relatedModelName].get({
                  [relatedModelPKFieldName]: record[targetNames[0]],
                  ...sortKeyValues
                }, {
                  authMode: (options == null ? void 0 : options.authMode) || authMode,
                  authToken: (options == null ? void 0 : options.authToken) || authToken
                });
              }
              return { data: null };
            };
          }
          break;
        }
        case connectionType.HAS_ONE:
        case connectionType.HAS_MANY: {
          const mapResult = relationType === connectionType.HAS_ONE ? (result2) => {
            return {
              data: (result2 == null ? void 0 : result2.data.shift()) || null,
              errors: result2.errors,
              extensions: result2.extensions
            };
          } : (result2) => result2;
          const parentPk = introModel.primaryKeyInfo.primaryKeyFieldName;
          const parentSK = introModel.primaryKeyInfo.sortKeyFieldNames;
          const relatedModelField = relatedModel.fields[connectionFields[0]];
          const relatedModelFieldType = relatedModelField.type;
          if (relatedModelFieldType.model) {
            let relatedTargetNames = [];
            if (relatedModelField.association && "targetNames" in relatedModelField.association) {
              relatedTargetNames = (_b = relatedModelField.association) == null ? void 0 : _b.targetNames;
            }
            const hasManyFilter2 = relatedTargetNames.map((field, idx) => {
              if (idx === 0) {
                return { [field]: { eq: record[parentPk] } };
              }
              return { [field]: { eq: record[parentSK[idx - 1]] } };
            });
            if (context) {
              initializedRelationalFields[fieldName] = (contextSpec, options) => {
                if (record[parentPk]) {
                  return client2.models[relatedModelName].list(contextSpec, {
                    filter: { and: hasManyFilter2 },
                    limit: options == null ? void 0 : options.limit,
                    nextToken: options == null ? void 0 : options.nextToken,
                    authMode: (options == null ? void 0 : options.authMode) || authMode,
                    authToken: (options == null ? void 0 : options.authToken) || authToken
                  }).then(mapResult);
                }
                return [];
              };
            } else {
              initializedRelationalFields[fieldName] = (options) => {
                if (record[parentPk]) {
                  return client2.models[relatedModelName].list({
                    filter: { and: hasManyFilter2 },
                    limit: options == null ? void 0 : options.limit,
                    nextToken: options == null ? void 0 : options.nextToken,
                    authMode: (options == null ? void 0 : options.authMode) || authMode,
                    authToken: (options == null ? void 0 : options.authToken) || authToken
                  }).then(mapResult);
                }
                return [];
              };
            }
            break;
          }
          const hasManyFilter = connectionFields.map((field, idx) => {
            if (idx === 0) {
              return { [field]: { eq: record[parentPk] } };
            }
            return { [field]: { eq: record[parentSK[idx - 1]] } };
          });
          if (context) {
            initializedRelationalFields[fieldName] = (contextSpec, options) => {
              if (record[parentPk]) {
                return client2.models[relatedModelName].list(contextSpec, {
                  filter: { and: hasManyFilter },
                  limit: options == null ? void 0 : options.limit,
                  nextToken: options == null ? void 0 : options.nextToken,
                  authMode: (options == null ? void 0 : options.authMode) || authMode,
                  authToken: (options == null ? void 0 : options.authToken) || authToken
                }).then(mapResult);
              }
              return [];
            };
          } else {
            initializedRelationalFields[fieldName] = (options) => {
              if (record[parentPk]) {
                return client2.models[relatedModelName].list({
                  filter: { and: hasManyFilter },
                  limit: options == null ? void 0 : options.limit,
                  nextToken: options == null ? void 0 : options.nextToken,
                  authMode: (options == null ? void 0 : options.authMode) || authMode,
                  authToken: (options == null ? void 0 : options.authToken) || authToken
                }).then(mapResult);
              }
              return [];
            };
          }
          break;
        }
      }
    }
    return { ...record, ...initializedRelationalFields };
  });
}
const graphQLOperationsInfo = {
  CREATE: { operationPrefix: "create", usePlural: false },
  READ: { operationPrefix: "get", usePlural: false },
  UPDATE: { operationPrefix: "update", usePlural: false },
  DELETE: { operationPrefix: "delete", usePlural: false },
  LIST: { operationPrefix: "list", usePlural: true },
  INDEX_QUERY: { operationPrefix: "", usePlural: false },
  ONCREATE: { operationPrefix: "onCreate", usePlural: false },
  ONUPDATE: { operationPrefix: "onUpdate", usePlural: false },
  ONDELETE: { operationPrefix: "onDelete", usePlural: false },
  OBSERVE_QUERY: { operationPrefix: "observeQuery", usePlural: false }
};
const SELECTION_SET_WILDCARD = "*";
const getDefaultSelectionSetForNonModelWithIR = (nonModelDefinition, modelIntrospection) => {
  const { fields } = nonModelDefinition;
  const mappedFields = Object.values(fields).map(({ type, name }) => {
    if (typeof type.enum === "string") {
      return [name, FIELD_IR];
    }
    if (typeof type.nonModel === "string") {
      return [
        name,
        getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
      ];
    }
    if (typeof type === "string") {
      return [name, FIELD_IR];
    }
    return void 0;
  }).filter((pair) => pair !== void 0);
  return Object.fromEntries(mappedFields);
};
const getDefaultSelectionSetForModelWithIR = (modelDefinition, modelIntrospection) => {
  const { fields } = modelDefinition;
  const mappedFields = Object.values(fields).map(({ type, name }) => {
    if (typeof type.enum === "string" || typeof type === "string") {
      return [name, FIELD_IR];
    }
    if (typeof type.nonModel === "string") {
      return [
        name,
        getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
      ];
    }
    return void 0;
  }).filter((pair) => pair !== void 0);
  const ownerFields = resolveOwnerFields(modelDefinition).map((field) => [
    field,
    FIELD_IR
  ]);
  return Object.fromEntries(mappedFields.concat(ownerFields));
};
function defaultSelectionSetForModel(modelDefinition) {
  const { fields } = modelDefinition;
  const explicitFields = Object.values(fields).map(({ type, name }) => {
    if (typeof type === "string")
      return name;
    if (typeof type === "object") {
      if (typeof (type == null ? void 0 : type.enum) === "string") {
        return name;
      } else if (typeof (type == null ? void 0 : type.nonModel) === "string") {
        return `${name}.${SELECTION_SET_WILDCARD}`;
      }
    }
    return void 0;
  }).filter(Boolean);
  const ownerFields = resolveOwnerFields(modelDefinition);
  return Array.from(new Set(explicitFields.concat(ownerFields)));
}
const FIELD_IR = "";
function customSelectionSetToIR(modelIntrospection, modelName, selectionSet) {
  const dotNotationToObject = (path2, modelOrNonModelName) => {
    var _a, _b, _c, _d, _e, _f;
    const [fieldName, ...rest] = path2.split(".");
    const nested = rest[0];
    const modelOrNonModelDefinition = modelIntrospection.models[modelOrNonModelName] ?? modelIntrospection.nonModels[modelOrNonModelName];
    const modelOrNonModelFields = modelOrNonModelDefinition == null ? void 0 : modelOrNonModelDefinition.fields;
    const relatedModel = (_b = (_a = modelOrNonModelFields == null ? void 0 : modelOrNonModelFields[fieldName]) == null ? void 0 : _a.type) == null ? void 0 : _b.model;
    const relatedModelDefinition = modelIntrospection.models[relatedModel];
    const relatedNonModel = (_d = (_c = modelOrNonModelFields == null ? void 0 : modelOrNonModelFields[fieldName]) == null ? void 0 : _c.type) == null ? void 0 : _d.nonModel;
    const relatedNonModelDefinition = modelIntrospection.nonModels[relatedNonModel];
    const isModelOrNonModelOrFieldType = relatedModelDefinition ? "model" : relatedNonModelDefinition ? "nonModel" : "field";
    if (isModelOrNonModelOrFieldType === "nonModel") {
      let result = {};
      if (!nested) {
        throw Error(`${fieldName} must declare a wildcard (*) or a field of custom type ${relatedNonModel}`);
      }
      if (nested === SELECTION_SET_WILDCARD) {
        result = {
          [fieldName]: getDefaultSelectionSetForNonModelWithIR(relatedNonModelDefinition, modelIntrospection)
        };
      } else {
        result = {
          [fieldName]: dotNotationToObject(rest.join("."), relatedNonModel)
        };
      }
      return result;
    } else if (isModelOrNonModelOrFieldType === "model") {
      let result = {};
      if (!nested) {
        throw Error(`${fieldName} must declare a wildcard (*) or a field of model ${relatedModel}`);
      }
      if (nested === SELECTION_SET_WILDCARD) {
        const nestedRelatedModelDefinition = modelIntrospection.models[relatedModel];
        result = {
          [fieldName]: getDefaultSelectionSetForModelWithIR(nestedRelatedModelDefinition, modelIntrospection)
        };
      } else {
        result = {
          [fieldName]: dotNotationToObject(rest.join("."), relatedModel)
        };
      }
      if ((_e = modelOrNonModelFields[fieldName]) == null ? void 0 : _e.isArray) {
        result = {
          [fieldName]: {
            items: result[fieldName]
          }
        };
      }
      return result;
    } else {
      const modelField = modelOrNonModelFields == null ? void 0 : modelOrNonModelFields[fieldName];
      const nonModelDefinition = modelIntrospection.nonModels[modelOrNonModelName];
      const nonModelField = (_f = nonModelDefinition == null ? void 0 : nonModelDefinition.fields) == null ? void 0 : _f[fieldName];
      if (!nonModelDefinition) {
        const isOwnerField = resolveOwnerFields(modelOrNonModelDefinition).includes(fieldName);
        if (!modelField && !isOwnerField) {
          throw Error(`${fieldName} is not a field of model ${modelOrNonModelName}`);
        }
      } else {
        if (!nonModelField) {
          throw Error(`${fieldName} is not a field of custom type ${modelOrNonModelName}`);
        }
      }
      return { [fieldName]: FIELD_IR };
    }
  };
  return selectionSet.reduce((resultObj, path2) => deepMergeSelectionSetObjects(dotNotationToObject(path2, modelName), resultObj), {});
}
function selectionSetIRToString(obj) {
  const res = [];
  Object.entries(obj).forEach(([fieldName, value]) => {
    if (value === FIELD_IR) {
      res.push(fieldName);
    } else if (typeof value === "object" && value !== null) {
      if (value == null ? void 0 : value.items) {
        res.push(fieldName, "{", "items", "{", selectionSetIRToString(value.items), "}", "}");
      } else {
        res.push(fieldName, "{", selectionSetIRToString(value), "}");
      }
    }
  });
  return res.join(" ");
}
function deepMergeSelectionSetObjects(source, target) {
  const isObject = (obj) => obj && typeof obj === "object";
  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key))
      continue;
    if (Object.prototype.hasOwnProperty.call(target, key) && isObject(target[key])) {
      deepMergeSelectionSetObjects(source[key], target[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
function generateSelectionSet(modelIntrospection, modelName, selectionSet) {
  const modelDefinition = modelIntrospection.models[modelName];
  const selSetIr = customSelectionSetToIR(modelIntrospection, modelName, selectionSet ?? defaultSelectionSetForModel(modelDefinition));
  const selSetString = selectionSetIRToString(selSetIr);
  return selSetString;
}
function generateGraphQLDocument(modelIntrospection, modelName, modelOperation, listArgs, indexMeta) {
  var _a, _b;
  const modelDefinition = modelIntrospection.models[modelName];
  const { name, pluralName, fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames }, attributes } = modelDefinition;
  const namePascalCase = name.charAt(0).toUpperCase() + name.slice(1);
  const pluralNamePascalCase = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);
  const { operationPrefix, usePlural } = graphQLOperationsInfo[modelOperation];
  const { selectionSet } = listArgs || {};
  let graphQLFieldName;
  let indexQueryArgs;
  if (operationPrefix) {
    graphQLFieldName = `${operationPrefix}${usePlural ? pluralNamePascalCase : namePascalCase}`;
  } else if (indexMeta) {
    const { queryField, pk, sk = [] } = indexMeta;
    graphQLFieldName = queryField;
    let skQueryArgs = {};
    if (sk.length === 1) {
      const [skField] = sk;
      const type = typeof fields[skField].type === "string" ? fields[skField].type : "String";
      const normalizedType = skGraphQlFieldTypeMap[type];
      skQueryArgs = {
        [skField]: `Model${normalizedType}KeyConditionInput`
      };
    } else if (sk.length > 1) {
      const compositeSkArgName = resolvedSkName(sk);
      const keyName = (_b = (_a = attributes == null ? void 0 : attributes.find((attr) => {
        var _a2;
        return ((_a2 = attr == null ? void 0 : attr.properties) == null ? void 0 : _a2.queryField) === queryField;
      })) == null ? void 0 : _a.properties) == null ? void 0 : _b.name;
      skQueryArgs = {
        [compositeSkArgName]: `Model${capitalize(modelName)}${capitalize(keyName)}CompositeKeyConditionInput`
      };
    }
    indexQueryArgs = {
      [pk]: `${Object.prototype.hasOwnProperty.call(fields[pk].type, "enum") ? fields[pk].type.enum : fields[pk].type}!`,
      ...skQueryArgs
    };
  } else {
    throw new Error("Error generating GraphQL Document - invalid operation name");
  }
  let graphQLOperationType;
  let graphQLSelectionSet;
  let graphQLArguments;
  const selectionSetFields = generateSelectionSet(modelIntrospection, modelName, selectionSet);
  const getPkArgs = {
    [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}!`
  };
  const listPkArgs = {};
  const generateSkArgs = (op) => {
    if (sortKeyFieldNames.length === 0)
      return {};
    if (op === "get") {
      return sortKeyFieldNames.reduce((acc, fieldName) => {
        const fieldType = fields[fieldName].type;
        if (op === "get") {
          acc[fieldName] = `${fieldType}!`;
        }
        return acc;
      }, {});
    } else {
      if (sortKeyFieldNames.length === 1) {
        const [sk] = sortKeyFieldNames;
        const type = typeof fields[sk].type === "string" ? fields[sk].type : "String";
        const normalizedType = skGraphQlFieldTypeMap[type];
        return {
          [sk]: `Model${normalizedType}KeyConditionInput`
        };
      } else {
        const compositeSkArgName = resolvedSkName(sortKeyFieldNames);
        return {
          [compositeSkArgName]: `Model${capitalize(modelName)}PrimaryCompositeKeyConditionInput`
        };
      }
    }
  };
  if (isCustomPrimaryKey) {
    Object.assign(getPkArgs, generateSkArgs("get"));
    Object.assign(listPkArgs, {
      // PK is only included in list query field args in the generated GQL
      // when explicitly specifying PK with .identifier(['fieldName']) or @primaryKey in the schema definition
      [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}`,
      // PK is always a nullable arg for list (no `!` after the type)
      sortDirection: "ModelSortDirection"
    }, generateSkArgs("list"));
  }
  switch (modelOperation) {
    case "CREATE":
    case "UPDATE":
    case "DELETE":
      graphQLArguments ?? (graphQLArguments = {
        input: `${operationPrefix.charAt(0).toLocaleUpperCase() + operationPrefix.slice(1)}${namePascalCase}Input!`
      });
      graphQLOperationType ?? (graphQLOperationType = "mutation");
    case "READ":
      graphQLArguments ?? (graphQLArguments = getPkArgs);
      graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
    case "LIST":
      graphQLArguments ?? (graphQLArguments = {
        ...listPkArgs,
        // eslint doesn't like the ts-ignore, because it thinks it's unnecessary.
        // But TS doesn't like the `filter: ...` because it think it will always be
        // overwritten. (it won't be.) so, we need to ignore the TS error and then
        // ignore the eslint error on the ts-ignore.
        // eslint-disable-next-line
        // @ts-ignore
        filter: `Model${namePascalCase}FilterInput`,
        limit: "Int",
        nextToken: "String"
      });
      graphQLOperationType ?? (graphQLOperationType = "query");
      graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
    case "INDEX_QUERY":
      graphQLArguments ?? (graphQLArguments = {
        ...indexQueryArgs,
        filter: `Model${namePascalCase}FilterInput`,
        sortDirection: "ModelSortDirection",
        limit: "Int",
        nextToken: "String"
      });
      graphQLOperationType ?? (graphQLOperationType = "query");
      graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
    case "ONCREATE":
    case "ONUPDATE":
    case "ONDELETE":
      graphQLArguments ?? (graphQLArguments = {
        filter: `ModelSubscription${namePascalCase}FilterInput`
      });
      graphQLOperationType ?? (graphQLOperationType = "subscription");
      graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
      break;
    case "OBSERVE_QUERY":
    default:
      throw new Error("Internal error: Attempted to generate graphql document for observeQuery. Please report this error.");
  }
  const graphQLDocument = `${graphQLOperationType}${graphQLArguments ? `(${Object.entries(graphQLArguments).map(([fieldName, type]) => `$${fieldName}: ${type}`)})` : ""} { ${graphQLFieldName}${graphQLArguments ? `(${Object.keys(graphQLArguments).map((fieldName) => `${fieldName}: $${fieldName}`)})` : ""} { ${graphQLSelectionSet} } }`;
  return graphQLDocument;
}
function buildGraphQLVariables(modelDefinition, operation, arg, modelIntrospection, indexMeta) {
  const { fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames } } = modelDefinition;
  const skName = (sortKeyFieldNames == null ? void 0 : sortKeyFieldNames.length) && resolvedSkName(sortKeyFieldNames);
  let variables = {};
  switch (operation) {
    case "CREATE":
      variables = {
        input: arg ? normalizeMutationInput(arg, modelDefinition, modelIntrospection) : {}
      };
      break;
    case "UPDATE":
      variables = {
        input: arg ? Object.fromEntries(Object.entries(normalizeMutationInput(arg, modelDefinition, modelIntrospection)).filter(([fieldName]) => {
          const { isReadOnly } = fields[fieldName];
          return !isReadOnly;
        })) : {}
      };
      break;
    case "READ":
    case "DELETE":
      if (arg) {
        variables = isCustomPrimaryKey ? [primaryKeyFieldName, ...sortKeyFieldNames].reduce((acc, fieldName) => {
          acc[fieldName] = arg[fieldName];
          return acc;
        }, {}) : { [primaryKeyFieldName]: arg[primaryKeyFieldName] };
      }
      if (operation === "DELETE") {
        variables = { input: variables };
      }
      break;
    case "LIST":
      if (arg == null ? void 0 : arg.filter) {
        variables.filter = arg.filter;
      }
      if (arg == null ? void 0 : arg.sortDirection) {
        variables.sortDirection = arg.sortDirection;
      }
      if (arg && arg[primaryKeyFieldName]) {
        variables[primaryKeyFieldName] = arg[primaryKeyFieldName];
      }
      if (skName && arg && arg[skName]) {
        variables[skName] = arg[skName];
      }
      if (arg == null ? void 0 : arg.nextToken) {
        variables.nextToken = arg.nextToken;
      }
      if (arg == null ? void 0 : arg.limit) {
        variables.limit = arg.limit;
      }
      break;
    case "INDEX_QUERY": {
      const { pk, sk = [] } = indexMeta;
      const indexQuerySkName = (sk == null ? void 0 : sk.length) && resolvedSkName(sk);
      variables[pk] = arg[pk];
      if (indexQuerySkName && arg && arg[indexQuerySkName]) {
        variables[indexQuerySkName] = arg[indexQuerySkName];
      }
      if (arg == null ? void 0 : arg.filter) {
        variables.filter = arg.filter;
      }
      if (arg == null ? void 0 : arg.sortDirection) {
        variables.sortDirection = arg.sortDirection;
      }
      if (arg == null ? void 0 : arg.nextToken) {
        variables.nextToken = arg.nextToken;
      }
      if (arg == null ? void 0 : arg.limit) {
        variables.limit = arg.limit;
      }
      break;
    }
    case "ONCREATE":
    case "ONUPDATE":
    case "ONDELETE":
      if (arg == null ? void 0 : arg.filter) {
        variables = { filter: arg.filter };
      }
      break;
    case "OBSERVE_QUERY":
      throw new Error("Internal error: Attempted to build variables for observeQuery. Please report this error.");
    default: {
      const exhaustiveCheck = operation;
      throw new Error(`Unhandled operation case: ${exhaustiveCheck}`);
    }
  }
  return variables;
}
function normalizeMutationInput(mutationInput, model, modelIntrospection) {
  const { fields } = model;
  const normalized = {};
  Object.entries(mutationInput).forEach(([inputFieldName, inputValue]) => {
    var _a, _b;
    const fieldType = (_a = fields[inputFieldName]) == null ? void 0 : _a.type;
    const relatedModelName = fieldType == null ? void 0 : fieldType.model;
    if (relatedModelName) {
      const association = (_b = fields[inputFieldName]) == null ? void 0 : _b.association;
      const relatedModelDef = modelIntrospection.models[relatedModelName];
      const relatedModelPkInfo = relatedModelDef.primaryKeyInfo;
      if ((association == null ? void 0 : association.connectionType) === connectionType.HAS_ONE) {
        const associationHasOne = association;
        associationHasOne.targetNames.forEach((targetName, idx) => {
          const associatedFieldName = associationHasOne.associatedWith[idx];
          normalized[targetName] = inputValue[associatedFieldName];
        });
      }
      if ((association == null ? void 0 : association.connectionType) === connectionType.BELONGS_TO) {
        const associationBelongsTo = association;
        associationBelongsTo.targetNames.forEach((targetName, idx) => {
          if (idx === 0) {
            const associatedFieldName = relatedModelPkInfo.primaryKeyFieldName;
            normalized[targetName] = inputValue[associatedFieldName];
          } else {
            const associatedFieldName = relatedModelPkInfo.sortKeyFieldNames[idx - 1];
            normalized[targetName] = inputValue[associatedFieldName];
          }
        });
      }
    } else {
      normalized[inputFieldName] = inputValue;
    }
  });
  return normalized;
}
function authModeParams(client2, getInternals2, options = {}) {
  const internals = getInternals2(client2);
  return {
    authMode: options.authMode || internals.authMode,
    authToken: options.authToken || internals.authToken
  };
}
function getCustomHeaders(client2, getInternals2, requestHeaders) {
  let headers = getInternals2(client2).headers || {};
  if (requestHeaders) {
    headers = requestHeaders;
  }
  return headers;
}
function handleListGraphQlError(error) {
  if (error == null ? void 0 : error.errors) {
    return {
      ...error,
      data: []
    };
  } else {
    throw error;
  }
}
function handleSingularGraphQlError(error) {
  if (error.errors) {
    return {
      ...error,
      data: null
    };
  } else {
    throw error;
  }
}
const argIsContextSpec = (arg) => {
  var _a;
  return typeof ((_a = arg == null ? void 0 : arg.token) == null ? void 0 : _a.value) === "symbol";
};
function customOpFactory(client2, modelIntrospection, operationType, operation, useContext, getInternals2) {
  const argsDefined = operation.arguments !== void 0;
  const op = (...args) => {
    const options = args[args.length - 1];
    let contextSpec;
    let arg;
    if (useContext) {
      if (argIsContextSpec(args[0])) {
        contextSpec = args[0];
      } else {
        throw new Error(`Invalid first argument passed to ${operation.name}. Expected contextSpec`);
      }
    }
    if (argsDefined) {
      if (useContext) {
        arg = args[1];
      } else {
        arg = args[0];
      }
    }
    if (operationType === "subscription") {
      return _opSubscription(
        // subscriptions are only enabled on the clientside
        client2,
        modelIntrospection,
        operation,
        getInternals2,
        arg,
        options
      );
    }
    return _op(client2, modelIntrospection, operationType, operation, getInternals2, arg, options, contextSpec);
  };
  return op;
}
function hasStringField(o, field) {
  return typeof o[field] === "string";
}
function argumentBaseTypeString(argDef) {
  const requiredFlag = argDef.isRequired ? "!" : "";
  if (argDef.type instanceof Object && "enum" in argDef.type) {
    return argDef.type.enum + requiredFlag;
  } else {
    return argDef.type + requiredFlag;
  }
}
function outerArguments(operation) {
  if (operation.arguments === void 0) {
    return "";
  }
  const args = Object.entries(operation.arguments).map(([k, v]) => {
    const baseType = argumentBaseTypeString(v);
    const finalType = v.isArray ? `[${baseType}]${v.isArrayNullable ? "" : "!"}` : baseType;
    return `$${k}: ${finalType}`;
  }).join(", ");
  return args.length > 0 ? `(${args})` : "";
}
function innerArguments(operation) {
  if (operation.arguments === void 0) {
    return "";
  }
  const args = Object.keys(operation.arguments).map((k) => `${k}: $${k}`).join(", ");
  return args.length > 0 ? `(${args})` : "";
}
function operationSelectionSet(modelIntrospection, operation) {
  if (hasStringField(operation, "type") || hasStringField(operation.type, "enum")) {
    return "";
  } else if (hasStringField(operation.type, "nonModel")) {
    const nonModel = modelIntrospection.nonModels[operation.type.nonModel];
    return `{${selectionSetIRToString(getDefaultSelectionSetForNonModelWithIR(nonModel, modelIntrospection))}}`;
  } else if (hasStringField(operation.type, "model")) {
    return `{${generateSelectionSet(modelIntrospection, operation.type.model)}}`;
  } else {
    return "";
  }
}
function operationVariables(operation, args = {}) {
  const variables = {};
  if (operation.arguments === void 0) {
    return variables;
  }
  for (const argDef of Object.values(operation.arguments)) {
    if (typeof args[argDef.name] !== "undefined") {
      variables[argDef.name] = args[argDef.name];
    } else if (argDef.isRequired) {
      throw new Error(`${operation.name} requires arguments '${argDef.name}'`);
    }
  }
  return variables;
}
async function _op(client2, modelIntrospection, operationType, operation, getInternals2, args, options, context) {
  const { name: operationName } = operation;
  const auth2 = authModeParams(client2, getInternals2, options);
  const headers = getCustomHeaders(client2, getInternals2, options == null ? void 0 : options.headers);
  const outerArgsString = outerArguments(operation);
  const innerArgsString = innerArguments(operation);
  const selectionSet = operationSelectionSet(modelIntrospection, operation);
  const returnTypeModelName = hasStringField(operation.type, "model") ? operation.type.model : void 0;
  const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
  const variables = operationVariables(operation, args);
  try {
    const { data: data2, extensions } = context ? await client2.graphql(context, {
      ...auth2,
      query,
      variables
    }, headers) : await client2.graphql({
      ...auth2,
      query,
      variables
    }, headers);
    if (data2) {
      const [key] = Object.keys(data2);
      const isArrayResult = Array.isArray(data2[key]);
      const flattenedResult = isArrayResult ? data2[key].filter((x) => x) : data2[key];
      const initialized = returnTypeModelName ? initializeModel(client2, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth2.authMode, auth2.authToken, !!context) : flattenedResult;
      return {
        data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
        extensions
      };
    } else {
      return { data: null, extensions };
    }
  } catch (error) {
    const { data: data2, errors } = error;
    if (data2 && Object.keys(data2).length !== 0 && errors) {
      const [key] = Object.keys(data2);
      const isArrayResult = Array.isArray(data2[key]);
      const flattenedResult = isArrayResult ? data2[key].filter((x) => x) : data2[key];
      if (flattenedResult) {
        const initialized = returnTypeModelName ? initializeModel(client2, returnTypeModelName, isArrayResult ? flattenedResult : [flattenedResult], modelIntrospection, auth2.authMode, auth2.authToken, !!context) : flattenedResult;
        return {
          data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
          errors
        };
      } else {
        return handleSingularGraphQlError(error);
      }
    } else {
      return handleSingularGraphQlError(error);
    }
  }
}
function _opSubscription(client2, modelIntrospection, operation, getInternals2, args, options) {
  const operationType = "subscription";
  const { name: operationName } = operation;
  const auth2 = authModeParams(client2, getInternals2, options);
  const headers = getCustomHeaders(client2, getInternals2, options == null ? void 0 : options.headers);
  const outerArgsString = outerArguments(operation);
  const innerArgsString = innerArguments(operation);
  const selectionSet = operationSelectionSet(modelIntrospection, operation);
  const returnTypeModelName = hasStringField(operation.type, "model") ? operation.type.model : void 0;
  const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
  const variables = operationVariables(operation, args);
  const observable2 = client2.graphql({
    ...auth2,
    query,
    variables
  }, headers);
  return observable2.pipe(map((value) => {
    const [key] = Object.keys(value.data);
    const data2 = value.data[key];
    const [initialized] = returnTypeModelName ? initializeModel(client2, returnTypeModelName, [data2], modelIntrospection, auth2.authMode, auth2.authToken) : [data2];
    return initialized;
  }));
}
const operationTypeMap = {
  queries: "query",
  mutations: "mutation",
  subscriptions: "subscription"
};
function generateCustomOperationsProperty(client2, config2, operationsType, getInternals2) {
  if (!config2) {
    return {};
  }
  const modelIntrospection = config2.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const operations = modelIntrospection[operationsType];
  if (!operations) {
    return {};
  }
  const ops = {};
  const useContext = getInternals2(client2).amplify === null;
  for (const operation of Object.values(operations)) {
    ops[operation.name] = customOpFactory(client2, modelIntrospection, operationTypeMap[operationsType], operation, useContext, getInternals2);
  }
  return ops;
}
function generateCustomMutationsProperty(client2, config2, getInternals2) {
  return generateCustomOperationsProperty(client2, config2, "mutations", getInternals2);
}
function generateCustomQueriesProperty(client2, config2, getInternals2) {
  return generateCustomOperationsProperty(client2, config2, "queries", getInternals2);
}
function generateCustomSubscriptionsProperty(client2, config2, getInternals2) {
  return generateCustomOperationsProperty(client2, config2, "subscriptions", getInternals2);
}
const generateEnumsProperty = (graphqlConfig) => {
  const modelIntrospection = graphqlConfig.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const enums = {};
  for (const [_, enumData] of Object.entries(modelIntrospection.enums)) {
    enums[enumData.name] = {
      values: () => enumData.values
    };
  }
  return enums;
};
function listFactory(client2, modelIntrospection, model, getInternals2, context = false) {
  const listWithContext = async (contextSpec, args) => {
    return _list(client2, modelIntrospection, model, getInternals2, args, contextSpec);
  };
  const list = async (args) => {
    return _list(client2, modelIntrospection, model, getInternals2, args);
  };
  return context ? listWithContext : list;
}
async function _list(client2, modelIntrospection, model, getInternals2, args, contextSpec) {
  var _a, _b, _c, _d;
  const { name } = model;
  const query = generateGraphQLDocument(modelIntrospection, name, "LIST", args);
  const variables = buildGraphQLVariables(model, "LIST", args, modelIntrospection);
  const auth2 = authModeParams(client2, getInternals2, args);
  try {
    const headers = getCustomHeaders(client2, getInternals2, args == null ? void 0 : args.headers);
    const { data: data2, extensions } = contextSpec ? await client2.graphql(contextSpec, {
      ...auth2,
      query,
      variables
    }, headers) : await client2.graphql({
      ...auth2,
      query,
      variables
    }, headers);
    if (data2 !== void 0) {
      const [key] = Object.keys(data2);
      if (data2[key].items) {
        const flattenedResult = data2[key].items.map((value) => flattenItems(modelIntrospection, name, value));
        if (args == null ? void 0 : args.selectionSet) {
          return {
            data: flattenedResult,
            nextToken: data2[key].nextToken,
            extensions
          };
        } else {
          const initialized = initializeModel(client2, name, flattenedResult, modelIntrospection, auth2.authMode, auth2.authToken, !!contextSpec);
          return {
            data: initialized,
            nextToken: data2[key].nextToken,
            extensions
          };
        }
      }
      return {
        data: data2[key],
        nextToken: data2[key].nextToken,
        extensions
      };
    }
  } catch (error) {
    const { data: data2, errors } = error;
    if (data2 !== void 0 && data2 !== null && Object.keys(data2).length !== 0 && errors) {
      const [key] = Object.keys(data2);
      if ((_a = data2[key]) == null ? void 0 : _a.items) {
        const flattenedResult = data2[key].items.map((value) => flattenItems(modelIntrospection, name, value));
        if (flattenedResult) {
          if (args == null ? void 0 : args.selectionSet) {
            return {
              data: flattenedResult,
              nextToken: (_b = data2[key]) == null ? void 0 : _b.nextToken,
              errors
            };
          } else {
            const initialized = initializeModel(client2, name, flattenedResult, modelIntrospection, auth2.authMode, auth2.authToken, !!contextSpec);
            return {
              data: initialized,
              nextToken: (_c = data2[key]) == null ? void 0 : _c.nextToken,
              errors
            };
          }
        }
        return {
          data: data2[key],
          nextToken: (_d = data2[key]) == null ? void 0 : _d.nextToken,
          errors
        };
      } else {
        return handleListGraphQlError(error);
      }
    } else {
      return handleListGraphQlError(error);
    }
  }
}
function indexQueryFactory(client2, modelIntrospection, model, indexMeta, getInternals2, context = false) {
  const indexQueryWithContext = async (contextSpec, args, options) => {
    return _indexQuery(client2, modelIntrospection, model, indexMeta, getInternals2, {
      ...args,
      ...options
    }, contextSpec);
  };
  const indexQuery = async (args, options) => {
    return _indexQuery(client2, modelIntrospection, model, indexMeta, getInternals2, {
      ...args,
      ...options
    });
  };
  return context ? indexQueryWithContext : indexQuery;
}
function processGraphQlResponse(modelIntroSchema, modelName, result, selectionSet, modelInitializer) {
  const { data: data2, extensions } = result;
  const [key] = Object.keys(data2);
  if (data2[key].items) {
    const flattenedResult = data2[key].items.map((value) => flattenItems(modelIntroSchema, modelName, value));
    return {
      data: selectionSet ? flattenedResult : modelInitializer(flattenedResult),
      nextToken: data2[key].nextToken,
      extensions
    };
  }
  return {
    data: data2[key],
    nextToken: data2[key].nextToken,
    extensions
  };
}
async function _indexQuery(client2, modelIntrospection, model, indexMeta, getInternals2, args, contextSpec) {
  var _a, _b, _c, _d;
  const { name } = model;
  const query = generateGraphQLDocument(modelIntrospection, name, "INDEX_QUERY", args, indexMeta);
  const variables = buildGraphQLVariables(model, "INDEX_QUERY", args, modelIntrospection, indexMeta);
  const auth2 = authModeParams(client2, getInternals2, args);
  const modelInitializer = (flattenedResult) => initializeModel(client2, name, flattenedResult, modelIntrospection, auth2.authMode, auth2.authToken, !!contextSpec);
  try {
    const headers = getCustomHeaders(client2, getInternals2, args == null ? void 0 : args.headers);
    const graphQlParams = {
      ...auth2,
      query,
      variables
    };
    const requestArgs = [graphQlParams, headers];
    if (contextSpec !== void 0) {
      requestArgs.unshift(contextSpec);
    }
    const response = await client2.graphql(...requestArgs);
    if (response.data !== void 0) {
      return processGraphQlResponse(modelIntrospection, name, response, args == null ? void 0 : args.selectionSet, modelInitializer);
    }
  } catch (error) {
    const { data: data2, errors } = error;
    if (data2 !== void 0 && Object.keys(data2).length !== 0 && errors) {
      const [key] = Object.keys(data2);
      if ((_a = data2[key]) == null ? void 0 : _a.items) {
        const flattenedResult = (_b = data2[key]) == null ? void 0 : _b.items.map((value) => flattenItems(modelIntrospection, name, value));
        if (flattenedResult) {
          return {
            data: (args == null ? void 0 : args.selectionSet) ? flattenedResult : modelInitializer(flattenedResult),
            nextToken: (_c = data2[key]) == null ? void 0 : _c.nextToken
          };
        }
      }
      return {
        data: data2[key],
        nextToken: (_d = data2[key]) == null ? void 0 : _d.nextToken
      };
    } else {
      return handleListGraphQlError(error);
    }
  }
}
function getFactory(client2, modelIntrospection, model, operation, getInternals2, useContext = false) {
  const getWithContext = async (contextSpec, arg, options) => {
    return _get(client2, modelIntrospection, model, arg, options, operation, getInternals2, contextSpec);
  };
  const get = async (arg, options) => {
    return _get(client2, modelIntrospection, model, arg, options, operation, getInternals2);
  };
  return useContext ? getWithContext : get;
}
async function _get(client2, modelIntrospection, model, arg, options, operation, getInternals2, context) {
  const { name } = model;
  const query = generateGraphQLDocument(modelIntrospection, name, operation, options);
  const variables = buildGraphQLVariables(model, operation, arg, modelIntrospection);
  const auth2 = authModeParams(client2, getInternals2, options);
  try {
    const headers = getCustomHeaders(client2, getInternals2, options == null ? void 0 : options.headers);
    const { data: data2, extensions } = context ? await client2.graphql(context, {
      ...auth2,
      query,
      variables
    }, headers) : await client2.graphql({
      ...auth2,
      query,
      variables
    }, headers);
    if (data2) {
      const [key] = Object.keys(data2);
      const flattenedResult = flattenItems(modelIntrospection, name, data2[key]);
      if (flattenedResult === null) {
        return { data: null, extensions };
      } else if (options == null ? void 0 : options.selectionSet) {
        return { data: flattenedResult, extensions };
      } else {
        const [initialized] = initializeModel(client2, name, [flattenedResult], modelIntrospection, auth2.authMode, auth2.authToken, !!context);
        return { data: initialized, extensions };
      }
    } else {
      return { data: null, extensions };
    }
  } catch (error) {
    const { data: data2, errors } = error;
    if (data2 && Object.keys(data2).length !== 0 && errors) {
      const [key] = Object.keys(data2);
      const flattenedResult = flattenItems(modelIntrospection, name, data2[key]);
      if (flattenedResult) {
        if (options == null ? void 0 : options.selectionSet) {
          return { data: flattenedResult, errors };
        } else {
          const [initialized] = initializeModel(client2, name, [flattenedResult], modelIntrospection, auth2.authMode, auth2.authToken, !!context);
          return { data: initialized, errors };
        }
      } else {
        return handleSingularGraphQlError(error);
      }
    } else {
      return handleSingularGraphQlError(error);
    }
  }
}
function subscriptionFactory(client2, modelIntrospection, model, operation, getInternals2) {
  const { name } = model;
  const subscription = (args) => {
    const query = generateGraphQLDocument(modelIntrospection, name, operation, args);
    const variables = buildGraphQLVariables(model, operation, args, modelIntrospection);
    const auth2 = authModeParams(client2, getInternals2, args);
    const headers = getCustomHeaders(client2, getInternals2, args == null ? void 0 : args.headers);
    const observable2 = client2.graphql({
      ...auth2,
      query,
      variables
    }, headers);
    return observable2.pipe(map((value) => {
      const [key] = Object.keys(value.data);
      const data2 = value.data[key];
      const [initialized] = initializeModel(client2, name, [data2], modelIntrospection, auth2.authMode, auth2.authToken);
      return initialized;
    }));
  };
  return subscription;
}
function resolvePKFields(model) {
  const { primaryKeyFieldName, sortKeyFieldNames } = model.primaryKeyInfo;
  return [primaryKeyFieldName, ...sortKeyFieldNames];
}
function findIndexByFields(needle, haystack, keyFields) {
  const searchObject = Object.fromEntries(keyFields.map((fieldName) => [fieldName, needle[fieldName]]));
  for (let i = 0; i < haystack.length; i++) {
    if (Object.keys(searchObject).every((k) => searchObject[k] === haystack[i][k])) {
      return i;
    }
  }
  return -1;
}
function observeQueryFactory(models, model) {
  const { name } = model;
  const observeQuery = (arg) => new Observable((subscriber) => {
    const items = [];
    const messageQueue = [];
    let receiveMessages = (...messages) => {
      return messageQueue.push(...messages);
    };
    const onCreateSub = models[name].onCreate(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "create" });
      },
      error(error) {
        subscriber.error({ type: "onCreate", error });
      }
    });
    const onUpdateSub = models[name].onUpdate(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "update" });
      },
      error(error) {
        subscriber.error({ type: "onUpdate", error });
      }
    });
    const onDeleteSub = models[name].onDelete(arg).subscribe({
      next(item) {
        receiveMessages({ item, type: "delete" });
      },
      error(error) {
        subscriber.error({ type: "onDelete", error });
      }
    });
    function ingestMessages(messages) {
      for (const message of messages) {
        const idx = findIndexByFields(message.item, items, pkFields);
        switch (message.type) {
          case "create":
            if (idx < 0)
              items.push(message.item);
            break;
          case "update":
            if (idx >= 0)
              items[idx] = message.item;
            break;
          case "delete":
            if (idx >= 0)
              items.splice(idx, 1);
            break;
          default:
            console.error("Unrecognized message in observeQuery.", message);
        }
      }
      subscriber.next({
        items,
        isSynced: true
      });
    }
    const pkFields = resolvePKFields(model);
    (async () => {
      let firstPage = true;
      let nextToken = null;
      while (!subscriber.closed && (firstPage || nextToken)) {
        firstPage = false;
        const { data: page, errors, nextToken: _nextToken } = await models[name].list({ ...arg, nextToken });
        nextToken = _nextToken;
        items.push(...page);
        const isSynced = messageQueue.length === 0 && (nextToken === null || nextToken === void 0);
        subscriber.next({
          items,
          isSynced
        });
        if (Array.isArray(errors)) {
          for (const error of errors) {
            subscriber.error(error);
          }
        }
      }
      if (messageQueue.length > 0) {
        ingestMessages(messageQueue);
      }
      receiveMessages = (...messages) => {
        ingestMessages(messages);
        return items.length;
      };
    })();
    return () => {
      onCreateSub.unsubscribe();
      onUpdateSub.unsubscribe();
      onDeleteSub.unsubscribe();
    };
  });
  return observeQuery;
}
const attributeIsSecondaryIndex = (attr) => {
  var _a, _b, _c;
  return attr.type === "key" && // presence of `name` property distinguishes GSI from primary index
  ((_a = attr.properties) == null ? void 0 : _a.name) && ((_b = attr.properties) == null ? void 0 : _b.queryField) && ((_c = attr.properties) == null ? void 0 : _c.fields.length) > 0;
};
const getSecondaryIndexesFromSchemaModel = (model) => {
  var _a;
  const idxs = (_a = model.attributes) == null ? void 0 : _a.filter(attributeIsSecondaryIndex).map((attr) => {
    const queryField = attr.properties.queryField;
    const [pk, ...sk] = attr.properties.fields;
    return {
      queryField,
      pk,
      sk
    };
  });
  return idxs || [];
};
function generateModelsProperty(client2, apiGraphQLConfig, getInternals2) {
  const models = {};
  const modelIntrospection = apiGraphQLConfig.modelIntrospection;
  if (!modelIntrospection) {
    return {};
  }
  const SUBSCRIPTION_OPS = ["ONCREATE", "ONUPDATE", "ONDELETE"];
  for (const model of Object.values(modelIntrospection.models)) {
    const { name } = model;
    models[name] = {};
    Object.entries(graphQLOperationsInfo).forEach(([key, { operationPrefix }]) => {
      const operation = key;
      if (operation === "LIST") {
        models[name][operationPrefix] = listFactory(client2, modelIntrospection, model, getInternals2);
      } else if (SUBSCRIPTION_OPS.includes(operation)) {
        models[name][operationPrefix] = subscriptionFactory(client2, modelIntrospection, model, operation, getInternals2);
      } else if (operation === "OBSERVE_QUERY") {
        models[name][operationPrefix] = observeQueryFactory(models, model);
      } else {
        models[name][operationPrefix] = getFactory(client2, modelIntrospection, model, operation, getInternals2);
      }
    });
    const secondaryIdxs = getSecondaryIndexesFromSchemaModel(model);
    for (const idx of secondaryIdxs) {
      models[name][idx.queryField] = indexQueryFactory(client2, modelIntrospection, model, idx, getInternals2);
    }
  }
  return models;
}
function addSchemaToClient(client2, apiGraphqlConfig, getInternals2) {
  client2.models = generateModelsProperty(client2, apiGraphqlConfig, getInternals2);
  client2.enums = generateEnumsProperty(apiGraphqlConfig);
  client2.queries = generateCustomQueriesProperty(client2, apiGraphqlConfig, getInternals2);
  client2.mutations = generateCustomMutationsProperty(client2, apiGraphqlConfig, getInternals2);
  client2.subscriptions = generateCustomSubscriptionsProperty(client2, apiGraphqlConfig, getInternals2);
  return client2;
}
function isApiGraphQLConfig(apiGraphQLConfig) {
  return apiGraphQLConfig !== void 0;
}
function isConfigureEventWithResourceConfig(payload) {
  return payload.event === "configure";
}
function generateClient$1(params) {
  var _a;
  const client2 = {
    [__amplify]: params.amplify,
    [__authMode]: params.authMode,
    [__authToken]: params.authToken,
    [__headers]: params.headers,
    graphql,
    cancel,
    isCancelError,
    models: emptyProperty,
    enums: emptyProperty,
    queries: emptyProperty,
    mutations: emptyProperty,
    subscriptions: emptyProperty
  };
  const apiGraphqlConfig = (_a = params.amplify.getConfig().API) == null ? void 0 : _a.GraphQL;
  if (isApiGraphQLConfig(apiGraphqlConfig)) {
    addSchemaToClient(client2, apiGraphqlConfig, getInternals);
  } else {
    generateModelsPropertyOnAmplifyConfigure(client2);
  }
  return client2;
}
const generateModelsPropertyOnAmplifyConfigure = (clientRef) => {
  Hub.listen("core", (coreEvent) => {
    var _a;
    if (!isConfigureEventWithResourceConfig(coreEvent.payload)) {
      return;
    }
    const apiGraphQLConfig = (_a = coreEvent.payload.data.API) == null ? void 0 : _a.GraphQL;
    if (isApiGraphQLConfig(apiGraphQLConfig)) {
      addSchemaToClient(clientRef, apiGraphQLConfig, getInternals);
    }
  });
};
const emptyProperty = new Proxy({}, {
  get() {
    throw new Error("Client could not be generated. This is likely due to `Amplify.configure()` not being called prior to `generateClient()` or because the configuration passed to `Amplify.configure()` is missing GraphQL provider configuration.");
  }
});
function generateClient(options = {}) {
  return generateClient$1({
    ...options,
    amplify: Amplify
  });
}
const auth = {
  user_pool_id: "us-east-1_0CRX8iByw",
  aws_region: "us-east-1",
  user_pool_client_id: "l06kt59i9csn2pel7ktb8akr0",
  identity_pool_id: "us-east-1:df02d7eb-7480-4f94-bbd2-d23bcd8f9015",
  mfa_methods: [],
  standard_required_attributes: [
    "email"
  ],
  username_attributes: [
    "email"
  ],
  user_verification_types: [
    "email"
  ],
  mfa_configuration: "NONE",
  password_policy: {
    min_length: 8,
    require_lowercase: true,
    require_numbers: true,
    require_symbols: true,
    require_uppercase: true
  },
  unauthenticated_identities_enabled: true
};
const data = {
  url: "https://gc5boms4ifavzcoknotppv7oha.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_region: "us-east-1",
  default_authorization_type: "AWS_IAM",
  authorization_types: [
    "AMAZON_COGNITO_USER_POOLS"
  ],
  model_introspection: {
    version: 1,
    models: {
      Todo: {
        name: "Todo",
        fields: {
          id: {
            name: "id",
            isArray: false,
            type: "ID",
            isRequired: true,
            attributes: []
          },
          content: {
            name: "content",
            isArray: false,
            type: "String",
            isRequired: false,
            attributes: []
          },
          createdAt: {
            name: "createdAt",
            isArray: false,
            type: "AWSDateTime",
            isRequired: false,
            attributes: [],
            isReadOnly: true
          },
          updatedAt: {
            name: "updatedAt",
            isArray: false,
            type: "AWSDateTime",
            isRequired: false,
            attributes: [],
            isReadOnly: true
          }
        },
        syncable: true,
        pluralName: "Todos",
        attributes: [
          {
            type: "model",
            properties: {}
          },
          {
            type: "auth",
            properties: {
              rules: [
                {
                  allow: "public",
                  provider: "iam",
                  operations: [
                    "create",
                    "update",
                    "delete",
                    "read"
                  ]
                }
              ]
            }
          }
        ],
        primaryKeyInfo: {
          isCustomPrimaryKey: false,
          primaryKeyFieldName: "id",
          sortKeyFieldNames: []
        }
      }
    },
    enums: {},
    nonModels: {}
  }
};
const version = "1";
const outputs = {
  auth,
  data,
  version
};
const store = new Store();
try {
  Amplify$1.configure(outputs);
  console.log("Amplify configured successfully");
} catch (error) {
  console.error("Error configuring Amplify:", error);
}
const client = generateClient();
const fetchTodos = async () => {
  const { data: data2, errors } = await client.models.Todo.list();
  store.set("todos", data2);
  store.set("errors", errors);
  const storedData = { todo: store.get("todos"), error: store.get("errors") };
  return storedData;
};
const createTodo = async (content) => {
  const { data: data2, errors: createTodoError } = await client.models.Todo.create({
    content: [content]
  });
  store.set("createTodo", data2);
  store.set("createTodoError", createTodoError);
  console.log("Created todo:", data2);
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 850,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
      contextIsolation: true
    }
  });
  {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.webContents.openDevTools();
};
app.on("ready", createWindow);
ipcMain.on("minimize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});
ipcMain.on("maximize-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});
ipcMain.on("close-window", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});
ipcMain.handle("fetch-todo", async () => await fetchTodos());
ipcMain.handle("create-todo", async (_, content) => await createTodo(content));
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
