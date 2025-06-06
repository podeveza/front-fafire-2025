import { Box, Heading, Text } from '@chakra-ui/react';

export default function LandingPage() {
  return (
    <Box textAlign="center" py={10}>
      <Heading>Desafio Frontend Fafire 2025 </Heading>
      <Text fontSize="lg" mt={4}>
        Projeto do Professor Allocation para a disciplina de Front-end, usando tecnologias ViteJS com React, JavaScript, Chakra, Crud com sistema de rotas consumindo uma API Rest.
      </Text>
    </Box>
  );
}
