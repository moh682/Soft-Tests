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
  delete = async (number: number): Promise<Boolean> => {
    return await fetch(`${API}/movement/delete`, {
      method: 'delete',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({ id: number }),
    }).then(response => {
      return response.status === 200;
    });
  };
}

export { MovementService };
