import api from '../axios';

const ReviewApi = {
  async getReviews() {
    const { data } = await api.get('/api/reviews');
    return data;
  },

  async getReviewsByCategory(category) {
    const { data } = await api.get('/api/reviews', { params: { category } });
    return data;
  },

  async searchReviews(keyword) {
    const { data } = await api.get('/api/reviews/search', { params: { keyword } });
    return data;
  },

  async getLikeCount(targetType, targetId) {
    const { data } = await api.get('/api/likes/count', { params: { targetType, targetId } });
    return data;
  },

  async getReview(id) {
    const { data } = await api.get(`/api/reviews/${id}`);
    return data;
  },

  async createReview(body) {
    const { data } = await api.post('/api/reviews', body);
    return data;
  },

  async updateReview(id, body) {
    const { data } = await api.put(`/api/reviews/${id}`, body);
    return data;
  },

  async deleteReview(id) {
    const { data } = await api.delete(`/api/reviews/${id}`);
    return data;
  },
};

export default ReviewApi;
