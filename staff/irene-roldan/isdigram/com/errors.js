"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicityError = exports.SystemError = exports.ContentError = void 0;
var ContentError = /** @class */ (function (_super) {
    __extends(ContentError, _super);
    function ContentError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return ContentError;
}(Error));
exports.ContentError = ContentError;
var SystemError = /** @class */ (function (_super) {
    __extends(SystemError, _super);
    function SystemError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return SystemError;
}(Error));
exports.SystemError = SystemError;
var DuplicityError = /** @class */ (function (_super) {
    __extends(DuplicityError, _super);
    function DuplicityError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        return _this;
    }
    return DuplicityError;
}(Error));
exports.DuplicityError = DuplicityError;
var errors = {
    ContentError: ContentError,
    SystemError: SystemError,
    DuplicityError: DuplicityError
};
exports.default = errors;
