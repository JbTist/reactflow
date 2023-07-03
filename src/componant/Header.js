// import React,{useState} from 'react'
// import './Header.css';
// export default function Header() {
//   const problems = [
//      {
//       title: 'Problem 1',
//       description: 'This is problem 1.',
//       subProblems: [
//          {
//           title: 'Problem 1.1',
//           description: 'This is problem 1.1.',
//           subProblems: [
//             {
//               title: 'Problem 1.1.1',
//               description: 'This is problem 1.1.1.',
//               subProblems: []
//             }
//           ]
//         },
//        {
//           title: 'Problem 1.2',
//           description: 'This is problem 1.2.',
//           subProblems: []
//         },
//         {
//           title: 'Problem 1.3',
//           description: 'This is problem 1.3.',
//           subProblems: []
//         }
//       ]
//     },
//    {
//       title: 'Problem 2',
//       description: 'This is problem 2.',
//       subProblems: [
//         {
//           title: 'Problem 1.1',
//           description: 'This is problem 1.1.',
//           subProblems: []
//         },
//         {
//           title: 'Problem 1.2',
//           description: 'This is problem 1.2.',
//           subProblems: []
//         }
//       ]
//     },
//      {
//       title: 'Problem 3',
//       description: 'This is problem 3.',
//       subProblems: []
//     }
//   ];
//   const [show,setShow]=useState('')
//   const [current,setCurrent]=useState(problems)

//   console.log(current);
//   const handlecurrent=(c)=>{
//     console.log(c.subProblems);
//     setCurrent(c.subProblems)
//     // const s=c.target.value;
//     setShow(c)
//   }
//   // console.log(typeof(problems.problem1));
//   return (
//     <>
//     <div className='flex-container'>
//     <div className='left'>
//       {current.map((c,index) => (
//       // <a href='javascript:void(0)' key={c.title} className='problem btn btn'  onClick={() => {handlecurrent(c)}}>{index}</a>
//       <button className='problem btn btn-primary' key={c.title} onClick={() => {handlecurrent(c)}}>{c.title}</button>
//       ))}

//     </div>
//     <div className='right'>
//      <h2>{show.title}</h2>
//      <p>{show.description}</p>
//     </div>
//     </div>
//     </>
//   )
// }

// import React, { useState } from 'react';
// import './Header.css';
// import _ from 'lodash'

// export default function Header() {
//   const problems = [
//     {
//       title: 'Problem 1',
//       description: 'This is problem 1.',
//       subProblems: [
//         {
//           title: 'Problem 1.1',
//           description: 'This is problem 1.1.',
//           subProblems: [
//             {
//               title: 'Problem 1.1.1',
//               description: 'This is problem 1.1.1.',
//               subProblems: []
//             }
//           ]
//         },
//         {
//           title: 'Problem 1.2',
//           description: 'This is problem 1.2.',
//           subProblems: []
//         },
//         {
//           title: 'Problem 1.3',
//           description: 'This is problem 1.3.',
//           subProblems: []
//         }
//       ]
//     },
//     {
//       title: 'Problem 2',
//       description: 'This is problem 2.',
//       subProblems: [
//         {
//           title: 'Problem 2.1',
//           description: 'This is problem 2.1.',
//           subProblems: []
//         },
//         {
//           title: 'Problem 2.2',
//           description: 'This is problem 2.2.',
//           subProblems: []
//         }
//       ]
//     },
//     {
//       title: 'Problem 3',
//       description: 'This is problem 3.',
//       subProblems: []
//     }
//   ];

//   const [current, setCurrent] = useState(problems);
//   const [breadcrumb, setBreadcrumb] = useState([]);

//   const onDragStart = (event, nodeType) => {
//     console.log("drag has started");
//     event.dataTransfer.setData('application/reactflow', nodeType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   const draggingOver=(e)=>{
//     e.preventDefault();
//     console.log('dragging over now');
//   }
//   const dragDropped=(e)=>{
//     console.log('you have dropped');
//     let tranfer=e.dataTransfer.getData('transfer');
//     console.log(tranfer);
//   }

//   const handleCurrent = (c) => {
//     setCurrent(c.subProblems);
//     setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, c]);
//   };

