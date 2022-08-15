import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';
import { TestWrapper } from '../../test';

test('renders "Managing vaccinations made easy" heading', () => {
  render(
    <TestWrapper>
      <LandingPage />
    </TestWrapper>
  );
  const headingEl = screen.getByText(/Managing vaccinations/i);
  expect(headingEl).toBeInTheDocument();
});
