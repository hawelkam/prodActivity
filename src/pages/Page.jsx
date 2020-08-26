import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams, Redirect } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import UserContext from '../contexts/UserContext';
import './Page.css';

const Page = (props) => {
  const {user} = React.useContext(UserContext);

  const { name } = useParams();

  if (!user) {
    return (
      <Redirect to="/register"/>
    )
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