//   const handleBreadcrumb = (index) => {
//     const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
//     const updatedCurrent = updatedBreadcrumb.length > 0 ? updatedBreadcrumb[updatedBreadcrumb.length - 1].subProblems : problems;
//     setCurrent(updatedCurrent);
//     setBreadcrumb(updatedBreadcrumb);
//   };

//   return (
//     <>
//       {/* <div className='flex-container'> */}
//         <div className='breadcrumb-container'>

//           <a href='#' className='breadcrumb btn btn-link' onClick={() => {setCurrent(problems); setBreadcrumb([])}}>start</a>

//         {!_.isEmpty(breadcrumb) && breadcrumb.map((crumb, index) => (
//           <>
//           <p style={{paddingLeft: 10, paddingRight:10, margin: 0}}>/</p>

//             <a
//               className='breadcrumb btn btn-link'
//               key={crumb.title}
//               onClick={() => handleBreadcrumb(index)}
//             >
//               {crumb.title}
//             </a>
//             </>
//           ))}
//         </div>

//         <div className='flex-container'>
//         {!_.isEmpty(current) && <div className='left'>

//           {current.map((c) => (
//             <button
//               className='problem btn btn-primary'
//               key={c.title}
//               onClick={() => handleCurrent(c)}
//               onDragStart={(event) => onDragStart(event, 'default')} draggable
//             >
//               {c.title}
//             </button>
//           ))}
//         </div>}

//         <div droppable onDragOver={(e)=>draggingOver(e)} onDrop={(e)=>dragDropped(e)} className='right'>
//           {!_.isEmpty(breadcrumb) && breadcrumb.length > 0 && (
//             <>
//               <h2>{breadcrumb[breadcrumb.length - 1].title}</h2>
//               <p>{breadcrumb[breadcrumb.length - 1].description}</p>
//             </>
//           )}
//         </div>
//         </div>
//       {/* </div> */}
//     </>
//   );
// }

// import React, { useState, useRef, useCallback } from "react";
// import "./Header.css";
// import _ from "lodash";

// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Controls,
//   MiniMap,
//   Background,
// } from "react-flow-renderer";

// const initialNodes = [
//   // {
//   //   id: '1',
//   //   type: 'input',
//   //   data: { label: 'input node' },
//   //   position: { x: 250, y: 5 },
//   // },
// ];

// let id = 0;
// const getId = () => `dndnode_${id++}`;

// export default function Header() {
//   const problems = [
//     {
//       title: "Problem 1",
//       description: "This is problem 1.",
//       subProblems: [
//         {
//           title: "Problem 1.1",
//           description: "This is problem 1.1.",
//           subProblems: [
//             {
//               title: "Problem 1.1.1",
//               description: "This is problem 1.1.1.",
//               subProblems: [],
//             },
//           ],
//         },
//         {
//           title: "Problem 1.2",
//           description: "This is problem 1.2.",
//           subProblems: [],
//         },
//         {
//           title: "Problem 1.3",
//           description: "This is problem 1.3.",
//           subProblems: [],
//         },
//       ],
//     },
//     {
//       title: "Problem 2",
//       description: "This is problem 2.",
//       subProblems: [
//         {
//           title: "Problem 2.1",
//           description: "This is problem 2.1.",
//           subProblems: [],
//         },
//         {
//           title: "Problem 2.2",
//           description: "This is problem 2.2.",
//           subProblems: [],
//         },
//       ],
//     },
//     {
//       title: "Problem 3",
//       description: "This is problem 3.",
//       subProblems: [],
//     },
//   ];

//   const [current, setCurrent] = useState(problems);
//   const [breadcrumb, setBreadcrumb] = useState([]);

//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

//   const onDragStart = (event, node) => {
//     event.dataTransfer.setData("application/reactflow", node);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();

//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//       const type = event.dataTransfer.getData("application/reactflow");

//       // check if the dropped element is valid
//       if (typeof type === "undefined" || !type) {
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
//         data: { label: `${type} ` },

//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [reactFlowInstance]
//   );

//   const handleCurrent = (c) => {

