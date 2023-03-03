import { NavLink } from "react-router-dom";

const Header = ({ routes }) => {
    const className = ({isActive}) => {
        console.log(isActive);
        return isActive ? 'header-link-active' : 'header-link';
    };
    return (
        <header>
            <nav>
                {routes.map(ro => ro.name && <NavLink key={ro.path} to={ro.path} className={className}>{ro.name}</NavLink>)}
            </nav>
        </header>
    );
}

export default Header;