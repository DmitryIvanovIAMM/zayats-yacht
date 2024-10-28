import React from 'react';
import { secondary } from '../colors';

const emailStyle = {
  textDecoration: 'none',
  color: secondary.dark
};

export default function EmailsColumnContent() {
  return (
    <div style={{ fontSize: '16px', lineHeight: '150%' }}>
      <br />
      <a href="mailto:sales@allied-yacht.com" style={emailStyle}>
        sales@allied-yacht.com
      </a>
      <br />
      <a href="mailto:operations@allied-yacht.com" style={emailStyle}>
        operations@allied-yacht.com
      </a>
    </div>
  );
}
