import {useEffect, useState} from "react";

export const useSnakeMove = () => {
  const [key, setKey] = useState();

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