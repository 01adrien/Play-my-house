import { useEffect, useState } from 'react';
import { getPictureByUserId } from '../api/user';

export default function useProfilePicture(id) {
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getPictureByUserId(id)
      .then(setAvatar)
      .then(() => setAvatarLoading(false));
  }, []);

  return { avatar, avatarLoading };
}
