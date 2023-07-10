import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./CustomNode.css";
// import empty from "./Header";

export default memo(
  ({ nodes, setNodes, onNodesChange, handleCurrent, data, isConnectable }) => {
    const [showModal, setShowModal] = useState(false); 

    const collapseNode = (setNodes, subproblem, nodes) => {
      console.log(setNodes);
      
      // const findchildren=nodes.find((node) => node.id === data.subProblems[0].title);
      const existingNode = nodes.filter((node) => node.data.label === nodes.id);
      console.log(existingNode);
      
       if (existingNode) {
      for (let i = 0; i < data.subproblem.subProblems.length; i++) {
        setNodes((prevNodes) =>
          prevNodes.filter(
            (node) => node.id !== data.subproblem.subProblems[i].title
          )
        );
      }
      } else {
        const subProblemsNode = subproblem.subProblems.map((item, i) => {
          return {
            id: item.title,
            type: "button",
            position: { x: i * -200 + i, y: -10 },
            data: {
              // label: item.title,
              descrit: item.description,
              subproblem: item,
            },
          };
        });
        setNodes((prevNodes) => [...prevNodes, ...subProblemsNode]);

        // const nodesToAdd = [];
        // for (let i = 0; i < data.subproblem.subProblems.length; i++) {
        //   const newNode = {
        //     id: data.subProblems[i].title,
        //     type: "button",
        //     position: { x: i * 200, y: -200 },
        //     data: {
        //       label: data.subProblems[i].title,
        //       descrit: data.subProblems[i].description,
        //       subproblem: data.subProblems[i],
        //     },
        //   };

        //   nodesToAdd.push(newNode);
        // }
        // setNodes((prevNodes) => [...prevNodes, ...nodesToAdd]);
      }
    };
    return (
      <>
        <Handle
          type="target"
          position={Position.Top}
          style={{ background: "#555", marginTop: "6px", zIndex: "-1" }}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
        <div>
          <Button
            style={{
              height: "80px",
              width: "120px",
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              cursor: "pointer",
            }}
            onClick={() => collapseNode(data.setNodes, data.subproblem, data.nodes)}
          >

            <h4 style={{ marginTop: "2px" }}>{data.label}</h4>
            <br />
            <div className="classbtn">
              <Button className="btn">+</Button>
            </div>
            <Button
              variant="primary"
              className="showbutton"
              style={{
                width: "15px",
                height: "15px",
                marginTop: "22px",
                cursor: "pointer",
                color: "red",
                background: "none",
                border: "1px solid white",
                backgroundColor: "#9a9999",
                borderRadius: "50%",
                position: "relative",
                zIndex: "1",
              }}
              onClick={() => setShowModal(true)}
            ></Button>
          </Button>
        </div>

        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header>
            <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
            <Button
              className=""
              style={{
                border: "none",
                fontSize: "20px",
                marginLeft: "95%",
                background: "none",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => setShowModal(false)}
            >
              ❌
            </Button>
          </Modal.Header>
          <Modal.Body>
            <p>{data.descrit}</p>
          </Modal.Body>
        </Modal>
        {/* {showModal ? (
        <>

          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed  outline-none focus:outline-none"
            style={{
              width: "200px",
              height: "100px",
              padding: "5px",
              background: "white",
              borderRadius: "5px",
              backgroundColor: "#eae5e5",
              marginTop: "5px",
              marginRight: "-75px",
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className=""
                  style={{
                    border: "none",
                    fontSize: "8px",
                    marginLeft: "128px",
                    background: "none",
                    cursor: "pointer",
                  }}
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  ❌
                </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {data.descrit}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null} */}

        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          style={{ bottom: 2, top: "auto", background: "#555", zIndex: "-1" }}
          isConnectable={isConnectable}
        />
      </>
    );
  }
);
