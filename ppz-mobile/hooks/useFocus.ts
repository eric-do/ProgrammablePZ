import React, { useRef } from 'react';

type setFocusType = () => void;
export const useFocus = (): [React.RefObject<HTMLInputElement>, setFocusType] => {
  const htmlElRef = useRef<HTMLInputElement>(null);
  const setFocus = () => (htmlElRef.current) && htmlElRef.current.focus();
  return [htmlElRef, setFocus];
}