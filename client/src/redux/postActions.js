import { useDispatch, useSelector } from "react-redux";
import client from "../utils/utils";
import { getAllPost } from "../graphQl/query";
import { actions, getPostError, getPostLoading, getPostsData } from "./postReducer";
import { CREATE_POST, DELETE_POST, UPDATE_POST } from "../graphQl/mutation";

export default function usePosts() {
    const dispatch = useDispatch();

    const postsData = useSelector(getPostsData);
    const loading = useSelector(getPostLoading);
    const error = useSelector(getPostError);

    const getFetchPost = async () => {
        dispatch(actions.SET_FETCH_POSTDATA_PENDING())
        try {
            const response = await client.query({
                query: getAllPost
            })
            dispatch(actions.SET_FETCH_POSTDATA_FULFILLED(response))
            return response
        } catch (err) {
            dispatch(actions.SET_FETCH_POSTDATA_REJECTED(err?.message))
            return err?.message
        }
    }


    const addPost = async (payload) => {
        const { title, description } = payload;
        dispatch(actions.SET_ADD_POSTDATA_PENDING())
        try {
            const response = await client.mutate({
                mutation: CREATE_POST,
                variables: { title, description }
            })
            dispatch(actions.SET_ADD_POSTDATA_FULFILLED(response))
            return response
        } catch (err) {
            dispatch(actions.SET_ADD_POSTDATA_REJECTED(err?.message))
             return err?.message
        }
    }

    const deletePosts = async (payload) => {
        const { id } = payload;
        dispatch(actions.SET_DELETE_POSTDATA_PENDING())
        try {
            const response = await client.mutate({
                mutation: DELETE_POST,
                variables: { id: id },
            })
            dispatch(actions.SET_DELETE_POSTDATA_FULFILLED(response))
             getFetchPost()
              return response
        } catch (err) {
            dispatch(actions.SET_DELETE_POSTDATA_REJECTED(err?.message))
             return err?.message
        }
    }

    const updatePost = async (payload) => {
         const { id, title, description } = payload;
        dispatch(actions.SET_UPDATE_POSTDATA_PENDING())
        try {
            const response = await client.mutate({
                mutation: UPDATE_POST,
                variables: { id, title, description }
            })
            dispatch(actions.SET_UPDATE_POSTDATA_FULFILLED(response))
             getFetchPost()
        } catch (err) {
            dispatch(actions.SET_UPDATE_POSTDATA_REJECTED(err?.message))
        }
    }

    return { getFetchPost, addPost,deletePosts,updatePost, postsData, loading, error }

}