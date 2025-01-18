import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TaskItem.css';


function TaskItem({ task, onUpdateStatus, onDelete, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleSaveEdit = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <div className="create-task-form">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            required
          />
          <textarea
            value={editedTask.details}
            onChange={(e) => setEditedTask({ ...editedTask, details: e.target.value })}
            required
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px', marginBottom: '10px' }}>
            Completed:
            <input
              type="checkbox"
              checked={editedTask.completed}
              onChange={(e) =>
                setEditedTask({ ...editedTask, completed: e.target.checked })
              }
              style={{
                marginLeft: '5px', 
                verticalAlign: 'middle',
                marginTop: '18px'
              }}
            />
          </button>


          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>Details: {task.details}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
          <p>Created At: {task.createdAt.toLocaleDateString()}</p>
          <button onClick={() => onUpdateStatus(task.id)}>
            Mark as {task.completed ? 'Incomplete' : 'Complete'}
          </button>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <Link to={`/task/${task.id}`} className="detail-button">
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskItem;
