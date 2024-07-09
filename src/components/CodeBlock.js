import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import io from "socket.io-client";
import "./CodeBlock.css";

// Initialize socket connection
const socket = io("http://localhost:3001", {
  transports: ["websocket"],
});

const CodeBlock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const codeBlock = location.state || "";

  // Generate a unique userId for each session
  const userId = `user_${Math.random().toString(36).substring(2, 9)}`;

  // State management
  const [role, setRole] = useState("student");
  const [code, setCode] = useState(codeBlock.initialCode);
  const [studentCount, setStudentCount] = useState(0);
  const [showSmiley, setShowSmiley] = useState(false);
  const room = codeBlock.id;

  // Handle socket events
  useEffect(() => {
    if (room && userId) {
      // Emit join event to server
      socket.emit("join", { room, userId });
    }

    // Listen for role assignment from server
    socket.on("role", (role) => {
      console.log(`rolee : ${role}`);
      setRole(role);
    });

    // Listen for code updates from server
    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    // Handle mentor leaving the room
    socket.on("mentorLeft", () => {
      if (role === "student") {
        alert("Mentor left the room. Redirecting to lobby.");
        navigate("/");
      }
    });

    // Listen for updates on the number of students in the room
    socket.on("studentCount", (count) => {
      setStudentCount(count);
    });

    // Listen for correct solution event
    socket.on("correctSolution", () => {
      setShowSmiley(true);
      setTimeout(() => setShowSmiley(false), 3000); // Hide the smiley after 3 seconds
    });

    return () => {
      socket.emit("leaveRoom", { room, userId });
      socket.off("role");
      socket.off("codeUpdate");
      socket.off("mentorLeft");
      socket.off("studentCount");
      socket.off("correctSolution");
    };
  }, [room, navigate, role]);

  // Handle code change event
  const handleCodeChange = (newCode) => {
    console.log("newcode: " + newCode);
    setCode(newCode);
    socket.emit("codeChange", { room: codeBlock.id, code: newCode });
  };

  if (!codeBlock) {
    return <div>Loading...</div>;
  }

  return (
    <div className="codeBlockContainer">
      <button onClick={() => navigate("/")} className="returnButton">
        Return
      </button>
      <h2>{codeBlock.name}</h2>
      <p>{codeBlock.description}</p>
      <div className="info-container">
        <div className="role-indicator">
          Role: {role === "mentor" ? "Mentor" : "Student"}
        </div>
        <div className="student-count">Students in room: {studentCount}</div>
      </div>
      {showSmiley && <div className="smiley">😊</div>}

      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={role === "student" ? handleCodeChange : undefined} // Allow changes for students only
        value={code}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{ useWorker: false }}
        className="codeEditor"
        width="100%"
        height="400px"
        readOnly={role === "mentor"} // Mentor sees read-only editor
      />
    </div>
  );
};

export default CodeBlock;
