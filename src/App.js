import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TaskDetailPage from './components/TaskDetailPage';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const initialTasks = [
      {
        id: 1,
        title: 'Task 1',
        details: 'Details for Task 1',
        priority: 'High',
        completed: false,
        createdAt: new Date('2025-01-01'),
      },
      {
        id: 2,
        title: 'Task 2',
        details: 'Details for Task 2',
        priority: 'Low',
        completed: true,
        createdAt: new Date('2025-01-02'),
      },
    ];
    setTasks(initialTasks);
  }, []);
  

  const handleUpdateStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleFilterTasks = (status) => {
    setFilter(status);
  };

  const handleSortTasks = (criteria) => {
    setTasks((prevTasks) => {
      const sortedTasks = [...prevTasks];
      if (criteria === 'priority') {
        sortedTasks.sort((a, b) => a.priority.localeCompare(b.priority));
      } else if (criteria === 'date') {
        sortedTasks.sort((a, b) => b.createdAt - a.createdAt);
      }
      else if (criteria === 'time') {
        sortedTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
      return sortedTasks;
    });
  };
  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now(), createdAt: new Date() }]);
  };
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              tasks={filteredTasks}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteTask}
              onFilter={handleFilterTasks}
              onSort={handleSortTasks}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask} 
            />
          }
        />
        <Route path="/task/:id" element={<TaskDetailPage tasks={tasks} />} />
      </Routes>
    </Router>
  );
}

export default App;