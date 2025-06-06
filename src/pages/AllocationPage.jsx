import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Heading, FormControl, FormLabel, Select, Input,
  Button, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, useDisclosure, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter,
  useToast
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const API = import.meta.env.VITE_API_URL;

const daysOfWeek = [
  { label: 'Domingo', value: 'SUNDAY' },
  { label: 'Segunda-feira', value: 'MONDAY' },
  { label: 'Terça-feira', value: 'TUESDAY' },
  { label: 'Quarta-feira', value: 'WEDNESDAY' },
  { label: 'Quinta-feira', value: 'THURSDAY' },
  { label: 'Sexta-feira', value: 'FRIDAY' },
  { label: 'Sábado', value: 'SATURDAY' },
];

export default function AllocationPage() {
  const [allocations, setAllocations] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);

  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [editAllocationId, setEditAllocationId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchAllocations = () => {
    axios.get(`${API}/allocation`).then(res => setAllocations(res.data));
  };
  const fetchProfessors = () => {
    axios.get(`${API}/professor`).then(res => setProfessors(res.data));
  };
  const fetchCourses = () => {
    axios.get(`${API}/course`).then(res => setCourses(res.data));
  };

  useEffect(() => {
    fetchAllocations();
    fetchProfessors();
    fetchCourses();
  }, []);

  const resetForm = () => {
    setDayOfWeek('');
    setStartHour('');
    setEndHour('');
    setProfessorId('');
    setCourseId('');
    setEditAllocationId(null);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!dayOfWeek || !startHour || !endHour || !professorId || !courseId) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
    if (!timeRegex.test(startHour) || !timeRegex.test(endHour)) {
      toast({
        title: 'Erro',
        description: 'Formato de hora inválido. Use HH:mm ou HH:mm:ss',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const profId = parseInt(professorId, 10);
    const courId = parseInt(courseId, 10);

    if (isNaN(profId) || isNaN(courId)) {
      toast({
        title: 'Erro',
        description: 'Professor e Curso devem ser selecionados corretamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      dayOfWeek,
      startHour,
      endHour,
      professorId: profId,
      courseId: courId,
    };

    const method = editAllocationId ? 'put' : 'post';
    const url = editAllocationId ? `${API}/allocation/${editAllocationId}` : `${API}/allocation`;

    axios[method](url, payload)
      .then(() => {
        fetchAllocations();
        resetForm();
        onClose();
        toast({
          title: 'Sucesso',
          description: `Alocação ${editAllocationId ? 'atualizada' : 'criada'} com sucesso!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(err => {
        console.error('Erro ao salvar alocação:', err.response?.data || err.message);
        const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Erro desconhecido';
        toast({
          title: 'Erro',
          description: 'Erro ao salvar alocação: ' + msg,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleDelete = id => {
    axios.delete(`${API}/allocation/${id}`).then(() => {
      fetchAllocations();
      toast({
        title: 'Sucesso',
        description: 'Alocação removida com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleEdit = allocation => {
    setDayOfWeek(allocation.dayOfWeek);
    setStartHour(allocation.startHour);
    setEndHour(allocation.endHour);
    setProfessorId(String(allocation.Professor.id));
    setCourseId(String(allocation.Course.id));
    setEditAllocationId(allocation.id);
    onOpen();
  };

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Gerenciar Alocações</Heading>

      <Button colorScheme="green" mb={4} onClick={() => {
        resetForm();
        onOpen();
      }}>
        Nova Alocação
      </Button>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Dia da Semana</Th>
            <Th>Início</Th>
            <Th>Fim</Th>
            <Th>Professor</Th>
            <Th>Curso</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allocations.map(a => (
            <Tr key={a.id}>
              <Td>{daysOfWeek.find(d => d.value === a.dayOfWeek)?.label || a.dayOfWeek}</Td>
              <Td>{a.startHour}</Td>
              <Td>{a.endHour}</Td>
              <Td>{a.Professor?.name}</Td>
              <Td>{a.Course?.name}</Td>
              <Td>
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  colorScheme="blue"
                  onClick={() => handleEdit(a)}
                  mr={2}
                  aria-label="Editar"
                />
                <IconButton
                  size="sm"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => handleDelete(a.id)}
                  aria-label="Excluir"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={() => {
        resetForm();
        onClose();
      }} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editAllocationId ? 'Editar Alocação' : 'Nova Alocação'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired mb={3}>
                <FormLabel>Dia da Semana</FormLabel>
                <Select value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
                  <option value="">Selecione o dia</option>
                  {daysOfWeek.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Hora de Início (HH:mm:ss)</FormLabel>
                <Input
                  type="time"
                  step="1"
                  value={startHour}
                  onChange={e => setStartHour(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Hora de Fim (HH:mm:ss)</FormLabel>
                <Input
                  type="time"
                  step="1"
                  value={endHour}
                  onChange={e => setEndHour(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired mb={3}>
                <FormLabel>Professor</FormLabel>
                <Select
                  placeholder="Selecione o professor"
                  value={professorId}
                  onChange={e => setProfessorId(e.target.value)}
                >
                  {professors.map(p => (
                    <option key={p.id} value={String(p.id)}>{p.name}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Curso</FormLabel>
                <Select
                  placeholder="Selecione o curso"
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                >
                  {courses.map(c => (
                    <option key={c.id} value={String(c.id)}>{c.name}</option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="green" type="submit" mr={3}>Salvar</Button>
              <Button onClick={() => { resetForm(); onClose(); }}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
