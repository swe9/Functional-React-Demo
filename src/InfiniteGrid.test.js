import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InfiniteGrid from 'InfiniteGrid'

// Test failed without explict Provider wrapper, borrowed this from index.js
test('renders InfiniteGrid', () => {
    let items = [];
    const nextPage = jest.fn();
    const openItem = jest.fn();
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
            openItem={openItem}
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

test('calls nextPage handler on scrolling', () => {
    let items = [];
    const nextPage = jest.fn();
    const openItem = jest.fn();
    const renderItem = (item) => {
        return (
            <div height="200px">Item {item.id}</div>
        )
    }

    for(var id=0; id<15; id++) { items.push({ id: id })}

    render(
        <InfiniteGrid
            items={items}
            itemsPerRow="3"
            nextPage={nextPage}
            openItem={openItem}
            renderItem={renderItem}
        />
    );

    expect(nextPage).toHaveBeenCalledTimes(0)
    fireEvent.scroll(global, { target: { scrollY: 100 }})
    expect(nextPage).toHaveBeenCalledTimes(1)
});

test('calls openItem when item is clicked', async () => {
    let items = [];
    const nextPage = jest.fn();
    const openItem = jest.fn();
    const renderItem = (item) => {
        return (
            <div height="200px">Item {item.id}</div>
        )
    }

    for(var id=0; id<15; id++) { items.push({ id: id })}

    render(
        <InfiniteGrid
            items={items}
            itemsPerRow="3"
            nextPage={nextPage}
            openItem={openItem}
            renderItem={renderItem}
        />
    );

    expect(openItem).toHaveBeenCalledTimes(0)
    const gridElement = screen.getByText("Item 1");
    await userEvent.click(gridElement)
    expect(openItem).toHaveBeenCalledTimes(1)
    expect(openItem).toHaveBeenCalledWith("1")
});

