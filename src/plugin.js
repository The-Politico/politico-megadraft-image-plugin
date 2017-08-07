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
import RightAlignIcon from './RightAlignIcon';


export default {
  title: constants.PLUGIN_NAME,
  type: constants.PLUGIN_TYPE,
  buttonComponent: Button,
  blockComponent: Block,
  options: {
    defaultDisplay: 'wide',
    displayOptions: [
      { key: 'inline-left', icon: MegadraftIcons.MediaSmallIcon, label: 'INLINE LEFT' },
      { key: 'inline-right', icon: RightAlignIcon, label: 'INLINE RIGHT' },
      { key: 'wide', icon: MegadraftIcons.MediaMediumIcon, label: 'WIDE' },
      { key: 'full', icon: MegadraftIcons.MediaBigIcon, label: 'FULL BLEED' },
    ],
  },
};
