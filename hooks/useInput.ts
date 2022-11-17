import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type Handler = (e: ChangeEvent<HTMLInputElement>) => void;
type ReturnTypes<T = unknown | string> = [
  T,
  Handler,
  Dispatch<SetStateAction<T>>,
];

const useInput = <T = unknown | string>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void =>
      setValue(e.target.value as unknown as T),
    [],
  );

  return [value, handler, setValue];
};

export default useInput;
