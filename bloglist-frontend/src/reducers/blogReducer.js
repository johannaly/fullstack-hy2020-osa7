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
 
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        default:
            return state
    }
}

export default blogReducer