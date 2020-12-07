"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLoadHtmlSuccess = onLoadHtmlSuccess;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loadHtmlSuccessCallbacks = [];

function onLoadHtmlSuccess(callback) {
  if (!loadHtmlSuccessCallbacks.includes(callback)) {
    loadHtmlSuccessCallbacks.push(callback);
  }
}

function loadIncludes(parent) {
  if (!parent) parent = 'body';
  (0, _jquery["default"])(parent).find('[wm-include]').each(function (i, e) {
    var url = (0, _jquery["default"])(e).attr('wm-include');

    _jquery["default"].ajax({
      url: url,
      success: function success(data) {
        (0, _jquery["default"])(e).html(data);
        (0, _jquery["default"])(e).removeAttr('wm-include');
        loadHtmlSuccessCallbacks.forEach(function (callback) {
          return callback(data);
        });
        loadIncludes(e);
      }
    });
  });
}

loadIncludes();