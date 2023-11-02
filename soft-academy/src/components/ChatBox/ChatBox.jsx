import { useState } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ListGroup from "react-bootstrap/ListGroup"
import InputGroup from "react-bootstrap/InputGroup"


export const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false)

    const supportHandler = () => {


        setIsOpen(true)
    }

    const closeHandler = () => {

        setIsOpen(false)
    }
    return (
        <>


            <div className="chatbox">
                {!isOpen ?
                    <Button onClick={supportHandler} variant="primary">chat us</Button>
                    : (
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <strong>Support</strong>

                                    </Col>
                                    <Col>
                                        <Button
                                            className="btn-sm btn-secondary"
                                            type="button"
                                            onClick={closeHandler}>
                                            X
                                        </Button>

                                    </Col>
                                </Row>
                                <hr />
                                <ListGroup>
                                    
                                </ListGroup>
                            <ListGroup.Item>no message</ListGroup.Item>
                            <form onSubmit={submitHandler}>
                                <InputGroup className="col-6">

                                </InputGroup>
                            </form>
                            </Card.Body>
                        </Card>
                    )}
            </div>
        </>
    )

}