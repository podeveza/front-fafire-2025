import {
  Box,
  Flex,
  Heading,
  HStack,
  VStack,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import CoursePage from './pages/CoursePage';
import DepartmentPage from './pages/DepartmentPage';
import ProfessorPage from './pages/ProfessorPage';
import AllocationPage from './pages/AllocationPage';

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const NavLinks = () => (
    <>
      <Button as={Link} to="/" variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={onClose}>
        Home
      </Button>
      <Button as={Link} to="/courses" variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={onClose}>
        Courses
      </Button>
      <Button as={Link} to="/departments" variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={onClose}>
        Departments
      </Button>
      <Button as={Link} to="/professors" variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={onClose}>
        Professors
      </Button>
      <Button as={Link} to="/allocations" variant="ghost" color="white" _hover={{ bg: 'teal.600' }} onClick={onClose}>
        Allocations
      </Button>
    </>
  );

  return (
    <BrowserRouter>
      <Flex minH="100vh" direction="column">
        <Box bg="teal.500" color="white" px={4} py={3}>
          <Flex maxW="1200px" mx="auto" justify="space-between" align="center">
            <Heading size="md">Professor Allocation</Heading>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="Open menu"
                  icon={<HamburgerIcon />}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'teal.600' }}
                  onClick={onOpen}
                />
                <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent bg="teal.500" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                      <VStack align="start" spacing={4}>
                        <NavLinks />
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <HStack spacing={4}>
                <NavLinks />
              </HStack>
            )}
          </Flex>
        </Box>

        <Box flex="1" maxW="1200px" mx="auto" p={4}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/departments" element={<DepartmentPage />} />
            <Route path="/professors" element={<ProfessorPage />} />
            <Route path="/allocations" element={<AllocationPage />} />
          </Routes>
        </Box>
      </Flex>
    </BrowserRouter>
  );
}
