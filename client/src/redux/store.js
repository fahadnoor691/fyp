import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { carReducers } from "./reducers/carReducers";
import { alertReducer } from "./reducers/alertsReducer";

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const rootTeducer = combineReducers({
  carReducers,
  alertReducer,
});
const store = createStore(
  rootTeducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
