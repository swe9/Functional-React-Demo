import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col } from 'react-grid-system';

// items MUST have an 'id' property if the openItem callback is used
export type InfiniteGridProps = {
    items: any[];
    itemsPerRow: string;
    nextPage: () => void;
    openItem: (id: string) => void;
    renderItem: (item: any) => React.ReactNode;
}

const InfiniteGrid = (props: InfiniteGridProps) => {
    function chunk_array<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
        var R = [];
        for (var i = 0, len = arr.length; i < len; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        return R;
    };

    const openItemHandler = (event: any) => {
        props.openItem(event.currentTarget.dataset.id)
    }

    if (props.items.length === 0) {
        return (
            <h4>Empty List</h4>
        )
    }

    let itemsPerRow = parseInt(props.itemsPerRow);
    return (
        <div className="InfiniteGrid">
            <InfiniteScroll
                dataLength={props.items.length}
                next={props.nextPage}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <Container>
                    {chunk_array(props.items, itemsPerRow).map((chunk) => (
                        <Row key={chunk[0].id} data-testid="row">
                            {chunk.map((item, index) => (
                                <Col key={item.id} sm={4} data-id={item.id} onClick={openItemHandler}>
                                    {props.renderItem(item)}
                                </Col>
                            ))}
                        </Row>
                    ))}
                </Container>
            </InfiniteScroll>
        </div>
    );
}

export default InfiniteGrid