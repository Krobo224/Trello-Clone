import React from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = () => {
  const listItem = useSelector((store) => store.listSlice.list);

  return (
    <>
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
                  {list?.children?.length > 0 &&
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
                    ))}
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
    </>
  );
};

export default List;
