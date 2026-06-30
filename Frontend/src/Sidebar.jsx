import { BASE_URL } from "./config.js"; 
import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

function Sidebar() { 
      const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };  // 
    const {
        allThreads,
        setAllThreads,
        currThreadId,
        setNewChat,
        setPrompt,
        setReply,
        setCurrThreadId,
        setPrevChats,
        sidebarOpen,
        setSidebarOpen 
    } = useContext(MyContext);

    // 🔥 Fetch / Refresh Threads
   const refreshThreads = async () => {
    try {
       // const response = await fetch("http://localhost:8080/api/thread");
        const response = await fetch(`${BASE_URL}/api/thread`); 
        const res = await response.json();

        const filteredData = res.map(thread => ({
            threadId: thread.threadId,
            title: thread.title,
            isPinned: thread.isPinned
        }));

        setAllThreads(filteredData);
    } catch (err) {
        console.log(err);
    }
}; 
 
    /// fix this 
    const pinThread = async (threadId) => {
    try {
        // await fetch(
        //     `http://localhost:8080/api/thread/pin/${threadId}`,
        //     {
        //         method: "PATCH"
        //     }
        // ); 
        await fetch(
    `${BASE_URL}/api/thread/pin/${threadId}`,
    { method: "PATCH" }
   ); 

        refreshThreads();
    } catch (err) {
        console.log(err);
    }
}; 
    ///
    useEffect(() => {
        refreshThreads();
    }, []);

    // 🆕 New Chat
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
         refreshThreads();
   
    };

    // 🔄 Switch Thread
    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId);

        try {
            // const response = await fetch(
            //     `http://localhost:8080/api/thread/${newThreadId}`
            // );
           const response = await fetch(
    `${BASE_URL}/api/thread/${newThreadId}`
); 
            const res = await response.json();

            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    };

    // 🗑 Delete Thread
    const deleteThread = async (threadId) => {
        try {
            // await fetch(`http://localhost:8080/api/thread/${threadId}`, {
            //     method: "DELETE"
            // });
           await fetch(`${BASE_URL}/api/thread/${threadId}`, {
    method: "DELETE"
}); 

            // remove from UI instantly
            setAllThreads(prev =>
                prev.filter(thread => thread.threadId !== threadId)
            );

            // if current thread deleted → reset chat
            if (threadId === currThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    };

    return ( 

        <section  className={`sidebar ${sidebarOpen ? "open" : ""}`} >
            
            <div className="mobileClose">
          <i
        className="fa-solid fa-xmark"
        onClick={() => setSidebarOpen(false)}
       ></i>
       </div>
           
            <button onClick={createNewChat}>
                <img
                    src="src/assets/blacklogo.png"
                    alt="gpt logo"
                    className="logo"
                />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </button>

                <h3 className="sectionTitle">Pinned 📌</h3>

<ul className="history">
    {allThreads
        ?.filter(thread => thread.isPinned)
        .map(thread => (
            <li
                key={thread.threadId}
                onClick={() => changeThread(thread.threadId)}
            >
                <span>{thread.title}</span>

                <div className="threadActions">
                    <i
                        className="fa-solid fa-thumbtack"
                        onClick={(e) => {
                            e.stopPropagation();
                            pinThread(thread.threadId);
                        }}
                    ></i>

                    <i
                        className="fa-solid fa-trash"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}
                    ></i>
                </div>
            </li>
        ))}
</ul>

<h3 className="sectionTitle">Today</h3>

<ul className="history">
    {allThreads
        ?.filter(thread => !thread.isPinned)
        .map(thread => (
            <li
                key={thread.threadId}
                onClick={() => changeThread(thread.threadId)}
            >
                <span>{thread.title}</span>

                <div className="threadActions">
                    <i
                        className="fa-solid fa-thumbtack"
                        onClick={(e) => {
                            e.stopPropagation();
                            pinThread(thread.threadId);
                        }}
                    ></i>

                    <i
                        className="fa-solid fa-trash"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteThread(thread.threadId);
                        }}
                    ></i>
                </div>
            </li>
        ))}
</ul> 

           <div className="sign"> 
                <p>By apna &hearts;</p>
            </div>
        </section>
    );
}

export default Sidebar;
