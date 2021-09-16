import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import {
  Box,
  Flex,
  IconButton,
  Drawer,
  useDisclosure,
  Divider,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';

const siteLinks = [
  {
    title: 'Create ride',
    url: '/timer'
  },
  {
    title: 'Popular rides',
    url: '/rides'
  },
]

const userLinks = [
  {
    title: 'Saved rides',
    url: '/favorites'
  }
]

export const NavBar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box>
      <Flex
        py={{ base: 2 }}
        px={{ base: 4 }}
        minH={'60px'}
        align={'center'}
      >
        <IconButton
          aria-label={'Toggle app drawer'}
          icon={<HamburgerIcon />}
          onClick={onToggle}
        />
        <Flex justify="flex-end" w='100%'>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        aria-label="App drawer"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Programmable PZ</DrawerHeader>
          <DrawerBody>
            <Flex mb={10} mt={3}>
              <Link
                as={RouterLink}
                to='/login'
                onClick={onClose}
              >
                <Button variant="outline" mr={3} onClick={onClose}>
                  Login
                </Button>
              </Link>
              <Link
                as={RouterLink}
                to='/register'
                onClick={onClose}
              >
                <Button colorScheme="blue">Sign up</Button>
              </Link>
            </Flex>
            <Stack spacing={4} mb={5}>
              {
                siteLinks.map(link => (
                  <Link
                    key={link.url}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    <Text
                      fontSize="lg"
                    >
                      { link.title}
                    </Text>
                  </Link>
                ))
              }
            </Stack>
            <Divider />
            <Stack spacing={4} mt={5}>
              {
                userLinks.map(link => (
                  <Link
                    key={link.url}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    <Text
                      fontSize="lg"
                    >
                      { link.title}
                    </Text>
                  </Link>
                ))
              }
            </Stack>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
