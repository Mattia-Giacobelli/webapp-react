import { NavLink } from "react-router-dom"


export default function Footer() {


    return (
        <footer className="text-light bg-dark">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand " id="always-active" to="/">MOVIES</NavLink>
                    <div className="navbar-nav">
                        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>

                    </div>

                </div>
            </nav>
        </footer>
    )
}