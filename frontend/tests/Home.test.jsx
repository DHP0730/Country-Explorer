import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/pages/Home';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

// Mock components used inside Home
jest.mock('../src/components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../src/components/SearchBar', () => ({ onSearch }) => <input placeholder="Search" onChange={(e) => onSearch(e.target.value)} />);
jest.mock('../src/components/FilterMenu', () => ({ onFilter }) => <button onClick={() => onFilter('Asia')}>Filter Asia</button>);
jest.mock('../src/components/CountryList', () => ({ countries, onSelect }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.common} onClick={() => onSelect(country.cca3)}>{country.name.common}</div>
    ))}
  </div>
));
jest.mock('../src/components/CountryDetails', () => ({ country, onBack }) => (
  <div>
    <h1>{country.name.common}</h1>
    <button onClick={onBack}>Back</button>
  </div>
));

// Mock axios
jest.mock('axios');

describe('Home Page', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('all')) {
        return Promise.resolve({ data: [{ name: { common: 'Japan' }, cca3: 'JPN' }] });
      }
      if (url.includes('alpha')) {
        return Promise.resolve({ data: [{ name: { common: 'Japan' }, cca3: 'JPN' }] });
      }
      if (url.includes('favorites')) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({ data: [] });
    });

    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders Home page with countries', async () => {
    render(<Home />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Country Explorer')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument();
    });
  });

  it('shows country details when clicked and back button works', async () => {
    render(<Home />);

    await waitFor(() => {
      const country = screen.getByText('Japan');
      userEvent.click(country);
    });

    await waitFor(() => {
      expect(screen.getByText('Japan')).toBeInTheDocument(); // Inside CountryDetails
      userEvent.click(screen.getByText('Back'));
    });

    await waitFor(() => {
      expect(screen.getByText('Country Explorer')).toBeInTheDocument(); // Back to list
    });
  });
});
