import React from 'react'
import firebase from '../firebase'
import { IonRow, IonItem, IonCheckbox, IonLabel } from '@ionic/react';
import UserContext from '../contexts/UserContext';

const TaskList = (props) => {
    const [tasks, setTasks] = React.useState([]);
    const {user} = React.useContext(UserContext);


    React.useEffect(() => {
        const unsubscribe = getTasks();
        return () => unsubscribe();
    }, [])

    function getTasks() {
        return firebase.db.collection("tasks")
            .where("userId", "==", user.uid)
            .onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const tasks = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setTasks(tasks);
    }
    return (
        <>
            {tasks.map((task, index) => ( 
                <IonRow key={task.name}>
                    <IonItem>
                       <IonCheckbox checked={task.isFinished} />
                    </IonItem>
                    <IonItem>
                       <IonLabel>{task.name}</IonLabel>
                    </IonItem>
                    <IonItem>
                       <IonCheckbox checked={task.isImportant} />
                    </IonItem>
                </IonRow>
            ))}
        </>
    )
}

export default TaskList