import { fetchPucharses } from "../services/pucharseService";
import { useState, useEffect } from "react";

export const usePucharses = (user) => {
    const [pucharseData, setPucharseData] = useState([]);
    
    const fetchPucharsesData = async () => {
        try {
            const pucharseData = await fetchPucharses(user);
            setPucharseData(pucharseData);
        } catch (error) {
            console.error("Error al obtener compras", error);
        }
    };

    useEffect(() => {
        fetchPucharsesData();
    }, []);

    return { pucharseData };
};