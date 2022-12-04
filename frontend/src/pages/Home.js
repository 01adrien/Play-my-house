import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getTenNewest } from '../api/instrument';
import banner from '../assets/home_banner1.jpg';
import InstrumentCard from '../components/cards/InstrumentCard';
import { useRecoilState } from 'recoil';
import { user } from '../store/user';
import Footer from '../components/Footer';

export default function Home() {
  const [instruments, setInstruments] = useState([]);
  const [profile, setProfile] = useRecoilState(user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTenNewest()
      .then(setInstruments)
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <img
          className="object-contain rounded h-80"
          src={banner}
          alt="home-banner"
        />
        <div className="mt-8 flex items-center justify-center">
          <div className="w-[75%] flex flex-col items-center text-center justify-center border-t-2 border-border_color">
            <p className="text-main_color text-xl mt-6">
              Aliquam facilisis arcu vitae sollicitudin pharetra. Orci varius
              natoque penatibus
            </p>
            <div className="w-[40%] border-t-2 mt-3 border-border_color h-[1px]"></div>
            <p className="mt-5">
              Vivamus aliquam enim a enim egestas, at interdum erat mollis.
              Quisque posuere feugiat blandit. Nullam fringilla risus in purus
              ornare faucibus. Duis mauris urna, porttitor id nisi in, mollis
              imperdiet tellus. Morbi purus magna,
            </p>
            <p className="text-main_color mt-10 text-xl">Les nouveautes</p>
            <div className="w-[80px] border-t-2 mt-3 border-border_color h-[1px]"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] flex flex-wrap justify-center mb-4">
            {instruments?.map((instrument) => (
              <InstrumentCard
                key={instrument.id}
                style={'hover:scale-110'}
                instrument={instrument}
                link={`/instrument/${instrument.id}`}
              />
            ))}
          </div>
        </div>
      </div>
      {!loading && <Footer />}
    </Layout>
  );
}
