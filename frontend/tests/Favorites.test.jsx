import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Favorites from '../src/pages/Favorites';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock necessary modules
jest.mock('axios');
jest.mock('../src/components/Navbar', () => () => <div>Mocked Navbar</div>);
jest.mock('../src/components/CountryCard', () => ({ country, onSelect }) => (
  <div onClick={() => onSelect(country.countryCode)}>
    {country.name}
    <button>Remove</button>
  </div>
));

// Mock window.alert
global.alert = jest.fn();

// Helper function to render component with Router context
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('Favorites', () => {
  // Setup mocks
  const mockFavorites = [
    { countryCode: 'US', name: 'United States' },
    { countryCode: 'CA', name: 'Canada' },
  ];

  const mockToken = 'fakeToken';
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    jest.clearAllMocks();
    getItemSpy.mockReturnValue(mockToken);
  });

  it('should render message if no favorites added', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    await act(async () => {
      renderWithRouter(<Favorites />);
    });

    expect(screen.getByText('No favorites added yet.')).toBeInTheDocument();
  });

  it('should display the list of favorite countries', async () => {
    axios.get.mockResolvedValueOnce({ data: mockFavorites });

    await act(async () => {
      renderWithRouter(<Favorites />);
    });

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('should redirect to login if not logged in', async () => {
    getItemSpy.mockReturnValue(null);

    await act(async () => {
      renderWithRouter(<Favorites />);
    });

    expect(global.alert).toHaveBeenCalledWith('You are not logged in. Redirecting to login page...');
  });
});