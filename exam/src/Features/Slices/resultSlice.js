import { createSlice } from "@reduxjs/toolkit";

const initialState={

    result:{}

}



export const resultSlice=createSlice({
    name:"counts",
    initialState,
    reducers:{
        updateCounts: (state, action) => {
            state.counts = action.payload;
          },
       

    }
},

)

export const {updateCounts}=resultSlice.actions
export default resultSlice.reducer


