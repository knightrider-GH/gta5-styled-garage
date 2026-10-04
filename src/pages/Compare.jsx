import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FuelMarquee from '../components/FuelMarquee';

const SPECS = [
  { label: 'Price Range', key: 'priceRange' },
  { label: 'Fuel Type', key: 'fuel' },
  { label: 'Mileage', key: 'mileage' },
  { label: 'Engine', key: 'engine' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Category', key: 'category' },
  { label: 'Brand', key: 'brand' },
];

export default function Compare() {
  const [cars, setCars] = useState([]);
  const [selected, setSelected] = useState(['', '']);

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(r => r.json())
      .then(data => setCars(data))
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const handleSelect = (index, carId) => {
    setSelected(prev => {
      const next = [...prev];
      next[index] = carId;
      return next;
    });
  };

  const addSlot = () => {
    if (selected.length < 4) setSelected(prev => [...prev, '']);
  };

  const removeSlot = (index) => {
    if (selected.length <= 2) return;
    setSelected(prev => prev.filter((_, i) => i !== index));
  };

  const selectedCars = selected.map(id => cars.find(c => c._id === id)).filter(Boolean);
  const canCompare = selectedCars.length >= 2;

  return (
    <div>
      <Navbar />
      <FuelMarquee />

      <div className="compare-page">
        <div className="compare-header">
          <h2 className="compare-title"> Compare Cars</h2>
          <p className="compare-subtitle">Select 2 or more cars to compare specifications side-by-side</p>
        </div>

        {/* Car selectors */}
        <div className="compare-selectors">
          {selected.map((val, idx) => (
            <div className="compare-selector-slot" key={idx}>
              <label htmlFor={`compare-car-${idx}`}>Car {idx + 1}</label>
              <select
                id={`compare-car-${idx}`}
                value={val}
                onChange={e => handleSelect(idx, e.target.value)}
              >
                <option value="">-- Select a car --</option>
                {cars.map(car => (
                  <option
                    key={car._id}
                    value={car._id}
                    disabled={selected.includes(car._id) && selected[idx] !== car._id}
                  >
                    {car.name} ({car.category})
                  </option>
                ))}
              </select>
              {selected.length > 2 && (
                <button className="remove-slot-btn" onClick={() => removeSlot(idx)} title="Remove">✕</button>
              )}
            </div>
          ))}

          {selected.length < 4 && (
            <button className="add-slot-btn" id="add-car-slot" onClick={addSlot}>+ Add Car</button>
          )}
        </div>

        {/* Comparison Table */}
        {canCompare && (
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="spec-col">Specification</th>
                  {selectedCars.map(car => (
                    <th key={car._id} className="car-col">
                      <div className="compare-car-thumb">
                        {car.imageUrl
                          ? <img src={car.imageUrl} alt={car.name} />
                          : <div className="compare-thumb-placeholder">{car.name[0]}</div>}
                      </div>
                      <div className="compare-car-name">{car.name}</div>
                      <div className="compare-car-price">{car.priceRange}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPECS.map(spec => (
                  <tr key={spec.key}>
                    <td className="spec-label-cell">{spec.label}</td>
                    {selectedCars.map(car => (
                      <td key={car._id} className="spec-value-cell">
                        {car[spec.key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!canCompare && (
          <div className="compare-placeholder">
            <span> Select at least 2 cars above to see the comparison table</span>
          </div>
        )}
      </div>
    </div>
  );
}
