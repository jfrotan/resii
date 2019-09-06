import Api from '@/services/Api';

export default {
  GetUsers(userEmail) {
    return Api().get(`get-users/${userEmail}`);
  },
  ToggleStatus(userEmail) {
    return Api().post('toggle-status', userEmail);
  }
};
