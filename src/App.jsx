import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Signup from './components/Signup'
import Login from './components/Login'
import Admin from './components/Admin'

const App = () => {
  return (
    <BrowserRouter>
   
    <Switch>
      <Route path="/" exact>
          <Signup />
      </Route>
      <Route path="/login">
           <Login />
      </Route>
      <Route path="/admin">
           <Admin />
      </Route>
    </Switch>
   
    </BrowserRouter>
  )
}

export default App