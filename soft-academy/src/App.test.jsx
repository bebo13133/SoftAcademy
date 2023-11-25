import { render, screen } from "@testing-library/react"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
describe("Jest",()=>{
    it("should have  headline", ()=>{
        render(
       <BrowserRouter>
        <App/>
        </BrowserRouter>
        )
        expect(screen.getByText("Soft")).toBeInTheDocument()
    })


})