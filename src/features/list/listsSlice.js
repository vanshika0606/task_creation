import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const Base_URL = "http://localhost:3000/";

const initialState = {
  lists: [],
  status: "idle",
  error: null,
  id: '',
  list:{},
  click: 0,
  update: 0
};

export const addList = createAsyncThunk("lists/addList", async (list) => {
  const { title, description, status } = list;
  const res = await fetch(`${Base_URL}add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      status,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.list);

  return res;
});

export const updateList = createAsyncThunk('lists/updateList', async (list) => {
  // console.log(list.iid);
  const { title, description, status } = list;
  // console.log(task);
  const res = await fetch(Base_URL + list.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      status,
    }),
  });
  // console.log(res);

})

export const fetchLists = createAsyncThunk('lists/fetchLists', async () => {
  const lists = await fetch(`${Base_URL}lists`)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res.list);
      return res.list;
    });
  // console.log("lists, ", lists);
  return lists;
});

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers:{
    setId:{
      reducer(state, action){
        state.id = action.payload;
        // console.log(state.id);
      }
    },
    setStatus:{
      reducer(state, action) {
        console.log(action.payload);
        state.status =action.payload;
      }
    },
    setList:{
      reducer(state, action) {
        // console.log(action.payload);
        state.list = action.payload;
      }
    },
    setClick:{
      reducer(state, action) {
        state.click = action.payload;
      }
    },
    setUpdate:{
      reducer(state, action){
        state.update = action.payload;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addList.fulfilled, (state, action) => {
        //   console.log(action.payload);
        state.lists.push(action.payload);
      })
      .addCase(fetchLists.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "success";
        // console.log(action.payload);
        state.lists = action.payload;
      })
      .addCase(updateList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.status = "success";
      })
      
  },
});

export const getAllLists = (state) => state.lists.lists;
export const getStatus = (state) => state.lists.status;
export const getList = (state) => state.lists.list;
export const getId = (state) => state.lists.id;
export const getClick = (state) => state.lists.click;
export const getUpdate = (state) => state.lists.update;

export const {setId, setStatus, setList, setClick, setUpdate} = listsSlice.actions;

export default listsSlice.reducer;
