import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk';
import { DataActionCreators } from './actions/DataActions';
import Reducer from './Reducer';

const store: Store = createStore(Reducer, applyMiddleware(thunkMiddleware));
store.dispatch(DataActionCreators.fetchData());

export default store;