//     setCurrent(c.subProblems);
//     setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, c]);
//   };

//   const handleBreadcrumb = (index) => {
//     const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
//     const updatedCurrent =
//       updatedBreadcrumb.length > 0
//         ? updatedBreadcrumb[updatedBreadcrumb.length - 1].subProblems
//         : problems;
//     setCurrent(updatedCurrent);
//     setBreadcrumb(updatedBreadcrumb);
//   };

//   return (
//     <>
//       {/* <div className='flex-container'> */}

//         <div className="flex-container">
//         {!_.isEmpty(current) && (
//           <div className="left">
//             {current.map((c) => (
//               <div
//                 className="dndnode"
//                 key={c.title}
//                 onClick={() => handleCurrent(c)}
//                 onDragStart={(event) => onDragStart(event, c.title)}
//                 draggable
//               >
//                 {c.title}
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="right">

//         <div className="breadcrumb-container">
//         <a
//           href="#"
//           className="breadcrumb btn btn-link"
//           onClick={() => {
//             setCurrent(problems);
//             setBreadcrumb([]);
//           }}
//         >
//           start
//         </a>

//         {!_.isEmpty(breadcrumb) &&
//           breadcrumb.map((crumb, index) => (
//             <>
//               <p style={{ paddingLeft: 10, paddingRight: 10, margin: 0 }}>/</p>

//               <a
//                 className="breadcrumb btn btn-link"
//                 key={crumb.title}
//                 onClick={() => handleBreadcrumb(index)}
//               >
//                 {crumb.title}
//               </a>
//             </>
//           ))}
//       </div>

//         <ReactFlowProvider>
//         <div className="reactflow-wrapper" style={{height:'90%', weight:'80%',border:'1px solid #ccc'}} ref={reactFlowWrapper}>
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
//              <MiniMap />
//              <Background/>
//             <Controls />
//           </ReactFlow>
//         </div>

//         </ReactFlowProvider>
//           {/* {!_.isEmpty(breadcrumb) && breadcrumb.length > 0 && (
//             <>
//               <h2>{breadcrumb[breadcrumb.length - 1].title}</h2>
//               <p>{breadcrumb[breadcrumb.length - 1].description}</p>
//             </>
//           )} */}

//         </div>
//       </div>

//     </>
//   );
// }

import React, { useState, useRef, useCallback } from "react";
import "./Header.css";
import _ from "lodash";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "react-flow-renderer";
import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";

const nodeTypes = {
  selectorNode: CustomNode,
};


const initialNodes = [
 
];

// let id = 0;
// const getId = () => `dndnode_${id++}`;

