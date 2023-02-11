import React, { useState, useEffect } from 'react';
import { Avatar } from 'flowbite-react';

export default function UserSmallCards({ name, picture }) {
  return (
    <div className="flex h-full items-center">
      <Avatar img={picture} rounded={true} bordered={true} color="light" />
      <span className="pl-4">{name}</span>
    </div>
  );
}
