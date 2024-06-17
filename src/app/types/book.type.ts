export type Book = {
  _id: string;
  title: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
};

export type Response<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T
}
