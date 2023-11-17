import { Component } from "react";
import { Navigate } from "react-router-dom";

export default class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,

        }


    }


    static getDerivedStateFromError(error) {

        // console.log("Error boundary")
      
        return { hasError: true }
    }


    componentDidCatch(error, errorInfo) {
      
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            // return <Navigate to={'/404'} replace={true}/>            // TODO: Да се добави страница 404
        }
        return (
            <>

                {this.props.children}
            </>

        )

    }

}