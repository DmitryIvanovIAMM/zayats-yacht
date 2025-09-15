import React from 'react';
import { render, screen } from '@testing-library/react';
import LazyViewedSection from './LazyViewedSection';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('LazyViewedSection', () => {
  const title = 'Lazy Loaded Area';
  const sectionId = 'lazy-section';
  const childText = 'I am lazy content';

  beforeEach(() => {
    // Ensure each test starts with observers reset/not intersecting
    mockAllIsIntersecting(false);
  });

  it('renders the section title and root wrapper with id', () => {
    render(
      <LazyViewedSection id={sectionId} title={title}>
        <div>{childText}</div>
      </LazyViewedSection>
    );

    // Title is rendered via SectionTitle
    expect(screen.getByText(title)).toBeInTheDocument();
    // Root wrapper has the provided id
    const root = document.getElementById(sectionId);
    expect(root).toBeTruthy();
  });

  it('does not render children before the section is in view', () => {
    render(
      <LazyViewedSection id={sectionId} title={title}>
        <div data-testid="lazy-child">{childText}</div>
      </LazyViewedSection>
    );

    expect(screen.queryByTestId('lazy-child')).not.toBeInTheDocument();
    expect(screen.queryByText(childText)).not.toBeInTheDocument();
  });

  it('renders children once the section enters the viewport', () => {
    render(
      <LazyViewedSection id={sectionId} title={title}>
        <div data-testid="lazy-child">{childText}</div>
      </LazyViewedSection>
    );

    // Simulate the InView observer intersecting
    mockAllIsIntersecting(true);

    expect(screen.getByTestId('lazy-child')).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
