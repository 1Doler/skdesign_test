export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
}

export interface IUsersState {
  items: IUser[];
  item: IUser;
  selectItems: IUser[];
  status: "loading" | "loaded" | "error";
  lengthItems: number;
  filter: {
    filterText: string;
    filterOrder: string;
  };
}
export interface IRootState {
  users: IUsersState;
}
