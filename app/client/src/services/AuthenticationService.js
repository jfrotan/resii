import Api from '@/services/Api';

export default {
  Register(userInfo) {
    return Api().post('/register', userInfo);
  },
  Login(resumeInfo) {
    return Api().post('/login', resumeInfo);
  }
};
