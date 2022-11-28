import React, { useState, useEffect } from 'react';
import { getMenuItems } from '../../api';
import { Link } from 'react-router-dom';
import Burger from '../icons/Burger';
import BasicButton from '../button/BasicButton';

export default function DropdownMenu() {
  const [items, setItems] = useState({});
  const [dropdownStyle, setDropdownStyle] = useState(
    'dropdown inline-block relative'
  );
  const width = '150';

  useEffect(() => {
    getMenuItems().then(setItems);
  }, []);

  return (
    <div id="dropdown" className={dropdownStyle}>
      <Link
        onMouseEnter={() => setDropdownStyle('dropdown inline-block z-10')}
        to={'/instrument-all'}
      >
        <BasicButton
          style={`bg-main_color w-36 text-white font-semibold py-2 px-4 rounded inline-flex items-center`}
        >
          <div className="w-full flex space-between">
            <span className="pl-3">Instruments</span>
          </div>
        </BasicButton>
      </Link>
      <ul
        className={`dropdown-content border-x-2 border-b-2 border-border_color w-36 absolute hidden text-gray-700`}
      >
        {items &&
          Object.keys(items).map((item) => {
            return (
              <li
                key={item}
                className="bg-white dropdown border-t-2 border-t-border_color"
              >
                <Link to={`/instrument-family/${item}`}>
                  <span
                    onClick={() => setDropdownStyle('')}
                    className="hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap"
                  >
                    {item}
                  </span>
                </Link>
                <ul
                  className={`dropdown-content border-x-2 border-b-2 border-border_color absolute hidden w-52 text-gray-700 -translate-x-1 ml-36 -mt-10 -translate-y-[1px]`}
                >
                  {items[item].map((i) => {
                    return (
                      <li key={i} className="border-t-2 border-t-border_color">
                        <Link to={`/instrument-type/${i}`}>
                          <span
                            onClick={() => setDropdownStyle('')}
                            className="bg-white hover:bg-slate-300 py-2 px-4 block whitespace-no-wrap"
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
