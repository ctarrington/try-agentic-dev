import { useState, useEffect } from 'react';
import type { Car, CarFormData } from './types';

const EMPTY: CarFormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  color: '',
  price: 0,
  mileage: 0,
};

interface Props {
  initial?: Car;
  onSave: (data: CarFormData) => void;
  onCancel: () => void;
}

export function CarForm({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<CarFormData>(initial ?? EMPTY);

  useEffect(() => {
    setForm(initial ?? EMPTY);
  }, [initial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  const fields: { name: keyof CarFormData; label: string; type: string }[] = [
    { name: 'make', label: 'Make', type: 'text' },
    { name: 'model', label: 'Model', type: 'text' },
    { name: 'year', label: 'Year', type: 'number' },
    { name: 'color', label: 'Color', type: 'text' },
    { name: 'price', label: 'Price ($)', type: 'number' },
    { name: 'mileage', label: 'Mileage', type: 'number' },
  ];

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <h2>{initial ? 'Edit Car' : 'Add Car'}</h2>
      {fields.map(({ name, label, type }) => (
        <div key={name} className="field">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            required
            min={type === 'number' ? 0 : undefined}
          />
        </div>
      ))}
      <div className="form-actions">
        <button type="submit">{initial ? 'Save Changes' : 'Add Car'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
