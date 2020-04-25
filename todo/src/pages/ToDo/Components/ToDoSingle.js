import React, { Fragment } from 'react'

const ToDoSingle = (props) => {


    return (
        <Fragment >
            <span className="taskWord">Task: </span>
            <span className="todo-task">{props.task}</span>
            <span className="todo-urgency">Urgencey: <span className={`todo-urgencyz ${props.urgencyClass}`}>{props.urgency}</span></span>
        </Fragment>)
}

export default ToDoSingle
