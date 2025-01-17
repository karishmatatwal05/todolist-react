import "./App.css";
import Header from "./MyComponent/Header";
import { Footer } from "./MyComponent/Footer";
import { Todos } from "./MyComponent/Todos";
import { AddTodo } from "./MyComponent/AddTodo";
import { About } from './MyComponent/About'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , 
  Switch ,
  Route , 
} from 'react-router-dom';

function App(todo) {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);
    // deleting this way react does not work
    // let index=todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("i am adding this todo ", title, desc);

    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  };

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
    <Router>
      <Header title="MyTodosList" searchBar={true} />  

      <Switch>
        <Route exact path="/" render={()=>{
          return(
          <>
           <AddTodo addTodo={addTodo} />
           <Todos todos={todos} onDelete={onDelete} />
          </>)
        }}>
        </Route>

        <Route exact path="/about" >
         <About/>
         </Route>
         
             
      </Switch>
      <Footer/>
    </Router>
    </>
  );
}

export default App;