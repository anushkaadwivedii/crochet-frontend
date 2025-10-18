import flowerImage from '../assets/flower-home.avif';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-10 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-4xl font-extrabold text-rose-800 leading-tight mb-6">
            Welcome to Anushka's CozyCorner
          </h1>
          <h2 className="text-3xl md:text-3xl font-bold text-rose-800 leading-tight mb-6">
            Handcrafted with Love,<br />
            Crocheted with Care
          </h2>
          <p className="text-base sm:text-lg text-rose-800 mb-8 max-w-lg mx-auto md:mx-0">
            Discover unique, handmade crochet creations that bring warmth and comfort to your home. Each piece is crafted with premium yarn and years of passionate expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <Link 
              to='/shop' 
              className="bg-rose-800 hover:bg-rose-500 text-white font-semibold py-3 px-6 rounded-lg shadow w-full sm:w-auto text-center"
            >
              Shop Collection
            </Link>
            <Link 
              to='/about' 
              className="border-2 border-rose-800 hover:border-rose-500 hover:text-rose-500 text-rose-800 font-semibold py-3 px-6 rounded-lg w-full sm:w-auto text-center"
            >
              Learn My Story
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full flex justify-center md:justify-end">
          <img
            src={flowerImage}
            alt="Crochet Display"
            className="rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
