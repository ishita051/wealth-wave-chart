
export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
}

export interface Budget {
  category: string;
  amount: number;
  spent: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
