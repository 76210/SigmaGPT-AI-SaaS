import { pinMessage, unpinMessage } from "./api/messageApi";

function Message({ msg, refresh }) {
  const handlePin = async () => {
    if (msg.isPinned) {
      await unpinMessage(msg._id);
    } else {
      await pinMessage(msg._id);
    }

    refresh();
  };

  return (
    <div>
      <p>{msg.text}</p>
      <button onClick={handlePin}>
        {msg.isPinned ? "Unpin 📌" : "Pin 📌"}
      </button>
    </div>
  );
}

export default Message;