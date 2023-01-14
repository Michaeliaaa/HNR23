import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface State {
  items: string[];
}

interface Props {
    input: string[] | null;
}

export default class PageOrder extends Component<Props, State> {

  state = {
      items: this.props.input
      ? [...this.props.input]
      : [
          'Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5', 'Page 6', 'Page 7', 'Page 8', 'Page 9', 'Page 10',
          'Page 11', 'Page 12', 'Page 13', 'Page 14', 'Page 15', 'Page 16', 'Page 17', 'Page 18', 'Page 19', 'Page 20',
          'Page 21', 'Page 22', 'Page 23', 'Page 24', 'Page 25', 'Page 26', 'Page 27', 'Page 28', 'Page 29', 'Page 30',
          'Page 31', 'Page 32', 'Page 33', 'Page 34', 'Page 35', 'Page 36', 'Page 37', 'Page 38', 'Page 39', 'Page 40',
          'Page 41', 'Page 42', 'Page 43', 'Page 44', 'Page 45', 'Page 46', 'Page 47', 'Page 48', 'Page 49', 'Page 50',
          'Page 51', 'Page 52', 'Page 53', 'Page 54', 'Page 55', 'Page 56', 'Page 57', 'Page 58', 'Page 59', 'Page 60',
          'Page 61', 'Page 62', 'Page 63', 'Page 64', 'Page 65', 'Page 66', 'Page 67', 'Page 68', 'Page 69', 'Page 70',
          'Page 71', 'Page 72', 'Page 73', 'Page 74', 'Page 75', 'Page 76', 'Page 77', 'Page 78', 'Page 79', 'Page 80',
          'Page 81', 'Page 82', 'Page 83', 'Page 84', 'Page 85', 'Page 86', 'Page 87', 'Page 88', 'Page 89', 'Page 90',
          'Page 91', 'Page 92', 'Page 93', 'Page 94', 'Page 95', 'Page 96', 'Page 97', 'Page 98', 'Page 99', 'Page 100',
      ]
  };

  onDragEnd = (result : DropResult) => {
    // Check if the draggable was dropped
    if (!result.destination) {
      return;
    }

    // Reorder the items array
    const newItems = Array.from(this.state.items);
    newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, result.draggableId);

    this.setState({ items: newItems });
  };

  render() {
    return (
        <div className="sidebar" style={{ width: "100%" }}>
            <div className="description" style={{ padding: "1rem" }}>
                 <h2 style={{ marginBottom: "1rem" }}>Page Ordering</h2>
                <p>
                    <small>
                        Drag and drop to reorder the page sequence.
                    </small>
                </p>
            </div>
            <div style={{overflow: 'auto', maxHeight: 'calc(100vh - 200px)', minHeight: '300px'}}>
                <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                {(provided) => (
                    <div 
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    >
                    {this.state.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <div style={{
                                    backgroundColor: '#eee',
                                    borderRadius: 4,
                                    padding: '4px 8px',
                                    transition: 'background-color .8s ease-out',
                                    marginTop: 8,
                                    width: "150px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                    color: snapshot.isDragging ? "#d35400" : "black",
                                }}>
                                    {item}
                                </div>
                            </div>
                        )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    </div>
                )}
                </Droppable>
                </DragDropContext>
            </div>
            <a
              style={{ color: "white", fontWeight: "bold" }}
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(this.state.items)
              )}`}
              download="order.json">Export Page Ordering Sequence</a>
        </div>

    );
  }
}