import React from 'react'
import { Modal } from 'flowbite-react';
import { user } from '../../store/user';
import { useRecoilValue } from 'recoil';

export default function ModalAddInstrument() {
  const profile = useRecoilValue(user);

  return (
    <div>ModalAddInstrument</div>
  )
}
