import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getTenNewest } from '../api/instrument';
import img1 from '../assets/home_banner1.jpg';
import img2 from '../assets/home_banner2.jpeg';
import img3 from '../assets/home_banner3.jpg';
import InstrumentCard from '../components/cards/InstrumentCard';
import { useRecoilState } from 'recoil';
import { user } from '../store/user';
import Footer from '../components/Footer';
import { Picture } from '../components/Picture';
import Caroussel from '../components/Caroussel';
import useMediaQuery from '../hooks/useMediaQuery';
import { pingServer } from '../api';


export default function Home() {
  const [instruments, setInstruments] = useState([]);
  const [profile, setProfile] = useRecoilState(user);
  const [loading, setLoading] = useState(true);
  const pictures = [img1, img2, img3];
  const isMobile = useMediaQuery('(max-width: 540px)');

  useEffect(() => {
    pingServer().then(console.log)
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
      <div className="flex flex-col h-full mt-6">
        <div
          className={`w-full flex justify-center ${
            isMobile ? 'h-[20vh]' : 'h-[25vh]'
          }`}
        >
          <div
            className={`w-[40%] max-w-[400px] min-w-[200px] ${
              isMobile ? 'h-[20vh]' : 'h-[25vh]'
            }`}
          >
            <Caroussel
              slideInterval={3000}
              data={pictures}
              Component={Picture}
              slide={true}
            />
          </div>
        </div>
        <div className="mt-8 flex items-center justify-center">
          <div className="w-[75%] flex flex-col items-center text-center justify-center border-t-2 border-border_color">
            <p
              className={`text-main_color text-xl mt-6 ${isMobile && 'text-l'}`}
            >
              Aliquam facilisis arcu vitae sollicitudin pharetra. Orci varius
              natoque penatibus
            </p>
            <div className="w-[40%] border-t-2 mt-3 border-border_color h-[1px]"></div>
            <p className={`mt-5 ${isMobile && 'text-sm'}`}>
              Vivamus aliquam enim a enim egestas, at interdum erat mollis.
              Quisque posuere feugiat blandit. Nullam fringilla risus in purus
              ornare faucibus. Duis mauris urna, porttitor id nisi in, mollis
              imperdiet tellus. Morbi purus magna,
            </p>
            <p
              className={`text-main_color mt-6 text-xl ${isMobile && 'text-l'}`}
            >
              Les nouveautes
            </p>
            <div className="w-[80px] border-t-2 mt-3 border-border_color h-[1px]"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center mb-4">
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
