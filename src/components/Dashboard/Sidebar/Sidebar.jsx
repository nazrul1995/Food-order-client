import { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import logo from '../../../assets/images/local-logo.png'
import { TbLogout, TbSettings, TbMenu2, TbChartCovariate
 } from 'react-icons/tb'
import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const [userData, isRoleLoading] = useRole()
  const { logOut } = useAuth()
  const [isActive, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!isActive)
  }

  if (isRoleLoading) return <LoadingSpinner />

  return (
    <>
      {/* Small Screen Top Action Bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-20">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Platform Identity Logo" className="w-24 object-contain" />
        </Link>

        <button
          onClick={handleToggle}
          className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors focus:outline-none"
        >
          <TbMenu2 className="text-xl" />
        </button>
      </div>

      {/* Primary Drawer Panel Container */}
      <div
        className={`z-30 md:fixed flex flex-col justify-between overflow-y-auto bg-slate-900 border-r border-slate-850 w-64 h-screen px-4 py-6 fixed inset-y-0 left-0 transform ${
          isActive ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Platform Branding Viewport */}
            <div className="w-full hidden md:flex pb-6 mb-4 border-b border-slate-850 justify-center items-center">
              <Link to="/">
                <img src={logo} alt="Platform Identity Logo" className="w-32 object-contain" />
              </Link>
            </div>

            {/* Navigation Options Matrix */}
            <nav className="space-y-1.5">
              <MenuItem
                icon={TbChartCovariate}

                label="Statistics"
                address="/dashboard"
              />
              
              {userData?.role === "admin" && <AdminMenu />}
              {userData?.role === "customer" && <CustomerMenu />}
              {/* {userData?.role === "chef" && <SellerMenu />} */}
            </nav>
          </div>

          {/* Account/Utility Controls Baseline */}
          <div className="pt-6 border-t border-slate-850 space-y-1">
            <MenuItem
              icon={TbSettings}
              label="Profile Settings"
              address="/dashboard/profile"
            />
            
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-3 text-sm font-bold text-slate-400 rounded-xl hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 group cursor-pointer"
            >
              <TbLogout className="text-lg group-hover:rotate-12 transition-transform" />
              <span className="mx-3.5 tracking-wide">Logout Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Mask layer */}
      {isActive && (
        <div 
          onClick={handleToggle} 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-10 md:hidden"
        />
      )}
    </>
  )
}

export default Sidebar