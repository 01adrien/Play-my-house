import React, { useEffect, useState } from 'react';
import { getInstrumentPicture } from '../../api/instrument';
import BasicButton from '../button/BasicButton';
import { Link } from 'react-router-dom';
import withLoading from '../../HOC/withLoading';
import { Picture } from '../Picture';
import useMediaQuery from '../../hooks/useMediaQuery';

const PictureWithLoading = withLoading(Picture);

export default function InstrumentCard({ instrument, style = '', link }) {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState({ src: null });

  useEffect(() => {
    getInstrumentPicture(instrument.picture).then(({ data }) => {
      setPicture({ src: data });
      setLoading(false);
    });
  }, []);

  return (
    <Link className="h-fit" to={link} state={{ ...instrument, picture: null }}>
      <div className={`p-3 ${style}`}>
        <div
          className={`rounded-t border-2 border-border_color-center sm:h-48 sm:w-64 xs:h-28 xs:w-32 2xs:w-32 2xs:h-28 3sx:h-28 3xs:w-32`}
        >
          <PictureWithLoading
            loading={loading}
            src={picture?.src}
            alt={`image ${instrument.instrumentName}`}
            style={`rounded-t object-cover sm:h-48 sm:w-64 xs:h-28 xs:w-32 2xs:w-32 2xs:h-28 3sx:h-28 3xs:w-32`}
          />
        </div>
        <div
          className={`flex justify-center border-b-2 border-r-2 border-l-2 border-border_color 
          rounded-b sm:h-24 sm:w-64 sm:text-xs 2xs:text-sm 3xs:text-sm xs:h-14 xs:w-32 2xs:w-32 2xs:h-14 3sx:h-14 3xs:w-32`}
        >
          <div className="flex mt-3 flex-col justify-between items-center w-[85%] h-[80%]">
            <div>
              <p
                className={`text-main_color xs:text-xs 2xs:text-xs 3xs:text-xs text-center`}
              >
                {instrument.type.length > 15
                  ? instrument.type.slice(0, 15) + '..'
                  : instrument.type}
              </p>
              <p className={`xs:text-xs 2xs:text-xs 3xs:text-xs text-center`}>
                {instrument.brand.slice(0, 20)}
              </p>
            </div>
            <BasicButton
              type="button"
              width="40"
              style={`${
                isMobile ? 'text-xs h-6 w-20 mt-1' : 'text-sm h-8'
              } xs:hidden 2xs:hidden 3xs:hidden`}
            >
              <p>details</p>
            </BasicButton>
          </div>
        </div>
      </div>
    </Link>
  );
}
