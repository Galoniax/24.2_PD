import { fetchCategories } from "../services/categoryService";
import { useState, useEffect } from "react";


export const useCategory = () => {
    const [categoriesData, setCategories] = useState([]);

    const fetchCategoriesData = async () => {
        try {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error al obtener categorias", error);
        }
    };

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    return { categoriesData };

    
};