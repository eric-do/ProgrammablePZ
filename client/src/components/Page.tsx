import React, { ReactNode } from 'react';
import {
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';

interface PageProps {
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children }: PageProps) => {
  return (
    <Flex justify='center'>
      <Stack
        justifySelf='center'
        d='flex'
        align='center'
        width={{
          base: "100%",
          md: "50%",
        }}
      >
        <Heading size="lg" pb={3}>{title}</Heading>
        { children }
      </Stack>
    </Flex>
  )
}