import { useState } from "react";
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
} from "/src/components/ui/dialog"
import { Field } from "/src/components/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "/src/components/ui/native-select"
import { useTaskContext, API_URL } from '../context/TaskContext';

const AddTaskModal = () => {
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = () => {
    const newTask = { title, description, status };

    axios
      .post(API_URL, newTask)
      .then((response) => {
        dispatch({ type: 'ADD_TASK', payload: response.data });
        setTitle('');
        setDescription('');
        setStatus(false);
      })
      .catch((err) => {
        console.error('Error al agregar tarea:', err);
      });
  };

  return (
    <DialogContent>
      <DialogHeader fontWeight="bold">Add New Task</DialogHeader>
      <DialogBody>
        <Box mb={4}>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </Box>
        <Box mb={4}>
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </Box>
        <Box mb={4}>
          <Field label="Status">
            <NativeSelectRoot>
              <NativeSelectField 
                placeholder="Select option"  
                items={[
                  {value: false, label: "Pending"}, 
                  {value: true, label: "Completed"}
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
          Add Task
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddTaskModal;

  

