import { useState, useEffect } from "react";

import styles from "./ProjectForm.module.css";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || []);

    useEffect(() => {
        fetch("http://localhost:3000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleChange(e) {
        setProject({
            ...project,
            [e.target.name]: e.target.value,
        });
        console.log(project);
    }

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
        console.log(project);
    }

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    return (
        <div className={styles.form_control}>
            <form onSubmit={submit}>
                <Input
                    type="text"
                    text="Nome do projeto"
                    name="name"
                    placeholder="Insira o nome do projeto"
                    handlerOnchange={handleChange}
                    value={project.name ? project.name : ""}
                />
                <Input
                    type="number"
                    text="Orçamento do projeto"
                    name="budget"
                    placeholder="Insira o orçamento total"
                    handlerOnchange={handleChange}
                    value={project.budget ? project.budget : ""}
                />
                <Select
                    name="category_id"
                    text="Selecione a categoria"
                    options={categories}
                    handlerOnChange={handleCategory}
                    value={project.category ? project.category.id : ""}
                />
                <SubmitButton text={btnText} />
            </form>
        </div>
    );
}

export default ProjectForm;
