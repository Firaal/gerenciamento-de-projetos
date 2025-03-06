import styles from "./NewProject.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import { useState, useEffect } from "react";

function NewProject() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>

            <form>
                <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
                <Input type="number" text="Orçamento do projeto" name="name" placeholder="Insira o orçamento total" />
                <Select name="category_id" text="Selecione a categoria" options={categories} />
                <SubmitButton text="Criar Projeto" />
            </form>
        </div>
    );
}

export default NewProject;
