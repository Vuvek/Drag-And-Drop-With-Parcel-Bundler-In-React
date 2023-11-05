import './css/app.css'
import ReactDOM from "react-dom";
import React, {useEffect, useState} from "react";
import DragDropContainer from "./src/DragDropContainer";



const DragDrop = () => {

  return (
    <div className="container">
      <DragDropContainer />
    </div>
  );
};

ReactDOM.render(<DragDrop />, document.getElementById("root"));
