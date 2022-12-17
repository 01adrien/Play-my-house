import React from 'react';
import { Modal } from 'flowbite-react';
import { Picture } from '../Picture';
import withCarousel from '../../HOC/withCarousel';
import withLoading from '../../HOC/withLoading';
import { compose } from '../../utils';
import useCarousel from '../../hooks/useCarousel';
import { daysTraduction } from '../../calendar/DatePickerUtils';
import BasicButton from '../button/BasicButton';

const PictureWithCarouselAndLoading = compose(
  withCarousel,
  withLoading
)(Picture);

export default function ModalAdminValidation({
  onClose,
  onConfirm,
  instrument,
  schedule,
  instrumentInfos,
  onDeny,
}) {
  const { loading, pictures } = useCarousel(instrument.id);
  console.log(instrumentInfos);
  console.log(instrument);
  // console.log(userInfos);
  return (
    <Modal show={true} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className=" flex flex-col items-center">
          <p className="text-bold text-center mb-4">
            {instrument.nom.slice(0, -1)} {instrument.marque}
          </p>
          <div className="h-72 w-96 min-w-[300px] max-w-[300px] mb-8 rounded-md border-[1px] border-border_color">
            {pictures && (
              <PictureWithCarouselAndLoading
                loading={loading}
                pictureNumber={pictures?.length}
                data={pictures}
                src={pictures[0]}
              />
            )}
          </div>
          <div className="text-center text-sm py-4 border-y-2 border-border_color">
            <p>
              date de creation:{' '}
              {instrumentInfos ? instrumentInfos?.created : ''}
            </p>
            <p>nom: {instrument?.nom}</p>
            <p>famille: {instrument?.famille}</p>
            <p className="text-xs mt-2">
              {instrumentInfos ? instrumentInfos?.description : ''}
            </p>
          </div>
          <div className="text-sm mt-4 text-center border-b-2 pb-4 w-full">
            {Object.keys(schedule).map((day) => {
              return (
                <p key={day}>{`${daysTraduction[day]}: ${schedule[day].slice(
                  0,
                  -2
                )}`}</p>
              );
            })}
          </div>
          <div className="flex justify-around w-full mt-8">
            <BasicButton onClick={onConfirm} width="40">
              <p>Valider</p>
            </BasicButton>
            <BasicButton onClick={onDeny} width="40">
              <p>refuser</p>
            </BasicButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
