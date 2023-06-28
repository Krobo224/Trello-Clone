import React, {useState} from "react";
// import Filter from "./Filter";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";

const reorderList = (sourceList, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceList.id);
  const [removed] = newTaskIds.splice(startIndex, 1); // removing
  newTaskIds.splice(endIndex, 0, removed); // not removing any item

  const newList = {
    ...sourceList,
    taskIds: newTaskIds,
  }

  return newList;
}

const Body = () => {
  const [state, setState] = useState(false);
  // const onDragEnd = (result) => {
  //   const { destination, source } = result;

  //   // If user tries to drop in unknown destination
  //   if (!destination) return;

  //   // If user destination == source
  //   if (destination.droppableId === source.droppableId && destination.index === source.index) {
  //     return;
  //   }

  //   // If the user drops within same list but in different postion
  //   const sourceList = state.list[source.droppableId];
  //   const destinationList = state.list[destination.droppableId]

  //   if(sourceList.id === destinationList.id) {
  //     const newList = reorderList(
  //       sourceList,
  //       source.index,
  //       destination.index
  //     )

  //     const newState = {
  //       ...state, 
  //       list: {
  //         ...state.list,
  //         [newList.id]: newList
  //       },
  //     };
  //     setState(newState);
  //     return;
  //   }

    // If user drops to other list


  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-3 w-full border">
        {/* <Filter /> */}
        <div className="flex flex-wrap ">
          <List />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Body;
