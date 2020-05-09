import { ICustomer } from '../interfaces/ICustomer';
import { API } from '../contants';

interface CustomerService {
  getAll: () => Promise<ICustomer[]>;
  delete: (cvr: string) => Promise<boolean>;
  create: (cvr: string, name: string) => Promise<boolean>;
}

class CustomerService {
  getCustomer = async (cpr: string): Promise<ICustomer> => {
    return await fetch(`${API}/customer/find`, {
      method: 'GET',
      body: JSON.stringify({ cpr }),
    }).then(response => response.json());
  };
  getAll = async (): Promise<ICustomer[]> => {
    return await fetch(`${API}/customer/all`, {
      method: 'GET',
    }).then(response => response.json());
  };
}

export { CustomerService };
