"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_NAME = 'Error Trace';
var ContextError = /** @class */ (function (_super) {
    __extends(ContextError, _super);
    function ContextError(text, error) {
        var _this = this;
        var errorText = '\n';
        var stack = error.stack;
        if (error.stack.startsWith(ERROR_NAME)) {
            stack = stack.slice(ERROR_NAME.length + 1);
        }
        errorText += stack + '\n\n';
        errorText += 'Resulting Error: ' + text;
        _this = _super.call(this, errorText) || this;
        _this.name = ERROR_NAME;
        return _this;
    }
    return ContextError;
}(Error));
exports.ContextError = ContextError;
