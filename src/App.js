import logo from './logo.svg';
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit ,faCoffee  } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
 
import Sample from './components/Sample';
import Deregister from './components/Deregister';
library.add(faTrash, faEdit, faPlus,faCoffee );

function App() {
  return (
    <div className="App">
      
       <Router>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Vaccine Slot </Link></li>
       
            <li><Link to={'/unsubscribe'} className="nav-link">Unsubscribe</Link></li>
          </ul>
          </nav>
         <Switch>
    
           <Route exact path="/" component={Sample}></Route>
           <Route path="/unsubscribe" component={Deregister}></Route>

         </Switch>
       </Router>     
	   
    </div>
  );
}

export default App;
