import { render, screen } from '@testing-library/react';
import InfiniteGrid from 'InfiniteGrid'

// Test failed without explict Provider wrapper, borrowed this from index.js
test('renders InfiniteGrid', () => {
    let items = [];
    const nextPage = jest.fn();
    const openItemHandler = jest.fn();
    const renderItem = (item) => {
        return (
            <div>Item {item.id}</div>
        )
    }

    [ "1", "2", "3", "4" ].forEach(id => items.push({ id: id }) );

    render(
        <InfiniteGrid
            items={items}
            itemsPerRow="3"
            nextPage={nextPage}
            openItem={openItemHandler}
            renderItem={renderItem}
        />
    );

    const rowElements = screen.getAllByTestId('row');
    expect(rowElements.length).toBe(2);

    const itemElements = screen.getAllByText(/Item/);
    expect(itemElements.length).toBe(items.length);

    const gridElement = screen.getByText("Item 1");
    expect(gridElement).toBeInTheDocument();
});
