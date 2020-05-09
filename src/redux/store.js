import { createStore } from 'redux'
import notesReducer from './notesApp'
import { applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

const store = createStore(notesReducer,applyMiddleware(thunk))

export default store
