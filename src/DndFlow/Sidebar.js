import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const data = [
        {
            id: '1',
            message: "first message"
        },
        {
            id: '2',
            message: "second message"
        },
        {
            id: '3',
            message: "third message"
        },
    ]

    return (
        <div className='w-full px-2 py-2'>

            <div className="flex flex-col w-2/4 items-center border border-blue-400 rounded-md py-3 mb-2 text-center" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                <FiMessageCircle className='text-blue-400 text-xl' />
                Input Node
            </div>
            <div className="flex flex-col w-2/4 items-center border border-blue-400 rounded-md py-3 mb-2 text-center" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                <FiMessageCircle className='text-blue-400 text-xl' />
                Default Node
            </div>
            <div className="flex flex-col w-2/4 items-center border border-blue-400 rounded-md py-3 mb-2 text-center" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                <FiMessageCircle className='text-blue-400 text-xl' />
                Output Node
            </div>
        </div>
    );
};
