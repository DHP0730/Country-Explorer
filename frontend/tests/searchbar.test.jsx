import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../src/components/SearchBar';

describe('SearchBar', () => {
  it('calls onSearch when typing in the input', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('Search by country name...');
    
    // Simulate user typing in the input field
    fireEvent.change(input, { target: { value: 'Japan' } });

    // Check if onSearch was called with the correct value
    expect(onSearchMock).toHaveBeenCalledWith('Japan');
  });
});
