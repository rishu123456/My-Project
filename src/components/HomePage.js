import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import './HomePage.css';


function HomePage({ tasks, onUpdateStatus, onDelete, onFilter, onSort, onCreateTask, onUpdateTask }) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    if (title && details) {
      onCreateTask({ title, details, priority, completed: false });
      setShowCreateForm(false);  
      setTitle(''); 
      setDetails('');
      setPriority('Low');
    } 
  };

  return (
    <div className="home-page">
      <div className="controls">
        <button onClick={() => onFilter('all')}>All</button>
        <button onClick={() => onFilter('completed')}>Completed</button>
        <button onClick={() => onFilter('incomplete')}>Incomplete</button>
        <button onClick={() => onSort('priority')}>Sort by Priority</button>
        <button onClick={() => onSort('date')}>Sort by Date</button>
        <button onClick={() => onSort('time')}>Sort by Time</button>
        <button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Task'}
        </button>
      </div>

      {showCreateForm && (
        <div className="create-task-form">
          <h3>Create New Task</h3>
          <form onSubmit={handleCreateTaskSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Details:</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit">Create Task</button>
          </form>
        </div>
      )}

      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  tasks: PropTypes.array.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onCreateTask: PropTypes.func.isRequired, 
};

export default HomePage;
