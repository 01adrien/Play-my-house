import { useState, useEffect } from 'react';
import { getMenuItems } from '../api    ';

export default function useMenuItems() {
  const [menuItems, setMenuItems] = useState({});
  const [isOpen, setIsOpen] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenuItems()
      .then(setMenuItems)
      .then(() => {
        Object.keys(menuItems).map((item) =>
          setIsOpen((prev) => ({ ...prev, [item]: false }))
        );
      })
      .then(() => setLoading(false))
      .catch(() => {});
  }, []);

  return { menuItems, isOpen, setIsOpen, loading };
}
