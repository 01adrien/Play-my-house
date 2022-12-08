import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasicButton from '../button/BasicButton';
import useMenuItems from '../../hooks/useMenuItems';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function DropdownMenu() {
  const [dropdownStyle, setDropdownStyle] = useState(
    'dropdown inline-block relative'
  );

  const { menuItems } = useMenuItems();
  return (
    <div id="dropdown" className={dropdownStyle}>
      <Link
        onMouseEnter={() => setDropdownStyle('dropdown inline-block z-10')}
        to={'/instrument-all'}
      >
        <BasicButton
          style={`bg-main_color shadow-md w-48 text-white font-semibold py-2 px-4 h-[48px] inline-flex rounded-none items-center`}
        >
          <div className="w-full flex space-between items-center">
            <GiHamburgerMenu />
            <span className="pl-3">Instruments</span>
          </div>
        </BasicButton>
      </Link>
      <ul
        className={`dropdown-content border-x-[1px] border-b-[1px] border-border_color w-48 absolute hidden text-gray-700`}
      >
        {menuItems &&
          Object.keys(menuItems).map((item) => {
            return (
              <li
                key={item}
                className="bg-white dropdown border-t-[1px] border-t-border_color"
              >
                <Link to={`/instrument-family/${item}`}>
                  <span
                    data-cy={item}
                    onClick={() => setDropdownStyle('')}
                    className="hover:bg-slate-100 py-2 px-4 block text-bold whitespace-no-wrap"
                  >
                    {item.toUpperCase()}
                  </span>
                </Link>
                <ul
                  className={`dropdown-content border-x-[1px] border-b-[1px] border-border_color absolute hidden w-52 text-gray-700  ml-48 -mt-10 -translate-y-[1px]`}
                >
                  {menuItems[item].map((i) => {
                    return (
                      <li
                        key={i}
                        className="border-t-[1px] border-t-border_color"
                      >
                        <Link to={`/instrument-type/${i}`}>
                          <span
                            data-cy={i}
                            onClick={() => setDropdownStyle('')}
                            className="bg-white text-thin text-slate-500 hover:text-main_color hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap"
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
