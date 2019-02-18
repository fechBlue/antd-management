import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import App from './app'
import Main from './main'
import Buttons from './pages/ui/buttons'
import Home from './pages/Home'
import Modals from './pages/ui/modals';

export default class Router extends Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/main" render={()=>
              <Main>
                <Route path="/main/home" component={Home}/>
                <Route path="/main/ui/buttons" component={Buttons}/>
                <Route path="/main/ui/modals" component={Modals}/>
              </Main>
            }/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}