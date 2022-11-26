import React, { useState, useEffect } from "react";
import { getMenuItems } from "../../api";
import { Link } from "react-router-dom";
import Burger from "../icons/Burger";
import BasicButton from "../button/BasicButton";

export default function DropdownMenu() {
  const [items, setItems] = useState({});
  const [dropdownStyle, setDropdownStyle] = useState(
    "dropdown inline-block z-10"
  );
  const width = "150";

  useEffect(() => {
    getMenuItems().then(setItems);
  }, []);

  return (
    <div id="dropdown" className={`${dropdownStyle}`}>
      <Link
        onMouseEnter={() => setDropdownStyle("dropdown inline-block z-10")}
        to={"/instrument-all"}
      >
        <BasicButton
          style={`bg-main_color text-white font-semibold rounded-none py-2 w-[150px] px-0 inline-flex justlfy-center`}
        >
          <div className="w-full flex space-between">
            <Burger />
            <span className="pl-3">Instruments</span>
          </div>
        </BasicButton>
      </Link>
      <ul
        className={`dropdown-content cursor-pointer absolute hidden text-gray-700 w-[${width}px] bg-white  border border-slate-200`}
      >
        {items &&
          Object.keys(items).map((item) => {
            return (
              <li key={item} className="dropdown">
                <Link to={`/instrument-family/${item}`}>
                  <span
                    onClick={() => setDropdownStyle("")}
                    className="hover:bg-slate-100 cursor-pointer py-2 px-4 block whitespace-no-wrap border bg-white border-slate-200"
                  >
                    {item}
                  </span>
                </Link>
                <ul
                  className={`dropdown-content cursor-pointer absolute hidden bg-white text-gray-700 ml-[${width}px] -mt-10 w-[${width}px]`}
                >
                  {items[item].map((i) => {
                    return (
                      <li key={i}>
                        <Link to={`/instrument-type/${i}`}>
                          <span
                            onClick={() => setDropdownStyle("")}
                            className="hover:text-main_color cursor-pointer bg-white py-2 w-[200px] px-4 block whitespace-no-wrap border border-slate-200"
                          >
                            {i}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
