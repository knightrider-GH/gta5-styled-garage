import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FuelMarquee from '../components/FuelMarquee';
import Filterbar from '../components/Filterbar';
import CarDetails from '../components/CarDetails';
import Hero from '../components/Hero';

const CATEGORIES = ['All', 'Hatchback', 'Sedan', 'SUV', 'Sports'];

export default function Home({ onBuy }) {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCar, setSelectedCar] = useState(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('price');

  useEffect(() => {
    fetch('http://localhost:5000/api/cars')
      .then(r => r.json())
      .then(data => {
        setCars(data);
        setFilteredCars(data);
      })
      .catch(err => console.error('Error fetching cars:', err));
  }, []);

  const handleFilter = (cat) => {
    setActiveCategory(cat);
    applyFilters(cat, search, sortKey);
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearch(q);
    applyFilters(activeCategory, q, sortKey);
  };

  const handleSort = (e) => {
    const key = e.target.value;
    setSortKey(key);
    applyFilters(activeCategory, search, key);
  };

  const applyFilters = (cat, q, sort) => {
    let result = cars;
    if (cat !== 'All') result = result.filter(c => c.category === cat);
    if (q.trim())
      result = result.filter(c =>
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        (c.brand || '').toLowerCase().includes(q.toLowerCase())
      );
    // Simple sort implementation
    if (sort === 'price') {
      result = result.slice().sort((a, b) => {
        const aPrice = parseFloat(a.priceRange.replace(/[^0-9.]/g, '')) || 0;
        const bPrice = parseFloat(b.priceRange.replace(/[^0-9.]/g, '')) || 0;
        return aPrice - bPrice;
      });
    } else if (sort === 'name') {
      result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
    setFilteredCars(result);
  };

  if (selectedCar) return (
    <div>
      <Navbar />
      <FuelMarquee />
      <div className="container mt-4">
        <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <FuelMarquee />
      <Hero />

      <Filterbar
        selectedCategory={activeCategory}
        onSelectCategory={handleFilter}
        sortKey={sortKey}
        onSelectSort={handleSort}
        search={search}
        onSearch={handleSearch}
      />

      <div className="container mt-4 mb-5">
        <div className="row g-4">
          {filteredCars.map(car => (
            <div className="col-12 col-md-6 col-lg-4" key={car._id}>
              <div className="gta-card" onClick={() => setSelectedCar(car)} style={{ cursor: 'pointer' }}>
                <div className="gta-card-header"><span>Pape di gaadiya</span></div>
                <div className="gta-card-image">
                  {car.imageUrl
                    ? <img src={car.imageUrl} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span className="placeholder-text">{car.name}</span>}
                </div>
                <div className="gta-card-footer">
                  <span className="gta-card-name">{car.name}</span>
                  <span className="gta-card-price">{car.priceRange}</span>
                </div>
                <button className="buy-btn btn btn-sm btn-primary mt-2" onClick={e => { e.stopPropagation(); onBuy(car); }}>Buy</button>
              </div>
            </div>
          ))}
          {filteredCars.length === 0 && (
            <div className="col-12 text-center mt-5" style={{ color: '#555' }}>
              <p>No cars found. Try a different filter or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
