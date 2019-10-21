import { createStore, combineReducers, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk';
import DataReducer from './reducers/DataReducer';
import { DataActionCreators } from './actions/DataActions';

const store: Store = createStore(combineReducers({
    DataReducer,
}), applyMiddleware(thunkMiddleware));

store.dispatch(DataActionCreators.fetchData());

export default store;
