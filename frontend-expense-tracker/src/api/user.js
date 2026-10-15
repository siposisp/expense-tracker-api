import api from "./axios";

export async function getUser() {
    const response = await api.get("/user");
    return response.data;
}