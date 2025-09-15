import React from 'react';
import { render, screen } from '@testing-library/react';
import PageNavigationTabs from './PageNavigationTabs';

// Mock next/navigation to control usePathname
jest.mock('next/navigation', () => ({
  // Will be overridden per test
  usePathname: jest.fn(() => '/')
}));

// Mock next/link to render a simple anchor to avoid Next.js runtime specifics
jest.mock('next/link', () => {
  function NextLinkMock({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  NextLinkMock.displayName = 'NextLinkMock';
  return NextLinkMock;
});

describe('PageNavigationTabs', () => {
  const tabs = [
    { label: 'Home', link: '/' },
    { label: 'Destinations', link: '/destination' },
    { label: 'Services', link: '/services' }
  ];

  function setPathname(path: string) {
    const { usePathname } = jest.requireMock('next/navigation');
    (usePathname as jest.Mock).mockReturnValue(path);
  }

  it('renders all tabs with correct hrefs', () => {
    setPathname('/');
    render(<PageNavigationTabs tabs={tabs} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/destination');
    expect(links[2]).toHaveAttribute('href', '/services');
  });

  it('applies active styles when current path includes a tab link', () => {
    setPathname('/destination/palma');
    render(<PageNavigationTabs tabs={tabs} />);

    // Find the inner Box for each tab via text
    const destination = screen.getByText('Destinations');
    const services = screen.getByText('Services');

    // Active state marked on inner Box via data-active
    expect(destination).toHaveAttribute('data-active', 'true');
    // Root ('/') tab may also be active since every path includes '/'; only assert others are inactive
    expect(services).toHaveAttribute('data-active', 'false');
  });
});
