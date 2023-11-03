import socketIOClient from "socket.io-client"

import { useEffect, useRef, useState } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"


const ENDPOINT =
    window.location.host.indexOf('localhost') >= 0
        ? "http://127.0.0.1:4000"
        : window.location.host
export const ChatBox = () => {
    const uiMessageRef = useRef(null)
    const [userName, setUsername] = useState("")
    const [messages, setMessages] = useState([
        { from: "System", body: "Hello there, Please ask your question" }
    ])
    const [socket, setSocket] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [messageBody, setMessageBody] = useState("")

    useEffect(() => {
        if (uiMessageRef.current) {
            uiMessageRef.current.scrollBy({
                top: uiMessageRef.current.scrollHeight,
                left: 0,
                behavior: "smooth",
            })
        }
        if (socket) {
            socket.emit("onLogin", { name: userName })
            socket.on("message", (data) => {
                console.log(messages)
                setMessages([...messages, data])
            })
        }
    }, [messages, userName, socket])


    const supportHandler = () => {
        setIsOpen(true)
        if (!userName) {
            setUsername(prompt("Please enter your name"))
        }
        const sk = socketIOClient(ENDPOINT)
        setSocket(sk)
    }

    const closeHandler = () => {

        setIsOpen(false)
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (!messageBody.trim()) {
            alert("Error.Please enter a message")
        } else {
            setMessages([
                ...messages,
                { body: messageBody, from: userName, to: "Admin" },
            ]);
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    from: userName,
                    to: "Admin"
                })

            }, 1000)
            setMessages("")
        }
    }
    return (



        <div className="chatbox1">
            {!isOpen ?
                <Button onClick={supportHandler} variant="primary">chat us</Button>
                : (
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <strong>Support</strong>
                                </Col>
                                <Col className="text-end1">
                                    <Button
                                        className="btn-sm btn-secondary"
                                        type="button"
                                        onClick={closeHandler}>
                                        X
                                    </Button>

                                </Col>
                            </Row>
                            <hr />
                            <ListGroup ref={uiMessageRef}>
                                {messages.map((msg, index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{`${msg.from}: `}</strong>{msg.body}

                                    </ListGroup.Item>

                                ))}


                            </ListGroup >
                            <form onSubmit={submitHandler}>
                                <InputGroup className="col-6">
                                    <FormControl value={messageBody}
                                        onChange={(e) => setMessageBody(e.target.value)}
                                        type="text"
                                        placeholder="type message"
                                    ></FormControl>
                                    <Button type="submit" variant="primary">
                                        Send
                                    </Button>
                                </InputGroup>
                            </form>
                        </Card.Body>
                    </Card>
                )}
        </div>

    )

}