import { NavLink } from "react-router-dom";

export default function Header() {


    return (

        <header>
            <nav className="navbar navbar-expand-sm navbar-light header-bcg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand " id="always-active" to="/">MOVIES</NavLink>
                    <div className="navbar-nav">
                        <NavLink className="nav-link" aria-current="page" to="/" >Home</NavLink>

                    </div>

                </div>
            </nav>
        </header>
    )
}