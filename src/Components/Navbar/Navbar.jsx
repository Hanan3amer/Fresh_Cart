import React, { useContext, useState } from 'react'
import logo from '../../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Authcontext';
import { Cartcontext } from '../../Context/Cartcontext';
export default function Navbar() {
  let [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  let toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  let { userLogin, SetuserLogin } = useContext(AuthContext)
  let navigate = useNavigate()

  let { cart, RemoveCart } = useContext(Cartcontext)
  function Logout() {
    RemoveCart()
    localStorage.removeItem('userToken')
    SetuserLogin(null)
    navigate('/login')
  }
  return (
    <>
      <nav className="bg-main-light fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Freshcart-logo" />
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul className='flex flex-row lg:flex-row items-center'>
              {userLogin ? <li className=' mx-2 text-slate-600 font-normal'><i onClick={Logout} className="cursor-pointer fa-solid fa-arrow-right-from-bracket"></i></li>
                : <li className=' mx-2 text-slate-600 font-normal'><NavLink to={'signup'}><i className="fa-regular fa-user"></i></NavLink></li>}

              <li className=' mx-2 text-slate-600 font-normal'><NavLink to={'wishlist'}><i className="fa-regular fa-heart text-red-900"></i>

              </NavLink></li>
              <NavLink to={'cart'} >
                <li className='fa-solid fa-bag-shopping text-green-400 relative cursor-pointer'>
                  {userLogin && cart?.numOfCartItems > 0 ?
                    <span className=" absolute bg-green-100 text-green-800 text-xs font-medium me-2 px-1 py-0.5 -top-3.5  rounded-lg dark:bg-white dark:text-green-400 border border-green-400">
                      {cart?.numOfCartItems}</span> : ''}
                </li>
              </NavLink>
            </ul>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-green-500 dark:hover:bg-gray-200"
              aria-controls="navbar-sticky"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
          </div>
          <div  className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700">
              {userLogin ? <>
                <li className=' mx-4 text-slate-600 font-normal'><NavLink to={'/'}>Home</NavLink></li>
                <li className=' mx-4 text-slate-600 font-normal'><NavLink to={'products'}>Products</NavLink></li>
                <li className=' mx-4 text-slate-600 font-normal'><NavLink to={'brands'}>Brands</NavLink></li>
              </> : null}

            </ul>
          </div>
        </div>
        <div id="mobile-menu" className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to={'/'}
              className="block rounded-md bg-gray-100 px-3 py-2 text-base font-medium text-black"
              aria-current="page"
            >
              Home
            </NavLink>
            <NavLink
              to={'products'}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-black"
            >
              Products
            </NavLink>


            <NavLink
              to={'brands'}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-black"
            >
              Brands
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}
