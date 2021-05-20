 
import React, { Component, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScotchInfoBar from './ScotchInfoBar';

  function FTodoList() {
  
    const titleRef = useRef();
    const [state, setState]= useState( {  todos: [
        { Id: '1', Title: 'Push your code to github', Status: 'Done' },
        { Id: '2', Title: 'Email to your manager', Status: 'Pending' }
      ] });
      const [title,setTitle]=useState('');
      const [id,setId]=useState('');

    const deleteToDo = (item) => {
              
        const filterdata = state.todos.filter((x) => {
            if( x.Id !== item.Id)
            return x;
            
        })
        
         
          

        setState({
            todos :  filterdata

            
         });
    };

    const editdata = (item) => {

        const filterdata=state.todos.map(x => {
            if(x.Id==item.Id)
            { 
                setId(x.Id);
                setTitle(x.Title)
            } 
            
        });

        
    };

    const editstatus = (item) => {

        const filterdata=state.todos.map(x => {
            if(x.Id==item.Id)
            {
             return {
                 ...x,
                 Status: x.Status === "Done" ? "Pending" : "Done"
           }
            } 
            else {
             return x;
         }
        });

        setState({
            todos :  filterdata

            
         });
    };

    const adddata = (e) =>{
        e.preventDefault();
        if(title=='')
        {
            alert("Please enter task");
            titleRef.current.focus();
            return false;
        }
        let i = state.todos.length+1;
        if(id>0)
        {
            const filterdata=state.todos.map(x => {
                if(x.Id==id)
                {
                 return {
                     ...x,
                     Title: title
               }
                } 
                else {
                 return x;
             }
            });
    
            setState({
                todos :  filterdata
    
                
             });

             // blank id and title field
             setTitle('');
             setId('');
        }
        else{
        const newdata={ Id: i, Title: title, Status: 'Pending' }
        console.log(newdata);
       state.todos.push(newdata);
        //const filterdata=state.todos;
        //console.log(filterdata);
        setState(  {todos: state.todos})
        }

    };

     

        return ( 
            <div>
             <h1>FTodoList </h1>
             <form method="post"  > 
             <table className="table">
                 <tr><td align="right">
                 <input onChange={(e)=> setId(e.target.value)} value={id} type="hidden" name="id"/>
                     Task : <input onChange={(e)=> setTitle(e.target.value)} ref={titleRef} value={title} type="text" name="title"/></td> <td align="left">
             <button type="submit" className="btn btn-primary" onClick={(e) => adddata(e)}><span>
       <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
    </span>
</button></td>
             </tr>
             </table>
             </form>  
                <table className="table">
                   <thead>
                     <tr>
                        <th>Id</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Action</th>
                     </tr>
                   </thead>
                   <tbody>
                      
                       
                       {state.todos.map( (x) => {
                         return (
                              <tr key={x.Id}>
                              <td>{x.Id}</td>
                              <td>{x.Title}</td>
                              <td style={{ color: x.Status === "Done" ? "green" : "red" }}>
{x.Status}
</td>
                              <td>
                              <button className="btn btn-primary" onClick={() => deleteToDo(x)}>
    <span>
       <FontAwesomeIcon icon="trash"></FontAwesomeIcon>
    </span>
</button>

<button className="btn btn-primary" onClick={() => editstatus(x)}>
    <span>
       <FontAwesomeIcon icon="coffee"></FontAwesomeIcon>
    </span>
</button>

<button className="btn btn-primary" onClick={() => editdata(x)}>
    <span>
       <FontAwesomeIcon icon="edit"></FontAwesomeIcon>
    </span>
</button>
                              </td>
                              </tr>
                          )
                       })
                       }
                    </tbody>
                </table>
                <ScotchInfoBar   /> 
          </div> 
         );
    
}
 
export default FTodoList;

