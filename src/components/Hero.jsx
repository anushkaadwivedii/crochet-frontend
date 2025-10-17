import flowerImage from '../assets/flower-home.avif';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="py-20 px-10 pt-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1">
            <h1 className="text-4xl md:text-4xl font-extrabold text-rose-800 leading-tight mb-6">
                Welcome to Anushka's CozyCorner
            </h1>
          <h2 className="text-4xl md:text-3xl font-bold text-rose-800 leading-tight mb-6">
            Handcrafted with Love, <br></br>
            Crocheted with Care
          </h2>
          <p className="text-lg text-rose-800 mb-8 max-w-lg">
            Discover unique, handmade crochet creations that bring warmth and comfort to your home. Each piece is crafted with premium yarn and years of passionate expertise.
          </p>
          <div className="flex gap-6">
            <Link 
                to='/shop' 
                className="bg-rose-800 hover:bg-rose-500 text-white font-semibold py-3 px-6 rounded-lg shadow">
              Shop Collection
            </Link>
            <Link 
                to = '/about' 
                className="border-2 border-rose-800 hover:border-rose-500 hover:text-rose-500 text-rose-800 font-semibold py-3 px-6 rounded-lg">
              Learn My Story
            </Link>
          </div>
        </div>

        
        <div className="flex-1">
          <img
            src={flowerImage}
            alt="Crochet Display"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>

        
      </div>
      
    </section>
  );
}
