import React from 'react';

const PROJECT_START_YEAR = 2024;

const CopyrightFooter: React.FC = () => {
  return (
    <div
      style={{
        width: `100%`,
        backgroundColor: '#0A2A3B',
        color: 'white',
        textAlign: 'center',
        padding: '8px 0px 8px 0px',
        margin: '0px'
      }}
    >
      {'\u00A9'} Zayats Yacht Transport,{' '}
      {new Date().getFullYear() > PROJECT_START_YEAR
        ? `${PROJECT_START_YEAR} - ${new Date().getFullYear()}`
        : `${new Date().getFullYear()}`}
      {process.env.NODE_ENV === 'production' ? '' : `,${'\u00A0\u00A0'}v1.01`}
      <br />
      <div>
        <a
          href="https://allied-yacht.com/privacy-policy"
          style={{
            color: 'white',
            textDecoration: 'none'
          }}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default CopyrightFooter;
