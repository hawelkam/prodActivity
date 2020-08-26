import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import UserContext from '../../contexts/UserContext';
import '../Page.css';
import TaskList from '../../components/TaskList';
import { addCircleOutline } from 'ionicons/icons';
import AddTask from '../../components/AddTask';

const Inbox = () => {
  const {user} = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);

  if (!user) {
    return (
      <Redirect to="/login"/>
    )
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>

      <AddTask showModal={showModal} setShowModal={setShowModal} user={user}/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TaskList />
        <IonButton onClick={() => setShowModal(true)}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
