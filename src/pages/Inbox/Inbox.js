import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import '../Page.css';
import TaskList from '../../components/TaskList';
import { addCircleOutline } from 'ionicons/icons';
import AddTask from '../../components/AddTask';

const Inbox = (props) => {
  const [showModal, setShowModal] = React.useState(false);

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

      {/* <AddTask showModal={showModal} setShowModal={setShowModal} user={props.authUser}/> */}

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <TaskList authUser={props.authUser}/> */}
        <IonButton onClick={() => setShowModal(true)}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
