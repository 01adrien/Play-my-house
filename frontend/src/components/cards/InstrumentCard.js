import React, { useEffect, useState } from 'react';
import { getInstrumentPicture } from '../../api/instrument';
import BasicButton from '../button/BasicButton';
import { Link } from 'react-router-dom';
import withLoading from '../../HOC/withLoading';
import { Picture } from '../Picture';
import useMediaQuery from '../../hooks/useMediaQuery';

const PictureWithLoading = withLoading(Picture);

export default function InstrumentCard({ instrument, style = '', link }) {
  const isMobile = useMediaQuery('(max-width: 540px)');
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState({ src: null });

  useEffect(() => {
    getInstrumentPicture(instrument.picture).then(({ data }) => {
      setPicture({ src: data });
      setLoading(false);
    });
  }, []);

  return (
    <div className={`p-3 ${style}`}>
      <div
        className={`rounded-t border-2 border-border_color-center ${
          isMobile ? 'h-28 w-32' : 'w-64 h-48'
        }`}
      >
        <PictureWithLoading
          loading={loading}
          src={picture?.src}
          alt={`image ${instrument.instrumentName}`}
          style={`rounded-t object-cover ${
            isMobile ? 'h-28 w-32' : 'w-64 h-48'
          }`}
        />
      </div>
      <div
        className={`flex justify-center border-b-2 border-r-2 border-l-2 border-border_color rounded-b ${
          isMobile ? 'h-14 w-32' : 'w-64 h-28'
        }`}
      >
        <div className="flex mt-3 flex-col justify-between items-center w-[85%] h-[80%]">
          {!isMobile && (
            <div>
              <p className="text-main_color text-sm text-center">
                {instrument.type}
              </p>
              <p className="text-sm text-center">
                {instrument.brand.slice(0, 20)}
              </p>
            </div>
          )}
          <Link to={link} state={{ ...instrument, picture: null }}>
            <BasicButton
              type="button"
              style={isMobile ? 'text-xs h-6 w-20 mt-1' : `text-sm h-8`}
            >
              <p>details</p>
            </BasicButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
