import { User } from "./classes/user";

export interface IExpense {
    expenseId: number;
    category: string;
    createdDate: Date;
    expenseAmount: number;
    expenseDescription: string;
    
  }
  