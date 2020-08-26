import React from 'react';
import { IonModal, IonButton, IonItem, IonLabel, IonInput, IonCheckbox, IonSelect, IonSelectOption } from '@ionic/react';
import validateNewTask from '../validators/validateNewTask'
import useForm from '../hooks/useForm';
import firebase from '../firebase';

const INITIAL_STATE = {
    name: "",
    date: "",
    category: ""
}

const AddTask = (props) => {
    const { showModal, setShowModal, user } = props;
    const { handleSubmit, handleChange, values } = useForm(
        INITIAL_STATE, validateNewTask, addNewTask);
    const [checked, setChecked] = React.useState(false);
    const [project, setProject] = React.useState("");
    const [projects, setProjects] = React.useState([]);

    function addNewTask() {
        const { name, date, category } = values;
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

    React.useEffect(() => {
        const unsubscribe = getProjects();
        return () => unsubscribe();
        // eslint-disable-next-line
    }, [])

    function getProjects() {
        return firebase.db.collection("projects")
            .where("userId", "==", user.uid)
            .where("state", "==", "open")
            .onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const projects = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
        });
        setProjects(projects);
    }

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
        <IonItem>
            <IonLabel>Project</IonLabel>
            <IonSelect placeholder="Select One" value={project} onIonChange={e => {
                console.log(e);
                setProject(e.detail.value)}}>
                {projects.map(project => (
                    <IonSelectOption key={project.id} value={project.id}>{project.name}</IonSelectOption>
                ))}
            </IonSelect>
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
