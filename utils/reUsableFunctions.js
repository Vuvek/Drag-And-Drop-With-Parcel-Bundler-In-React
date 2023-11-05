export const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "10px",
    margin: "0 0 10px 0",
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  });
  
export const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "10px",
    width: 250,
  });
  
export const getItemsFromLocalStoreage = (key) => {
      const item =  localStorage.getItem(key);
      if(item) {
          return JSON.parse(item)
      }
  }
  
export const getItems = (count, startIndex = 0) =>
    Array.from({ length: count }, (_, index) => startIndex + index * 1).map((k) => ({
      id: k,
      content: `item ${k}`,
    }));