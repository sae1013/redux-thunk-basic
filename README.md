# REDUX-THUNK BASIC MODULE



## Description

- Redux 에서 비동기 로직을 구현하기

- 컴포넌트 첫 렌더링 이후 data를  fetch 하여 store에 저장합니다.

- 테스트 URL: https://jsonplaceholder.typicode.com/todos

  

## Require package

- npm install react-redux 

- npm install redux

- npm install redux-thunk

  

## Setting

#### index.js

~~~js
import React from 'react';
import ReactDOM from 'react-dom';
import {combineReducers,createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import todoReducer from './store/reducer';

const rootReducer = combineReducers({
  schedule: todoReducer,
});
const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
    
  ,
  document.getElementById('root')
);

reportWebVitals();

~~~



#### reducer.js

~~~js
const initialState = {
    todos:[],
};

const todoReducer = (state=initialState,action) => {
    switch(action.type){
        case 'LOADTODO':
            return {
                todos: action.payload
            }
        default:
             return state
    }
}

export default todoReducer;
~~~



#### action.js

~~~js
export const loadTodo = (todos) => {
    return {
        type:'LOADTODO',
        payload:todos       
    }
}
~~~



#### lib/api.js (Async처리 코드)

~~~js
import {loadTodo} from '../store/action';

export function getData() {
    return async(dispatch)=>{
        
        const sendRequest = async() => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();  
            return data;
        };

        const data = await sendRequest();
        dispatch(loadTodo(data));
        
    }
}
~~~



#### App.js

~~~js
import logo from './logo.svg';
import './App.css';
import {getData} from './lib/api';

import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
function App() {

  const dispatch = useDispatch();
  const todos = useSelector(state => state.schedule.todos);

  useEffect(()=>{
    dispatch(getData());
  },[]);

  if(todos.length == 0){
    return <p>is Empty.....</p>
  }
  
  return (
    <div className="App">
      {todos.map((todo)=>{
        return (
            <p key={todo.id}>{todo.title}</p>
          )
      })}
    </div>
  );
}

export default App;

~~~

- redux-thunk에 의해 dispatch(getData()) 사용이 가능함.

  Action객체가 아닌 함수를 리턴하고 해당함수에  dispatch를 전달해줌



## 참고 

👇 redux-thunk 개념&컨셉

> https://github.com/reduxjs/redux-thunk#installation

