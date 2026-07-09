import api from '../axios';

const ParkingApi = {
  async getParkings() {
    const { data } = await api.get('/api/parkings');
    return data;
  },

  async getNearbyParkings({ lat, lng, radius = 1000 }) {
    const { data } = await api.get('/api/parkings/nearby', {
      params: { lat, lng, radius },
    });
    return data;
  },

  async getParking(id) {
    const { data } = await api.get(`/api/parkings/${id}`);
    return data;
  },
};

export default ParkingApi;