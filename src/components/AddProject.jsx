import React from 'react';
import { IonModal, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react';
import validateNewTask from '../validators/validateNewTask'
import useForm from '../hooks/useForm';
import firebase from '../firebase';

const INITIAL_STATE = {
    name: ""
}

const AddProject = (props) => {
    const { showModal, setShowModal, user } = props;
    const { handleSubmit, handleChange, values } = useForm(
        INITIAL_STATE, validateNewTask, addNewTask);
    
    function addNewTask() {
        const { name } = values;
        const newProject = {
            name,
            state: "open",
            userId: user.uid,
            created: Date.now()
        };
        firebase.db.collection('projects').add(newProject);
        setShowModal(false);
    }

    return (
        <IonModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={() => setShowModal(false)}>
        <p>Add new project</p>
        <IonItem lines="null">
            <IonLabel position="floating">Name</IonLabel>
            <IonInput name="name" type="text" value={values.name} onIonChange={handleChange} required></IonInput>
        </IonItem>
        <IonButton onClick={handleSubmit}>Add Project</IonButton>
    </IonModal>
    )
}

export default AddProject
