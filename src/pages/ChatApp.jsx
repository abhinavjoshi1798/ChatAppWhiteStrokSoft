import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getTimeAgo,
  handleGetThreadMessages,
  handleGetThreadsData,
  handleNewMessage,
} from "../utils/chatAppUtils";
import { EventSourcePolyfill } from "event-source-polyfill";
import { CHAT_EVENT_STREAM_URL } from "../constants/chatEventStreamConstants";
import { CgProfile } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa";
import { Navbar } from "../components/Navbar";

export default function ChatApp() {
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [threadDetails, setThreadDetails] = useState({});
  const [newMessage, setNewMessage] = useState("");

  const eventSourceRef = useRef(null);

  const { token, user } = useContext(AuthContext);
  console.log(token)
  
  useEffect(() => {
    if (token) {
      handleGetThreadsData({ token, setThreads, setSelectedThread });
    }
  }, [token]);

  useEffect(() => {
    if (selectedThread) {
      handleGetThreadMessages({
        threadId: selectedThread?.id,
        token,
        setMessages,
        setThreadDetails,
      });
    }
  }, [selectedThread, token]);

  useEffect(() => {
    if (!token) return;

    const es = new EventSourcePolyfill(CHAT_EVENT_STREAM_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "text/event-stream",
      },
    });

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.eventType === "message" && data.message) {
          const msg = data.message;

          if (msg.threadId === selectedThread?.id) {
            setMessages((prev) => [msg, ...prev]);
          }

          setThreads((prev) =>
            prev.map((t) =>
              t.id === msg.threadId
                ? {
                    ...t,
                    lastMessage: {
                      lastMessage: msg.message,
                      lastCreatedAt: msg.createdAt,
                    },
                  }
                : t
            )
          );
        }
      } catch (err) {
        console.error("Failed to parse SSE message:", err);
      }
    };

    es.onerror = (err) => {
      console.error("SSE connection error:", err);
      es.close();
    };

    eventSourceRef.current = es;

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [token, selectedThread]);

  // console.log("threads", threads);
  // console.log("messages", messages);
  // console.log("threadDetails", threadDetails);

  return (
    <div className="w-full min-h-screen bg-transparent text-white flex flex-col justify-center items-center">
      <Navbar user={user} />
      <div
        className="w-[80%] border border-solid border-gray-400 
      bg-[#0B0B1A] shadow-xl
      rounded-xl flex min-h-[80vh] max-h-[80vh] overflow-hidden"
      >
        <div
          className={`${
            selectedThread ? "hidden md:flex" : "flex"
          } flex-col w-full md:w-[350px] border border-solid border-white-200 rounded-xl min-h-[80vh]`}
        >
          <div className="p-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent border border-gray-600 rounded-full px-4 py-2 focus:outline-none"
              disabled
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {threads?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  console.log("item", item);
                  setSelectedThread(item);
                }}
                className= {`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-800 transition-colors
    ${selectedThread?.id === item.id ? "bg-[#151528]" : "hover:bg-[#151528]"}`}
              >
                <img
                  src={item.user.profileImageUri}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.user.name}</h3>

                  <p className="text-gray-400 text-sm truncate">
                    {item?.lastMessage?.lastMessage}
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-xs truncate">
                      Job: {item?.jobs?.jobTitle}
                    </p>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {getTimeAgo(item?.lastMessage?.lastCreatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`${
            selectedThread ? "flex" : "hidden md:flex"
          } flex-1 flex-col min-w-0`}
        >
          {selectedThread ? (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setSelectedThread(null)}
                    className="md:hidden text-xl hover:cursor-pointer flex-shrink-0"
                  >
                    <FaArrowLeft />
                  </button>

                  {threadDetails?.user?.profileImageUri ? (
                    <img
                      src={threadDetails?.user?.profileImageUri}
                      alt="avatar"
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                  ) : (
                    <CgProfile className="w-10 h-10 rounded-full flex-shrink-0" />
                  )}

                  <div className="min-w-0">
                    <h2 className="font-semibold truncate">
                      {threadDetails?.user?.name}
                    </h2>
                  </div>
                </div>
                <button
                  className="bg-green-500 px-4 py-2 rounded-full text-white font-semibold flex-shrink-0 text-sm
                hover:cursor-pointer hover:bg-white hover:text-green-500"
                >
                  Assign job
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col-reverse space-y-4 space-y-reverse">
                {messages?.map((m, i) => {
                  const isMe = m.userId == user.id;
                  const time = getTimeAgo(m.createdAt);

                  if (m.messageType === "CI") {
                    return (
                      <div
                        key={i}
                        className="flex justify-center text-gray-400 text-sm px-2"
                      >
                        <div className="text-center">{m.message}</div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      } px-2`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg max-w-[85%] md:max-w-[70%] ${
                          isMe
                            ? "bg-[#8B5CF6] text-white"
                            : "bg-[#2A2A3D] text-white"
                        } shadow-md`}
                      >
                        <div className="break-words">{m.message}</div>
                        <div className="text-[11px] text-gray-300 mt-1 text-right">
                          {time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 py-3 border-t border-gray-800 flex-shrink-0">
                <div
                  className="flex items-center bg-[#0B0B1A] rounded-full px-4 border-2 border-transparent 
                [background:linear-gradient(#0B0B1A,#0B0B1A)_padding-box,linear-gradient(90deg,#ec4899,#8b5cf6,#06b6d4)_border-box]"
                >
                  <input
                    type="text"
                    placeholder="Write something.."
                    className="flex-1 bg-transparent py-2 focus:outline-none min-w-0"
                    name="newMessage"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newMessage.trim()) {
                        e.preventDefault();
                        handleNewMessage({
                          token,
                          newMessage,
                          threadId: selectedThread?.id,
                          setNewMessage,
                        });
                      }
                    }}
                  />
                  <button
                    className="text-xl hover:cursor-pointer rounded-full bg-gray-200 p-2 flex justify-center items-center ml-2 flex-shrink-0 hover:bg-white transition"
                    onClick={() =>
                      handleNewMessage({
                        token,
                        newMessage,
                        threadId: selectedThread?.id,
                        setNewMessage,
                      })
                    }
                  >
                    <span className="text-black">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6942 5.31219L6.92469 10.1327L1.50002 6.73973C0.72278 6.25345 0.884459 5.07286 1.76359 4.81577L14.6432 1.04397C15.4482 0.808024 16.1943 1.56069 15.9551 2.36833L12.1447 15.239C11.8837 16.1193 10.7098 16.2766 10.2282 15.496L6.92216 10.1335"
                          stroke="#010314"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
