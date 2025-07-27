export interface Categoria {
  Id?: number;
  Name: string;
}

export interface Producto {
  Id?: number;
  Name: string;
  Description?: string;
  Price: number;
  Stock: number;
  CategoryId: number;
  CategoryName?: string;
}
