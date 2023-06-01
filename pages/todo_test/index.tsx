import style from './todo_test.module.css'
import { useState, useRef } from 'react'
import { Todo } from '../../types/todo';

const TodoTest = ()=>{

    const [todos,setTodos] = useState<Todo[]>([]);
    const [counter,setCounter] = useState(0);
    const todoRef = useRef<HTMLInputElement>(null);

    const addTodo = ()=>{
        if(todoRef.current){
            let cnt = counter;
            cnt++;

            let msg = todoRef.current!.value;
            let todo = {id:String(cnt), sort_no:cnt,content:msg};
            setTodos([...todos,todo]);
            setCounter(cnt);
        }
    }

    const removeTodo = (id : string) =>{
        let new_todo = todos.filter((d)=>{
            return d.id != id;
        })
        setTodos(new_todo);
    }

    return (<div>
        {todos.map((d)=>{
            return (<div key={d.id} className={style.todo}>{d.id} : {d.content} <span onClick={()=>{removeTodo(d.id)}}>Remove</span></div>)
        })}
        <input type="text" className={style.input_txt} ref={todoRef} />
        <div className={style.btn} onClick={addTodo}>Add</div>

    </div>)
}

export default TodoTest