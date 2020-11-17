import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    notificationReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

console.log(store.getState())

export default store