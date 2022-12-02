import React from "react";

export const Modal = ({ children, openModal, closeModal }) => {
  return (
    <>
      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full overflow-auto bg-[rgba(0, 0, 0, 0.5)]">
          <div className="bg-white p-[20px] mt-[10%] mr-auto ml-auto mb-[10%]">
            <button onClick={closeModal}>Hide Modal</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
