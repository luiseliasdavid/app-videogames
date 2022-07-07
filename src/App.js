import './App.css';
import React from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Home from './components/Home.jsx';
import CreateVideogame from './components/CreateVideogame.jsx';
import LandingPage from './components/LandingPage.jsx';
import Details from './components/Details.jsx';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { getVideoGames } from './actions';

// const dispatch  = useDispatch();
// useEffect(() => {
// dispatch(getVideoGames())
// }, [])

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
     <Route exact path='/' component={LandingPage}/>
     <Route exact path='/home' component={Home}/>
     <Route exact path='/createVideogame' component={CreateVideogame}/>
     <Route exact path='/detail/:id' component={Details}/>
      </Switch>
    </div>
    </BrowserRouter> 
    
  );
}



export default App;
