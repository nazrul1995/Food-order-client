import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner, TbUserShield, TbToolsKitchen2, TbUser } from 'react-icons/tb'

const Login = () => {
  const { signIn, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const handleLoginProcess = async (email, password) => {
    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      toast.error(err?.message || 'Authentication failed')
    }
  }

  const handleStandardSubmit = e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value
    handleLoginProcess(email, password)
  }

  // Quick Demo Auto-Login Trigger
  const handleDemoSelect = (role) => {
    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'admin@gmail.com' },
      chef: { email: 'rahim@gmail.com', password: 'rahim@gmail.com' },
      customer: { email: 'shakil.rezala@yahoo.com', password: 'shakil.rezala@yahoo.com' }
    }

    const target = credentials[role]
    if (target) {
      toast.loading(`Accessing platform as ${role.toUpperCase()}...`, { id: 'demo-login' })
      setTimeout(() => {
        toast.dismiss('demo-login')
        handleLoginProcess(target.email, target.password)
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative px-4 text-slate-100 overflow-hidden selection:bg-lime-400 selection:text-slate-950">
      {/* Background ambient lighting fields */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-md rounded-3xl p-8 border border-slate-850 shadow-2xl relative z-10 space-y-6">
        
        {/* Branding & Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Welcome{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
              Back
            </span>
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Access your secure kitchen artisan dashboard workspace
          </p>
        </div>

        {/* ===== DEMO AUTO-LOGIN MODULE ===== */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Quick Sandbox Auto-Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoSelect('admin')}
              className="flex flex-col items-center justify-center py-2.5 px-2 bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-xl transition group text-slate-300 cursor-pointer"
            >
              <TbUserShield className="text-base text-lime-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold tracking-tight">Admin</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoSelect('chef')}
              className="flex flex-col items-center justify-center py-2.5 px-2 bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-xl transition group text-slate-300 cursor-pointer"
            >
              <TbToolsKitchen2 className="text-base text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold tracking-tight">Chef</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleDemoSelect('customer')}
              className="flex flex-col items-center justify-center py-2.5 px-2 bg-slate-950 border border-slate-850 hover:border-slate-700 rounded-xl transition group text-slate-300 cursor-pointer"
            >
              <TbUser className="text-base text-sky-400 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold tracking-tight">Customer</span>
            </button>
          </div>
        </div>

        {/* Visual Structural Divider */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-slate-850" />
          <p className="px-3 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Or Use Credentials</p>
          <div className="flex-1 h-px bg-slate-850" />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleStandardSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-850 focus:border-slate-700 focus:outline-none text-sm text-white placeholder:text-slate-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Password</label>
              <button type="button" className="text-[11px] font-bold text-slate-500 hover:text-lime-400 transition-colors">
                Forgot?
              </button>
            </div>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-850 focus:border-slate-700 focus:outline-none text-sm text-white placeholder:text-slate-700 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 rounded-xl bg-slate-950 hover:bg-lime-400 border border-slate-850 hover:border-lime-400 text-slate-300 hover:text-slate-950 font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.99] flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin text-base" />
            ) : (
              'Authenticate Securely'
            )}
          </button>
        </form>

        {/* Footer Navigation Redirection */}
        <p className="text-center text-xs font-medium text-slate-500 pt-2 border-t border-slate-900/40">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            state={from}
            className="text-lime-400 font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login