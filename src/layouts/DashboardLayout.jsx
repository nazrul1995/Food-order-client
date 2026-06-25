import { Outlet } from 'react-router'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-slate-950 selection:bg-lime-400 selection:text-slate-950">
      {/* Left Side: Navigation Sidebar */}
      <Sidebar />
      
      {/* Right Side: Scrollable Canvas Container */}
      <div className="flex-1 md:ml-64 min-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout