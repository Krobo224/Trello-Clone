import React, { useState, useEffect } from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  console.log(sourceCol);
  const newChildrens = Array.from(sourceCol.children);
  const [removed] = newChildrens.splice(startIndex, 1);
  newChildrens.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    children: newChildrens,
  };

  return newColumn;
};

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);  // the current state is returned
  const [state, setState] = useState(listItem);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    console.log("desintation", destination, "source", source);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log("HHH", state);

    const sourceCol = state.filter((item) => item.id === source.droppableId)[0];
    const destinationCol = state.filter(
      (item) => item.id === destination.droppableId
    )[0];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const listIndex = state.findIndex((item) => item.id === newColumn.id);
      const newArray = [...state]; // copy of the state
      newArray[listIndex] = newColumn;
      setState(newArray);

      return;
    }

    const initialChildren = Array.from(sourceCol.children);
    const [removed] = initialChildren.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      children: initialChildren,
    };

    const finalChildren = Array.from(destinationCol.children);
    finalChildren.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      children: finalChildren,
    };

    const startListIndex = state.findIndex(
      (item) => item.id === newStartCol.id
    );
    const endListIndex = state.findIndex((item) => item.id === newEndCol.id);
    const newArray = [...state];
    newArray[startListIndex] = newStartCol;
    newArray[endListIndex] = newEndCol;

    setState(newArray);
  };

  useEffect(() => {
    setState(listItem);
  }, [listItem]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.map((list) => (
        <div className="p-3 w-1/3" key={list.id}>
          <div className="p-3 bg-gray-200">
            <div className="mb-4">{list.title}</div>
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
                        draggableId={children.id}
                        index={index}
                      >
                        {(draggableProvided, draggableSnapshot) => (
                          <div
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            <Card key={children.id} cardInfo={children} setState={setState} state={state} />
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
