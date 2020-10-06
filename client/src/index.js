import ReactDOM from 'react-dom';
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/rootReducer'
import App from './component/App'
import './css/style.css'
// import './style.min.css'

const store = createStore(reducer)
store.subscribe(() => console.log("Store: ", store.getState()))

console.log(store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
