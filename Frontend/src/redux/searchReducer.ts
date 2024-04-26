import { createSlice } from "@reduxjs/toolkit";

interface searchType {
    searchQuery: {
        destination: string;
        childCount: number | null;
        adultCount: number | null;
        checkInDate: Date | null;
        checkOutDate: Date | null;
    }
}

const initialState: searchType = {
    searchQuery: {
        destination: "",
        childCount: null,
        adultCount: null,
        checkInDate: null,
        checkOutDate: null,

    }
}


const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) =>{
            state.searchQuery = {
                ...action.payload
            }
        }
    }

});

export const {setSearchQuery} =  SearchSlice.actions;
export default SearchSlice.reducer;