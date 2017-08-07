'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _megadraft = require('megadraft');

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2017, Jon McClure <interactives@politico.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var API = document.getElementsByName('image-api')[0].value;
var TOKEN = document.getElementsByName('token')[0].value;
var HEADERS = {
  Authorization: 'Token ' + TOKEN
};

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.state = {
      modalOpen: false,
      modalError: false,
      uploading: false,
      imageURL: null
    };

    _this.onClick = _this.onClick.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.closeModal = _this.closeModal.bind(_this);
    return _this;
  }

  _createClass(Button, [{
    key: 'onClick',
    value: function onClick() {
      this.setState({ modalOpen: true });
    }
  }, {
    key: 'onDrop',
    value: function onDrop(accepted, rejected) {
      var _this2 = this;

      if (rejected.length > 0) {
        this.setState({
          modalError: true
        });
        return;
      }
      this.setState({ uploading: true });
      var props = this.props;
      var formData = new FormData();
      formData.append('image', accepted[0]);
      console.log('formData', formData.get('image'), accepted[0]);
      fetch(API, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: HEADERS
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var data = {
          type: _constants2.default.PLUGIN_TYPE,
          src: json.image,
          pk: json.pk,
          caption: '',
          credit: ''
        };
        props.onChange((0, _megadraft.insertDataBlock)(props.editorState, data));
        _this2.setState({
          modalOpen: false,
          modalError: false,
          uploading: false
        });
      });
    }
  }, {
    key: 'closeModal',
    value: function closeModal() {
      this.setState({ modalOpen: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'button',
          { className: this.props.className, type: 'button', onClick: this.onClick, title: _constants2.default.PLUGIN_NAME },
          _react2.default.createElement(_megadraft.MegadraftIcons.ImageIcon, { style: {
              position: 'absolute',
              left: '4px',
              top: '4px'
            }
          })
        ),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: this.state.modalOpen,
            onRequestClose: this.closeModal,
            className: {
              base: 'image-modal upload',
              afterOpen: 'after-open',
              beforeClose: 'before-close'
            },
            closeTimeoutMS: 250,
            rejectClassName: 'reject',
            acceptClassName: 'accept',
            overlayClassName: {
              base: 'image-modal overlay',
              afterOpen: 'after-open',
              beforeClose: 'before-close'
            }
          },
          _react2.default.createElement(
            _reactDropzone2.default,
            {
              multiple: false,
              accept: 'image/jpeg, image/png',
              className: 'dropzone',
              activeClassName: 'dropzone active',
              acceptClassName: 'dropzone accept',
              rejectClassName: 'dropzone reject',
              onDrop: this.onDrop
            },
            'Drop a JPEG or PNG image here or click to find one on your computer.',
            _react2.default.createElement(
              'div',
              { className: 'inner-block rejected' },
              'Unsupported image type'
            ),
            _react2.default.createElement(
              'div',
              { className: 'inner-block supported' },
              'Drop image'
            ),
            _react2.default.createElement(
              'div',
              {
                className: 'inner-block waiting ' + (this.state.uploading ? 'show' : '')
              },
              _react2.default.createElement('i', { className: 'fa fa-cog fa-spin' })
            )
          )
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

exports.default = Button;