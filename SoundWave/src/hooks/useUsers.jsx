import { fetchAllUsers } from "../services/userService";

export const useUsers = () => {
    return {
        fetchAllUsers
    }
};