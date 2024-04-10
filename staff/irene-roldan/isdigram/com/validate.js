"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/;
var URL_REGEX = /^(http|https):\/\//;
var validate = {
    text: function (text, explain, checkEmptySpaceInside) {
        if (typeof text !== 'string')
            throw new TypeError(explain + ' ' + text + ' is not a string');
        if (!text.trim().length)
            throw new Error(explain + ' >' + text + '< is empty or blank');
        if (checkEmptySpaceInside)
            if (text.includes(' '))
                throw new Error(explain + ' ' + text + ' has empty spaces');
    },
    date: function (date, explain) {
        if (typeof date !== 'string')
            throw new TypeError(explain + ' ' + date + ' is not a string');
        if (!DATE_REGEX.test(date))
            throw new Error(explain + ' ' + date + ' does not have a valid format');
    },
    email: function (email, explain) {
        if (explain === void 0) { explain = 'email'; }
        if (!EMAIL_REGEX.test(email))
            throw new Error("".concat(explain, " ").concat(email, " is not an email"));
    },
    password: function (password, explain) {
        if (explain === void 0) { explain = 'password'; }
        if (!PASSWORD_REGEX.test(password))
            throw new Error("".concat(explain, " password is not acceptable"));
    },
    url: function (url, explain) {
        if (!URL_REGEX.test(url))
            throw new Error(explain + ' ' + url + ' is not an url');
    },
    callback: function (callback, explain) {
        if (explain === void 0) { explain = 'callback'; }
        if (typeof callback !== 'function')
            throw new TypeError("".concat(explain, " is not a function"));
    }
};
exports.default = validate;
