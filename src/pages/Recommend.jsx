import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FuelMarquee from '../components/FuelMarquee';
import CarDetails from '../components/CarDetails';

const BUDGET_OPTIONS = ['Under ₹7L', 'Under ₹12L', 'Above ₹15L'];
const PRIORITY_OPTIONS = ['Mileage', 'Safety', 'Performance', 'Family Space'];
const BODY_OPTIONS = ['Hatchback', 'Sedan', 'SUV', 'Sports'];
const FUEL_OPTIONS = ['Petrol', 'Diesel', 'CNG', 'Electric'];

function scoreCar(car, { budget, priority, bodyType, fuelType }) {
  let score = 0;
  let maxScore = 0;

  // Budget scoring
  maxScore += 25;
  const priceText = car.priceRange || '';
  const match = priceText.match(/[\d.]+/g);
  const minPrice = match ? parseFloat(match[0]) : 999;
  if (budget === 'Under ₹7L' && minPrice < 7) score += 25;
  else if (budget === 'Under ₹12L' && minPrice < 12) score += 25;
  else if (budget === 'Above ₹15L' && minPrice >= 15) score += 25;
  else if (budget === 'Under ₹12L' && minPrice < 7) score += 18; // partial
  else if (budget === 'Above ₹15L' && minPrice >= 10) score += 12; // partial

  // Body type scoring
  maxScore += 25;
  if ((car.category || '').toLowerCase() === bodyType.toLowerCase()) score += 25;

  // Fuel type scoring
  maxScore += 25;
  const carFuel = (car.fuel || '').toLowerCase();
  const selectedFuel = fuelType.toLowerCase();
  if (carFuel.includes(selectedFuel) || selectedFuel.includes(carFuel)) score += 25;
  else if (selectedFuel === 'electric' && carFuel.includes('ev')) score += 25;

  // Priority scoring
  maxScore += 25;
  const mileageText = (car.mileage || '').toLowerCase();
  const descText = (car.description || '').toLowerCase();
  const featText = ((car.features || []).join(' ')).toLowerCase();
  const combined = descText + ' ' + featText;

  if (priority === 'Mileage') {
    const mileageMatch = mileageText.match(/(\d+)/g);
    const maxMileage = mileageMatch ? Math.max(...mileageMatch.map(Number)) : 0;
    if (maxMileage >= 25) score += 25;
    else if (maxMileage >= 18) score += 18;
    else if (maxMileage >= 12) score += 10;
  } else if (priority === 'Safety') {
    const safetyKeywords = ['airbag', 'abs', 'esc', 'safety', 'ncap', 'star'];
    const hits = safetyKeywords.filter(k => combined.includes(k)).length;
    score += Math.min(hits * 5, 25);
  } else if (priority === 'Performance') {
    const perfKeywords = ['turbo', 'power', 'sport', 'engine', 'bhp', 'torque', 'performance'];
    const hits = perfKeywords.filter(k => combined.includes(k)).length;
    score += Math.min(hits * 4, 25);
  } else if (priority === 'Family Space') {
    const spaceKeywords = ['spacious', 'family', 'seating', '7-seat', 'boot', 'rear seat', 'legroom'];
    const hits = spaceKeywords.filter(k => combined.includes(k)).length;
    score += Math.min(hits * 5, 25);
  }

  const percent = Math.round((score / maxScore) * 100);
  return percent;
}

export default function Recommend() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ budget: '', priority: '', bodyType: '', fuelType: '' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(r => r.json())
      .then(data => setCars(data))
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const scored = cars
        .map(car => ({ ...car, matchScore: scoreCar(car, form) }))
        .filter(car => car.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 6);
      setResults(scored);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setResults(null);
    setForm({ budget: '', priority: '', bodyType: '', fuelType: '' });
  };

  if (selectedCar) {
    return (
      <div>
        <Navbar />
        <FuelMarquee />
        <div className="container mt-4">
          <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <FuelMarquee />

      {/* Smart Recommendation Tool */}
      <section className="recommend-section">
        <div className="recommend-header">
          <h2 className="recommend-title"> Smart Car Recommender</h2>
          <p className="recommend-subtitle">Tell us what you need — we'll find your perfect match</p>
        </div>

        <form className="recommend-form" onSubmit={handleSubmit} id="recommend-form">
          <div className="recommend-fields">
            <div className="recommend-field">
              <label htmlFor="budget"> Budget Range</label>
              <select id="budget" name="budget" value={form.budget} onChange={handleChange} required>
                <option value="">Select budget...</option>
                {BUDGET_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="recommend-field">
              <label htmlFor="priority"> Primary Priority</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange} required>
                <option value="">Select priority...</option>
                {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="recommend-field">
              <label htmlFor="bodyType"> Body Type</label>
              <select id="bodyType" name="bodyType" value={form.bodyType} onChange={handleChange} required>
                <option value="">Select body type...</option>
                {BODY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="recommend-field">
              <label htmlFor="fuelType"> Fuel Type</label>
              <select id="fuelType" name="fuelType" value={form.fuelType} onChange={handleChange} required>
                <option value="">Select fuel type...</option>
                {FUEL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          <div className="recommend-actions">
            <button type="submit" className="recommend-btn" id="recommend-submit">Find My Car</button>
            {results && <button type="button" className="recommend-reset" onClick={handleReset}>Reset</button>}
          </div>
        </form>

        {loading && <div className="recommend-loading">Analysing {cars.length} cars for you...</div>}

        {results && !loading && (
          <div className="recommend-results">
            <h3 className="results-heading">Top Matches for You</h3>
            {results.length === 0 ? (
              <p className="no-results">No strong matches found. Try adjusting your preferences.</p>
            ) : (
              <div className="results-grid">
                {results.map(car => (
                  <div className="result-card" key={car._id} onClick={() => setSelectedCar(car)} style={{ cursor: 'pointer' }}>
                    <div className="result-score-badge">{car.matchScore}% Match</div>
                    <div className="result-image">
                      {car.imageUrl
                        ? <img src={car.imageUrl} alt={car.name} />
                        : <span>{car.name}</span>}
                    </div>
                    <div className="result-info">
                      <div className="result-name">{car.name}</div>
                      <div className="result-price">{car.priceRange}</div>
                      <div className="result-meta">
                        <span>{car.fuel}</span>
                        <span>{car.mileage}</span>
                        <span>{car.category}</span>
                      </div>
                    </div>
                    <div className="result-bar-wrap">
                      <div className="result-bar" style={{ width: `${car.matchScore}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
