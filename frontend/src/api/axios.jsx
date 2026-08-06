import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Interceptor hit", error.response?.status);

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            console.log("Refreshing token...");

            originalRequest._retry = true;

            try {
                await api.post("/users/refresh-token");

                console.log("Token refreshed");

                return api(originalRequest);
            } catch (err) {
                console.log("Refresh failed", err);

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;