export default function Header() {
  const problems = [
    {
      title: "Problem 1",
      description: "This is problem 1.",
      subProblems: [
        {
          title: "Problem 1.1",
          description: "This is problem 1.1.",
          subProblems: [
            {
              title: "Problem 1.1.1",
              description: "This is problem 1.1.1.",
              subProblems: [],
            },
            {
              title: "Problem 1.1.2",
              description: "This is problem 1.1.1.",
              subProblems: [],
            },
          ],
        },
        {
          title: "Problem 1.2",
          description: "This is problem 1.2.",
          subProblems: [
            {
              title: "Problem 1.2.1",
              description: "This is problem 1.1.1.",
              subProblems: [
                {
                  title: "Problem 1.2.1.1",
                  description: "This is problem 1.1.1.",
                  subProblems: [],
                },
              ],
            },
            {
              title: "Problem 1.2.2",
              description: "This is problem 1.1.1.",
              subProblems: [
                {
                  title: "Problem 1.2.2.1",
                  description: "This is problem 1.1.1.",
                  subProblems: [],
                },
              ],
            },
          ],
        },
        {
          title: "Problem 1.3",
          description: "This is problem 1.3.",
          subProblems: [],
        },
      ],
    },
    {
      title: "Problem 2",
      description: "This is problem 2.",
      subProblems: [
        {
          title: "Problem 2.1",
          description: "This is problem 2.1.",
          subProblems: [],
        },
        {
          title: "Problem 2.2",
          description: "This is problem 2.2.",
          subProblems: [],
        },
      ],
    },
    {
      title: "Problem 3",
      description: "This is problem 3.",
      subProblems: [],
    },
  ];

  const [current, setCurrent] = useState(problems);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  const [activeNodes, setActiveNodes] = useState([]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragStart = (event, node) => {
    event.dataTransfer.setData("application/reactflow", node);
    event.dataTransfer.effectAllowed = "move";
  };

  // const onDragOver = useCallback((event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = "move";
  // }, []);

  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault();

  //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  //     const type = event.dataTransfer.getData("application/reactflow");

  //     // check if the dropped element is valid
  //     if (typeof type === "undefined" || !type) {
  //       return;
  //     }

  //     const position = reactFlowInstance.project({
  //       x: event.clientX - reactFlowBounds.left,
  //       y: event.clientY - reactFlowBounds.top,
  //     });
  //     const newNode = {
  //       id: getId(),
  //       type,
  //       position,
  //       data: { label: `${type} ` },
  //     };

  //     setNodes((nds) => nds.concat(newNode));
  //   },
  //   [reactFlowInstance]
  // );

  // const handleCurrent = (c) => {
  //   // setCurrent(c.subProblems);
  //   setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, c]);
  //   setNodes((nds) => [
  //     ...nds,
  //     {
  //       id: getId(),
  //       type: "input",
  //       position: { x: 200, y: 50 }, // Adjust the position as needed
  //       data: {
  //         label: c.title
  //       },
  //     },
  //   ]);
  // };
  const newsubProblem = (c, p) => {
    
      const nodesToAdd = [];

      for (let i = 0; i < c.subProblems?.length ?? 0; i++) {
        const newNode = {
          id: c.subProblems[i].title,
          type: "button",
          position: { x: (i* (200))+p , y: -10 },
          data: {
            label: c.subProblems[i].title,
          },
        };

        nodesToAdd.push(newNode);
        // if(c?.subProblems?.subProblems){
        //   newsubProblem(c.subProblems, i*200)
        // }
      }

      const edgesToAdd = [];

      for (let i = 0; i < c.subProblems?.length ?? 0; i++) {
        const newEdge = {
          id: c.subProblems[i].title,
          source: c.title,
          target: c.subProblems[i].title,
          animated: true,
          style: { stroke: "#000" },
        };

        edgesToAdd.push(newEdge);
        
      }


      setNodes((prevNodes) => [
        ...prevNodes,
        ...nodesToAdd,
      ]);

      setEdges((prevEdges) => [
        ...prevEdges, 
        ...edgesToAdd,
      ]);
      
      // setCurrent((prevCurrent) => prevCurrent.filter((item) => item.title !== c.title));
    }

  const handleCurrent = (c) => {
    setBreadcrumb((prevBreadcrumb) => [ c]);
    const existingNode = nodes.find((node) => node.data.label === c.title);
    

    if (existingNode) {
      // Node already exists, remove it
      for (let i = 0; i < c.subProblems.length; i++) {
        setNodes((prevNodes) =>
        prevNodes.filter((node) => node.data.label !== c.subProblems[i].title )
        );

        setEdges((prevEdges) =>
        prevEdges.filter((edge) => edge.id !== c.subProblems[i].title )
        );
        };
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.data.label !== c.title )
      );
      setBreadcrumb((prevBreadcrumb) =>
        prevBreadcrumb.filter((item) => item.title !== c.title)
      );
    } else {
      setEdges([]);
      setNodes([]);
      const nodesToAdd = [];

      for (let i = 0; i < c.subProblems.length; i++) {
        const newNode = {
          id: c.subProblems[i].title,
          type: "selectorNode",
          position: { x: i * 200, y: -200 },
          data: {
            label: c.subProblems[i].title,
          },
        };

        nodesToAdd.push(newNode);

       newsubProblem(c.subProblems[i], i*200);
      }

      
      
      

      const edgesToAdd = [];

      for (let i = 0; i < c.subProblems.length; i++) {
        const newEdge = {
          id: c.subProblems[i].title,
          source: c.title,
          target: c.subProblems[i].title,
          animated: true,
          style: { stroke: "#000" },
        };

        edgesToAdd.push(newEdge);
      }

      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: c.title,
          type: "selectorNode",
          position: { x: 200, y: -300 },
          data: {
            label: c.title,
          },
        },
        ...nodesToAdd,
      ]);

      setEdges((prevEdges) => [
        ...prevEdges, 
        ...edgesToAdd,
      ]);
      // setCurrent((prevCurrent) => prevCurrent.filter((item) => item.title !== c.title));
    }
  };

  const handleBreadcrumb = (index) => {
    const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
    const updatedCurrent =
      updatedBreadcrumb.length > 0
        ? updatedBreadcrumb[updatedBreadcrumb.length - 1].subProblems
        : problems;
    setCurrent(updatedCurrent);
    setBreadcrumb(updatedBreadcrumb);
  };

  return (
    <>
      <div className="flex-container">
        {!_.isEmpty(current) && (
          <div className="left">
            {current.map((c) => (
              <div
                className="dndnode"
                key={c.title}
                onClick={() => handleCurrent(c)}
                onDragStart={(event) => onDragStart(event, c.title)}
                draggable
              >
                {c.title}
              </div>
            ))}
          </div>
        )}

        <div className="right">
          <div className="breadcrumb-container">
            <a
              href="#"
              className="breadcrumb btn btn-link"
              onClick={() => {
                setCurrent(problems);
                setBreadcrumb([]);
              }}
            >
              start
            </a>

            {!_.isEmpty(breadcrumb) &&
              breadcrumb.map((crumb, index) => (
                <>
                  <p style={{ paddingLeft: 10, paddingRight: 10, margin: 0 }}>
                    /
                  </p>

                  <a
                    className="breadcrumb btn btn-link"
                    key={crumb.title}
                    onClick={() => handleBreadcrumb(index)}
                  >
                    {crumb.title}
                  </a>
                </>
              ))}
          </div>

          <ReactFlowProvider>
            <div
              className="reactflow-wrapper"
              style={{ height: "90%", weight: "80%", border: "1px solid #ccc" }}
              ref={reactFlowWrapper}
            >
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                // onDrop={onDrop}
                // onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                fitView
              >
                <MiniMap />
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
}

