import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonModal, IonButton, IonItem, IonLabel, IonInput, IonCheckbox } from '@ionic/react';
import React from 'react';
import { Redirect } from 'react-router';
import UserContext from '../../contexts/UserContext';
import useForm from '../../hooks/useForm';
import firebase from '../../firebase';
import '../Page.css';
import validateNewTask from '../../validators/validateNewTask'
import TaskList from '../../components/TaskList';

const INITIAL_STATE = {
    name: "",
    date: "",
    project: "",
    category: ""
}

const Inbox = (props) => {
  const {user} = React.useContext(UserContext);
  const [showModal, setShowModal] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const { handleSubmit, handleChange, values } = useForm(
    INITIAL_STATE, validateNewTask, addNewTask);

    function addNewTask() {
        const { name, date, project, category } = values;
        const newTask = {
            name, date, project, category,
            isImportant: checked,
            userId: user.uid,
            created: Date.now(),
            isFinished: false
        };
        firebase.db.collection('tasks').add(newTask);
        setShowModal(false);
        props.history.push("/");
    }

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

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => setShowModal(false)}>
            <p>Add new task</p>
            <IonItem lines="null">
                <IonLabel position="floating">Name</IonLabel>
                <IonInput name="name" type="text" value={values.name} onIonChange={handleChange} required></IonInput>
            </IonItem>
            <IonItem lines="null">
                <IonLabel position="floating">Date</IonLabel>
                <IonInput name="date" type="text" value={values.date} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Important</IonLabel>
                <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
            </IonItem>
            <IonItem lines="null">
                <IonLabel position="floating">Project</IonLabel>
                <IonInput name="project" type="text" value={values.project} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonItem lines="null">
                <IonLabel position="floating">Category</IonLabel>
                <IonInput name="category" type="text" value={values.category} onIonChange={handleChange}></IonInput>
            </IonItem>
            <IonButton onClick={handleSubmit}>Add task</IonButton>
        </IonModal>
        <TaskList />
        <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
