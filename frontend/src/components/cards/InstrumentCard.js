import React, { useEffect, useState } from "react";
import { getInstrumentPicture } from "../../api/instrument";
import BasicButton from "../button/BasicButton";
import { Link } from "react-router-dom";
import Spinner from "../icons/Spinner";
import withLoading from "../../HOC/withLoading";
import { Picture } from "../Picture";

const PictureWithLoading = withLoading(Picture);

export default function InstrumentCard({ instrument, style = "" }) {
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
      <div className="w-64 h-48 flex justify-center items-center rounded-t border-2 border-border_color-center">
        <PictureWithLoading
          loading={loading}
          src={picture?.src}
          alt={`image ${instrument.instrumentName}`}
          style={"w-64 h-48 rounded-t"}
        />
      </div>
      <div className="flex justify-center h-28 w-64 border-b-2 border-r-2 border-l-2 border-border_color rounded-b">
        <div className="flex mt-3 flex-col justify-between items-center w-[85%] h-[70%]">
          <div>
            <p className="text-main_color text-sm text-center">
              {instrument.type} {instrument.brand}
            </p>
            <p className="text-sm text-center">
              {instrument.instrumentName.slice(0, 20)}...
            </p>
          </div>
          <Link to={`/instrument/${instrument.id}`}>
            <BasicButton type="button" height="7" style="text-sm">
              <p className="h-fit">details</p>
            </BasicButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