// import React, { useState, useRef, useCallback, useMemo } from "react";
// import "./Header.css";
// import _ from "lodash";

// import ReactFlow, {
//   ReactFlowProvider,
//   addEdge,
//   useNodes,
//   useEdges,
//   Controls,
//   MiniMap,
//   Background,
// } from "react-flow-renderer";

// const initialNodes = [
//   // {
//   //   id: '1',
//   //   type: 'input',
//   //   data: { label: 'input node' },
//   //   position: { x: 250, y: 5 },
//   // },
// ];

// let id = 0;
// const getId = () => `dndnode_${id++}`;

// export default function Header() {
//   const problems = [
//     {
//       title: "Problem 1",
//       description: "This is problem 1.",
//       subProblems: [
//         {
//           title: "Problem 1.1",
//           description: "This is problem 1.1.",
//           subProblems: [
//             {
//               title: "Problem 1.1.1",
//               description: "This is problem 1.1.1.",
//               subProblems: [],
//             },
//           ],
//         },
//         {
//           title: "Problem 1.2",
//           description: "This is problem 1.2.",
//           subProblems: [],
//         },
//         {
//           title: "Problem 1.3",
//           description: "This is problem 1.3.",
//           subProblems: [],
//         },
//       ],
//     },
//     {
//       title: "Problem 2",
//       description: "This is problem 2.",
//       subProblems: [
//         {
//           title: "Problem 2.1",
//           description: "This is problem 2.1.",
//           subProblems: [],
//         },
//         {
//           title: "Problem 2.2",
//           description: "This is problem 2.2.",
//           subProblems: [],
//         },
//       ],
//     },
//     {
//       title: "Problem 3",
//       description: "This is problem 3.",
//       subProblems: [],
//     },
//   ];

//   const [current, setCurrent] = useState(problems);
//   const [breadcrumb, setBreadcrumb] = useState([]);
//   const [nodes, setNodes] = useNodes(initialNodes);
//   const [edges, setEdges] = useEdges([]);

