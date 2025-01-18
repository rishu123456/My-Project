import React from 'react';
import PropTypes from 'prop-types';
import './TaskDetailPage.css';
import { useParams, Link } from 'react-router-dom';

function TaskDetailPage({ tasks }) {
  const { id } = useParams();
  const task = tasks.find((task) => task.id === parseInt(id, 10));

  if (!task) return <p>Task not found</p>;

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>Priority: {task.priority}</p>
      <p>Details: {task.details}</p>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <Link to="/">Back to Tasks</Link>
    </div>
  );
}

TaskDetailPage.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default TaskDetailPage;
