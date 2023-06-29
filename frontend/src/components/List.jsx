import React from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);
  const [state, setState] = useState(listItem);
  
  // console.log("state ", state);
  // console.log("LIST ITEM ", listItem);

  const onDragEnd = (result) => {
    console.log("result: ", result);
    const { destination, source } = result;

    // If user tries to drop in unknown destination
    if (!destination) return;

    // If user destination === source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Retrieve the source and destination lists from the state
    const sourceListIndex = state.listSlice.list.findIndex(
      (item) => item.id === source.droppableId
    );
    const destinationListIndex = state.listSlice.list.findIndex(
      (item) => item.id === destination.droppableId
    );
    // console.log("----------", list);
    const updatedListItem = { ...listItem };

    // Reorder cards within the same list
    if (source.droppableId === destination.droppableId) {
      const sourceList = updatedListItem.listSlice.list[sourceListIndex];
      const [draggedItem] = sourceList.children.splice(source.index, 1);
      sourceList.children.splice(destination.index, 0, draggedItem);
    } else {

      // Move card from source list to destination list
      const sourceList = updatedListItem.listSlice.list[sourceListIndex];
      const destinationList =
        updatedListItem.listSlice.list[destinationListIndex];

      const [draggedItem] = sourceList.children.splice(source.index, 1);
      destinationList.children.splice(destination.index, 0, draggedItem);
    }

    setState(updatedListItem);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {listItem.map((list) => (
        <div className="p-3 w-1/3" key={list.id}>
          <div className="p-3 bg-gray-200">
            <div className="mb-4"> {list.title} </div>
            <Droppable droppableId={list.id}>
              {(droppableProvided, droppableSnapshot) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  {list.children && list.children.length > 0 ? (
                    list.children.map((children, index) => (
                      <Draggable
                        key={children.id}
                        draggableId={`${children.id}`}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            {/* {draggableProvided.placeholder} */}
                            <Card key={children.id} cardInfo={children} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <div>No cards</div>
                  )}
                  {droppableProvided.placeholder}
                  <div className="mt-3">
                    <AddNew type="card" parentId={list.id} />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      ))}

      <div className="p-3 w-1/3">
        <div className="p-3 bg-gray-200">
          <AddNew />
        </div>
      </div>
    </DragDropContext>
  );
};

export default List;
