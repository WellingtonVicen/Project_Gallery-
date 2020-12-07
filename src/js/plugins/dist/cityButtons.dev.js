"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _includes = require("../core/includes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var duration = 300;

function filterByCity(city) {
  (0, _jquery["default"])('[wm-city]').each(function (i, e) {
    var _this = this;

    var isTarget = (0, _jquery["default"])(this).attr('wm-city') === city || city === null;

    if (isTarget) {
      (0, _jquery["default"])(this).parent().removeClass('d-none');
      (0, _jquery["default"])(this).fadeIn(duration);
    } else {
      (0, _jquery["default"])(this).fadeOut(duration, function () {
        (0, _jquery["default"])(_this).parent().addClass('d-none');
      });
    }
  });
}

_jquery["default"].fn.cityButtons = function () {
  var cities = new Set();
  (0, _jquery["default"])('[wm-city]').each(function (i, e) {
    cities.add((0, _jquery["default"])(e).attr('wm-city'));
  });
  var btns = Array.from(cities).map(function (city) {
    var btn = (0, _jquery["default"])('<button>').addClass(['btn', 'btn-info']).html(city);
    btn.click(function (e) {
      return filterByCity(city);
    });
    return btn;
  });
  var btnAll = (0, _jquery["default"])('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas');
  btnAll.click(function (e) {
    return filterByCity(null);
  });
  btns.push(btnAll);
  var btnGroup = (0, _jquery["default"])('<div>').addClass(['btn-group']);
  btnGroup.append(btns);
  (0, _jquery["default"])(this).html(btnGroup);
  return this;
};

(0, _includes.onLoadHtmlSuccess)(function () {
  (0, _jquery["default"])('[wm-city-buttons]').cityButtons();
});