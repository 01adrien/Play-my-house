import { useEffect, useState } from 'react';
import { getPictureByUserId } from '../api/user';
import { makeErrorToast } from '../utils';

export default function useProfilePicture(id) {
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getPictureByUserId(id)
      .catch(() => makeErrorToast({}, 'une erreur est survenue !'))
      .then(setAvatar)
      .then(() => setAvatarLoading(false));
  }, []);

  return { avatar, avatarLoading };
}
