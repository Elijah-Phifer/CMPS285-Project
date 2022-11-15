//This type uses a generic (<T>).  For more information on generics see: https://www.typescriptlang.org/docs/handbook/2/generics.html

//You probably wont need this for the scope of this class :)
export type ApiResponse<T> = {
  data: T;
  errors: Error[];
  hasErrors: boolean;
};

export type Error = {
  property: string;
  message: string;
};

export type AnyObject = {
  [index: string]: any;
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
};

export type InventoriesGetDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesCreateDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesUpdateDto = {
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type InventoriesDeleteDto = {
  id: number;
  itemName: string;
  productionCost: string;
  quantity: string;
  availabilty: string;
  onlineStoreId: string;
  siteListing: string;
  dateAdded: string;
};

export type BulletJournalEntryCreateDTO = {
  id: number;
  contents: string;
  isDone: boolean;
  /*DateCreated: Date;*/
  pushes: number;
};

export type BulletJournalEntryGetDTO = {
  id: number;
  contents: string;
  isDone: boolean;
  DateCreated: Date;
  //add others from controller later
};

export type BulletJournalEntryUpdateDTO = {
  id: number;
  isDone: boolean;

  //add others from controller later
};
export type SubscriberGetDto = {
  id: number;
  name: string;
  email: string;
  dateSubscribed: Date;
};

export type EmailNewsletterGetDto = {
  id: number;
  title: string;
  message: string;
  dateSent: Date;
};
