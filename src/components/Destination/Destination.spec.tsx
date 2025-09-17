import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Destination from './Destination';

describe('Destination component', () => {
  it('renders NotFound when destinationId is missing or invalid', () => {
    const { container } = render(<Destination />);
    expect(container).toHaveTextContent('404 - Not Found');

    const { container: invalid } = render(<Destination destinationId={'invalid-id'} />);
    expect(invalid).toHaveTextContent('404 - Not Found');
    expect(screen.getAllByText('Main page')[0]).toBeInTheDocument();
  });

  it('renders destination details and images for a known id', () => {
    const id = '41224d776a326fb40f001102'; // Palma de Mallorca, Spain
    const { container } = render(<Destination destinationId={id} />);

    // Header content
    expect(container).toHaveTextContent('Palma de Mallorca, Spain');
    expect(container).toHaveTextContent('Grand pre selling');

    // Map picture: source (sm) and img (md+)
    const source = container.querySelector('source[media="(max-width: 600px)"]') as HTMLSourceElement | null;
    expect(source).not.toBeNull();
    expect(source).toHaveAttribute('srcset', '/images/destinations/palmaMap_sm.jpg');

    const mapImg = container.querySelector('picture img[alt="desination-map-image"]') as HTMLImageElement | null;
    expect(mapImg).not.toBeNull();
    expect(mapImg).toHaveAttribute('src', '/images/destinations/palmaMap.jpg');

    // First section
    expect(container).toHaveTextContent('Palma de Mallorca');
    const firstImg = container.querySelector('img[alt="destination image"]') as HTMLImageElement | null;
    expect(firstImg).not.toBeNull();
    expect(firstImg).toHaveAttribute('src', '/images/destinations/palmaFirstRow.jpg');

    // Second section image is the next image tag with same alt
    const images = Array.from(container.querySelectorAll('img[alt="destination image"]')) as HTMLImageElement[];
    expect(images.length).toBeGreaterThanOrEqual(2);
    expect(images[1]).toHaveAttribute('src', '/images/destinations/palmaSecondRow.jpg');

    // Last image at the bottom
    const allImgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    expect(allImgs.some((img) => img.src.endsWith('/images/destinations/palmaLastSection.jpg'))).toBe(true);
  });
});
