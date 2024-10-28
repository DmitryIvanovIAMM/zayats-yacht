import React from 'react';
import { secondary } from '../colors';

export default function PhoneColumnContent() {
  return (
    <div style={{ fontSize: '16px', lineHeight: '150%' }}>
      <br />
      Tel:&nbsp;
      <a href="tel:+19543944640" style={{ textDecoration: 'none', color: secondary.dark }}>
        +1 954-394-4640
      </a>
      <br />
    </div>
  );
}
