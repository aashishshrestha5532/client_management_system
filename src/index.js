import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import {NavBar} from './components'
import { RegisterProject,ClientList,ProjectUpdate} from './pages'

ReactDOM.render(
  <Router>
    <NavBar />
    <Switch>
                <Route path="/dashboard" exact component={App}/>
                <Route path="/client/registerproject" exact component={RegisterProject} />
                <Route path="/clientList" exact component={ClientList} />
                
                <Route
                    path="/client/update/:id"
                    exact
                    component={ProjectUpdate}
                />
            </Switch>
    {/* <App /> */}
    </Router>,
  document.getElementById('root')
);
