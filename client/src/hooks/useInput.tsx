import React, { useState } from 'react';
import {
  Input
} from "@chakra-ui/react";

interface InputProps {
  type: string;
  placeholder?: string;
}

export const useInput = ({ type, placeholder = '' }: InputProps) => {
  const [value, setValue] = useState<string>('');

  const handleInput = (e:React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setValue(value)
  }

  const input =
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInput}
    />

    return {value, input}
};