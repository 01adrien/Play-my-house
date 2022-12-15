import React, { useState } from 'react';
import { user } from '../../store/user';
import { useRecoilValue } from 'recoil';
import useAddInstrument from '../../hooks/useAddInstrument';
import useInstrumentSlot from '../../hooks/UseInstrumentSlot';
import BasicButton from '../button/BasicButton';
import BasicSelect from '../select/BasicSelect';
import BasicToggle from '../toggle/BasicToggle';
import SelectAddInstrument from '../select/SelectAddInstrument';
import { BsPlusCircleFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';

export default function AddInstrumentForm() {
  const profile = useRecoilValue(user);
  const {
    days,
    currentDay,
    setCurrentDay,
    setDays,
    hours,
    setHours,
    handleOneSlotValidation,
    rangeHours,
    timeChecker,
  } = useInstrumentSlot();

  const {
    families,
    getFilteredTypeList,
    brands,
    handleFilesSelect,
    handleDeleteFile,
    pictures,
    instrumentInfo,
    setInstrumentInfo,
  } = useAddInstrument();

  function validateInput(body) {
    return null;
  }

  function handleDaySlotsValidation() {
    console.log(timeline);
    console.log(hours);
    console.log(days);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { family, type, brand, description } = instrumentInfo;
    const body = {
      family: family,
      type: type,
      brand: brand,
      description: description,
    };
  }

  return (
    <div className="flex flex-col w-full">
      <p className="text-center text-xl text-bold mb-4">
        AJOUTER UN INSTRUMENT
      </p>
      <form
        className="flex flex-col justify-between mt-6"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-around">
          <SelectAddInstrument
            type="family"
            label="choisir une famille"
            data={families}
            setValue={setInstrumentInfo}
            value={instrumentInfo.family}
          />
          <SelectAddInstrument
            type="type"
            label="choisir un instrument"
            data={getFilteredTypeList()}
            setValue={setInstrumentInfo}
            value={instrumentInfo.type}
            disabled={!instrumentInfo.family}
          />
          <SelectAddInstrument
            type="brand"
            label="choisir une marque"
            data={brands}
            setValue={setInstrumentInfo}
            value={instrumentInfo.brand}
            disabled={!instrumentInfo.type}
          />
        </div>
        <div className="flex flex-col mt-6">
          <textarea
            className="border-main_color rounded mb-8"
            name="desription"
            rows="5"
            placeholder="Decris ton instrument (255 caracteres max)"
            cols="33"
          />
          <div className="flex justify-around h-32 items-start">
            <div className="flex flex-col">
              <p className="text-xs pb-1 ml-4 text-red-700">5 images max</p>
              <input
                className="block w-full bg-white text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer"
                onChange={handleFilesSelect}
                type="file"
                multiple
              />
            </div>
            <div>
              <p className="text-sm underline">Images ajoutees</p>
              <ul className="mt-2">
                {pictures.length > 0 ? (
                  pictures?.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center space-x-2"
                    >
                      <li className="text-xs text-main_color pl-2" key={p.name}>
                        - {p.name}
                      </li>
                      <span className="">
                        {
                          <RxCrossCircled
                            onClick={() => handleDeleteFile(p.name)}
                            className="text-white text-xs cursor-pointer  bg-red-700 rounded-full"
                          />
                        }
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-main_color pl-2">aucune</p>
                )}
              </ul>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <p className="text-center self-center w-[60%] text-xl border-t-2 border-main_border_color pt-4">
              Creneaux du {currentDay}
            </p>
            <div className="flex justify-between items-center w-[60%] self-center mb-4">
              <BasicSelect
                deflt={' 🕐 '}
                index="start"
                data={rangeHours(15, 9)}
                label="heure de debut"
                setValue={setHours}
                value={hours.start}
              />
              <BasicSelect
                deflt={' 🕐 '}
                index="end"
                data={rangeHours(15, 9)}
                label="heure de fin"
                setValue={setHours}
                value={hours.end}
              />
              <div className="flex justify-center items-center space-x-2 h-full">
                {
                  <BsPlusCircleFill
                    onClick={handleOneSlotValidation}
                    className="text-2xl text-main_color cursor-pointer hover:scale-110"
                  />
                }
                <p className="text-xs">valider ce creneau</p>
              </div>
            </div>
            <BasicButton
              type="button"
              onClick={handleDaySlotsValidation}
              style={`w-28 self-center`}
            >
              <p>next</p>
            </BasicButton>
          </div>
        </div>
        <BasicButton type={'submit'} style={`w-28 self-center`}>
          <p>terminé !</p>
        </BasicButton>
      </form>
    </div>
  );
}
