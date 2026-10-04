import { useState } from 'react';
import Car3DViewer from './Car3DViewer';

export default function CarDetails({ car, onBack }) {
  const [view3D, setView3D] = useState(false);

  const specs = [
    ['Brand', car.brand],
    ['Engine', car.engine],
    ['Transmission', car.transmission],
    ['Fuel / Mileage', `${car.fuel}${car.mileage ? ` / ${car.mileage}` : ''}`],
  ];

  return (
    <div className="car-details-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="back-btn" onClick={onBack}>← Back to Showroom</button>
        <button 
          onClick={() => setView3D(!view3D)} 
          className="btn btn-warning btn-sm fw-bold"
          style={{ background: '#f0b90b', color: '#000', border: 'none' }}
        >
          {view3D ? '📷 Switch to 2D Photo' : '🏎️ Launch 3D Garage Inspector'}
        </button>
      </div>

      <div className="details-header-banner">
        <h2 className="car-title">{car.name}</h2>
        <div className="car-price">{car.priceRange}</div>
      </div>

      <div className="details-content row g-4 mt-2">
        <div className="col-12 col-md-6 details-left">
          <div className="specs-grid">
            {specs.map(([label, value]) => (
              <div className="spec-item" key={label}>
                <span className="spec-label">{label}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>

          <div className="car-description mt-3">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>

          {car.features?.length > 0 && (
            <div className="car-features mt-3">
              <h3>Key Features</h3>
              <ul className="feature-list">
                {car.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 details-right">
          {view3D ? (
            <div className="car-image-large" style={{ background: '#0a0a0a', padding: 0 }}>
              <Car3DViewer modelUrl={car.modelUrl} />
            </div>
          ) : (
            <div className="car-image-large">
              {car.imageUrl
                ? <img src={car.imageUrl} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div className="placeholder-image"><span>{car.name}</span></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

