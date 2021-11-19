import React, { useEffect } from 'react';
import {
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa'
import { useInput } from 'hooks';

interface SearchProps {
  handleSearch: (s: string) => void
}

export const SearchInput = ({ handleSearch }: SearchProps) => {
  const { value, input } = useInput({
    type: 'text',
    placeholder: 'Search'
  });

  useEffect(() => handleSearch(value), [value, handleSearch])

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<FaSearch color="gray.300" />}
      />
      { input }
    </InputGroup>
  )
};