import React from 'react'
import './App.css'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Home from "./pages/Home";
import Map from './pages/Map'
import "./assets/css/Tabler.css";

function App() {
  return (
    <BrowserRouter >
      <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/maps/:id?" component={ Map } />
      </Switch>
    </BrowserRouter>
  )
}
export default App
