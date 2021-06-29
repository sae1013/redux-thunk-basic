import logo from './logo.svg';
import './App.css';
import {getData} from './lib/api';

import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';

function App() {
  
  const dispatch = useDispatch();
  const todos = useSelector(state => state.schedule.todos);

  useEffect(()=>{
    if(todos.length==0){
      dispatch(getData());
    }
  },[]);
  
  if(todos.length == 0){
    return <p>is Empty.....</p>
  }
  if(todos.length >0){
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
  
}

export default App;
