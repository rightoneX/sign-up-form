import React from 'react'
import classNames from 'classnames';

const Message = ({ message, type }) => {

    return (
        <div className={classNames(type)}>
            {message}
        </div>
    )
}

export default Message