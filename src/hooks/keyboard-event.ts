import {useEffect, useState} from "react";

export const useKeyboardEvent = () => {
  const [key, setKey] = useState<string>();

  useEffect(() => {
      const handleSnakeMove = (event: any) => {
        setKey(event.key);
      }

      document.addEventListener('keydown', handleSnakeMove);
      return () => document.removeEventListener('keydown', handleSnakeMove);
    }, []
  )

  return key;
}