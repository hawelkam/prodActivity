import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  flashOutline, flashSharp,
  fileTrayOutline, fileTraySharp,
  gridOutline, gridSharp,
  layersOutline, layersSharp,
  calendarOutline, calendarSharp,
  personCircleOutline, personCircleSharp,
  logInOutline, logInSharp,
  personAddOutline, personAddSharp,
  informationCircleOutline, informationCircleSharp
} from 'ionicons/icons';
import './Menu.css';
import LogoutMenuItem from './LogoutMenuItem';
import * as ROUTES from '../constants/routes';

const appPages = [
  {
    title: 'Priorities',
    url: '/important',
    iosIcon: flashOutline,
    mdIcon: flashSharp
  },
  {
    title: 'Inbox',
    url: ROUTES.INBOX,
    iosIcon: fileTrayOutline,
    mdIcon: fileTraySharp
  },
  {
    title: 'Projects',
    url: '/projects',
    iosIcon: gridOutline,
    mdIcon: gridSharp
  },
  {
    title: 'Categories',
    url: '/categories',
    iosIcon: layersOutline,
    mdIcon: layersSharp
  },
  {
    title: 'Calendar',
    url: '/calendar',
    iosIcon: calendarOutline,
    mdIcon: calendarSharp
  },
  {
    title: 'Account',
    url: ROUTES.ACCOUNT,
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  },
  {
    title: 'Admin',
    url: ROUTES.ADMIN,
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  }
];

const beforeLoginPages = [
  {
    title: 'Login',
    url: ROUTES.SIGN_IN,
    iosIcon: logInOutline,
    mdIcon: logInSharp
  },
  {
    title: 'Register',
    url: ROUTES.SIGN_UP,
    iosIcon: personAddOutline,
    mdIcon: personAddSharp
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  }
];

//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu = ({ authUser }) => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>ProdActivity</IonListHeader>
          {/* <IonNote>{(user && user.email) || ""}</IonNote> */}
          {(authUser ? appPages : beforeLoginPages).map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <LogoutMenuItem />
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
