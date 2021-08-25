import { User } from './user';
export class Expense {
    expenseId:number | undefined;
    category:String | undefined;
    createdDate:String | undefined;
    expenseAmount:number | undefined;
    expenseDescription:String | undefined;
    user:User;
}
