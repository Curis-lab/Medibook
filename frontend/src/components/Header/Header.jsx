import React, {useRef, useEffect, useContext} from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import {BiMenu} from 'react-icons/bi';
import { authContext }  from "../../context/AuthContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

function Header() {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const {user, role, token} = useContext(authContext);

  const handleStickyHeader = ()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header');
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }
  useEffect(()=>{
    handleStickyHeader();
    return ()=> window.removeEventListener('scroll', handleStickyHeader);
  },[]);

  const toggleMenu = ()=>{
    menuRef.current.classList.toggle('show__menu');
  }
  return (
    <header className="h-[100px] leading-[100px] flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/**============ logo ============= */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="w-[30px] h-[30px] object-cover"
            />
            <h1 className="font-bold">MediBook</h1>
          </div>
          {/**============ menu ============= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primary text-[16px] leading-7 font-[600]"
                        : "text-black text-[16px] leading-7 font-[500] hover:text-primary"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/**============ nav right ============= */}
          <div className="flex items-center gap-4">
            {
              token && user ? <>
              <Link to={`${role === 'doctor' ? '/doctors/profile/me':"/users/profile/me"}`}>
            <div className="flex items-center gap-2">

              <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
              <img src={user?.photo} className="w-full h-full object-cover rounded-full" alt="user profile" />
              </figure>
              <h2>{user?.name}</h2>
            </div>
              </Link>
            </>:<Link to="/login">
              <button className="bg-primary py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Login
              </button>
            </Link>
            }
            
            
            <span className="md:hidden" onClick={toggleMenu} >
              <BiMenu className="w-6 h-6 cursor-pointer"/>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
