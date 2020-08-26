import Menu from './components/Menu';
import Page from './pages/Page';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import useAuth from './hooks/useAuth'
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

const App = () => {
  const [user, setUser] = useAuth();

  return (
    <IonApp>
      <IonReactRouter>
        <UserContext.Provider value={{user, setUser}}>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            {user ? (<>
              <Route path="/page/:name" component={Page} exact />
              <Route path="/important" component={Important} exact />
              <Route path="/inbox" component={Inbox} exact />
              <Redirect from="/" to="/inbox" exact />
              </>
            ) : (<>
              <Route path="/register" component={Register} exact />
              <Route path="/login" component={Login} exact />
              <Redirect from="/" to="/login" exact /></>
            )}
          </IonRouterOutlet>
        </IonSplitPane>
        </UserContext.Provider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
