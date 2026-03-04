// LiveChat.jsx
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessage from "./ChatMessage";
import { addMessage } from "../redux/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);
  const scrollRef = useRef(null);

  // Simulate incoming live messages
  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(),
        }),
      );
    }, 2000);

    return () => clearInterval(i);
  }, [dispatch]);

  // Always scroll to bottom when new message arrives
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!liveMessage.trim()) return;

    dispatch(
      addMessage({
        name: "You",
        message: liveMessage.trim(),
      }),
    );
    setLiveMessage("");
  };

  return (
    <div className="flex flex-col h-[600px] border border-gray-300 rounded-xl bg-white overflow-hidden">
      {/* Header like YouTube's live chat */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
        <span className="text-sm font-semibold">Live chat</span>
        <span className="text-[11px] text-gray-500">Top chat ▾</span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-1 py-2 bg-gray-50"
      >
        {chatMessages.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-white px-3 py-2 flex items-center gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover"
            alt="You"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          />
        </div>
        <input
          className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          placeholder="Say something..."
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button
          type="submit"
          className="text-sm font-semibold text-blue-600 px-2 disabled:text-blue-300"
          disabled={!liveMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;