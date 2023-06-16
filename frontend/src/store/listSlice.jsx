import { createSlice } from "@reduxjs/toolkit";
const listSlice = createSlice({
  name: "listSlice",
  initialState: {
    list: [], // array or list stroing the list of cards
  },

  reducers: {
    addList: (state, action) => {
      state.list.push(action.payload);
      console.log("Action Called", action);
    },
    addCard: (state, action) => {
      // console.log("action", action);
      state.list.forEach((item) => {
        if (item.id === action.payload.parentId) {
          // the object has children property then we can push the card
          // else we need to update the children property the push the card

          if (Object.hasOwn(item, "children")) {
            item.children.push(action.payload);
          } else {
            item.children = [];
            item.children.push(action.payload);
          }
        }
      });
    },
  },
});

export const { addList, addCard } = listSlice.actions;
export default listSlice.reducer;
