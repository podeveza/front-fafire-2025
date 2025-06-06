import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, FormControl, FormLabel, Input,
  Button, Table, Thead, Tbody, Tr, Th, Td, IconButton,
  useDisclosure, useToast, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const API = import.meta.env.VITE_API_URL;

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState('');
  const [editCourseId, setEditCourseId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchCourses = () => {
    axios.get(`${API}/course`)
      .then(res => setCourses(res.data))
      .catch(() => {
        toast({
          title: 'Erro ao buscar cursos.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const method = editCourseId ? 'put' : 'post';
    const url = editCourseId ? `${API}/course/${editCourseId}` : `${API}/course`;

    axios[method](url, { name })
      .then(() => {
        fetchCourses();
        toast({
          title: editCourseId ? 'Curso atualizado com sucesso!' : 'Curso criado com sucesso!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setName('');
        setEditCourseId(null);
        onClose();
      })
      .catch(() => {
        toast({
          title: 'Erro ao salvar curso.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleDelete = id => {
    axios.delete(`${API}/course/${id}`)
      .then(() => {
        fetchCourses();
        toast({
          title: 'Curso excluído com sucesso!',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Erro ao excluir curso.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleEdit = course => {
    setName(course.name);
    setEditCourseId(course.id);
    onOpen();
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>Gerenciar Cursos</Heading>

      <Button colorScheme="green" onClick={() => {
        setName('');
        setEditCourseId(null);
        onOpen();
      }}>Novo Curso</Button>

      <Table variant="simple" mt={6}>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map(c => (
            <Tr key={c.id}>
              <Td>{c.name}</Td>
              <Td>
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => handleEdit(c)}
                  mr={2}
                  aria-label="Editar"
                />
                <IconButton
                  size="sm"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(c.id)}
                  aria-label="Excluir"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editCourseId ? 'Editar Curso' : 'Novo Curso'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" type="submit" mr={3}>Salvar</Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
