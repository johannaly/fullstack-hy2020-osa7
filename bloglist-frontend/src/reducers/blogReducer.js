import blogService from '../services/blogs'

export const createNewBlog = (data) => {
    return async dispatch => {
        const newBlog = await blogService.create(data)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        //console.log('blogs:' , blogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const addNewLike = (data) => {
    return async dispatch => {
        const updatedBlog = await blogService.modifyBlog(data)
        dispatch({
            type: 'ADD_LIKE',
            data: updatedBlog
        })
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG'
        })
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'ADD_LIKE':
            return state
        case 'DELETE_BLOG': 
            return state
        default:
            return state
    }
}

export default blogReducer