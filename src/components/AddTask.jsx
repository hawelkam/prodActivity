import React from 'react';
import { IonModal, IonButton, IonItem, IonLabel, IonInput, IonCheckbox } from '@ionic/react';
import validateNewTask from '../validators/validateNewTask'
import useForm from '../hooks/useForm';
import firebase from '../firebase';

const INITIAL_STATE = {
    name: "",
    date: "",
    project: "",
    category: ""
}

const AddTask = (props) => {
    const { showModal, setShowModal, user } = props;
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
    }
    const [checked, setChecked] = React.useState(false);

    return (
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
    )
}

export default AddTask
