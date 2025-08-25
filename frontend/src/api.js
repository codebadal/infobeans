const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const getToken = () => localStorage.getItem('jwt') || '';

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${getToken()}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) throw new Error(data?.message || data || 'Request failed');
  return data;
}

// export const AuthAPI = {
//   register: (payload) => api('/api/auth/register', { method: 'POST', body: payload }),
//   login: (payload) => api('/api/auth/login', { method: 'POST', body: payload }),
//   changePassword: (payload) => api('/api/auth/change-password', { method: 'POST', body: payload, auth: true }),
//   forgot: (payload) => api('/api/auth/forgot', { method: 'POST', body: payload }),
//   reset: (payload) => api('/api/auth/reset', { method: 'POST', body: payload })
// };

export const AuthAPI = {
  register: (payload) => api('/api/auth/register', { method: 'POST', body: payload }),
  login: (payload) => api('/api/auth/login', { method: 'POST', body: payload }),
  changePassword: (payload) => api('/api/auth/change-password', { method: 'POST', body: payload, auth: true }),

  forgot: (payload) => api('/api/auth/forgot', { method: 'POST', body: payload }),
  resetWithOTP: (payload) => api('/api/auth/reset-otp', { method: 'POST', body: payload })
};


export const PaymentAPI = {
  verify: (payload) => api('/api/payments/verify', { method: 'POST', body: payload })
};

export const AdminAPI = {
  listUsers: (role) => api(`/api/admin/users${role ? `?role=${role}` : ''}`, { auth: true }),
  getUser: (id) => api(`/api/admin/users/${id}`, { auth: true }),
  createUser: (payload) => api('/api/admin/users', { method: 'POST', body: payload, auth: true }),
  updateUser: (id, payload) => api(`/api/admin/users/${id}`, { method: 'PUT', body: payload, auth: true }),
  deleteUser: (id) => api(`/api/admin/users/${id}`, { method: 'DELETE', auth: true })
};

// export const ExamAPI = {
//   create: (payload) => api('/api/exams', { method: 'POST', body: payload, auth: true }),
//   list: () => api('/api/exams', { auth: true })
// };

// export const QuestionAPI = {
//   add: (payload) => api('/api/questions', { method: 'POST', body: payload, auth: true }),
//   listForExam: (examId) => api(`/api/questions/exam/${examId}`, { auth: true })
// };

export const ExamAPI = {
  create: (payload) => api('/api/exams', { method: 'POST', body: payload, auth: true }),
  list: () => api('/api/exams', { auth: true }),
  delete: (id) => api(`/api/exams/${id}`, { method: 'DELETE', auth: true }),
  toggle: (id) => api(`/api/exams/${id}/toggle-live`, { method: 'put', auth: true }),
};

export const QuestionAPI = {
  add: (payload) => api('/api/questions', { method: 'POST', body: payload, auth: true }),
  listForExam: (examId) => api(`/api/questions/exam/${examId}`, { auth: true }),
  delete: (id) => api(`/api/questions/${id}`, { method: 'DELETE', auth: true }),
};


export const SubmissionAPI = {
  submit: (payload) => api('/api/submissions', { method: 'POST', body: payload, auth: true }),
  mine: () => api('/api/submissions/me', { auth: true })
};

export const BatchAPI = {
  create: (payload) => api('/api/batches', { method: 'POST', body: payload, auth: true }),
  assign: (payload) => api('/api/batches/assign', { method: 'POST', body: payload, auth: true }),
  list: () => api('/api/batches', { auth: true })
};
