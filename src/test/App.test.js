import {render, screen} from '@testing-library/react';
import App from '../App';

test('renders pie chart block', () => {
    render(<App/>);
    const pieHeading = screen.getByText(/Reviews by Rating/i);
    expect(pieHeading).toBeInTheDocument();
});

test('renders word cloud block', () => {
    render(<App/>);
    const wordCloudHeading = screen.getByText(/Words in Reviews/i);
    expect(wordCloudHeading).toBeInTheDocument();
});
