import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import mockFetchShow from './../../api/fetchShow'

jest.mock('./../../api/fetchShow')

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


test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTestProps)

    render(<Display />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const showContainer = await screen.findByTestId('show-container')
    expect(showContainer).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTestProps)
    render(<Display />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const seasonOptions = await screen.findAllByTestId('season-option')
    expect(seasonOptions).toHaveLength(2)
});

test('displayfunc is called when button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(showTestProps)
    const displayFunc = jest.fn()
    render(<Display displayFunc={displayFunc}/>)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled()
    })
})
