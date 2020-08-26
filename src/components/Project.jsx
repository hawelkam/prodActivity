import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import firebase from '../firebase';
import { useHistory } from 'react-router-dom';

const Project = (props) => {
    const {project} = props;
    const history = useHistory();
    const [tasks, setTasks] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = getTasks();
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [])

    function getTasks() {
        return  firebase.db.collection("tasks")
            .where("isFinished", "==", false)
            .where("project", "==", project.id)
            .onSnapshot(handleSnapshot)
    }

    function handleSnapshot(snapshot) {
        const tasks = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setTasks(tasks);
    }

    const handleClick = () => {
        history.push(`/projects/${project.id}`)
    }

    return (
        <IonItem onClick={handleClick}>
            <IonLabel>{project.name}</IonLabel>
            <IonLabel>{tasks.length}</IonLabel>
        </IonItem>
    )
}

export default Project
