import fr from 'date-fns/locale/fr';
import { Accordion } from 'flowbite-react';
import React, { useEffect, useState, forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  getInstrumentDisponibility,
  getReservationForOneByMonth,
} from '../api/reservation';
import { getUserById } from '../api/user';
import {
  DatePickerBtn,
  currentMonth,
  currentYear,
  currentDay,
  isDispoDay,
  highlightDispoDay,
  daysTraduction,
} from '../calendar/DatePickerUtils';
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

registerLocale('fr', fr);

const PictureWithCarouselAndLoading = compose(
  withCarousel,
  withLoading
)(Picture);

const UserSmallCardsWithLoading = withLoading(UserSmallCards);

export default function Instrument() {
  const { id } = useParams();
  const location = useLocation();
  const [instrument, _] = useState(location.state);
  const profile = useRecoilValue(user);
  const [owner, setOwner] = useState([]);
  const [weekDispos, setWeekDispos] = useState({});
  const { loading, pictures } = useCarousel(id);
  const { avatar, avatarLoading } = useProfilePicture(instrument.owner_id);
  const [arrayDays, setArrayDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    setArrayDays([]);
    getUserById(instrument.owner_id).then(setOwner);
    getInstrumentDisponibility(instrument.id).then((week) => {
      setWeekDispos(week);
      Object.keys(week).map((day) => setArrayDays((prev) => [day, ...prev]));
    });
    getReservationForOneByMonth(
      instrument.id,
      currentMonth() + 1,
      currentYear()
    ).then(console.log);
  }, [id]);

  return (
    <Layout>
      <div className="w-[100%] flex flex-col items-center justify-center  mt-16">
        <div className="flex flex-col justify-between max-h-96 h-[80%] max-w-[650px] w-[60%]">
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
            <div className="flex flex-col justify-between items-end w-72">
              <Accordion
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
          <div className="w-full flex justify-center">
            <div className="w-[80%] flex justify-center">
              <DatePicker
                className=""
                disabledKeyboardNavigation
                minDate={new Date()}
                filterDate={(day) => isDispoDay(day, arrayDays)}
                locale="fr"
                selected={new Date()}
                // onMonthChange={}
                //onChange={(date) => {}}
                dayClassName={(day) => highlightDispoDay(day, arrayDays)}
                // onDayMouseEnter={(date) =>
                //   console.log(date.toLocaleDateString())
                // }
                customInput={<DatePickerBtn />}
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
        <div className="w-[60%] h-80 text-center mt-8">
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
    </Layout>
  );
}
