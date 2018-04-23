import React, { Component } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import promise from 'redux-promise'
import {createStore, applyMiddleware} from 'redux'
import Count from './Count'
import {Provider} from 'react-redux'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

class App extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
              <div>
                <Switch>
                   <Route path="/count" component={Count} />
                   <Route path="/" component={Count} />
                </Switch>
              </div>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
