/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Button,
  Box,
  Input
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogCloseTrigger
} from "/src/components/ui/dialog";
import { Field } from "/src/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "/src/components/ui/native-select";
import { useTaskContext } from '../context/TaskContext';

const UpdateTaskModal = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = () => {
    const updatedTask = { ...task, title, description, status };

    axios
      .put(`http://localhost:5000/api/tasks/${task.id}`, updatedTask)
      .then((response) => {
        dispatch({ type: 'UPDATE_TASK', payload: response.data }); 
      })
      .catch((err) => {
        console.error('Error al actualizar tarea:', err);
      });
  };

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  return (
    <DialogContent>
      <DialogHeader fontWeight="bold">Update Task</DialogHeader>
      <DialogBody>
        <Box mb={4}>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </Box>
        <Box mb={4}>
          <Field label="Status">
            <NativeSelectRoot>
              <NativeSelectField 
                value={status ? "Completed" : "Pending"}
                items={[
                  {value: "Pending", label: "Pending"}, 
                  {value: "Completed", label: "Completed"}
                ]}
                onChange={(e) => setStatus(e.target.value === "Completed" ? true : false)}
              />
            </NativeSelectRoot>
          </Field>
        </Box>
      </DialogBody>
      <DialogFooter>
        <DialogCloseTrigger asChild>
          <Button variant="outline" mr={3}>
            Cancel
          </Button>
        </DialogCloseTrigger>
        <Button 
          bg="blue.400"
          color="white"
          _hover={{ bg: "blue.500" }}
          onClick={handleSubmit}
        >
          Update Task
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UpdateTaskModal;
