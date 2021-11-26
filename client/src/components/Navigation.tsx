import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'lib/auth';
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  FaBicycle,
  FaFire,
  FaRegClock,
  FaRegListAlt,
  FaRegStar,
  FaRegUser,
  FaSearch,
  FaSignOutAlt,
} from 'react-icons/fa'
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
  Icon,
  Link,
  Stack,
  Text,
  useToast,
  Heading
} from '@chakra-ui/react';
import { useSound } from 'providers/SoundProvider';

const siteLinks = [
  {
    title: 'Create ride',
    url: '/timer',
    icon: FaBicycle,
    color: 'green.400'
  },
  {
    title: 'Popular rides',
    url: '/rides',
    icon: FaFire,
    color: 'orange'
  },
  {
    title: 'Ride feed',
    url: '/me/timeline',
    icon: FaRegListAlt,
    color: 'white'
  },
]

const socialLinks = [
  {
    title: 'Profile',
    url: '/profile',
    icon: FaRegUser,
    color: 'blue.400'
  },
  {
    title: 'Find members',
    url: '/search',
    icon: FaSearch,
    color: 'white'
  }
]

const userLinks = [
  {
    title: 'Recent rides',
    url: '/recent',
    icon: FaRegClock,
    color: 'white'
  },
  {
    title: 'Saved rides',
    url: '/favorites',
    icon: FaRegStar,
    color: 'yellow'
  }
]

export const NavBar = () => {
  const history = useHistory();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const toast = useToast();
  const { user, logout } = useAuth();
  const { active, toggle, sounds } = useSound();

  const handleLogout = async () => {
    await logout();
    history.push('/');
  }

  const handleBellClick = () => {
    if (!active) {
      sounds.bell.play();
      toast({
        title: "Not recommended with music",
        description: "Sounds from the app may pause audio",
        status: "warning",
        duration: 9000,
        isClosable: true,
      })
    }

    toggle();
  }

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
          <BellIcon
            data-testid="sound-button"
            alignSelf="center"
            onClick={handleBellClick}
            color={active ? "yellow.400" : "white"}
          />
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
          <DrawerHeader borderBottomWidth="1px">Programmable PZ</DrawerHeader>
          <DrawerBody>
            { !user &&
              <Flex mb={10} mt={3}>
                <Link
                  as={RouterLink}
                  to='/login'
                  onClick={onClose}
                >
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Log in
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
            }
            {
              user &&
              <Flex mb={5} pt={3}>
                <Heading as="h2" size="md">{ user.username }</Heading>
              </Flex>
            }
            <Stack spacing={4} mb={5}>
              {
                siteLinks.map(link => (
                  <Link
                    key={link.url}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    <Flex direction="row" align="center">
                      <Icon
                        as={link.icon}
                        color={link.color}
                      />
                      <Text
                        pl={3}
                        fontSize="lg"
                      >
                        { link.title}
                      </Text>
                    </Flex>
                  </Link>
                ))
              }
              <Divider />
              {
                userLinks.map(link => (
                  <Link
                    key={link.url}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    <Flex direction="row" align="center">
                      <Icon
                        as={link.icon}
                        color={link.color}
                      />
                      <Text
                        pl={3}
                        fontSize="lg"
                      >
                        { link.title}
                      </Text>
                    </Flex>
                  </Link>
                ))
              }
              <Divider />
              {
                socialLinks.map(link => (
                  <Link
                    key={link.url}
                    as={RouterLink}
                    to={link.url}
                    onClick={onClose}
                  >
                    <Flex direction="row" align="center">
                      <Icon
                        as={link.icon}
                        color={link.color}
                      />
                      <Text
                        pl={3}
                        fontSize="lg"
                      >
                        { link.title}
                      </Text>
                    </Flex>
                  </Link>
                ))
              }
              <Divider />
              { user &&
                <Link onClick={handleLogout}>
                  <Flex direction="row" align="center">
                    <Icon as={FaSignOutAlt} />
                    <Text fontSize="lg" pl={3}>
                      Log out
                    </Text>
                  </Flex>
                </Link>
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
