import { useState } from 'react';
import { useCarStore } from './useCarStore';
import { CarForm } from './CarForm';
import { CarCard } from './CarCard';
import type { Car, CarFormData } from './types';
import './App.css';

type Mode = { type: 'idle' } | { type: 'add' } | { type: 'edit'; car: Car };

export default function App() {
  const { cars, addCar, updateCar, deleteCar } = useCarStore();
  const [mode, setMode] = useState<Mode>({ type: 'idle' });

  function handleSave(data: CarFormData) {
    if (mode.type === 'add') {
      addCar(data);
    } else if (mode.type === 'edit') {
      updateCar(mode.car.id, data);
    }
    setMode({ type: 'idle' });
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Car Inventory</h1>
        {mode.type === 'idle' && (
          <button onClick={() => setMode({ type: 'add' })}>+ Add Car</button>
        )}
      </header>

      {mode.type !== 'idle' && (
        <CarForm
          initial={mode.type === 'edit' ? mode.car : undefined}
          onSave={handleSave}
          onCancel={() => setMode({ type: 'idle' })}
        />
      )}

      {cars.length === 0 ? (
        <p className="empty">No cars in inventory. Add one to get started.</p>
      ) : (
        <div className="car-grid">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={(c) => setMode({ type: 'edit', car: c })}
              onDelete={deleteCar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
