import { useState, useEffect } from 'react';
import type { Car, CarFormData } from './types';

const STORAGE_KEY = 'car-inventory';

function loadCars(): Car[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCars(cars: Car[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

export function useCarStore() {
  const [cars, setCars] = useState<Car[]>(loadCars);

  useEffect(() => {
    saveCars(cars);
  }, [cars]);

  function addCar(data: CarFormData): void {
    const car: Car = { ...data, id: crypto.randomUUID() };
    setCars((prev) => [...prev, car]);
  }

  function updateCar(id: string, data: CarFormData): void {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...data, id } : c)));
  }

  function deleteCar(id: string): void {
    setCars((prev) => prev.filter((c) => c.id !== id));
  }

  return { cars, addCar, updateCar, deleteCar };
}
