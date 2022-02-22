import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testingProps = {
    id: 1,
    image: 'img here',
    name: 'name',
    season: 1,
    number: 1,
    summary: 'summary',
    runtime: 1
}

test("renders without error", () => {
    render(<Episode episode={testingProps}/>)
 });

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={testingProps} />)
    const summary = screen.queryByText('summary')
    expect(summary).toBeInTheDocument()
});

test("renders default image when image is not defined", () => {
    render(<Episode episode={testingProps} />)
    const defaultImage = screen.queryAllByAltText('./stranger_things.png')
    expect(defaultImage).toBeInTheDocument()
 });
