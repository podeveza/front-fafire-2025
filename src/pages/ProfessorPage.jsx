import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, FormControl, FormLabel, Input, Select,
  Button, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, useToast
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const API = import.meta.env.VITE_API_URL;

export default function ProfessorPage() {
  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [editProfessorId, setEditProfessorId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchProfessors = () => {
    axios.get(`${API}/professor`).then(res => setProfessors(res.data));
  };

  const fetchDepartments = () => {
    axios.get(`${API}/department`).then(res => setDepartments(res.data));
  };

  useEffect(() => {
    fetchProfessors();
    fetchDepartments();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !cpf || !departmentId) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (!/^\d{11}$/.test(cpf)) {
      toast({
        title: 'CPF inválido',
        description: 'O CPF deve conter exatamente 11 números.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const method = editProfessorId ? 'put' : 'post';
    const url = editProfessorId ? `${API}/professor/${editProfessorId}` : `${API}/professor`;

    axios[method](url, {
      name,
      cpf,
      departmentId: Number(departmentId),
    }).then(() => {
      fetchProfessors();
      toast({
        title: `Professor ${editProfessorId ? 'atualizado' : 'cadastrado'} com sucesso.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setName('');
      setCpf('');
      setDepartmentId('');
      setEditProfessorId(null);
      onClose();
    }).catch(err => {
      const mensagemErro = err.response?.data?.message || err.message || 'Erro desconhecido';
      toast({
        title: 'Erro ao salvar professor',
        description: mensagemErro,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(err);
    });
  };

  const handleDelete = id => {
    axios.delete(`${API}/professor/${id}`).then(() => {
      fetchProfessors();
      toast({
        title: 'Professor excluído com sucesso.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }).catch(err => {
      toast({
        title: 'Erro ao excluir professor',
        description: err.response?.data?.message || err.message || 'Erro desconhecido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(err);
    });
  };

  const handleEdit = professor => {
    setName(professor.name);
    setCpf(professor.cpf);
    setDepartmentId(professor.departmentId);
    setEditProfessorId(professor.id);
    onOpen();
  };

  return (
    <Box px={{ base: 4, md: 8 }} py={6} maxW="100%" overflowX="auto">
      <Heading size="lg" mb={4}>Gerenciar Professores</Heading>

      <Button colorScheme="green" mb={4} onClick={() => {
        setName('');
        setCpf('');
        setDepartmentId('');
        setEditProfessorId(null);
        onOpen();
      }}>Novo Professor</Button>

      <Box overflowX="auto">
        <Table variant="simple" mt={4} minW="600px">
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>CPF</Th>
              <Th>Departamento</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {professors.map(p => (
              <Tr key={p.id}>
                <Td>{p.name}</Td>
                <Td>{p.cpf}</Td>
                <Td>{departments.find(d => d.id === p.departmentId)?.name || 'Sem departamento'}</Td>
                <Td>
                  <IconButton
                    size="sm"
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEdit(p)}
                    mr={2}
                    aria-label="Editar"
                  />
                  <IconButton
                    size="sm"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDelete(p.id)}
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
          <ModalHeader>{editProfessorId ? 'Editar Professor' : 'Novo Professor'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired mb={3}>
                <FormLabel>Nome</FormLabel>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </FormControl>
              <FormControl isRequired mb={3}>
                <FormLabel>CPF</FormLabel>
                <Input
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  maxLength={11}
                  placeholder="Somente números"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Departamento</FormLabel>
                <Select
                  placeholder="Selecione o departamento"
                  value={departmentId}
                  onChange={e => setDepartmentId(e.target.value)}
                >
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </Select>
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
