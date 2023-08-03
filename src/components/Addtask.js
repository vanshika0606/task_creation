import React, { useState } from "react";

import "./Addtask.css";
import { useDispatch, useSelector } from "react-redux";
import { addList, getClick, setClick } from "../features/list/listsSlice";

const Addtask = () => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(0);
  const click = useSelector(getClick);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "",
  });

  let value, name;
  const handleChange = (e) => {
    // console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const Addtask = async (e) => {
    e.preventDefault();

    const { title, description, status } = task;

    dispatch(addList({ title, description, status }));

    setAdded(1);

    setTask({
      title: "",
      description: "",
      status: "",
    });
  };

  const fetchData = async (e) => {
    e.preventDefault();

    dispatch(setClick(1));
  };

  return (
    <div className={click === 0 ? "form-body" : "none"}>
      <form method="POST">
        <div className="form">
          <input
            type="text"
            name="title"
            value={task.title}
            placeholder="Title"
            onChange={handleChange}
            onClick={() => {
              setAdded(0);
            }}
          />
          <textarea
            type="text"
            id="task"
            rows={5}
            name="description"
            value={task.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <div className="select">
            <select id="completed" name="status" onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="close">Close</option>
            </select>
          </div>
          <button type="submit" className="submit" onClick={Addtask}>
            Add Task
          </button>

          <div className={added ? "task-add" : "none"}>
            Task added successfully
          </div>
        </div>

        <div>
          <button className="show_all submit" onClick={fetchData}>
            Show All Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addtask;
