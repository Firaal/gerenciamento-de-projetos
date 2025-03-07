import styles from "./Select.module.css";
import { useState, useEffect } from "react";

function Select({ text, name, handlerOnChange, value }) {
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
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handlerOnChange} value={value || ""}>
                <option>Selecione uma opção</option>
                {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
