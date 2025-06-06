import React from 'react';
import { secondary } from '../colors';

export default function PhoneColumnContent() {
  return (
    <div style={{ fontSize: '16px', lineHeight: '150%' }}>
      <br />
      Tel:&nbsp;
      <a href="tel:+19549186694" style={{ textDecoration: 'none', color: secondary.dark }}>
        +1 954-918-6694
      </a>
      <br />
    </div>
  );
}
