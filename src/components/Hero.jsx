import myCarImage from '../assets/my-car.png'

export default function Hero() {
  return (
    <div className="hero">
      <img src={myCarImage} alt="car banner" className="hero-image" />
      <div className="hero-text">
        <div className="title-line1">PAPE</div>
        <div className="title-line2">MOTORS.COM</div>
        <div className="subtitle">Meeting your vehicular needs</div>
      </div>
    </div>
  );
}