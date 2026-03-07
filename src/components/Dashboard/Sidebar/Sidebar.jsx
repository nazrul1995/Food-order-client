import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/local-logo.png'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'

// User Menu
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import SellerMenu from './Menu/SellerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {

  const [userData, isRoleLoading] = useRole()

  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  if(isRoleLoading) return <LoadingSpinner/>


  return (
    <>
      {/* Small Screen Navbar (visible below md) */}
<div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-lime-500/20 text-white">

  {/* Logo */}
  <Link to="/" className="flex items-center gap-2">
    <img
      src={logo}
      alt="logo"
      className="w-28 object-contain"
    />
  </Link>

  {/* Menu Button */}
  <button
    onClick={handleToggle}
    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition focus:outline-none"
  >
    <AiOutlineBars className="h-6 w-6 text-lime-400" />
  </button>
</div>


      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-linear-to-b from-slate-900 to-slate-800 text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div className='flex flex-col h-full'>
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className='w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center mx-auto'>
              <Link to='/'>
                <img src={logo} alt='logo' width='100' height='100' />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/*  Menu Items */}
            <nav>
              {/* Common Menu */}
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              {/* Role-Based Menu */}
              {
                userData.role === "admin" && <AdminMenu />
              }
              {
                userData.role === "customer" && <CustomerMenu />
              }
              {
                userData.role === "chef" && <SellerMenu />
              }
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr />

            <MenuItem
              icon={FcSettings}
              label='Profile'
              address='/dashboard/profile'
            />
            <button
              onClick={logOut}
              className='flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <GrLogout className='w-5 h-5' />

              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
