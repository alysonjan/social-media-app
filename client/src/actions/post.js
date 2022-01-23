import axiosInstance from '../helpers/axios';
import { setAlert } from './alert';
import { ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS, POST_ERROR, REMOVE_COMMENT, UPDATE_LIKES } from './constant';

// GET POSTS
export const getPosts = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// ADD LIKE
export const addLike = id => async dispatch => {
    try {
        const res = await axiosInstance.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// REMOVE LIKE
export const removeLike = id => async dispatch => {
    try {
        const res = await axiosInstance.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// DELETE POST
export const deletePost = id => async dispatch => {
    try {
        await axiosInstance.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Remove', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// ADD POST
export const addPost = formData => async dispatch => {
    try {
        const res = await axiosInstance.post(`/api/posts`,formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// GET POST
export const getPost = id => async dispatch => {
    try {
        const res = await axiosInstance.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// ADD COMMENT
export const addComment = (postId, formData) => async dispatch => {
    try {
        const res = await axiosInstance.post(`/api/posts/comment/${postId}`,formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// DELETE COMMENT
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axiosInstance.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

