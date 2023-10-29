import { Link } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ResponsiveAppBar } from "../ResponsiveAppBar";


export const Header = () => {
	const { isAuthentication } = useContext(UserContext)

	return (
		<>
			<header id="header-top" className="header-top">
				<ul>
					<li>
						<div className="header-top-left">
							<ul>
							
							
								<li className="select-opt">
									<a href="#"><span className="lnr lnr-magnifier"></span></a>
								</li>
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
								{isAuthentication && <>
									
									<li className="header-top-contact">
										<Link to={"/logout"}>logout</Link>
									</li>

							
								</>}


							</ul>
						</div>
					</li>
				</ul>

			</header>
			<section className="top-area">
				<div className="header-area">

					<nav className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

						<div className="container">

							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
									<i className="fa fa-bars"></i>
								</button>
								<a className="navbar-brand" href="/">Soft<span>academy</span></a>

							</div>



							<div className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
								<ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
									<li className=" scroll active"><Link to="/">home</Link></li>
									{/* <li className="scroll"><Link to={"/works"}>how it works</Link></li> */}
									<li className="scroll"><Link to={"/catalog"}>courses</Link></li>
									{isAuthentication && (<>
										<li className="scroll"><Link to={"/reviews"}>review</Link></li>
										<li className="scroll"><Link to={"/create"}>add course</Link></li>
										<li className="scroll"><Link to={"/blog"}>blog</Link></li>


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