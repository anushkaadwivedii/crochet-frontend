import AOS from 'aos';
import { useEffect } from 'react';
import myPhoto from '../assets/aboutme1.JPG';       
import crochetPhoto from '../assets/start.JPG'; 
import plushiePhoto from '../assets/going.png';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-pink-50 pt-40">
  
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-10" data-aos="fade-up">
        <img src={myPhoto} alt="Anushka" className="w-full max-w-sm rounded-lg shadow-lg" />

        <div className="max-w-xl text-rose-800 text-lg">
          <h2 className="text-3xl font-bold mb-4">Who am I</h2>
          <p className="mb-2">
            I'm a senior at the University of Wisconsin-Madison, studying Computer Science and Data Science.
            Ever since I was a kid, I used to dread the “What are your hobbies?” question because, honestly, I didn't really have any.
          </p>
          <p>
            Now though, I've finally found something I love. Crocheting lets me relax, create, and express myself in a way I never thought possible.
            I hope you enjoy the cozy little things I make just as much as I enjoy making them.
          </p>
        </div>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 py-20 gap-10" data-aos="fade-up">
        <div className="max-w-xl text-rose-800 text-lg">
          <h2 className="text-3xl font-bold mb-4">How it started</h2>
          <p className="mb-2">
            Two years ago during summer break, I was bored out of my mind. I picked up a hook, grabbed some yarn, and searched "how to crochet" on YouTube.
          </p>
          <p>
            The first two weeks were just chaos. I kept cutting up yarn and restarting because nothing looked right. But I stuck with it.
            Eventually, I made my first little amigurumi heart. It was super ugly, but I loved it anyway. That's where it all began.
          </p>
        </div>
        <img src={crochetPhoto} alt="Beginning crochet" className="w-full max-w-sm rounded-lg shadow-lg" />
      </section>

      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-20 gap-10" data-aos="fade-up">
        <img src={plushiePhoto} alt="Crochet progress" className="w-full max-w-sm rounded-lg shadow-lg" />
        <div className="max-w-xl text-rose-800 text-lg">
          <h2 className="text-3xl font-bold mb-4">How it's going</h2>
          <p className="mb-2">
            Fast forward to now, I've been crocheting for over two years and I feel a lot more confident in what I make.
            I've created plushies, keychains, home décor and bags.
          </p>
          <p>
            I've shared my work with friends and family (and yes, I absolutely live for their praise).
            Lately, I've been trying to branch out into making clothes. I started one piece (it's still not finished T_T),
            but I'm really excited to keep learning and growing.
          </p>
        </div>
      </section>
    </div>
  );
}
