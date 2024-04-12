import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtasks, deletetask } from '../Redux/Task/action';
import { Box, Button, Heading, Flex, Input, Select, Text, background } from '@chakra-ui/react';
import TaskTable from './TaskTable';
import TaskModal from './TaskModal';
import { useNavigate } from 'react-router';
import { logout } from '../Redux/Login/action';

const Task = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.taskReducer.tasks);

  const token = JSON.parse(localStorage.getItem("token"));
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  const name = JSON.parse(localStorage.getItem("name"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedtask, setSelectedtask] = useState(null);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage]=useState(1);
  const [limit, setLimit] =useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchtasks(token, sort, search));
  }, [dispatch, token, sort, search]);

  const lastIndex=currentPage*limit;
  const firstIndex=lastIndex-limit;
  
  const currentTasks=tasks.slice(firstIndex,lastIndex);

  const onPrev=()=>{
    setCurrentPage(currentPage-1);
  }
  const onNext=()=>{
    setCurrentPage(currentPage+1);
  }
  const handleDeletetask = taskId => {
    dispatch(deletetask(taskId, token));
  };

  const openEditModal = task => {
    setSelectedtask(task);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedtask(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box p="4">
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Heading as="h2" size="xl">
          Task Management
        </Heading>
        {isAuth && (
          <Flex alignItems="center">
            <Text mr="4" background='teal' color="white" border={'1px solid Teal'} borderRadius="90%" p={2.5}>{name}</Text>
            <Button onClick={handleLogout} colorScheme="red">
              Logout
            </Button>
          </Flex>
        )}
      </Flex>

      <Flex mb="4" alignItems="center">
        <Select
          value={sort}
          onChange={e => setSort(e.target.value)}
          mr="4"
          width="33%"
        >
          <option value="">Sort By</option>
          <option value="asc">Title - A to Z</option>
          <option value="desc">Title - Z to A</option>
        </Select>
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          width="50%"
        />
      </Flex>

      <Button onClick={openAddModal} colorScheme="teal" mb="4">
        Add New Task
      </Button>

      <TaskTable
        tasks={currentTasks}
        onEdit={openEditModal}
        onDelete={handleDeletetask}
        token={token}
      />

      <Flex>
      <Button onClick={onPrev}>-</Button>
      <Text>{currentPage}</Text>
      <Button onClick={onNext}>+</Button>
      </Flex>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedtask={selectedtask}
          token={token}
        />
      )}
    </Box>
  );
};

export default Task;
