export const UPDATE_CARD_TITLE = "UPDATE_CARD_TITLE";

export const updateCardTitle = (id, parentId, title) => {
  return {
    type: UPDATE_CARD_TITLE,
    payload: {
      id,
      parentId,
      title,
    },
  };
};
