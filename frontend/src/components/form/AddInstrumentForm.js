import React, { useState } from 'react';
import { user, timelineIds } from '../../store/user';
import { useRecoilValue } from 'recoil';
import useAddInstrument from '../../hooks/useAddInstrument';
import useReservationSlot from '../../hooks/useReservationSlot';
import BasicButton from '../button/BasicButton';
import BasicSelect from '../select/BasicSelect';
import FileInput from '../input/FileInput';
import FormInput from '../input/FormInput';
import { makeErrorToast, makeSuccesToast } from '../../utils';
import SelectAddInstrument from '../select/SelectAddInstrument';
import { BsPlusCircleFill } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import { timelineIds } from '../../store/user';
import { createInstrument, uploadPicture } from '../../api/instrument';
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
  const { type, family, brand, description, name } = instrumentInfo;
  const textAreaDisabled = !family || !type || !brand;
  const uploadDisabled = textAreaDisabled || !description;
  const selectSlotsDisabled = false;
  //uploadDisabled || !pictures.length || timelines?.done;
  const submitDisabled =
    !timelines?.done ||
    !family ||
    !type ||
    !brand ||
    !description ||
    !name ||
    !pictures.length;

  async function validateSlots() {
    //setShowSelectedHours(false);
    formatDaySlotAndPostTimeline();
  }

  function handleSlotSelection() {
    if (!handleOneSlotValidation())
      return makeErrorToast({}, 'creneau(x) incorrect ou deja pris');
    return makeSuccesToast({}, 'creneau validé!');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      ownerId: profile.id,
      familyId: family,
      typeId: type,
      brandId: brand,
      name: name,
      description: description,
      timelineIdMonday: timelines?.lundi || null,
      timelineIdTuesday: timelines?.mardi || null,
      timelineIdWednesday: timelines?.mercredi || null,
      timelineIdThursday: timelines?.jeudi || null,
      timelineIdFriday: timelines?.vendredi || null,
      timelineIdSaturday: timelines?.samedi || null,
      timelineIdSunday: timelines?.dimanche || null,
    };
    console.log(body);
    console.log(pictures);

    createInstrument(body).then((data) => {
      if (data.result) {
        pictures.forEach((picture, i) => {
          uploadPicture({
            name: profile.name,
            file: picture,
            instrumentId: data.id,
            mainPicture: i === 0 ? 1 : 0,
          });
        });
      } else {
        return makeErrorToast({}, 'erreur à la creation..');
      }
      makeSuccesToast(
        {},
        'instrument crée avec succés il sera validé sous peu!'
      );
    });
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
        <FormInput
          name="nom de l'instrument"
          labelStyle="text-gray-500 text-xs text-center"
          style={'w-[80%] self-center text-xs text-gray-500 border-main_color'}
          value={instrumentInfo.name}
          fn={(e) =>
            setInstrumentInfo((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <div className="flex justify-between items-center xl:flex-row md:flex-col sm:flex-col xs:flex-col 2xs:flex-col 3xs:flex-col xl:h-16 md:h-52 sm:h-52 xs:h-52 2xs:h-52 3xs:h-52 ">
          <SelectAddInstrument
            type="family"
            label="choisir une famille"
            data={families}
            setValue={setInstrumentInfo}
            value={instrumentInfo.family}
            disabled={!instrumentInfo.name}
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
            disabled={!instrumentInfo.type || !instrumentInfo.family}
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
            maxlength="255"
          />
          <div
            disabled={uploadDisabled}
            className={`${
              uploadDisabled && 'opacity-30'
            } flex justify-around md:flex-row xs:flex-col 2xs:flex-col 3xs:flex-col h-32 md:items-start xs:items-center 2xs:items-center 3xs:items-center xs:mb-6 2xs:mb-6 3xs:mb-6`}
          >
            <div className="flex flex-col">
              <p className="text-xs pb-1 ml-4 text-red-700 ">5 images max</p>
              <input
                className="block w-full bg-white text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer"
                onChange={handleFilesSelect}
                type="file"
                accept="image/jpeg"
                multiple
                disabled={uploadDisabled}
              />
            </div>
            <div className=" mt-4">
              <p className="text-xs  underline">Images ajoutees</p>
              <div className="overflow-y-scroll">
                <ul className="mt-2 overflow-y-scroll">
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
          </div>
          <div
            className={`flex flex-col justify-around mb-4  border-b-2 border-border_color w-[100%] ${
              selectSlotsDisabled && 'opacity-30'
            }`}
          >
            <p className="text-center self-center  text-xl border-t-2 border-main_border_color py-4">
              Creneaux du {numToDay[currentDay]}
            </p>
            <div className="flex justify-between md:flex-row xs:flex-col 2xs:flex-col 3xs:flex-col items-center xl:w-[60%] md:w-[80%] sm:w-[100%] xs:w-[100%] 2xs:w-[100%] self-center mb-8 md:h-16 sm:h-52 xs:h-52 2xs:h-52 3xs:h-52">
              <BasicSelect
                deflt={' 🕐 '}
                index="start"
                data={rangeHours(15, 9)}
                label="heure de debut"
                setValue={setHours}
                value={hours.start}
                disabled={selectSlotsDisabled}
              />
              <BasicSelect
                deflt={' 🕐 '}
                index="end"
                data={rangeHours(15, 9)}
                label="heure de fin"
                setValue={setHours}
                value={hours.end}
                disabled={selectSlotsDisabled}
              />
              <div className="flex justify-center items-center space-x-2 h-12">
                {
                  <BsPlusCircleFill
                    onClick={handleSlotSelection}
                    className="text-2xl text-main_color cursor-pointer hover:scale-110"
                  />
                }
                <p className="text-xs text-gray-500">valider ce creneau</p>
              </div>
            </div>
            <div className="flex justify-around xl:w-[60%] md:w-[100%] sm:w-[100%] xs:w-[100%] 2xs:w-[100%] 3xs:w-[100%] self-center mb-8">
              <BasicButton
                type="button"
                onClick={prevDay}
                style={`w-28`}
                disabled={selectSlotsDisabled}
              >
                <p>prev</p>
              </BasicButton>
              <BasicButton
                type="button"
                onClick={nextDay}
                style={`w-28`}
                disabled={selectSlotsDisabled}
              >
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
                  onClick={() =>
                    !selectSlotsDisabled &&
                    setShowSelectedHours(!showSelectedHours)
                  }
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
              style={'w-52 self-center mb-8'}
              disabled={selectSlotsDisabled}
            >
              <p>valider les horaires</p>
            </BasicButton>
          </div>
        </div>
        <BasicButton
          disabled={submitDisabled}
          type={'submit'}
          style={`w-80 self-center mb-4 ${submitDisabled && 'opacity-30'}`}
        >
          <p>terminé !</p>
        </BasicButton>
      </form>
    </div>
  );
}
