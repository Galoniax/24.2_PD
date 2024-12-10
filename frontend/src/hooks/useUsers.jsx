import { fetchUsers } from "../services/userService";
import { useState, useEffect } from "react";

export const useUsers = () => {
    const [usersData, setUsers] = useState([]); 

    const fetchUsersData = async () => {
        try {
            const usersData = await fetchUsers();
            setUsers(usersData);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    return { usersData };
};