import requester from 'services/requester';

const authAPI = {
  validateEmail(email: string) {
    return requester.request(email);
  },

  validateCode(code: string) {
    return requester.request(code);
  },
};

export default authAPI;
