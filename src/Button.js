/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */

import React, { Component } from 'react';
import { insertDataBlock, MegadraftIcons } from 'megadraft';
import Modal from 'react-modal';
import Dropzone from 'react-dropzone';
import constants from './constants';

const API = document.getElementsByName('image-api')[0].value;
const TOKEN = document.getElementsByName('token')[0].value;
const HEADERS = {
  Authorization: `Token ${TOKEN}`,
};

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalError: false,
      uploading: false,
      imageURL: null,
    };

    this.onClick = ::this.onClick;
    this.onDrop = ::this.onDrop;
    this.closeModal = ::this.closeModal;
  }

  onClick() {
    this.setState({ modalOpen: true });
  }

  onDrop(accepted, rejected) {
    if (rejected.length > 0) {
      this.setState({
        modalError: true,
      });
      return;
    }
    this.setState({ uploading: true });
    const props = this.props;
    const formData = new FormData();
    formData.append('image', accepted[0]);
    console.log('formData', formData.get('image'), accepted[0]);
    fetch(API, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      headers: HEADERS,
    })
    .then(response => response.json())
    .then((json) => {
      const data = {
        type: constants.PLUGIN_TYPE,
        src: json.image,
        pk: json.pk,
        caption: '',
        credit: '',
        display: 'wide',
      };
      props.onChange(insertDataBlock(props.editorState, data));
      this.setState({
        modalOpen: false,
        modalError: false,
        uploading: false,
      });
    });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <button className={this.props.className} type="button" onClick={this.onClick} title={constants.PLUGIN_NAME}>
          <MegadraftIcons.ImageIcon style={{
            position: 'absolute',
            left: '4px',
            top: '4px',
          }}
          />
        </button>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          className={{
            base: 'image-modal upload',
            afterOpen: 'after-open',
            beforeClose: 'before-close',
          }}
          closeTimeoutMS={250}
          rejectClassName="reject"
          acceptClassName="accept"
          overlayClassName={{
            base: 'image-modal overlay',
            afterOpen: 'after-open',
            beforeClose: 'before-close',
          }}
        >
          <Dropzone
            multiple={false}
            accept="image/jpeg, image/png"
            className="dropzone"
            activeClassName="dropzone active"
            acceptClassName="dropzone accept"
            rejectClassName="dropzone reject"
            onDrop={this.onDrop}
          >
            Drop a JPEG or PNG image here or click to find one on your computer.
            <div className="inner-block rejected">Unsupported image type</div>
            <div className="inner-block supported">Drop image</div>
            <div
              className={`inner-block waiting ${this.state.uploading ? 'show' : ''}`}
            >
              <i className="fa fa-cog fa-spin" />
            </div>
          </Dropzone>
        </Modal>
      </div>
    );
  }
}
