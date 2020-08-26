import React from 'react'
import firebase from '../firebase'
import { IonList } from '@ionic/react';
import Task from './Task';

const TaskList = (props) => {
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = getTasks(props.isImportant);
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [])

    function getTasks(isImportant) {
        return isImportant ? 
        firebase.db.collection("tasks")
            .where("userId", "==", props.authUser.uid)
            .where("isFinished", "==", false)
            .where("isImportant", "==", true)
            .onSnapshot(handleSnapshot)
         : firebase.db.collection("tasks")
            .where("userId", "==", props.authUser.uid)
            .where("isFinished", "==", false)
            .onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const tasks = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setTasks(tasks);
    }
    return (
        <IonList lines="full">
            {tasks.map((task, index) => ( 
                    <Task key={task.id} task={task}/>
            ))}
        </IonList>
    )
}

export default TaskList