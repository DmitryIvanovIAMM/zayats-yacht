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
      <a href="mailto:CustomerService@zayats-yacht.com" style={emailStyle}>
        CustomerService@zayats-yacht.com
      </a>
    </div>
  );
}
