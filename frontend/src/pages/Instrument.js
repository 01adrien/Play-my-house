import fr from 'date-fns/locale/fr';
import { Accordion } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiOutlineArrowCircleDown } from 'react-icons/hi';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getUserById } from '../api/user';
import {
  DatePickerBtn,
  currentMonth,
  currentYear,
  isDispoDay,
  highlightDispoDay,
  daysTraduction,
} from '../calendar/DatePickerUtils';
import { useDatePicker } from '../hooks/useDatePicker';
import BasicButton from '../components/button/BasicButton';
import UserSmallCards from '../components/cards/UserSmallCards';
import Layout from '../components/Layout';
import { Picture } from '../components/Picture';
import withCarousel from '../HOC/withCarousel';
import withLoading from '../HOC/withLoading';
import useCarousel from '../hooks/useCarousel';
import useProfilePicture from '../hooks/useProfilePicture';
import { user } from '../store/user';
import { compose } from '../utils';
import ModalReservation from '../components/modal/ModalReservation';
registerLocale('fr', fr);

const PictureWithCarouselAndLoading = compose(
  withCarousel,
  withLoading
)(Picture);

const UserSmallCardsWithLoading = withLoading(UserSmallCards);

export default function Instrument() {
  const { id } = useParams();
  const profile = useRecoilValue(user);
  const location = useLocation();
  const [owner, setOwner] = useState([]);
  const [refreshResa, setRefreshResa] = useState(false);
  const { loading, pictures } = useCarousel(id);
  const { avatar, avatarLoading } = useProfilePicture(
    location?.state?.owner_id
  );

  const {
    weekDispos,
    arrayDays,
    NotEmptyDays,
    notDispoDays,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    timelineDay,
    noDispo,
    selectedDate,
    handleSelectDate,
    setOpenReservationModal,
    openReservationModal,
    handleDayHover,
    notDispoSlots,
    setNotDispoSlots,
  } = useDatePicker(id, refreshResa);

  function dayStyle(day) {
    return highlightDispoDay(
      day,
      NotEmptyDays,
      notDispoDays,
      arrayDays,
      selectedMonth,
      selectedYear
    );
  }

  function handleChangeMonth(month) {
    setSelectedMonth(month.getMonth() + 1);
    setSelectedYear(month.getFullYear());
  }

  function handleCloseCalendar() {
    setNotDispoSlots('');
    setSelectedMonth(currentMonth() + 1);
    setSelectedYear(currentYear());
  }

  function daysToShow(day) {
    return isDispoDay(day, arrayDays, notDispoDays, selectedMonth);
  }

  useEffect(() => {
    getUserById(location.state.owner_id).then(setOwner);
  }, [id]);

  return (
    <Layout>
      <div className="w-[100%] flex flex-col items-center justify-center mt-6">
        <p className="text-lg">{location.state.instrumentName.toUpperCase()}</p>
        <div className="flex flex-col justify-around mt-8 max-w-[700px] w-[60%]">
          <div
            className={`flex sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-between items-center xs:flex-col 2xs:flex-col 3xs:flex-col`}
          >
            <div className="h-72 w-96 min-w-[300px] max-w-[300px] rounded-md border-[1px] border-border_color">
              {pictures && (
                <PictureWithCarouselAndLoading
                  loading={loading}
                  pictureNumber={pictures?.length}
                  data={pictures}
                  src={pictures[0]}
                />
              )}
            </div>
            <div className="flex flex-col justify-start items-end w-72 h-72 pt-4">
              <Accordion
                arrowIcon={HiOutlineArrowCircleDown}
                flush={true}
                className="focus:ring-0 w-72 ml-20 shadow-md"
              >
                <Accordion.Panel className="focus:ring-0">
                  <Accordion.Title className="focus:ring-0 h-14 text-sm">
                    <UserSmallCardsWithLoading
                      loading={avatarLoading}
                      name={owner?.name ? owner?.name.toUpperCase() : ''}
                      picture={avatar}
                    />
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="text-xs">
                      <p>{owner?.email}</p>
                      <p>{owner?.telephone}</p>
                      <p>{owner?.address}</p>
                      <p>Ville</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel className="focus:ring-0 text-[0.5rem] text-thin">
                  <Accordion.Title className="focus:ring-0 text-[1rem] text-thin h-14">
                    <p className="">
                      <span>🗓️</span>
                      <span className="pl-2">Les dispos</span>
                    </p>
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="text-xs">
                      {weekDispos &&
                        Object.keys(weekDispos).map((day) => {
                          return (
                            <p key={day}>
                              {daysTraduction[day]}
                              {': '}
                              {weekDispos[day].slice(0, -2)}.
                            </p>
                          );
                        })}
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
          <div className="w-full sm:h-8 xs:h-2 2xs:h-2 3xs:h-2 flex justify-center">
            {notDispoSlots?.slots?.txt.length > 0 && (
              <div className="text-base w-full flex justify-center text-center items-center pt-5">
                <p className="pr-2 text-base">⚠️</p>
                <p className="text-red-600">
                  certain(s) creneau(x) plus disponible(s)
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-around h-32">
            <div
              className={`w-full flex justify-around items-center sm:flex-col-reverse md:flex-row xs:flex-col-reverse 2xs:flex-col-reverse 3xs:flex-col-reverse`}
            >
              <div className="">
                <DatePicker
                  onCalendarOpen={() => setRefreshResa(!refreshResa)}
                  locale="fr"
                  minDate={new Date()}
                  selected={new Date()}
                  disabledKeyboardNavigation
                  onCalendarClose={handleCloseCalendar}
                  filterDate={daysToShow}
                  onDayMouseEnter={handleDayHover}
                  onMonthChange={handleChangeMonth}
                  onChange={handleSelectDate}
                  dayClassName={dayStyle}
                  customInput={<DatePickerBtn />}
                  popperPlacement="bottom-start"
                ></DatePicker>
              </div>
              <BasicButton
                width="52"
                style="bg-slate-400 hover:bg-slate-500 hover:scale-105 shadow-md"
              >
                <p className="text-center">
                  <span>Message</span>
                  <span className="ml-2">💬</span>
                </p>
              </BasicButton>
            </div>
          </div>
        </div>
        <div className="w-[60%] pb-8 text-center mt-8 max-w-6xl">
          {location.state.description}
        </div>
      </div>
      {openReservationModal && (
        <ModalReservation
          instrument={location.state}
          selectedDate={selectedDate}
          onClose={() => setOpenReservationModal(false)}
          noDispo={JSON.stringify(noDispo)}
          timeline={timelineDay}
        />
      )}
    </Layout>
  );
}
