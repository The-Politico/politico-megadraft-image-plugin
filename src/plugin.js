/*
 * Copyright (c) 2017, Jon McClure <interactives@politico.com>
 *
 * License: MIT
 */
import React from 'react';
import { MegadraftIcons } from 'megadraft';

import Button from './Button';
import Block from './Block';
import constants from './constants';


export default {
  title: constants.PLUGIN_NAME,
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  options: {
    defaultDisplay: 'wide',
    displayOptions: [
      { key: 'inline', icon: MegadraftIcons.MediaSmallIcon, label: 'INLINE' },
      { key: 'wide', icon: MegadraftIcons.MediaMediumIcon, label: 'WIDE' },
      { key: 'full', icon: MegadraftIcons.MediaBigIcon, label: 'FULL BLEED' },
    ],
  },
};
