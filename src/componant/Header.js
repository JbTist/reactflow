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
  MarkerType,
} from "reactflow";
import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";

const nodeTypes = {
  button: CustomNode,
};

const initialNodes = [];

// let id = 0;
// const getId = () => `dndnode_${id++}`;

export default function Header(props) {
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
              description: "This is problem 1.1.2.",
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
              description: "This is problem 1.2.1.",
              subProblems: [
                {
                  title: "Problem 1.2.1.1",
                  description: "This is problem 1.2.1.1",
                  subProblems: [],
                },
              ],
            },
            {
              title: "Problem 1.2.2",
              description: "This is problem 1.2.2.",
              subProblems: [
                {
                  title: "Problem 1.2.2.1",
                  description: "This is problem 1.2.2.1",
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
        position: { x: i * -200 + p, y: -10 },
        data: {
          label: c.subProblems[i].title,
          descrit: c.subProblems[i].description,
          subproblem: c.subProblems[i],
          setNodes: setNodes,
          nodes:nodes,
        },
      };

      nodesToAdd.push(newNode);
      if (c?.subProblems?.subProblems) {
        newsubProblem(c.subProblems, i * 200);
      }
    }

    const edgesToAdd = [];

    for (let i = 0; i < c.subProblems?.length ?? 0; i++) {
      const newEdge = {
        id: c.subProblems[i].title,
        source: c.title,
        target: c.subProblems[i].title,
        // animated: true,
        style: { stroke: "#9a9999" },
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };

      edgesToAdd.push(newEdge);
    }

    setNodes((prevNodes) => [...prevNodes, ...nodesToAdd]);

    setEdges((prevEdges) => [...prevEdges, ...edgesToAdd]);

    // setCurrent((prevCurrent) => prevCurrent.filter((item) => item.title !== c.title));
  };

  const handleCurrent = (c) => {
    setNodes([]);
    setEdges([]);
    // setCurrent(c.subProblems);
    setBreadcrumb((prevBreadcrumb) => [c]);
    const existingNode = nodes.find((node) => node.data.label === c.title);
    console.log(existingNode);

    if (existingNode) {
      // Node already exists, remove it
      for (let i = 0; i < c.subProblems.length; i++) {
        setNodes((prevNodes) =>
          prevNodes.filter((node) => node.data.label !== c.subProblems[i].title)
        );

        setEdges((prevEdges) =>
          prevEdges.filter((edge) => edge.id !== c.subProblems[i].title)
        );
      }
      setNodes((prevNodes) =>
        prevNodes.filter((node) => node.data.label !== c.title)
      );
      setBreadcrumb((prevBreadcrumb) =>
        prevBreadcrumb.filter((item) => item.title !== c.title)
      );
    } else {
      // setEdges([]);
      setNodes([]);
      const nodesToAdd = [];

      for (let i = 0; i < c.subProblems.length; i++) {
        const newNode = {
          id: c.subProblems[i].title,
          type: "button",
          position: { x: i * 200, y: -200 },
          data: {
            label: c.subProblems[i].title,
            descrit: c.subProblems[i].description,
            subproblem: c.subProblems[i],
            setNodes: setNodes,
            nodes:nodes,
          },
        };

        nodesToAdd.push(newNode);

        newsubProblem(c.subProblems[i], i * 200);
      }

      const edgesToAdd = [];

      for (let i = 0; i < c.subProblems.length; i++) {
        const newEdge = {
          id: c.subProblems[i].title,
          source: c.title,
          target: c.subProblems[i].title,
          // animated: true,
          style: { stroke: "#9a9999" },
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };

        edgesToAdd.push(newEdge);
      }

      setNodes((prevNodes) => [
        ...prevNodes,
        {
          id: c.title,
          type: "input",
          position: { x: 200, y: -300 },
          data: {
            label: c.title,
          },
          style: {
            width: "100px",
            height: "30px",
            backgroundImage:
              "linear-gradient(to right, #a6c1ee 51%, #fbc2eb 100%)",
            padding: "2px",
            borderRadius: "5px",
            textAlign: "center",
            border: "none",
            boxShadow:
              " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          },
        },
        ...nodesToAdd,
      ]);

      setEdges((prevEdges) => [...prevEdges, ...edgesToAdd]);
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
      {/* <CustomNode nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}/> */}
      <div className="flex-container">
        {!_.isEmpty(current) && (
          <div className="leftt">
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

        <div className="rightt">
          <div className="breadcrumb-container">
            <a
              href="#"
              className="breadcrumb btn btn-link"
              onClick={() => {
                setCurrent(problems);
                setBreadcrumb([]);
                setNodes([]);
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
