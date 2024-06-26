import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoLight } from "../img/logo_light.svg";

class Header extends React.Component {

    state = {
        isDropdownOpen: false
    };

    handleDropdownToggle = () => {
        this.setState(prevState => ({
            isDropdownOpen: !prevState.isDropdownOpen
        }));
    };

    render() {
        const { isDropdownOpen } = this.state;

        return (
            <header className="header">
                <LogoLight className="header__logo" />
                <div className="header__content">
                    <nav className="header__content__nav">
                        <NavLink to="/" activeClassName="active" className="header__content__nav__a">Главная</NavLink>
                        <NavLink to="/tumen" activeClassName="active" className="header__content__nav__a">Тюмень</NavLink>
                        <NavLink to="/ekb" activeClassName="active" className="header__content__nav__a">Екатеринбург</NavLink>
                    </nav>
                    <div
                        onClick={this.handleDropdownToggle}
                        className={`header__content__nav__dropdown ${isDropdownOpen ? 'active' : ''}`}
                    >
                        <div className="header__content__burger">
                            ☰
                        </div>
                        <div className="header__content__nav__dropdown-content">
                            <NavLink to="/" activeClassName="active" className="header__content__nav__dropdown-content__a" onClick={this.handleDropdownToggle}>Главная</NavLink>
                            <NavLink to="/tumen" activeClassName="active" className="header__content__nav__dropdown-content__a" onClick={this.handleDropdownToggle}>Тюмень</NavLink>
                            <NavLink to="/ekb" activeClassName="active" className="header__content__nav__dropdown-content__a" onClick={this.handleDropdownToggle}>Екатеринбург</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
};

export default Header;


















