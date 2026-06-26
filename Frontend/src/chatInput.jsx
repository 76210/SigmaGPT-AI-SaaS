import { useRef, useState } from "react";

function ChatInput({ onFileSelect, onSend }) {
  const fileRef = useRef(null);
  const [text, setText] = useState("");

  const handlePlusClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div style={{ display: "flex", padding: "10px", gap: "8px" }}>
      
      <button onClick={handlePlusClick}>+</button>

      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <input
        type="text"
        value={text}
        placeholder="Message..."
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 }}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatInput;