/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Text, Spinner, Alert, AlertTitle, AlertDescription, Flex, Button, Input } from '@chakra-ui/react';
import {
  DialogRoot,
  DialogTrigger,
} from "/src/components/ui/dialog";
import Column from './components/Column';
import AddTaskModal from './components/AddTaskModal';
import { useTaskContext } from './context/TaskContext';

const Tasks = () => {
  const { state, dispatch } = useTaskContext();
  const [filterStatus, setFilterStatus] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filterTasks = (tasks, searchTerm) => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.id.toString().includes(searchTerm)
    );
  };

  const filteredTasks = filterTasks(
  state.tasks.filter((task) => {
    if (filterStatus === null) return true; 
    return task.status === filterStatus;
  }),
  searchTerm
);

  useEffect(() => {
    const fetchTasks = () => {
      setLoading(true);
  
      let url = 'http://localhost:5000/api/tasks';
      if (filterStatus !== null) {
        url += `?status=${filterStatus}`;
      }
  
      axios
        .get(url)
        .then((response) => {
          setLoading(false);
          dispatch({ type: 'SET_TASKS', payload: response.data });
        })
        .catch((err) => {
          setError('Hubo un error al obtener las tasks');
          setLoading(false);
        });
    };
  
    fetchTasks();
  }, [dispatch, filterStatus]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Box p={4}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          mb={4}
        >
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
            TASK MANAGER
          </Text>
          <DialogRoot>
            <DialogTrigger asChild>
              <Button
                background="blue.400"
                color="white"
                _hover={{ background: "blue.500" }}
                mt={{ base: 2, md: 0 }}
              >
                Add Task
              </Button>
            </DialogTrigger>
            <AddTaskModal />
          </DialogRoot>
        </Flex>

        <Box mb={4}>
          <Input
            placeholder="Search by title or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.400" }}
          />
        </Box>

        <Flex
          mb={4}
          gap={2}
          direction={{ base: "column", md: "row" }}
          align="center"
        >
          <Button
            onClick={() => setFilterStatus(null)}
            background={filterStatus === null ? 'blue.400' : 'gray.200'}
            color={filterStatus === null ? 'white' : 'black'}
            _hover={{ background: "blue.500" }}
            width={{ base: "100%", md: "auto" }}
          >
            All
          </Button>
          <Button
            onClick={() => setFilterStatus(false)}
            background={filterStatus === false ? 'blue.400' : 'gray.200'}
            color={filterStatus === false ? 'white' : 'black'}
            _hover={{ background: "blue.500" }}
            width={{ base: "100%", md: "auto" }}
          >
            Pending
          </Button>
          <Button
            onClick={() => setFilterStatus(true)}
            background={filterStatus === true ? 'blue.400' : 'gray.200'}
            color={filterStatus === true ? 'white' : 'black'}
            _hover={{ background: "blue.500" }}
            width={{ base: "100%", md: "auto" }}
          >
            Completed
          </Button>
        </Flex>

        <Flex gap={4} direction={{ base: "column", md: "row" }}>
          <Column
            title="Pending"
            tasks={filterTasks(
              state.tasks.filter((task) => task.status === false),
              searchTerm
            )}
            color="gray.100"
          />
          <Column
            title="Completed"
            tasks={filterTasks(
              state.tasks.filter((task) => task.status === true),
              searchTerm
            )}
            color="green.100"
          />
        </Flex>
      </Box>

    </>
  );
};

export default Tasks;
