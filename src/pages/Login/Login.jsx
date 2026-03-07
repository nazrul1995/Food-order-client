import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'

const Login = () => {
  const { signIn, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
      toast.success('Login Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 flex items-center justify-center relative text-white">
    
      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-lime-500/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="text-gray-400 mt-2">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-lime-400 focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-lime-500 text-black font-bold text-lg hover:bg-lime-400 transition shadow-lg"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-right mt-2">
          <button className="text-sm text-gray-400 hover:text-lime-400">
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-700"></div>
          <p className="px-3 text-sm text-gray-400">OR</p>
          <div className="flex-1 h-px bg-slate-700"></div>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            state={from}
            className="text-lime-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
