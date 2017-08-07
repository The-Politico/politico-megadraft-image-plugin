/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */

import React, { Component } from 'react';

import { MegadraftPlugin, MegadraftIcons } from 'megadraft';

const { BlockContent, BlockData, BlockInput, CommonBlock } = MegadraftPlugin;

const API = document.getElementsByName('image-api')[0].value;
const TOKEN = document.getElementsByName('token')[0].value;
const HEADERS = {
  Authorization: `Token ${TOKEN}`,
};

export default class Block extends Component {
  constructor(props) {
    super(props);

    this.handleCaptionChange = ::this.handleCaptionChange;
    this.handleCreditChange = ::this.handleCreditChange;
    this.remove = ::this.remove;

    this.actions = [
      { key: 'delete', icon: MegadraftIcons.DeleteIcon, action: this.remove },
    ];
  }

  handleCaptionChange(event) {
    this.props.container.updateData({caption: event.target.value});
  }

  handleCreditChange(event) {
    this.props.container.updateData({credit: event.target.value});
  }

  componentWillUnmount() {
    fetch(`${API}${this.props.data.pk}/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: HEADERS,
    });
  }

  remove() {
    fetch(`${API}${this.props.data.pk}/`, {
      method: 'DELETE',
      mode: 'cors',
      headers: HEADERS,
    })
    .then(() => {
      this.props.container.remove();
    })
    .catch((e) => {
      window.alert('Whoops! Something went wrong.');
      console.log('Error', e);
    });
  }

  render() {
    return (
      <div className="image-figure">
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent>
            <img src={this.props.data.src} />
          </BlockContent>

          <BlockData>
            <BlockInput
              placeholder="Caption"
              value={this.props.data.caption}
              onChange={this.handleCaptionChange}
            />
            <BlockInput
              placeholder="Credit"
              value={this.props.data.credit}
              onChange={this.handleCreditChange}
            />
          </BlockData>
        </CommonBlock>
      </div>
    );
  }
}
