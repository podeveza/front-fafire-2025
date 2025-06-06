import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, Flex, Heading, VStack, HStack, Button } from '@chakra-ui/react';

import LandingPage from './pages/LandingPage';
import CoursePage from './pages/CoursePage';
import DepartmentPage from './pages/DepartmentPage';
import ProfessorPage from './pages/ProfessorPage';
import AllocationPage from './pages/AllocationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Flex minH="100vh" direction="column">
        <Box bg="teal.500" color="white" px={4} py={3}>
          <HStack spacing={8} maxW="1200px" mx="auto" alignItems="center">
            <Heading size="md">Professor Allocation</Heading>
            <HStack spacing={4}>
              <Button as={Link} to="/" variant="ghost" color="white" _hover={{ bg: 'teal.600' }}>
                Home
              </Button>
              <Button as={Link} to="/courses" variant="ghost" color="white" _hover={{ bg: 'teal.600' }}>
                Courses
              </Button>
              <Button as={Link} to="/departments" variant="ghost" color="white" _hover={{ bg: 'teal.600' }}>
                Departaments
              </Button>
              <Button as={Link} to="/professors" variant="ghost" color="white" _hover={{ bg: 'teal.600' }}>
                Professors
              </Button>
              <Button as={Link} to="/allocations" variant="ghost" color="white" _hover={{ bg: 'teal.600' }}>
                Allocations
              </Button>
            </HStack>
          </HStack>
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
