class StorageService {
  getNameToken = () => {
    return localStorage.getItem('token-name');
  };
  setNameToken = async (name: string) => {
    return localStorage.setItem('token-name', name);
  };
  removeToken = () => {
    return localStorage.removeItem('token-name');
  };
}

export { StorageService };
