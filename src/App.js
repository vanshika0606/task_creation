import React, { useEffect, useState } from "react";
import "./App.css";
import Addtask from "./components/Addtask";
import Card from "./components/Card.js";
import Update from "./components/Update";
import { useSelector } from "react-redux";
import { getClick, getUpdate } from "./features/list/listsSlice";

function App() {
  const click = useSelector(getClick);
  const update = useSelector(getUpdate);

  return (
    <div className="App">
      {!click ? <Addtask /> : <Card />}

      {update ? <Update /> : ""}
    </div>
  );
}

export default App;
