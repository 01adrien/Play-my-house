import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useRecoilValue } from 'recoil';
import { user } from '../store/user';
import { useLocation } from 'react-router-dom';
import { getUserById } from '../api/user';
import withCarousel from '../HOC/withCarousel';
import withLoading from '../HOC/withLoading';
import { Picture } from '../components/Picture';
import { compose } from '../utils';
import useCarousel from '../hooks/useCarousel';
import { Accordion } from 'flowbite-react';
import useProfilePicture from '../hooks/useProfilePicture';
import UserSmallCards from '../components/cards/UserSmallCards';
import BasicButton from '../components/button/BasicButton';

const PictureWithCarouselAndLoading = compose(
  withCarousel,
  withLoading
)(Picture);

const UserSmallCardsWithLoading = withLoading(UserSmallCards);

export default function Instrument() {
  const { id } = useParams();
  const location = useLocation();
  const profile = useRecoilValue(user);
  const [instrument, setInstrument] = useState(location.state);
  const [owner, setOwner] = useState([]);
  const { loading, pictures } = useCarousel(id);
  const { avatar, avatarLoading } = useProfilePicture(instrument.owner_id);

  useEffect(() => {
    getUserById(instrument.owner_id).then(setOwner).then;
  }, [id]);

  return (
    <Layout>
      <div className="w-[100%] flex flex-col items-center justify-center  mt-16">
        <div className="flex justify-between max-h-96 h-[80%] w-[50%]">
          <div className="h-72 w-96 rounded-md border-[1px] border-border_color">
            {pictures && (
              <PictureWithCarouselAndLoading
                loading={loading}
                pictureNumber={pictures?.length}
                data={pictures}
                src={pictures[0]}
              />
            )}
          </div>
          <div className="flex flex-col justify-between justify center">
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
                    <p>lundi</p>
                    <p>mardi</p>
                    <p>mercredi</p>
                    <p>jeudi</p>
                    <p>vendredi</p>
                    <p>samedi</p>
                    <p>dimanche</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
            <BasicButton
              width="52"
              type="button"
              style={
                'self-center relative bottom-0 shadow-md hover:scale-105 mb-12'
              }
            >
              <p className="">Reserver</p>
            </BasicButton>
          </div>
        </div>
        <div className="w-[60%] h-80 text-center">
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
