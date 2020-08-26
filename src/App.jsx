import Menu from './components/Menu';
import Page from './pages/Page';
import React, { Component } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import UserContext from './contexts/UserContext'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Inbox from './pages/Inbox/Inbox';
import Important from './pages/Important/Important';
import Projects from './pages/Projects/Projects';
import ProjectDetails from './pages/Projects/ProjectDetails';
import * as ROUTES from './constants/routes';
import LandingPage from './pages/Landing/LandingPage';
import AccountPage from './pages/Account/AccountPage';
import AdminPage from './pages/Admin/AdminPage';
import { withFirebase } from "./firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ?
        this.setState({ authUser }) :
        this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }
  
  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu authUser={this.state.authUser} />
            <IonRouterOutlet id="main">
                <Route path="/important" component={Important} exact />
                <Route path={ROUTES.INBOX} render={() => (
                  <Inbox authUser={this.state.authUser} />
                )} exact />
                <Route path="/projects" component={Projects} exact />
                <Route path="/projects/:id" component={ProjectDetails} exact />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} exact />
                <Route path={ROUTES.ADMIN} component={AdminPage} exact />
                <Route path={ROUTES.LANDING} component={LandingPage} exact />
                <Route path={ROUTES.SIGN_UP} component={Register} exact />
                <Route path={ROUTES.SIGN_IN} component={Login} exact />
                <Redirect from="/" to="/login" exact />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default withFirebase(App);
