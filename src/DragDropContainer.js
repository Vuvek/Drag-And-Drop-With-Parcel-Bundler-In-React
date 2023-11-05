import React from "react";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  getItemsFromLocalStoreage,
  getItems,
} from "../utils/reUsableFunctions";
import DroppableContainer from "./DroppableContainer";

const DragDropContainer = () => {
  const [itemOneList, setItemListOne] = useState([]);
  const [itemTwoList, setItemTwoList] = useState([]);

  useEffect(() => {
    const dragItemsOne = getItemsFromLocalStoreage("itemOneList");
    const dragItemsTwo = getItemsFromLocalStoreage("itemTwoList");
    if (dragItemsOne && dragItemsTwo) {
      setItemListOne(dragItemsOne);
      setItemTwoList(dragItemsTwo);
    } else if (dragItemsOne) {
        setItemListOne(dragItemsOne);
        setItemTwoList(getItems(10,10));
      } else if (dragItemsTwo) {
        setItemListOne(getItems(10));
        setItemTwoList(dragItemsTwo);
      } else {
      setItemListOne(getItems(10));
      setItemTwoList(getItems(10, 10));
    }
  }, []);

  const reorder = (listOne, listTwo, source, destination) => {
    let context1 = Array.from(listOne);
    let context2 = Array.from(listTwo);

    if (source.droppableId == "droppable1") {
      if (destination.droppableId == "droppable2") {
        let [removed] = context1.splice(source.index, 1);
        context2.splice(destination.index, 0, removed);
        setItemListOne(context1);
        setItemTwoList(context2);
        localStorage.setItem("itemOneList", JSON.stringify(context1));
        localStorage.setItem("itemTwoList", JSON.stringify(context2));
      } else {
        let [removed] = context1.splice(source.index, 1);
        context1.splice(destination.index, 0, removed);
        setItemListOne(context1);
        localStorage.setItem("itemOneList", JSON.stringify(context1));
      }
    } else if (source.droppableId == "droppable2") {
      if (destination.droppableId == "droppable1") {
        let [removed] = context2.splice(source.index, 1);
        context1.splice(destination.index, 0, removed);
        setItemListOne(context1);
        setItemTwoList(context2);
        localStorage.setItem("itemOneList", JSON.stringify(context1));
        localStorage.setItem("itemTwoList", JSON.stringify(context2));
      } else {
        let [removed] = context2.splice(source.index, 1);
        context2.splice(destination.index, 0, removed);
        setItemTwoList(context2);
        localStorage.setItem("itemOneList", JSON.stringify(context1));
      }
    }
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    reorder(itemOneList, itemTwoList, result.source, result.destination);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="first">
        <DroppableContainer itemList={itemOneList} droppableId={"droppable1"} />
      </div>
      <div className="second">
        <DroppableContainer itemList={itemTwoList} droppableId={"droppable2"} />
      </div>
    </DragDropContext>
  );
};

export default DragDropContainer;
