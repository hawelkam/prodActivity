import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import UserContext from '../../contexts/UserContext';
import '../Page.css';
import ProjectList from '../../components/ProjectList';
import { addCircleOutline } from 'ionicons/icons';
import AddProject from '../../components/AddProject';

const Projects = () => {
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
          <IonTitle>Projects</IonTitle>
        </IonToolbar>
      </IonHeader>

      <AddProject showModal={showModal} setShowModal={setShowModal} user={user}/>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Projects</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ProjectList />
        <IonButton onClick={() => setShowModal(true)}><IonIcon icon={addCircleOutline}></IonIcon></IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Projects;
