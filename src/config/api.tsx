import axios, { AxiosInstance } from "axios";
import { Equipment, Room, Feedback, TrainingPackage, TypePackage, Membership } from "./types";

// URL gốc của API Django
const BASE_URL = "https://gym-system-taupe.vercel.app";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

interface TokenResponse {
    access_token: string;
    refresh_token: string;
    user: User;
}

// interface RefreshRequest {
//     refresh: string;
// }

// Tạo instance của Axios
const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Lấy token từ localStorage
const getAccessToken = (): string | null => localStorage.getItem("access_token");
const getRefreshToken = (): string | null => localStorage.getItem("refresh_token");

// Thêm interceptor để đính kèm Access Token
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Thêm interceptor xử lý Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (refreshToken) {
                    const response = await api.post<TokenResponse>(
                        `/user/api/refresh_token/`,
                        { refresh: refreshToken }
                    );

                    // Lưu token mới vào localStorage
                    localStorage.setItem("access_token", response.data.access_token);

                    // Cập nhật header và gửi lại yêu cầu
                    originalRequest.headers["Authorization"] = `Bearer ${response.data.access_token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                // Xử lý khi refresh token hết hạn
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/user/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Hàm API
export const login = async (username: string, password: string): Promise<void> => {
    // console.log(1)
    const response = await axios.post<TokenResponse>("https://gym-system-taupe.vercel.app/user/api/login/", { username, password });
    // console.log(1);

    // console.log(response.data.access_token);

    // Lưu token vào localStorage
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
};

// export const fetchProtectedData = async (): Promise<any> => {
//     const response = await api.get("/admin/api/some_endpoint/");
//     return response.data;
// };

// equipment api
export const fetchEquipments = async () => {
    const response = await api.get<Equipment[]>(`/room/api/equipments/`);
    return response.data;
};

export const deleteEquipment = async (id: number) => {
    await api.delete(`/room/api/equipments/${id}/`);
};

export const updateEquipment = async (id: number, equipment: Partial<Equipment>) => {
    const response = await api.put<Equipment>(
        `/room/api/equipments/${id}/`,
        equipment
    );
    return response.data;
};

export const addEquipment = async (equipment: Omit<Equipment, "id">) => {
    const response = await api.post<Equipment>(`/room/api/equipments/`, equipment);
    return response.data;
};

// room api

export const addRoom = async (room: Omit<Room, "id">) => {
    const response = await api.post<Room>(`/room/api/rooms/`, room);
    return response.data;
};

export const deleteRoom = async (id: number) => {
    await api.delete(`/room/api/rooms/${id}/`);
};

export const fetchRooms = async () => {
    const response = await api.get<Room[]>(`/room/api/rooms/`);
    return response.data;
};

// training package api

export const fetchTrainingPackage = async () => {
    const response = await api.get<TrainingPackage[]>(`/membership/api/trainingpackages/`);
    return response.data;
};

export const deleteTrainingPackage = async (id: number) => {
    await api.delete(`/membership/api/trainingpackages/${id}/`);
};

export const updateTrainingPackage = async (id: number, equipment: Partial<TrainingPackage>) => {
    const response = await api.put<TrainingPackage>(
        `/membership/api/trainingpackages/${id}/`,
        equipment
    );
    return response.data;
};

export const addTrainingPackage = async (pack: Omit<TrainingPackage, "id">) => {
    const response = await api.post<TrainingPackage>(`/membership/api/trainingpackages/`, pack);
    return response.data;
};

// type package

export const fetchTypePackage = async () => {
    const response = await api.get<TypePackage[]>(`/membership/api/typackages/`);
    return response.data;
};

export const deleteTypePackage = async (id: number) => {
    await api.delete(`/membership/api/typackages/${id}/`);
};

export const updateTypePackage = async (id: number, equipment: Partial<TypePackage>) => {
    const response = await api.put<TypePackage>(
        `/membership/api/typackages/${id}/`,
        equipment
    );
    return response.data;
};

export const addTypePackage = async (pack: Omit<TypePackage, "id">) => {
    const response = await api.post<TypePackage>(`/membership/api/typackages/`, pack);
    return response.data;
};

// membership

export const fetchMembership = async () => {
    const response = await api.get<Membership[]>(`/membership/api/membership/`);
    return response.data;
};

export const deleteMembership = async (id: number) => {
    await api.delete(`/membership/api/membership/${id}/`);
};

export const updateMembership = async (id: number, equipment: Partial<Membership>) => {
    const response = await api.put<Membership>(
        `/membership/api/membership/${id}/`,
        equipment
    );
    return response.data;
};

export const addMembership = async (pack: Omit<Membership, "id">) => {
    const response = await api.post<Membership>(`/membership/api/membership/`, pack);
    return response.data;
};

export default api;
