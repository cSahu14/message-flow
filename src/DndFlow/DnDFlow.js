import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    getConnectedEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './index.css';
import { FaArrowLeft } from 'react-icons/fa';
import useDataStore from '../store';

// Inital node
const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'input node' },
        position: { x: 250, y: 5 },
        sourcePosition: 'right',
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [toggle, setToggle] = useState(true)

    // Edit noe
    const [editValue, setEditValue] = useState(nodes.data);
    const [id, setId] = useState()


    // get func from gobal store
    const setNodeStore = useDataStore((state) => state.setNodeStore)
    const setEdgeStore = useDataStore((state) => state.setEdgeStore)
    const setNodeData = useDataStore((state) => state.setNodeData)

    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {

                // it's important that you create a new object here
                // in order to notify react flow about the change
                node.style = { ...node.style, backgroundColor: "white" };
                return node;
            })
        );

    }, [setNodes]);

    // Func for edit
    const onNodeClick = (e, val) => {
        setEditValue(val.data.label)
        setId(val.id)
        setToggle(false)
    }

    // Func for node text change
    const handleChange = (e) => {
        e.preventDefault();
        setEditValue(e.target.value)
    }


    // Edit the node text
    const handleEdit = (e) => {
        if (e.key === "Enter" && e.shiftKey == false) {

            const res = nodes.map((item) => {
                if (item.id === id) {
                    item.data = {
                        ...item.data,
                        label: editValue
                    }
                }
                return item
            })
            setNodes(res)
            setEditValue("")
        }
    }

    // connect edges
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );


    // drag
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            console.log("type", type)

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
                sourcePosition: 'right',
                targetPosition: 'left'
            };
            console.log("newnode", newNode)

            setNodes((nds) => nds.concat(newNode));
            console.log("node length", nodes)


        },
        [reactFlowInstance],
    );

    // set nodes and edges in global store
    setNodeStore(nodes.length);
    setNodeData(nodes)
    const connectedEdges = getConnectedEdges(nodes, edges);
    setEdgeStore(connectedEdges.length)

    return (
        <div className="dndflow">

            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodeClick={(e, val) => onNodeClick(e, val)}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Controls />
                    </ReactFlow>
                </div>

                {/* Toggle to edit text or display message */}
                <div className='border-l md:w-1/5 sm:w-auto'>

                    {
                        toggle ? <Sidebar /> : <div >
                            <div className='flex py-2 items-center border-b px-2'>
                                <div className='w-1/5'>

                                    <FaArrowLeft className='text-gray-300 cursor-pointer' onClick={() => setToggle(true)} />
                                </div>
                                <div className='w-4/5 text-center'>

                                    <span className='text-center'>Message</span>
                                </div>
                            </div>
                            <div className='flex flex-col px-2 py-2 border-b'>

                                <label>Text</label>
                                <textarea className='outline-none border' type='text' value={editValue} onChange={handleChange} onKeyDown={handleEdit} />
                            </div>
                        </div>
                    }
                </div>

            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
