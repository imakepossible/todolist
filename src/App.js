import logo from './logo.svg';
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit ,faCoffee  } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import FTodoList from './components/FTodoList';
 import ScotchInfoBar from './components/ScotchInfoBar';
 
library.add(faTrash, faEdit, faPlus,faCoffee );

function App() {
  return (
    <div className="App">
      
        <FTodoList/>
       <ScotchInfoBar/>
	   
    </div>
  );
}

export default App;
