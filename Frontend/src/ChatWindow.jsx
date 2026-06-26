import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
//import { useEffect, useState } from "react";
import Message from "./Message";

function ChatWindow() {
    const {
        prompt,
        setPrompt,
        reply,
        setReply,
        currThreadId,
        setPrevChats,
        setNewChat,
        sidebarOpen,
        setSidebarOpen 
    } = useContext(MyContext);

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
     const [messages, setMessages] = useState([]);  
      const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const pinnedMessages = messages.filter((m) => m.isPinned);
  const normalMessages = messages.filter((m) => !m.isPinned);

   const navigate = useNavigate();

// ================= LOGOUT =================
const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

// 👇 ADD THIS HERE
useEffect(() => {
    if (sidebarOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}, [sidebarOpen]);

// ================= FILE UPLOAD =================
/*const handleFileChange = async (e) => {
    try {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));

        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        console.log("Uploaded URL:", data.url);

        setUploadedFileUrl(data.url);

    } catch (err) {
        console.log("Upload Error:", err);
    }
}; */

const handleFileChange = async (e) => {
    try {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));

        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("http://localhost:8080/api/upload", {
       // const res = await fetch("/api/upload", { 
            method: "POST",
            body: formData
        });

        const text = await res.text();
        console.log("UPLOAD RESPONSE:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.log("Invalid JSON");
            return;
        }

        if (!data.url) {
            console.log("Upload failed:", data);
            return;
        }

        setUploadedFileUrl(data.url);
        console.log("Uploaded URL:", data.url);

    } catch (err) {
        console.log("Upload Error:", err);
    }
}; 


//
    // ================= CHAT API =================
    const getReply = async () => {
      console.log("Sending file URL:", uploadedFileUrl);
        setLoading(true);
        setNewChat(false);

        try {
            const response = await fetch("http://localhost:8080/api/chat", {
           //const response = await fetch("/api/chat", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: prompt,
                    threadId: currThreadId,
                    fileUrl: uploadedFileUrl
                })
            });

            const res = await response.json();
             setReply(res.reply); 
            //setReply(res.reply.message); //fix 
        } catch (err) {
            console.log(err);
        }
        
          // ✅ Ye add karo — send ke baad image clear ho jayegi
         setFile(null);
        setPreview(null);
        setUploadedFileUrl(""); 
        setLoading(false);
    };

    // ================= CHAT HISTORY =================
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prev => [
                ...prev,
                { role: "user", content: prompt },
                { role: "assistant", content: reply }
            ]);
        }

        setPrompt("");
    }, [reply]);

    return ( 
         
        <div className="chatWindow"> 

            {/* NAVBAR */}
            <div className="navbar"> 

                  {/* HAMBURGER MENU (ADD THIS) */}
    <div
        className="menuBtn"
        onClick={() => setSidebarOpen(true)}
    >
        <i className="fa-solid fa-bars"></i>
    </div> 
                <span>SigmaGPT <i className="fa-solid fa-chevron-down"></i></span>

                <div className="userIconDiv" onClick={() => setIsOpen(!isOpen)}>
                    <span className="userIcon">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
            </div>
          
          {/* 👇 YAHAN SE START KARO (IMPORTANT) */}

            {/* DROPDOWN */}
            {isOpen && (
                <div className="dropDown">
                    <div className="dropDownItem">
                        <i className="fa-solid fa-gear"></i> Settings
                    </div>
                    <div className="dropDownItem">
                        <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
                    </div>
                    <div className="dropDownItem" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
                    </div>
                </div>
            )}
          
             {/* 👇 ADD THIS OVERLAY HERE */}
{sidebarOpen && (
    <div
        className="overlay"
        onClick={() => setSidebarOpen(false)}
    ></div>
)} 

            {/* CHAT */}
            <Chat />

            {/* LOADER */}
            <ScaleLoader color="#fff" loading={loading} />

            {/* INPUT BOX */}
       {/* INPUT BOX */}
<div className="chatInput">
    <div className="inputBox">

        <button
            className="plusBtn"
            onClick={() => document.getElementById("fileInput").click()}
        >
            +
        </button>

        <input
            id="fileInput"
            type="file"
            // style={{ display: "none" }}
              hidden
            onChange={handleFileChange}
        />

        {preview && (
            <img
                src={preview}
                alt="preview"
                className="previewThumb"
            />
        )}

        <input
            type="text"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && getReply()}

        />  

        <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
        </div>

    </div>

    <p className="info">
        SigmaGPT can make mistakes. Check important info.
    </p>
</div>
</div>
    );
} 

export default ChatWindow; 