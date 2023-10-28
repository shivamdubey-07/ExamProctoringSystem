
import { createSlice } from "@reduxjs/toolkit";
const initialState={

    userData:""
  
  }
  
export const userDataSlice=createSlice({
 

  name:"userData",
  initialState,
  reducers:{

    setuserData:(state,action)=>{
      state.userData=action.payload;
    }

  }
})

export const {setuserData}=userDataSlice.actions
export default userDataSlice.reducer
