'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _megadraft = require('megadraft');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Jon McClure <interactives@politico.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BlockContent = _megadraft.MegadraftPlugin.BlockContent,
    BlockData = _megadraft.MegadraftPlugin.BlockData,
    BlockInput = _megadraft.MegadraftPlugin.BlockInput,
    CommonBlock = _megadraft.MegadraftPlugin.CommonBlock;


var API = document.getElementsByName('image-api')[0].value;
var TOKEN = document.getElementsByName('token')[0].value;
var HEADERS = {
  Authorization: 'Token ' + TOKEN
};

var Block = function (_Component) {
  _inherits(Block, _Component);

  function Block(props) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, props));

    _this.handleCaptionChange = _this.handleCaptionChange.bind(_this);
    _this.handleCreditChange = _this.handleCreditChange.bind(_this);
    _this.remove = _this.remove.bind(_this);

    _this.actions = [{ key: 'delete', icon: _megadraft.MegadraftIcons.DeleteIcon, action: _this.remove }];
    return _this;
  }

  _createClass(Block, [{
    key: 'handleCaptionChange',
    value: function handleCaptionChange(event) {
      this.props.container.updateData({ caption: event.target.value });
    }
  }, {
    key: 'handleCreditChange',
    value: function handleCreditChange(event) {
      this.props.container.updateData({ credit: event.target.value });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      fetch('' + API + this.props.data.pk + '/', {
        method: 'DELETE',
        mode: 'cors',
        headers: HEADERS
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this2 = this;

      fetch('' + API + this.props.data.pk + '/', {
        method: 'DELETE',
        mode: 'cors',
        headers: HEADERS
      }).then(function () {
        _this2.props.container.remove();
      }).catch(function (e) {
        window.alert('Whoops! Something went wrong.');
        console.log('Error', e);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'image-figure' },
        _react2.default.createElement(
          CommonBlock,
          _extends({}, this.props, { actions: this.actions }),
          _react2.default.createElement(
            BlockContent,
            null,
            _react2.default.createElement('img', { src: this.props.data.src })
          ),
          _react2.default.createElement(
            BlockData,
            null,
            _react2.default.createElement(BlockInput, {
              placeholder: 'Caption',
              value: this.props.data.caption,
              onChange: this.handleCaptionChange
            }),
            _react2.default.createElement(BlockInput, {
              placeholder: 'Credit',
              value: this.props.data.credit,
              onChange: this.handleCreditChange
            })
          )
        )
      );
    }
  }]);

  return Block;
}(_react.Component);

exports.default = Block;