import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from './AboutUs';

describe('AboutUs component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<AboutUs />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders key headings and descriptive text', () => {
    render(<AboutUs />);

    expect(screen.getByText('Zayats Yacht Transport')).toBeInTheDocument();
    expect(screen.getByText('Our Heritage')).toBeInTheDocument();
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Our Commitment')).toBeInTheDocument();
    expect(screen.getByText('Join Us')).toBeInTheDocument();
    expect(
      screen.getByText('Explore. Transport. Discover. With Zayats Yacht Transport.')
    ).toBeInTheDocument();
  });

  it('renders services list items', () => {
    render(<AboutUs />);

    expect(screen.getByText('International Yacht Shipping:')).toBeInTheDocument();
    expect(screen.getByText('Customs Clearance:')).toBeInTheDocument();
    expect(screen.getByText('Cradling and Shrink Wrapping:')).toBeInTheDocument();
    expect(screen.getByText('Load Master Supervision:')).toBeInTheDocument();
    expect(screen.getByText('Insurance:')).toBeInTheDocument();
  });

  it('renders responsive picture with main image', () => {
    render(<AboutUs />);

    const img = screen.getByAltText('about-us-image') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/aboutus.jpeg');
    expect(img).toHaveAttribute('width', '100%');

    const source = document.querySelector(
      'source[media="(max-width: 600px)"]'
    ) as HTMLSourceElement | null;
    expect(source).not.toBeNull();
    expect(source).toHaveAttribute('srcset', '/images/aboutus_sm.jpeg');
  });
});
