import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import reducers from "./reducer";
import thunk from "redux-thunk";
const devTool = (window as any).devToolsExtension
  ? (window as any).devToolsExtension()
  : (f: any) => f;
export default createStore(
  combineReducers(reducers),
  compose(applyMiddleware(thunk), devTool)
);
