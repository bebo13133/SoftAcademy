import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { Link } from "react-router-dom";
import { AdminSidebar } from "../AdminDashboard/AdminSideBar";
import "./adminChat.css"
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:4000"
    : window.location.host;

export const AdminChatPage = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.on("message", (data) => {
        if (selectedUser.name === data.from) {
          setMessages([...messages, data]);
        } else {
          const existUser = users.find((user) => user.name === data.from);
          if (existUser) {
            setUsers(
              users.map((user) =>
                user.name === existUser.name ? { ...user, unread: true } : user
              )
            );
          }
        }
      });

      socket.on("updateUser", (updatedUser) => {
        const existUser = users.find((user) => user.name === updatedUser.name);
        if (existUser) {
          setUsers(
            users.map((user) =>
              user.name === existUser.name ? updatedUser : user
            )
          );
        } else {
          setUsers([...users, updatedUser]);
        }
      });
      socket.on("listUsers", (updatedUsers) => {
        setUsers(updatedUsers);
      });

      socket.on("selectUser", (user) => {
        setMessages(user.messages);
      });
    } else {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        name: "Admin",
      });
    }
  }, [messages, selectedUser, socket, users]);

  const selectUser = (user) => {
    setSelectedUser(user);
    const existUser = users.find((x) => x.name === user.name);
    if (existUser) {
      setUsers(
        users.map((x) =>
          x.name === existUser.name ? { ...x, unread: false } : x
        )
      );
    }
    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, from: "Admin", to: selectedUser.name },
      ]);
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          from: "Admin",
          to: selectedUser.name,
        });
      }, 1000);
      setMessageBody("");
    }
  };
  function userStatusClass(user) {
    if (user.name === selectedUser.name) {
      return user.online ? "status-online" : "status-offline";
    } else {
      return user.unread ? "status-new" : user.online ? "status-online" : "status-offline";
    }
  }
  function userStatusText(user) {
    if (user.name === selectedUser.name) {
      return user.online ? "Online" : "Offline";
    } else {
      return user.unread ? "New" : user.online ? "Online" : "Offline";
    }
  }
  return (
    <>
      <div className="admin-dashboard">
        {/* <section className="sidebar">
       <AdminSidebar/>
        </section> */}
        {/* Други компоненти или секции могат да бъдат добавени тук */}

        <section className="render-section">

        </section>
      </div>
      <div className="chat-admin-container">
        <div className="chat-admin-sidebar">
          {users.filter((x) => x.name !== "Admin").length === 0 && (
            <div className="alert">No User Found</div>
          )}
          <ul className="user-list">
            {users
              .filter((x) => x.name !== "Admin")
              .map((user) => (
                <li
                  key={user.name}
                  onClick={() => selectUser(user)}
                  className={`user-list-item ${user.name === selectedUser.name ? "selected" : ""
                    }`}
                >
                  <span className={`status-badge ${userStatusClass(user)}`}>
                    {userStatusText(user)}
                  </span>
                  {user.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="chat-admin-content">
          <div className="chat-admin">
            {!selectedUser.length<=0 ? (
              <div className="alert">Select a user to start chat</div>
            ) : (
              <div>
                <h2>Chat with {selectedUser.name}</h2>
                <ul ref={uiMessagesRef} className="chat-messages">
                  {messages.length === 0 && <li>No message</li>}
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>{`${msg.from}: `}</strong> {msg.body}
                    </li>
                  ))}
                </ul>
                <div className="admin-message-input">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}