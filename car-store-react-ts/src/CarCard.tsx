import type { Car } from './types';

interface Props {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}

export function CarCard({ car, onEdit, onDelete }: Props) {
  return (
    <div className="car-card">
      <div className="car-card-header">
        <h3>{car.year} {car.make} {car.model}</h3>
        <span className="color-badge" style={{ backgroundColor: car.color.toLowerCase() }} title={car.color} />
      </div>
      <dl className="car-details">
        <dt>Price</dt>
        <dd>${car.price.toLocaleString()}</dd>
        <dt>Mileage</dt>
        <dd>{car.mileage.toLocaleString()} mi</dd>
      </dl>
      <div className="card-actions">
        <button onClick={() => onEdit(car)}>Edit</button>
        <button className="danger" onClick={() => onDelete(car.id)}>Delete</button>
      </div>
    </div>
  );
}
