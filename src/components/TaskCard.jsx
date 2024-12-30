/* eslint-disable react/prop-types */
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import axios from "axios";
import {
  DialogRoot,
  DialogTrigger,
} from "/src/components/ui/dialog";
import ViewTaskModal from './ViewTaskModal';
import { API_URL, useTaskContext } from "../context/TaskContext";
import UpdateTaskModal from './UpdateTaskModal';

const TaskCard = ({ task }) => {
  const { dispatch } = useTaskContext();

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/${task.id}`)
      .then(() => {
        dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
      })
      .catch((err) => {
        console.error('Error al eliminar tarea:', err);
      });
  };

  const handleChangeStatus = async (id) => {
    const updatedStatus = !task.status; 
    try {
      await axios.put(`${API_URL}/${id}`, { status: updatedStatus });

      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, status: updatedStatus },
      });
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
    }
  };

  return (
    <Box
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      width="100%"
      maxWidth="400px"
      marginX="auto"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        direction={{ base: "column", md: "row" }}
      >
        <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} textAlign="center">
          {task.title}
        </Text>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              size="sm"
              bg="black"
              color="white"
              _hover={{ bg: "gray.700" }}
              mt={{ base: 2, md: 0 }}
            >
              View Task
            </Button>
          </DialogTrigger>
          <ViewTaskModal task={task} />
        </DialogRoot>
      </Flex>

      <Text fontSize="sm" mb={4} color="gray.600" textAlign="justify">
        {task.description}
      </Text>
      <Text fontSize="xs" color="gray.500" mb={4}>
        Created: {task.creationDate}
      </Text>

      <Flex
        gap={4}
        align="center"
        direction={{ base: "column", md: "row" }}
        mb={4}
      >
        <Text>
          Cambiar estado:
        </Text>
        <Button
          onClick={() => handleChangeStatus(task.id)}
          bg={task.status === false ? "green.400" : "red.400"}
          color="white"
          _hover={{ bg: task.status === false ? "green.500" : "red.500" }}
          width={{ base: "100%", md: "auto" }}
        >
          {task.status === false ? "Complete" : "Pending"}
        </Button>
      </Flex>

      <Flex gap={2} direction="column">
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              size="sm"
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
              width={{ base: "100%", md: "auto" }}
            >
              Update
            </Button>
          </DialogTrigger>
          <UpdateTaskModal task={task} />
        </DialogRoot>
        <Button
          size="sm"
          bg="red.400"
          color="white"
          _hover={{ bg: "red.500" }}
          onClick={handleDelete}
          width={{ base: "100%", md: "auto" }}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default TaskCard;
