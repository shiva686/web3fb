import React ,{useEffect , useState} from 'react';
// import Navbar from './navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './App.scss';
import {Switch , Route, Redirect , } from 'react-router-dom';
import Login from './login';
// import Home from './home.js';
// import ReadPost from './readpost.js';
import Dashboard from './dashbord.js';
import Create from './create_new'
import blog_name from './blog_name'
// import Posts from './posts'
// import Fabout from './fabout'
// import Contact from './contact'
import { useLocation } from 'react-router-dom'
// const axios = require('axios')

function App() {

   const [removenva ,change_nav]=useState(true)
    return (
     <>
     {
     //(window.location.pathname != '/dashboard' && window.location.pathname != '/admin/login'&& window.location.pathname !='/404' && window.location.pathname !='/create')?<Navbar/>:null
     }
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/create" component={Create}/>
        <Redirect to ="/"/>
      </Switch>
    </>
  );
}

export default App;
