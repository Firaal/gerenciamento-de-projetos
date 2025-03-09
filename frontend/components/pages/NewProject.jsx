import styles from "./NewProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewProject() {
    const [project, setProject] = useState({});

    const navigate = useNavigate();

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

    function createPost(project) {
        fetch("http://localhost:3000/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const submit = (e) => {
        e.preventDefault();
        createPost(project);
    };

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>

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
                    handlerOnChange={handleCategory}
                    value={project.category ? project.category.id : ""}
                />
                <SubmitButton text="Criar Projeto" />
            </form>
        </div>
    );
}

export default NewProject;
