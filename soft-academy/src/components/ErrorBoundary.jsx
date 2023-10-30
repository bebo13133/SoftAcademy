import { Component } from "react";

export default class ErrorBoundary extends Component {

constructor(props) {
    super(props);
this.state = {
hasError: false,

}


}


static getDerivedStateFromError(error){

console.log("eorro boundary")
console.log("eorro boundary", error)
return {hasError: true}
}


componentDidCatch (error,errorInfo){
console.log(errorInfo)

}

    render() {
if(this.state.hasError){
    return <h1>404</h1>             // TODO: Да се добави страница 404
}
        return (
            <>
            
            {this.props.children}
            </>

        )

    }

}