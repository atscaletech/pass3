const requester = {
  request: function <T>(data: T): Promise<T> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  },
};

export default requester;
