/* eslint-disable react/prop-types */
import {
  Text,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogCloseTrigger
} from "/src/components/ui/dialog"

const ViewTaskDialog = ({ task }) => {
  if (!task) return null;

  const getStatusText = (status) => {
    switch (status) {
      case false:
        return "Pendiente"
      case true:
        return "Completed"
      default:
        break;
    }
  }

  return (
      <DialogContent>
        <DialogHeader fontWeight="bold">Task Details</DialogHeader>
        <DialogCloseTrigger asChild />
        <DialogBody>
          <Text fontWeight="bold">Title:</Text>
          <Text mb={4}>{task.title}</Text>
          <Text fontWeight="bold">Description:</Text>
          <Text mb={4}>{task.description}</Text>
          <Text fontWeight="bold">Status:</Text>
          <Text>{getStatusText(task.status)}</Text>
        </DialogBody>
      </DialogContent>
  );
};

export default ViewTaskDialog;
