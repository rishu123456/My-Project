import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import userEvent from '@testing-library/user-event';

const mockOnUpdateStatus = jest.fn();
const mockOnDelete = jest.fn();
const mockOnFilter = jest.fn();
const mockOnSort = jest.fn();
const mockOnCreateTask = jest.fn();
const mockOnUpdateTask = jest.fn();

const tasks = [
  { id: 1, title: 'Task 1', details: 'Details for task 1', priority: 'Low', completed: false },
  { id: 2, title: 'Task 2', details: 'Details for task 2', priority: 'High', completed: true },
];

describe('HomePage Component', () => {

  it('renders task list', () => {
    render(<HomePage 
      tasks={tasks}
      onUpdateStatus={mockOnUpdateStatus}
      onDelete={mockOnDelete}
      onFilter={mockOnFilter}
      onSort={mockOnSort}
      onCreateTask={mockOnCreateTask}
      onUpdateTask={mockOnUpdateTask}
    />);

   
    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it('opens and closes the create task form', () => {
    render(<HomePage 
      tasks={tasks}
      onUpdateStatus={mockOnUpdateStatus}
      onDelete={mockOnDelete}
      onFilter={mockOnFilter}
      onSort={mockOnSort}
      onCreateTask={mockOnCreateTask}
      onUpdateTask={mockOnUpdateTask}
    />);
    
    expect(screen.queryByText('Create New Task')).toBeInTheDocument();
    
    userEvent.click(screen.getByText('Create New Task'));
    expect(screen.getByText('Create New Task')).toBeInTheDocument();
    
    userEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('Create New Task')).toBeInTheDocument();
  });

  it('filters tasks by status', () => {
    render(<HomePage 
      tasks={tasks}
      onUpdateStatus={mockOnUpdateStatus}
      onDelete={mockOnDelete}
      onFilter={mockOnFilter}
      onSort={mockOnSort}
      onCreateTask={mockOnCreateTask}
      onUpdateTask={mockOnUpdateTask}
    />);

    userEvent.click(screen.getByText('Completed'));
    expect(mockOnFilter).toHaveBeenCalledWith('completed');
  });

  it('calls onCreateTask with correct data', async () => {
    render(<HomePage 
      tasks={tasks}
      onUpdateStatus={mockOnUpdateStatus}
      onDelete={mockOnDelete}
      onFilter={mockOnFilter}
      onSort={mockOnSort}
      onCreateTask={mockOnCreateTask}
      onUpdateTask={mockOnUpdateTask}
    />);

    userEvent.click(screen.getByText('Create New Task'));
    
    userEvent.type(screen.getByLabelText('Title:'), 'New Task');
    userEvent.type(screen.getByLabelText('Details:'), 'Details for new task');
    userEvent.selectOptions(screen.getByLabelText('Priority:'), 'Medium');

    userEvent.click(screen.getByText('Create Task'));

    await waitFor(() => {
      expect(mockOnCreateTask).toHaveBeenCalledWith({
        title: 'New Task',
        details: 'Details for new task',
        priority: 'Medium',
        completed: false,
      });
    });
  });
});
