import {createSlice} from '@reduxjs/toolkit'

let initialState = false

let alphabaticalSortReducer = createSlice({
    name : 'alphabaticalSort data',
    initialState,
    reducers : {
        alphabaticalSortDataRed(state) {
            return !state
        }
    }
})

export default alphabaticalSortReducer.reducer

export const {alphabaticalSortDataRed} = alphabaticalSortReducer.actions
