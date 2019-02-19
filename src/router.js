import React, {Component} from 'react';
import {HashRouter, Route, Switch, Link} from 'react-router-dom'
import App from './app'
import Main from './main'
import Buttons from './pages/ui/buttons'
import Home from './pages/Home'
import Modals from './pages/ui/modals';
import NoMatch from './pages/NoMatch';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import TabS from './pages/ui/tabs';
import Gallerys from './pages/ui/gallery';
import FormLogin from './pages/Form/login';
import FormRegister from './pages/Form/register';

export default class Router extends Component {
  render () {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/main" render={()=>
              <Main>
                <Switch>
                  <Route path="/main/home" component={Home}/>
                  <Route path="/main/ui/buttons" component={Buttons}/>
                  <Route path="/main/ui/modals" component={Modals}/>
                  <Route path="/main/ui/loadings" component={Loadings}/>
                  <Route path="/main/ui/notifications" component={Notifications}/>
                  <Route path="/main/ui/messages" component={Messages}/>
                  <Route path="/main/ui/tabs" component={TabS}/>
                  <Route path="/main/ui/gallerys" component={Gallerys}/>
                  <Route path="/main/form/login" component={FormLogin}/>
                  <Route path="/main/form/reg" component={FormRegister}/>
                  <Route component={NoMatch}/>
                </Switch>
              </Main>
            }/>
            <Route render={() => 
              <div style={{textAlign: 'center', fontSize: 30, marginTop: 100}}>
                没有找到页面，<Link to="/main/home">点击进入主页</Link>
              </div>
            }/>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}