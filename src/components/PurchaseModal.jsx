import { useState } from 'react';

export default function PurchaseModal({ show, onClose, car }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!show || !car) return null;

  const handlePurchase = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPaymentMethod('card');
      onClose();
    }, 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #1f1f1f, #121212)',
          border: '2px solid #f0b90b',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '520px',
          color: '#fff',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(240, 185, 11, 0.2)',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, #f0b90b, #d9a000)',
          color: '#000',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: '900',
          fontFamily: 'Impact, sans-serif',
          letterSpacing: '1px'
        }}>
          <span style={{ fontSize: '1.4rem', textTransform: 'uppercase' }}>
            LEGENDARY MOTORSPORT DEALERSHIP
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.4rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h3 style={{ color: '#f0b90b', fontFamily: 'Impact, sans-serif', letterSpacing: '1px' }}>
                PURCHASE CONFIRMED!
              </h3>
              <p style={{ color: '#ccc', marginTop: '0.5rem' }}>
                Congratulations, <strong style={{ color: '#fff' }}>{name}</strong>!
                Your <strong style={{ color: '#f0b90b' }}>{car.name}</strong> is being delivered to your garage.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePurchase}>
              {/* Car snippet */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                background: '#181818',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #333',
                marginBottom: '1.25rem'
              }}>
                {car.imageUrl && (
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    style={{ width: '90px', height: '65px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#fff' }}>{car.name}</div>
                  <div style={{ color: '#f0b90b', fontWeight: 'bold', fontSize: '1.05rem' }}>
                    {car.priceRange}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {car.brand} • {car.category}
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#bbb', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Franklin Clinton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#bbb', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="franklin@lossantos.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#bbb', marginBottom: '0.4rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Payment Account
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="card">Maze Bank Wire Transfer</option>
                  <option value="fleeca">Fleeca Direct Debit</option>
                  <option value="crypto">Los Santos Crypto Token</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: '#2a2a2a',
                    border: '1px solid #555',
                    color: '#ccc',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!name || !email}
                  style={{
                    padding: '0.75rem 1.75rem',
                    background: (!name || !email) ? '#77621c' : '#f0b90b',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: (!name || !email) ? 'not-allowed' : 'pointer',
                    fontWeight: '900',
                    fontFamily: 'Impact, sans-serif',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    transition: 'all 0.2s'
                  }}
                >
                  ORDER NOW
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

