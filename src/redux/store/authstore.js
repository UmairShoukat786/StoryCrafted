import themeReducer from '../reducer/themeReducer';
import { createStore, combineReducers } from 'redux';

// Set up a general reducer.
const rootReducer = combineReducers({
    theme: themeReducer
});

// Create a store with the reducer.
const configureStore = () => {
    return createStore(rootReducer);
}

// Export the configured store
export default configureStore;
