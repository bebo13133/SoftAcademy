import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";


const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

const ChatBox = () => {
  const uiMessagesRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([
    { from: "System", body: "Hello there, Please ask your question." },
  ]);

  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    }



    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", { name: userName });
      socket.on("message", (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [messages, socket, userName]);

  const supportHandler = () => {
    setIsOpen(true);
    if (!userName) {
      const enteredName = prompt("Please enter your name");
      localStorage.setItem("userName", enteredName); // Запазваm името в localStorage
      setUserName(enteredName);
    }

    // if (!userName) {
    //   setUserName(prompt("Please enter your name"));
    // }
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: userName, to: "Admin" },
      ]);
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: userName,
          to: "Admin",
        });
      }, 1000);
      setMessageBody("");
    }
  };

  return (
    <div className="chatbox1">
      {!isOpen ? (
        <button onClick={supportHandler} className="open-chat-button">
          Chat with us
        </button>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <strong>Support</strong>
            <button className="close-chat-button" onClick={closeHandler}>
              x
            </button>
          </div>
          <hr />
          <div className="chat-messages" ref={uiMessagesRef}>
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                <strong>{`${msg.from}: `}</strong> {msg.body}
              </div>
            ))}
          </div>
          <form onSubmit={submitHandler}>
            <input
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              type="text"
              placeholder="Type a message"
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default ChatBox