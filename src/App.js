import React from 'react'
import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from "./Home";
import Map from  './components/Map'

import "tabler-react/dist/Tabler.css";
import SearchableMap from './components/SearchableMap';

function App() {
  return (
    <BrowserRouter >
      <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/maps" component={ SearchableMap } />
      </Switch>
    </BrowserRouter>
  )
}
export default App
