export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
  mileage: number;
}

export type CarFormData = Omit<Car, 'id'>;
