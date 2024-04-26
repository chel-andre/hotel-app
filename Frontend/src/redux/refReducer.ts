import { createSlice } from "@reduxjs/toolkit"






const initialState = {
    service: "",
    featured: ""
}

const refSlice = createSlice({
    name: "ref",
    initialState,
    reducers: {
        setService: (state, action) =>{
          return  state.service = action.payload;
        },
        setFeatured: (state, action) =>{
            return state.featured = action.payload;
        }
    }
});

export const {setService, setFeatured} = refSlice.actions;
export default refSlice.reducer;

