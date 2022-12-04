import fr from 'date-fns/locale/fr';
import { Accordion } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HiOutlineArrowCircleDown } from 'react-icons/hi';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getDispoSlotsByDay } from '../api/reservation';
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
import Footer from '../components/Footer';
import { user } from '../store/user';
import { compose } from '../utils';
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
  const [notDispoSlots, setNotDispoSlots] = useState('');
  const [refreshResa, setRefreshResa] = useState(false);
  const { loading, pictures } = useCarousel(id);
  const { avatar, avatarLoading } = useProfilePicture(location.state.owner_id);

  const {
    weekDispos,
    arrayDays,
    NotEmptyDays,
    notDispoDays,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
  } = useDatePicker(id, refreshResa);

  function handleDayHover(day) {
    const formatDay = day.toLocaleDateString();
    if (NotEmptyDays.includes(formatDay)) {
      getDispoSlotsByDay(id, day).then((slots) => {
        return setNotDispoSlots({
          date: formatDay,
          slots: slots,
        });
      });
    }
  }

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
      <div className="w-[100%] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-between  mt-8 h-[390px] max-w-[650px] w-[60%]">
          <div className="flex justify-between ">
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
            <div className="flex flex-col justify-between items-end w-72 h-72">
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
                    <div className="text-xs overflow-y-scroll">
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
          <div className="w-full h-8 flex justify-center">
            {notDispoSlots && (
              <div className="text-sm w-full flex justify-center text-center items-center">
                <p className="pr-2 text-base">⚠️</p>
                <p className="text-red-600 pr-2">{notDispoSlots.slots.txt}</p>
                <p>non disponible(s) pour le {notDispoSlots.date} </p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[80%] flex justify-center">
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
                onChange={(day) => console.log(day)}
                dayClassName={dayStyle}
                customInput={<DatePickerBtn />}
                popperPlacement="bottom-start"
              ></DatePicker>
              <BasicButton
                width="72"
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
        <div className="w-[60%] pb-8 text-center mt-8">
          Ut volutpat id massa in auctor. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Vivamus
          egestas sed nulla non condimentum. Pellentesque tristique viverra
          turpis, in luctus quam luctus a. Praesent id urna vel enim luctus
          ultrices. Nunc sit amet eleifend ipsum. Cras tellus ante, vestibulum
          vestibulum porta vitae, posuere sed ante. Cras in feugiat est. Vivamus
          id fermentum odio, sed pharetra nunc. Mauris fringilla erat sed risus
          pellentesque aliquam. Ut volutpat id massa in auctor. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Vivamus egestas sed nulla non condimentum.
          Pellentesque tristique viverra turpis, in luctus quam luctus a.
          Praesent id urna vel enim luctus ultrices. Nunc sit amet eleifend
          ipsum. Cras tellus ante, vestibulum vestibulum porta vitae, posuere
          sed ante. Cras in feugiat est. Vivamus id fermentum odio, sed pharetra
          nunc. Mauris fringilla erat sed risus pellentesque aliquam.
        </div>
      </div>
      {/* <Footer /> */}
    </Layout>
  );
}
