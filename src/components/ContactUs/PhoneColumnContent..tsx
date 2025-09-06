import React from 'react';
import { secondary } from '../colors';

export default function PhoneColumnContent() {
  return (
    <div style={{ fontSize: '16px', lineHeight: '150%' }}>
      <br />
      Tel:&nbsp;
      <a href="tel:+15555555555" style={{ textDecoration: 'none', color: secondary.dark }}>
        +1 555-555-5555
      </a>
      <br />
    </div>
  );
}
