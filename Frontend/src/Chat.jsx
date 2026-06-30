
import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const CodeBlock = ({ children }) => {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCode, setEditedCode] = useState("");
    
      // ✅ SIRF YE 2 CHEEZEIN CHANGE KI HAIN
    const extractText = (node) => {
        if (typeof node === "string") return node;
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (node?.props?.children) return extractText(node.props.children);
        return "";
    };
 // ✅ Ye karo
const rawCode = extractText(children?.props?.children);
   // const rawCode = children?.props?.children || "";
   // const language = children?.props?.className?.replace("language-", "") || "code";
   // ✅ Ye karo
const language = (children?.props?.className || "")
    .replace("hljs", "")
    .replace("language-", "")
    .trim() || "code";

    const handleCopy = () => {
        navigator.clipboard.writeText(isEditing ? editedCode : rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleEdit = () => {
        setEditedCode(rawCode);
        setIsEditing(true);
    };

    return (
        <div style={{ margin: "10px 0", borderRadius: "8px", overflow: "hidden", border: "1px solid #333" }}>
            {/* Top bar */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#1e1e1e",
                padding: "6px 12px",
                borderBottom: "1px solid #333",
            }}>
                <span style={{ color: "#aaa", fontSize: "12px" }}>{language}</span>

                <div style={{ display: "flex", gap: "8px" }}>
                    {/* Edit Button */}
                    {!isEditing ? (
                        <button onClick={handleEdit} style={{
                            background: "transparent",
                            color: "#aaa",
                            border: "1px solid #555",
                            borderRadius: "4px",
                            padding: "2px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}>
                            ✏️ 
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(false)} style={{
                            background: "transparent",
                            color: "#4caf50",
                            border: "1px solid #4caf50",
                            borderRadius: "4px",
                            padding: "2px 8px",
                            fontSize: "14px",
                            cursor: "pointer",
                        }}>
                            ✅ 
                        </button> 
                    )}

                    {/* Copy Button */}
                    <button onClick={handleCopy} style={{
                        background: "transparent",
                        color: copied ? "#4caf50" : "#aaa",
                        border: "1px solid #555",
                        borderRadius: "4px",
                        padding: "2px 10px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}>
                        {copied ? "✅ Copied!" : "📋 "}
                    </button>
                </div>
            </div>

            {/* Code area */}
            {isEditing ? (
                <textarea
                    value={editedCode}
                    onChange={(e) => setEditedCode(e.target.value)}
                    style={{
                        width: "100%",
                        minHeight: "150px",
                        background: "#282c34",
                        color: "#abb2bf",
                        border: "none",
                        padding: "12px",
                        fontSize: "14px",
                        fontFamily: "monospace",
                        resize: "vertical",
                        outline: "none",
                        boxSizing: "border-box",
                    }}
                />
            ) : (
                <pre style={{ margin: 0 }}>{children}</pre>
            )}
        </div>
    );
};

const MarkdownWithCopy = ({ content }) => (
    <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
            pre({ children }) {
                return <CodeBlock>{children}</CodeBlock>;
            }
        }}
    >
        {content}
    </ReactMarkdown>
);

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!prevChats?.length) return;

        const content = reply.split(" ");
        let idx = 0;

        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [prevChats, reply]);

    return (
        <>
            {newChat && <h1>Start a New Chat!</h1>}

            <div className="chats">
                {prevChats?.slice(0, -1).map((chat, idx) => (
                    <div
                        className={chat.role === "user" ? "userDiv" : "gptDiv"}
                        key={idx}
                    >
                        {chat.role === "user" ? (
                            <p className="userMessage">{chat.content}</p>
                        ) : (
                            <MarkdownWithCopy content={chat.content} />
                        )}
                    </div>
                ))}

                {prevChats.length > 0 && (
                    <>
                        {latestReply === null ? (
                            <div className="gptDiv" key="non-typing">
                                <MarkdownWithCopy content={prevChats[prevChats.length - 1].content} />
                            </div>
                        ) : (
                            <div className="gptDiv" key="typing">
                                <MarkdownWithCopy content={latestReply} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Chat;