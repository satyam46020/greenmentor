import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, VStack, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { addtask, updatetask } from '../Redux/Task/action';

const TaskModal = ({ isOpen, onClose, selectedtask, token }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (selectedtask) {
      setFormData(selectedtask);
    } else {
      setFormData({
        title: '',
        description: '',
      });
    }
  }, [selectedtask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("All fields are required.");
      return;
    }

    if (selectedtask) {
      dispatch(updatetask(formData, token));
    } else {
      dispatch(addtask(formData, token));
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{selectedtask ? 'Edit Task' : 'Add Task'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl id="title">
              <FormLabel>Task Title<span style={{ color: 'red' }}>*</span></FormLabel>
              <Input type="text" placeholder="Enter task title" name="title" value={formData.title} onChange={handleChange} />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Task Description<span style={{ color: 'red' }}>*</span></FormLabel>
              <Textarea placeholder="Enter task description" name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} colorScheme="teal">
            {selectedtask ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
