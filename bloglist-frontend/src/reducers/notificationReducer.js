const initialState = [
    {
        notification: '',
        error: false
    }
]

let timeOutId = 0

export const addNotification = (content, error, time) => {

    return async dispatch => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: { content },
            error: error
        })
        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => {
            //console.log('timer')
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })}, time * 1000)
    }
}
 

export const removeNotification = (id) => {
    return ({
        type: 'REMOVE_NOTIFICATION',
        id
    })
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            const content = action.data.content
            state = {
                notification: content,
                error: action.error
            }
            return state
        case 'REMOVE_NOTIFICATION':
            state = {
                notification: '',
                error: false
            }
            return state
        default:
            return state
    }
}

export default notificationReducer