import api from '../axios';

const AuthApi = {
  async signup(body) {
    const { data } = await api.post('/api/auth/signup', body);
    return data;
  },

  async login(userId, password) {
    const { data } = await api.post('/api/auth/login', { userId, password });
    return data;
  },

  async findId(body) {
    const { data } = await api.post('/api/auth/find-id', body);
    return data;
  },

  async findPassword(body) {
    const { data } = await api.post('/api/auth/find-password', body);
    return data;
  },
};

export default AuthApi;
