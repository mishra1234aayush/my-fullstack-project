import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  obj : '',
}

const otpSlice = createSlice({
    name :'otp',
    initialState,
    reducers : {
        inform : (state,action) => {
         state.obj = action.payload
        }
    }
})

export default otpSlice.reducer;
export const { inform } = otpSlice.actions;