import { Link, NavLink, Route, Routes } from "react-router-dom"
import { UserContext, useAuthContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import './navBar.css'

import { ResponsiveUserBar } from "../ResponsiveUserBar";
// import { Logout } from "../Logout/Logout";

export const Header = () => {
	const { isAuthentication, } = useContext(UserContext)

    const { userEmail } = useAuthContext()


const IsAdmin = userEmail === "peter@abv.bg"
	return (
		<>
			<header id="header-top" className="header-top">

				<ul>
					<li>
						<div className="header-top-left">
							<ul>


								{/* <li className="select-opt">
									<a href="#"><span className="lnr lnr-magnifier"></span></a>
								</li> */}
								<li className="navbar-brand " style={{ fontSize: "25px", fontWeight: "bold", color: "#ff545a" }} href="/">Soft<span style={{ fontSize: "25px", textTransform: "none", color: "black" }}>Academy</span></li>
							</ul>
						</div>
					</li>
					<li className="head-responsive-right pull-right">
						<div className="header-top-right">
							<ul>

								{!isAuthentication && (<>
									<li className="header-top-contact">
										<Link to={"/login"}>sign in</Link>
									</li>
									<li className="header-top-contact">
										<Link to={"/register"}>register</Link>
									</li>



								</>)}
								{isAuthentication && 
								<li>
									{/* <strong>Welcome:</strong>   */}
								 <span style={{color:"#0486a5",margin: "2em 14px 0px 10px"}}>{userEmail}</span></li>}
								<li>
								{isAuthentication && <>
													
											<ResponsiveUserBar />
									
								</>}
								</li>

							</ul>
						</div>
					</li>
				</ul>
			

			</header>
			<section className="top-area">
				<div className="header-area">
					<nav id="myNavbar" className="myNavbar navbar navbar-default bootsnav  wrap-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

						<div className="container">

							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
									<i className="fa fa-bars"></i>
								</button>


							</div>



							<div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
								<ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
									<li className=" scroll active"><Link to={"/"}>home</Link></li>
									{/* <li className="scroll"><Link to={"/works"}>how it works</Link></li> */}
									<li className="scroll"><Link to={"/catalog"}>courses</Link></li>
									{isAuthentication && (<>
										
										<li className="scroll"><Link to={"/create"}>add course</Link></li>
										<li className="scroll"><Link to={"/blog"}>news</Link></li>
										<li className="scroll"><Link to={"/forum"}>forum</Link></li>

										{IsAdmin && <li className="scroll"><Link to={"/admin"}>admin</Link></li>}


									</>)}
									<li className="scroll"><Link to={"/contact"}>contact</Link></li>


								</ul>
								
							</div>
						</div>
					</nav>

				</div>
				<div className="clearfix"></div>
			</section>

		</>
	)
}