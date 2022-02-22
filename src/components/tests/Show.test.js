import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const showTestProps = {
    show: 'show',
    summary: 'summary',
    seasons: [
        {
            id: 1,
            name: 'name 1',
            episodes: []
        },
        {
            id: 2,
            name: 'name 2',
            episodes: []
        },
    ]
}


test('renders without errors', () => { 
    render(<Show show={showTestProps} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />)
    const loading = screen.queryByTestId('loading-container')
    expect(loading).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={showTestProps} selectedSeason={'none'}/>)
    const seasons = screen.queryAllByTestId('season-option')
    expect(seasons).toHaveLength(2)
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={showTestProps} selectedSeason={'none'} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/select a season/i)
    fireEvent.change(select, { target: { value: 2}})
    expect(handleSelect).toBeCalled()
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={showTestProps} selectedSeason={'none'} />)
    let episodes = screen.queryByTestId('episodes-container')
    expect(episodes).not.toBeInTheDocument()

    rerender(<Show show={showTestProps} selectedSeason={1} />)
});
