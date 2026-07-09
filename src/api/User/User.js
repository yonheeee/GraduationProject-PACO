import api from '../axios';

const UserApi = {
  async getMyProfile() {
    const { data } = await api.get('/api/users/me');
    return data;
  },

  async logout() {
    const { data } = await api.post('/api/auth/logout');
    return data;
  },

  async withdraw(password) {
    const { data } = await api.delete('/api/users/me', { data: { password } });
    return data;
  },

  async getMyReviews() {
    const { data } = await api.get('/api/users/me/reviews');
    return data;
  },

  async getMyComments() {
    const { data } = await api.get('/api/users/me/comments');
    return data;
  },

  async getLikedReviewIds() {
    const { data } = await api.get('/api/users/me/liked-reviews');
    return data;
  },

  async getReviewDetail(id) {
    const { data } = await api.get(`/api/reviews/${id}`);
    return data;
  },

  async getSavedParkingIds() {
    const { data } = await api.get('/api/users/me/saved-parkings');
    return data;
  },
};

export default UserApi;
