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