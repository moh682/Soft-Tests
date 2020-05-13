import { IAccount } from '../interfaces/IAccount';
import { API } from '../contants';

class AccountService {
  getAll = async (): Promise<IAccount[]> => {
    return await fetch(`${API}/account/all`, { method: 'GET' }).then(response => response.json());
  };
  delete = async (number: string): Promise<boolean> => {
    const init: RequestInit = {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
      }),
    };
    return await fetch(`${API}/account/delete`, init).then(response => {
      console.log(response);
      return response.status === 200;
    });
  };
  create = async (name: string, balance: number, customer_cpr: number): Promise<boolean> => {
    const init: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        balance,
        customer_cpr,
      }),
    };
    return await fetch(`${API}/account/create`, init).then(response => response.status === 200);
  };
  transfer = async (from: number, to: number, amount: number): Promise<boolean> => {
    const init: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        ownAccountNumber: from,
        targetAccountNumber: to,
        amount,
      }),
    };
    return await fetch(`${API}/account/transferAmountTo`, init).then(response => response.status === 200);
  };
}

export { AccountService };
