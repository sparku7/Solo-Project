import React from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks = [] }) => {
    return (
        <div>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div key={task.id}>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p>{task.assignedEmployee}</p>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.array
};

export default TaskList;
