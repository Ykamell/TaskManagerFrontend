/* eslint-disable react/prop-types */
import { Box, Heading, VStack } from '@chakra-ui/react';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, color }) => {
  return (
    <Box bg={color} p="4" borderRadius="md" flex="1" height="80vh" overflow="auto">
      <Heading mb="4" fontWeight="bold">{title}</Heading>
      <VStack spacing="4" >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>
    </Box>
  );
};

export default Column;
