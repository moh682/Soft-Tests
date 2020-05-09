import { IMovement } from '../interfaces/IMovement';
import { API } from '../contants';

class MovementService {
  getAll = async (): Promise<IMovement[]> => {
    return await fetch(`${API}/movement/all`, {
      method: 'GET',
    }).then(response => {
      return response.json();
    });
  };
}

export { MovementService };
