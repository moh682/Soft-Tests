import { IBank } from '../interfaces/IBank';

import { API } from '../contants';

interface BankService {
  getAll: () => Promise<IBank[]>;
  delete: (cvr: string) => Promise<boolean>;
  create: (cvr: string, name: string) => Promise<boolean>;
}

class BankService implements BankService {
  public getAll = async (): Promise<IBank[]> => {
    const banks = await fetch(`${API}/bank/all`, {
      method: 'GET',
    }).then(response => response.json());
    console.log(banks);
    return banks;
  };
  public create = async (cvr: string, name: string): Promise<boolean> => {
    return await fetch(`${API}/bank/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cvr,
        name,
      }),
    }).then(response => {
      if (response.ok) return true;
      return false;
    });
  };
  public delete = async (cvr: string): Promise<boolean> => {
    return await fetch(`${API}/bank/delete`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cvr,
      }),
    }).then(response => {
      if (response.ok) return true;
      return false;
    });
  };
}

export { BankService };
