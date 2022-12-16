import React, { useState } from 'react';
import { user, timelineIds } from '../../store/user';
import { useRecoilValue } from 'recoil';
import useAddInstrument from '../../hooks/useAddInstrument';
import useReservationSlot from '../../hooks/useReservationSlot';
import BasicButton from '../button/BasicButton';
import BasicSelect from '../select/BasicSelect';
import SelectAddInstrument from '../select/SelectAddInstrument';
import { BsPlusCircleFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { timelineIds } from '../../store/user';
import {
  HiOutlineArrowCircleDown,
  HiOutlineArrowCircleUp,
} from 'react-icons/hi';

export default function AddInstrumentForm() {
  const timelines = useRecoilValue(timelineIds);
  const profile = useRecoilValue(user);
  const {
    days,
    currentDay,
    hours,
    setHours,
    handleOneSlotValidation,
    rangeHours,
    numToDay,
    nextDay,
    prevDay,
    handleDeleteHour,
    formatDaySlotAndPostTimeline,
  } = useReservationSlot();

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

  const [showSelectedHours, setShowSelectedHours] = useState(false);
  const { type, family, brand, description } = instrumentInfo;
  const textAreaDisabled = !family || !type || !brand;
  const uploadDisabled = !description;
  const selectSlotsDisabled = !pictures.length;
  const submitDisabled = !timelines?.done;

  async function validateSlots() {
    setShowSelectedHours(false);
    formatDaySlotAndPostTimeline();
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(timelines);
    const { family, type, brand, description } = instrumentInfo;
    const body = {
      family: family,
      type: type,
      brand: brand,
      description: description,
      timeline_id_monday: timelines?.lundi || null,
      timeline_id_tuesday: timelines?.mardi || null,
      timeline_id_wednesday: timelines?.mercredi || null,
      timeline_id_thusrday: timelines?.jeudi || null,
      timeline_id_iriday: timelines?.vendredi || null,
      timeline_id_saturday: timelines?.samedi || null,
      timeline_id_sunday: timelines?.dimanche || null,
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
            onChange={(e) =>
              setInstrumentInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className={`border-main_color rounded mb-8 ${
              textAreaDisabled && 'opacity-30'
            }`}
            disabled={textAreaDisabled}
            name="desription"
            rows="5"
            placeholder="Decris ton instrument (255 caracteres max)"
            cols="33"
          />
          <div
            disabled={uploadDisabled}
            className={`${
              uploadDisabled && 'opacity-30'
            } flex justify-around h-32 items-start`}
          >
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
                      <li className="text-xs pl-2" key={p.name}>
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
                  <p className="text-xs pl-2">aucune</p>
                )}
              </ul>
            </div>
          </div>
          <div
            className={`flex flex-col justify-around mb-4 border-b-2 border-border_color w-[100%] ${
              selectSlotsDisabled && 'opacity-100'
            }`}
            disabled={false || selectSlotsDisabled}
          >
            <p className="text-center self-center w-[60%] text-xl border-t-2 border-main_border_color py-4">
              Creneaux du {numToDay[currentDay]}
            </p>
            <div className="flex justify-between items-center w-[60%] self-center mb-8">
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
            <div className="flex justify-around w-[60%] self-center mb-8">
              <BasicButton type="button" onClick={prevDay} style={`w-28`}>
                <p>prev</p>
              </BasicButton>
              <BasicButton type="button" onClick={nextDay} style={`w-28`}>
                <p>next</p>
              </BasicButton>
            </div>
            <div className="flex flex-col text-sm w-[100%] justify-center mb-8">
              <div className="flex justify-between self-center items-center">
                <p className="text-center pr-3">
                  heures selectionnées pour le {numToDay[currentDay]}
                </p>

                <span
                  className="cursor-pointer"
                  onClick={() => setShowSelectedHours(!showSelectedHours)}
                >
                  {!showSelectedHours ? (
                    <HiOutlineArrowCircleDown className="text-xl" />
                  ) : (
                    <HiOutlineArrowCircleUp className="text-xl" />
                  )}
                </span>
              </div>
              {showSelectedHours && (
                <ul className="text-center text-xs mt-2 self-center">
                  {days[numToDay[currentDay]].length ? (
                    days[numToDay[currentDay]]
                      .sort((a, b) => a[0] - b[0])
                      .map((h) => (
                        <li key={h} className="flex items-center space-x-2">
                          <span>
                            {h[0] < 10 ? '0' + h[0] : h[0]}h - {h[1]}h
                          </span>
                          {
                            <RxCrossCircled
                              onClick={() => handleDeleteHour(h)}
                              className="text-white text-xs cursor-pointer bg-red-700 rounded-full"
                            />
                          }
                        </li>
                      ))
                  ) : (
                    <p>aucune(s) heure(s)</p>
                  )}
                </ul>
              )}
            </div>
            <BasicButton
              type="button"
              onClick={validateSlots}
              style={'w-40 self-center'}
            >
              <p>valider horaires</p>
            </BasicButton>
          </div>
        </div>
        <BasicButton
          disabled={submitDisabled}
          type={'submit'}
          style={`w-28 self-center mb-4 ${submitDisabled && 'opacity-30'}`}
        >
          <p>terminé !</p>
        </BasicButton>
      </form>
    </div>
  );
}
