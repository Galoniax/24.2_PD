import { fetchAllCategories } from "../services/categoryService";
import { useState, useEffect } from "react";


export const useCategory = () => {
    const [categoriesData, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const categoriesData = await fetchAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error al obtener categorias", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categoriesData };

    
};