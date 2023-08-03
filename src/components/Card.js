import React, { useEffect, useState } from "react";
import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLists,
  getAllLists,
  getId,
  getStatus,
  setId,
  setStatus,
  setList,
  getClick,
  setClick,
  getUpdate,
  setUpdate,
} from "../features/list/listsSlice";
const Card = (props) => {
  const dispatch = useDispatch();
  const fetchedList = useSelector(getAllLists);
  const status = useSelector(getStatus);
  const id = useSelector(getId);
  const click = useSelector(getClick);
  const update = useSelector(getUpdate);
  const [lists, setLists] = useState([]);

  const backtask = () => {
    dispatch(setClick(0));
  };
  // console.log("status: ",status);

  useEffect(() => {
    // fetchData();
    if (status == "idle") {
      dispatch(fetchLists());
    }
    if (status === "success") {
      console.log("fetchedList ", fetchedList);
      setLists(fetchedList);
    }
  }, [status, dispatch, fetchedList]);

  return (
    <div className={click === 0 ? "none" : "shoow"}>
      <h2>All Tasks</h2>
      <button onClick={backtask} className="go-to-add">
        {" "}
        Go to Add tasks
      </button>
      <div className="cardss">
        {lists.map((l) => {
          return (
            <div className="card" key={l._id}>
              <h3>{l.title}</h3>
              <p>description - {l.description}</p>
              <p>status ? - {l.status}</p>

              <div className="delete-edit-butttons">
                <span
                  className="delete"
                  onClick={() => {
                    fetch("http://localhost:3000/" + l._id, {
                      method: "DELETE",
                    });
                    // setDeleteButton(!deleteButton);
                    dispatch(setStatus("idle"));
                  }}
                >
                  Delete
                </span>
                <span
                  className="update"
                  onClick={() => {
                    // console.log(l._id);
                    dispatch(setId(l._id));
                    dispatch(setList(l));
                    dispatch(setUpdate(1));
                  }}
                >
                  Update
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