//   const reactFlowWrapper = useRef(null);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);
//   const [expandedNodes, setExpandedNodes] = useState([]);

//   const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

//   const onDragStart = (event, node) => {
//     event.dataTransfer.setData("application/reactflow", node);
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();

//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
//       const type = event.dataTransfer.getData("application/reactflow");

//       // check if the dropped element is valid
//       if (typeof type === "undefined" || !type) {
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
//         data: { label: `${type} `, expandable: false },
//       };

//       setNodes((nds) => nds.concat(newNode));
//     },
//     [reactFlowInstance]
//   );

//   const handleCurrent = (c) => {
//     setCurrent(c.subProblems);
//     setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, c]);
//   };

//   const handleBreadcrumb = (index) => {
//     const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
//     const updatedCurrent =
//       updatedBreadcrumb.length > 0 ? updatedBreadcrumb[updatedBreadcrumb.length - 1].subProblems : problems;
//     setCurrent(updatedCurrent);
//     setBreadcrumb(updatedBreadcrumb);
//   };

//   const handleExpand = (nodeId) => {
//     setExpandedNodes((prevNodes) => [...prevNodes, nodeId]);
//   };

//   const handleCollapse = (nodeId) => {
//     setExpandedNodes((prevNodes) => prevNodes.filter((id) => id !== nodeId));
//   };

//   return (
//     <>
//       <div className="flex-container">
//         {!_.isEmpty(current) && (
//           <div className="left">
//             {current.map((c) => (
//               <div
//                 className="dndnode"
//                 key={c.title}
//                 onClick={() => handleCurrent(c)}
//                 onDragStart={(event) => onDragStart(event, c.title)}
//                 draggable
//               >
//                 {c.title}
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="right">
//           <div className="breadcrumb-container">
//             <a
//               href="#"
//               className="breadcrumb btn btn-link"
//               onClick={() => {
//                 setCurrent(problems);
//                 setBreadcrumb([]);
//               }}
//             >
//               start
//             </a>

//             {!_.isEmpty(breadcrumb) &&
//               breadcrumb.map((crumb, index) => (
//                 <>
//                   <p style={{ paddingLeft: 10, paddingRight: 10, margin: 0 }}>/</p>

//                   <a
//                     className="breadcrumb btn btn-link"
//                     key={crumb.title}
//                     onClick={() => handleBreadcrumb(index)}
//                   >
//                     {crumb.title}
//                   </a>
//                 </>
//               ))}
//           </div>

//           <ReactFlowProvider>
//             <div
//               className="reactflow-wrapper"
//               style={{ height: "90%", weight: "80%", border: "1px solid #ccc" }}
//               ref={reactFlowWrapper}
//             >
//               <ReactFlow
//                 elements={[...nodes, ...edges]}
//                 onConnect={onConnect}
//                 onDrop={onDrop}
//                 onDragOver={onDragOver}
//                 onElementClick={(event, element) => {
//                   if (element.type === "dndnode") {
//                     if (element.data.expandable) {
//                       if (expandedNodes.includes(element.id)) {
//                         handleCollapse(element.id);
//                       } else {
//                         handleExpand(element.id);
//                       }
//                     }
//                   }
//                 }}
//                 onPaneClick={() => {
//                   // Clear the selection on pane click
//                   setNodes((nodes) => nodes.map((node) => ({ ...node, isSelected: false })));
//                   setEdges((edges) => edges.map((edge) => ({ ...edge, isSelected: false })));
//                 }}
//                 onSelectionDragStart={() => {
//                   // Clear the selection on drag start
//                   setNodes((nodes) => nodes.map((node) => ({ ...node, isSelected: false })));
//                   setEdges((edges) => edges.map((edge) => ({ ...edge, isSelected: false })));
//                 }}
//                 onSelectionContextMenu={(event, elements) => {
//                   event.preventDefault();
//                   console.log(elements);
//                 }}
//                 onInit={setReactFlowInstance}
//                 deleteKeyCode={46} // Delete key code
//               >
//                 <MiniMap />
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             </div>
//           </ReactFlowProvider>
//         </div>
//       </div>
//     </>
//   );
// }
