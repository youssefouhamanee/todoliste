import React, { Component } from 'react'
import AppTodos from './components/AppTodos'
import TodoPost from './components/TodoPost'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <AppTodos />
            </Route>
            <Route exact path="/todopost/:id">
              <TodoPost />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App