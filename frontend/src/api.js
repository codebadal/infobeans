import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const getToken = () => localStorage.getItem("jwt") || "";

// create axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token if exists
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.response?.data || error.message;
    return Promise.reject(new Error(message));
  }
);

export const AuthAPI = {
  register: (payload) => apiClient.post("/api/auth/register", payload),
  verifyEmail: (data) => apiClient.post("api/auth/verify-email", data), // naya ......... 
  login: (payload) => apiClient.post("/api/auth/login", payload),
  changePassword: (payload) =>
    apiClient.post("/api/auth/change-password", payload),
  forgot: (payload) => apiClient.post("/api/auth/forgot", payload),
  resetWithOTP: (payload) => apiClient.post("/api/auth/reset-otp", payload),
};

export const PaymentAPI = {
  verify: (payload) => apiClient.post("/api/payments/verify", payload),
};

export const AdminAPI = {
  listUsers: (role) =>
    apiClient.get(`/api/admin/users${role ? `?role=${role}` : ""}`),
  getUser: (id) => apiClient.get(`/api/admin/users/${id}`),
  createUser: (payload) => apiClient.post("/api/admin/users", payload),
  updateUser: (id, payload) => apiClient.put(`/api/admin/users/${id}`, payload),
  deleteUser: (id) => apiClient.delete(`/api/admin/users/${id}`),
};

export const ExamAPI = {
  create: (payload) => apiClient.post("/api/exams", payload),
  list: () => apiClient.get("/api/exams"),
  delete: (id) => apiClient.delete(`/api/exams/${id}`),
  toggle: (id) => apiClient.put(`/api/exams/${id}/toggle-live`),
};

export const QuestionAPI = {
  add: (payload) => apiClient.post("/api/questions", payload),
  listForExam: (examId) => apiClient.get(`/api/questions/exam/${examId}`),
  update: (id, payload) => apiClient.put(`/api/questions/${id}`, payload),
  delete: (id) => apiClient.delete(`/api/questions/${id}`),
};

export const SubmissionAPI = {
  submit: (payload) => apiClient.post("/api/submissions", payload),
  mine: () => apiClient.get("/api/submissions/me"),
};

export const BatchAPI = {
  create: (payload) => apiClient.post("/api/batches", payload),
  assign: (payload) => apiClient.post("/api/batches/assign", payload),
  list: () => apiClient.get("/api/batches"),
};


// ai api 

export const AiAPI = {
  ask : (payload) => apiClient.post("/api/gemini/generate-text", payload)
}
