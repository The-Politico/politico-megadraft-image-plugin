/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */

import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <svg {...this.props} width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <path d="M21,15 L15,15 L15,17 L21,17 L21,15 Z M21,7 L15,7 L15,9 L21,9 L21,7 Z M15,13 L21,13 L21,11 L15,11 L15,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z M3,7 L3,17 L13,17 L13,7 L3,7 Z" fill="currentColor" />
        </g>
      </svg>
    );
  }
}
