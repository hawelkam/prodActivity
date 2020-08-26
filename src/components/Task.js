import React from 'react';
import { IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import firebase from '../firebase'

const Task = (props) => {
    const {task} = props;
    const linkRef = firebase.db.collection("tasks").doc(task.id);

    function handleToggleCompletion() {
        linkRef.update({isFinished: !task.isFinished});
    }

    function handleToggleImportance() {
        linkRef.update({isImportant: !task.isImportant});
    }

    return (
        <IonItem key={task.name}>
            <IonCheckbox checked={task.isFinished} onIonChange={handleToggleCompletion}/>
            <IonLabel>{task.name}</IonLabel>
            <IonCheckbox checked={task.isImportant} onIonChange={handleToggleImportance}/>
        </IonItem>
    )
}

export default Task
