import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, FormControl, FormLabel, Input,
  Button, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useToast
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const API = import.meta.env.VITE_API_URL;

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [editDepartmentId, setEditDepartmentId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchDepartments = () => {
    axios.get(`${API}/department`)
      .then(res => setDepartments(res.data))
      .catch(err => {
        toast({
          title: 'Erro ao buscar departamentos',
          description: err.response?.data?.message || err.message || 'Erro desconhecido',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Por favor, insira o nome do departamento.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const method = editDepartmentId ? 'put' : 'post';
    const url = editDepartmentId ? `${API}/department/${editDepartmentId}` : `${API}/department`;

    axios[method](url, { name: name.trim() })
      .then(() => {
        fetchDepartments();
        setName('');
        setEditDepartmentId(null);
        onClose();
        toast({
          title: editDepartmentId ? 'Departamento atualizado' : 'Departamento criado',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: 'Erro ao salvar departamento',
          description: err.response?.data?.message || err.message || 'Erro desconhecido',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDelete = id => {
    axios.delete(`${API}/department/${id}`)
      .then(() => {
        fetchDepartments();
        toast({
          title: 'Departamento excluído com sucesso',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(err => {
        toast({
          title: 'Erro ao excluir departamento',
          description: err.response?.data?.message || err.message || 'Erro desconhecido',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleEdit = department => {
    setName(department.name);
    setEditDepartmentId(department.id);
    onOpen();
  };

  return (
    <Box px={{ base: 4, md: 8 }} py={6} maxW="100%" overflowX="auto">
      <Heading size="lg" mb={4}>Gerenciar Departamentos</Heading>

      <Button
        colorScheme="green"
        mb={4}
        onClick={() => {
          setName('');
          setEditDepartmentId(null);
          onOpen();
        }}
      >
        Novo Departamento
      </Button>

      <Box overflowX="auto">
        <Table variant="simple" mt={4} minW="400px">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {departments.map(d => (
              <Tr key={d.id}>
                <Td>{d.name}</Td>
                <Td>
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEdit(d)}
                    mr={2}
                    aria-label="Editar"
                  />
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(d.id)}
                    aria-label="Excluir"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editDepartmentId ? 'Editar Departamento' : 'Novo Departamento'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
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
