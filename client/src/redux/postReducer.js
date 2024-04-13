import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postsData: [],
    loading: false,
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,

    reducers: {
        //FETCH
        SET_FETCH_POSTDATA_PENDING: (state, action) => {
            state.loading = true
            state.error = null
        },
        SET_FETCH_POSTDATA_FULFILLED: (state, action) => {
            state.loading = false
            state.postsData = action.payload
        },
        SET_FETCH_POSTDATA_REJECTED: (state, action) => {
            state.loading = false
            state.error = action.payload
        },


        // ? Delete
        SET_DELETE_POSTDATA_PENDING: (state, action) => {
            state.loading = true
            state.error = null
        },
        SET_DELETE_POSTDATA_FULFILLED: (state, action) => {
            state.loading = false
        },
        SET_DELETE_POSTDATA_REJECTED: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        
        // ? Add
        SET_ADD_POSTDATA_PENDING: (state, action) => {
            state.loading = true
            state.error = null
        },
        SET_ADD_POSTDATA_FULFILLED: (state, action) => {
            state.loading = false
        },
        SET_ADD_POSTDATA_REJECTED: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        
        // ? Delete
        SET_UPDATE_POSTDATA_PENDING: (state, action) => {
            state.loading = true
            state.error = null
        },
        SET_UPDATE_POSTDATA_FULFILLED: (state, action) => {
            state.loading = false
        },
        SET_UPDATE_POSTDATA_REJECTED: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },

})

export const actions = postSlice.actions

export const getPostsData = state => state?.post?.postsData?.data;
export const getPostError = state => state?.post?.error;
export const getPostLoading = state => state?.post?.loading;

export default postSlice.reducer