
import api from "./api";

export const getRepositories = () => api.get(`/repositories`, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
});

export const likeRepository = id => api.post(`/repositories/${id}/like`);