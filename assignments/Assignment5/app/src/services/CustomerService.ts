import { ICustomer } from '../interfaces/ICustomer';
import { API } from '../contants';

interface CustomerService {
  getAll: () => Promise<ICustomer[]>;
  delete: (cvr: string) => Promise<boolean>;
  create: (name: string, cpr: string, bank: string) => Promise<boolean>;
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
  create = async (name: string, cpr: string, bank: string): Promise<boolean> => {
    return await fetch(`${API}/customer/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cpr,
        name,
        bank_cvr: bank,
      }),
    }).then(response => {
      if (response.ok) return true;
      return false;
    });
  };
}

export { CustomerService };
