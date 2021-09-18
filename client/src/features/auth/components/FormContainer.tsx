import React, { ReactNode } from 'react';
import {
  Box,
  Heading,
} from '@chakra-ui/react'

interface FormContainerProps {
  title: string;
  children: ReactNode;
}

export const FormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <Box px={4} width={{ lg: '50%', base: '100%'}} justifySelf="center">
      <Heading pb={6} size="lg">
        { title }
      </Heading>
      { children }
    </Box>
  )
};