export default function validateNewTask(values) {
    let errors = {};

    if (!values.name) {
        errors.email = "Name is required.";
    }

    return errors;
}