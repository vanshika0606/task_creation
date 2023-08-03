import React, { useEffect, useState } from "react";
import "./update.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getId,
  getList,
  getStatus,
  getUpdate,
  setStatus,
  setUpdate,
  updateList,
} from "../features/list/listsSlice";

const Update = (props) => {
  const id = useSelector(getId);
  const dispatch = useDispatch();
  const list = useSelector(getList);
  const [task, setTask] = useState(list);
  const update = useSelector(getUpdate);

  let value, name;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTask({ ...task, [name]: value });
  };
  // console.log(task.status)

  const Updatetask = async (e) => {
    e.preventDefault();
    dispatch(setUpdate(0));
    const { title, description, status } = task;

    dispatch(updateList({ title, description, status, id }));

    dispatch(setStatus("idle"));

    setTask({
      title: "",
      description: "",
      status: "",
    });
  };
  return (
    <div className={update === 1 ? "update-form" : "none"}>
      <form method="PUT">
        <div className="form">
          <input
            type="text"
            name="heading"
            value={task.title}
            placeholder="Heading"
            onChange={handleInput}
          />
          <textarea
            type="text"
            id="task"
            rows={5}
            style={{ width: "300px" }}
            name="description"
            value={task.description}
            placeholder="Description"
            onChange={handleInput}
          />
          <div className="select">
            <select
              id="completed"
              name="status"
              onChange={handleInput}
              value={task.status}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="close">Close</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit update-button"
            onClick={Updatetask}
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
