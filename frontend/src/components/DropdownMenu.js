import React, { useState, useEffect } from "react";

export default function DropdownMenu() {
  const [items, setItems] = useState({
    piano: ["piano electrique", "piano droit", "piano a queue"],
    cordes: ["basse", "guitare", "contrebasse"],
    vent: ["cornemuse", "flute", "saxophone"],
  });
  return (
    <div id="dropdown" className="dropdown inline-block relative z-10">
      <button className="bg-main_color text-white font-semibold py-2 px-4 inline-flex items-center w-[10vw]">
        <span>Instruments</span>
      </button>
      <ul className="dropdown-content absolute hidden text-gray-700 w-[10vw] bg-white  border border-slate-200">
        {Object.keys(items).map((item) => {
          return (
            <li key={item} className="dropdown">
              <a className="hover:bg-slate-100 py-2 px-4 block whitespace-no-wrap border bg-white border-slate-200">
                {item}
              </a>
              <ul className="dropdown-content absolute hidden bg-white text-gray-700 ml-[10vw] -mt-10 w-[8vw]">
                {items[item].map((i) => {
                  return (
                    <li key={i}>
                      <a className="hover:bg-slate-100 bg-white py-2 px-4 block whitespace-no-wrap border border-slate-200">
                        {i}
                      </a>
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
