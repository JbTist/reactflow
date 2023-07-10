// import React, { useState, useRef, useCallback } from 'react';
// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
// } from 'reactflow';
// import 'react-flow-renderer/dist/style.css';

// import Sidebar from './Sidebar';

// import './Index.css';

// const initialNodes = [
//   {
//     id: '1',
//     type: 'input',
//     data: { label: 'input node' },
//     position: { x: 250, y: 5 },
//   },
// ];

// let id = 0;
// const getId = () => `dndnode_${id++}`;

// const DnDFlow = () => {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();

//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//       const type = event.dataTransfer.getData('application/reactflow');

//       // check if the dropped element is valid
//       if (typeof type === 'undefined' || !type) {
//         return;
//       }

//       const position = reactFlowInstance.project({
//         x: event.clientX - reactFlowBounds.left,
//         y: event.clientY - reactFlowBounds.top,
//       });
//       const newNode = {
//         id: getId(),
//         type,
//         position,
//         data: { label: `${type} node` },
//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [reactFlowInstance]
//   );

//   return (
//     <div className="dndflow">
//       <ReactFlowProvider>
//         <div className="reactflow-wrapper" ref={reactFlowWrapper}>
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             onInit={setReactFlowInstance}
//             onDrop={onDrop}
//             onDragOver={onDragOver}
//             fitView
//           >
//             <Controls />
//           </ReactFlow>
//         </div>
//         <Sidebar />
//       </ReactFlowProvider>
//     </div>
//   );
// };

// export default DnDFlow;





// // import React, { useState } from 'react';
// // import './Header.css';
// // import _ from 'lodash'

// // export default function Header() {
// //   const problems = [
// //     {
// //       title: 'Problem 1',
// //       description: 'This is problem 1.',
// //       subProblems: [
// //         {
// //           title: 'Problem 1.1',
// //           description: 'This is problem 1.1.',
// //           subProblems: [
// //             {
// //               title: 'Problem 1.1.1',
// //               description: 'This is problem 1.1.1.',
// //               subProblems: []
// //             }
// //           ]
// //         },
// //         {
// //           title: 'Problem 1.2',
// //           description: 'This is problem 1.2.',
// //           subProblems: []
// //         },
// //         {
// //           title: 'Problem 1.3',
// //           description: 'This is problem 1.3.',
// //           subProblems: []
// //         }
// //       ]
// //     },
// //     {
// //       title: 'Problem 2',
// //       description: 'This is problem 2.',
// //       subProblems: [
// //         {
// //           title: 'Problem 2.1',
// //           description: 'This is problem 2.1.',
// //           subProblems: []
// //         },
// //         {
// //           title: 'Problem 2.2',
// //           description: 'This is problem 2.2.',
// //           subProblems: []
// //         }
// //       ]
// //     },
// //     {
// //       title: 'Problem 3',
// //       description: 'This is problem 3.',
// //       subProblems: []
// //     }
// //   ];

// //   const [current, setCurrent] = useState(problems);
// //   const [breadcrumb, setBreadcrumb] = useState([]);

// //   const onDragStart = (event, nodeType) => {
// //     console.log("drag has started");
// //     event.dataTransfer.setData('application/reactflow', nodeType);
// //     event.dataTransfer.effectAllowed = 'move';
// //   };

// //   const draggingOver=(e)=>{
// //     e.preventDefault();
// //     console.log('dragging over now');
// //   }
// //   const dragDropped=(e)=>{
// //     console.log('you have dropped');
// //     let tranfer=e.dataTransfer.getData('application/reactflow');
// //     console.log(tranfer);
// //   }

// //   const handleCurrent = (c) => {
// //     setCurrent(c.subProblems);
// //     setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, c]);
// //   };

// //   const handleBreadcrumb = (index) => {
// //     const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
// //     const updatedCurrent = updatedBreadcrumb.length > 0 ? updatedBreadcrumb[updatedBreadcrumb.length - 1].subProblems : problems;
// //     setCurrent(updatedCurrent);
// //     setBreadcrumb(updatedBreadcrumb);
// //   };

// //   return (
// //     <>
// //       {/* <div className='flex-container'> */}
// //         <div className='breadcrumb-container'>

// //           <a href='#' className='breadcrumb btn btn-link' onClick={() => {setCurrent(problems); setBreadcrumb([])}}>start</a>

// //         {!_.isEmpty(breadcrumb) && breadcrumb.map((crumb, index) => (
// //           <>
// //           <p style={{paddingLeft: 10, paddingRight:10, margin: 0}}>/</p>

// //             <a
// //               className='breadcrumb btn btn-link'
// //               key={crumb.title}
// //               onClick={() => handleBreadcrumb(index)}
// //             >
// //               {crumb.title}
// //             </a>
// //             </>
// //           ))}
// //         </div>

// //         <div className='flex-container'>
// //         {!_.isEmpty(current) && <div className='left'>

// //           {current.map((c) => (
// //             <button
// //               className='problem btn btn-primary'
// //               key={c.title}
// //               onClick={() => handleCurrent(c)}
// //               onDragStart={(event) => onDragStart(event, )} draggable
// //             >
// //               {c.title}
// //             </button>
// //           ))}
// //         </div>}

// //         <div droppable onDragOver={(e)=>draggingOver(e)} onDrop={(e)=>dragDropped(e)} className='right'>
// //           {!_.isEmpty(breadcrumb) && breadcrumb.length > 0 && (
// //             <>
// //               <h2>{breadcrumb[breadcrumb.length - 1].title}</h2>
// //               <p>{breadcrumb[breadcrumb.length - 1].description}</p>
// //             </>
// //           )}
// //         </div>
// //         </div>
// //       {/* </div> */}
// //     </>
// //   );
// // }


