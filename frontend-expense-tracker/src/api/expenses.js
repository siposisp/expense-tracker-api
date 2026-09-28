import api from "./axios";

export async function getExpenses(){
    const response = await api.get("/expense");
    return response.data;
} 

