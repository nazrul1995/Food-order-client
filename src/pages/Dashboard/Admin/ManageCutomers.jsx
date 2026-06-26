import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const ManageCustomers = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [updatingId, setUpdatingId] = useState(null)

  // Fetch all users/customers from the API
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['manage-customers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    },
  })

  // Filter out to only evaluate customers if your API returns all roles mixed together
  const customers = users.filter(user => user.role === 'customer')

  // Status Change Mutation (Toggle Active / Blocked)
  const { mutateAsync: toggleUserStatus } = useMutation({
    mutationFn: async ({ userId, currentStatus }) => {
      const nextStatus = currentStatus === 'active' ? 'blocked' : 'active'
      const res = await axiosSecure.patch(`/users/status/${userId}`, { status: nextStatus })
      return res.data
    },
    onSuccess: (_, variables) => {
      const changedTo = variables.currentStatus === 'active' ? 'Blocked' : 'Activated'
      Swal.fire({
        icon: 'success',
        title: `${changedTo}!`,
        text: `Customer account is now ${changedTo.toLowerCase()}.`,
        timer: 1800,
        showConfirmButton: false,
      })
      queryClient.invalidateQueries({
        queryKey: ['manage-customers'],
      })
    },
    onError: (err) => {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Action Failed',
        text: 'Something went wrong while modifying customer profile status.',
      })
    },
    onSettled: () => setUpdatingId(null)
  })

  const handleStatusToggle = async (userId, currentStatus) => {
    const actionText = currentStatus === 'active' ? 'Block' : 'Activate'

    const result = await Swal.fire({
      title: `${actionText} Customer?`,
      text: `Are you sure you want to change this customer's status to ${actionText.toLowerCase()}ed?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: actionText === 'Block' ? '#ef4444' : '#84cc16',
      cancelButtonColor: '#475569',
      confirmButtonText: `Yes, ${actionText}`,
    })

    if (!result.isConfirmed) return

    setUpdatingId(userId)
    await toggleUserStatus({ userId, currentStatus })
  }

  if (isLoading) return <LoadingSpinner />

  // Metrics calculations
  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === 'active').length
  const blockedCustomers = customers.filter(c => c.status === 'blocked').length

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-lime-500 rounded-full opacity-20 blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
          Manage Customers
        </h1>

        {/* Operational Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-lg">
            <p className="text-gray-400 text-sm font-medium">Total Registered Customers</p>
            <h3 className="text-3xl font-bold mt-1 text-white">{totalCustomers}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-lg">
            <p className="text-gray-400 text-sm font-medium">Active Customer Hubs</p>
            <h3 className="text-3xl font-bold mt-1 text-lime-400">{activeCustomers}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-lg">
            <p className="text-gray-400 text-sm font-medium">Suspended Accounts</p>
            <h3 className="text-3xl font-bold mt-1 text-red-400">{blockedCustomers}</h3>
          </div>
        </div>

        {/* Empty State Exception */}
        {customers.length === 0 ? (
          <div className="text-center py-20 bg-slate-800/40 border border-slate-700 rounded-2xl">
            <div className="text-7xl mb-4">👥</div>
            <h2 className="text-3xl font-bold mb-2">No Customers Registered</h2>
            <p className="text-gray-400">Customer account listings will display here once users complete registration profiles.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto bg-slate-800/70 rounded-2xl border border-slate-700 shadow-xl">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-900 text-gray-300 uppercase text-xs tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Contact & Location</th>
                      <th className="px-6 py-4">Registered Date</th>
                      <th className="px-6 py-4">System Access</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700">
                    {customers.map((customer) => {
                      const customerId = customer._id?.$oid || customer._id
                      const registrationDate = customer.createdAt?.$date || customer.createdAt

                      return (
                        <tr key={customerId} className="hover:bg-slate-700/40 transition">
                          {/* Image & Identity */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={customer.image || 'https://i.ibb.co/6W176w9/user-placeholder.png'}
                                alt={customer.name}
                                className="w-12 h-12 rounded-full object-cover border border-slate-600 shadow-sm"
                              />
                              <span className="font-semibold text-gray-100 text-base">
                                {customer.name}
                              </span>
                            </div>
                          </td>

                          {/* Email & Delivery Location */}
                          <td className="px-6 py-4">
                            <div className="flex flex-col max-w-xs">
                              <span className="text-gray-300 font-medium truncate">{customer.email}</span>
                              <span className="text-xs text-gray-400 truncate mt-0.5">
                                {customer.address || 'No registered location address'}
                              </span>
                            </div>
                          </td>

                          {/* Date Created */}
                          <td className="px-6 py-4 text-gray-300">
                            {registrationDate ? new Date(registrationDate).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : '—'}
                          </td>

                          {/* Status Badge */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${customer.status === 'active'
                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                                : 'bg-red-950/40 text-red-400 border-red-500/30'
                              }`}>
                              {customer.status || 'active'}
                            </span>
                          </td>

                          {/* Account Interventions */}
                          <td className="px-6 py-4 text-right">
                            <button
                              disabled={updatingId === customerId}
                              onClick={() => handleStatusToggle(customerId, customer.status || 'active')}
                              className={`px-4 py-2 text-xs font-bold uppercase rounded-lg border tracking-wider transition disabled:opacity-50 ${customer.status === 'blocked'
                                  ? 'bg-lime-500/10 text-lime-400 border-lime-500/20 hover:bg-lime-500 hover:text-black'
                                  : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
                                }`}
                            >
                              {updatingId === customerId ? 'Loading...' : customer.status === 'blocked' ? 'Unblock' : 'Block Customer'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards Breakdown */}
            <div className="block md:hidden space-y-6">
              {customers.map((customer) => {
                const customerId = customer._id?.$oid || customer._id
                const registrationDate = customer.createdAt?.$date || customer.createdAt

                return (
                  <div
                    key={customerId}
                    className="bg-slate-800/70 rounded-2xl p-5 border border-slate-700 shadow-lg flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={customer.image || 'https://i.ibb.co/6W176w9/user-placeholder.png'}
                        alt={customer.name}
                        className="w-14 h-14 rounded-full object-cover border border-slate-600"
                      />
                      <div>
                        <h2 className="text-xl font-bold text-gray-100">{customer.name}</h2>
                        <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-xxs font-bold uppercase tracking-wider border ${customer.status === 'active'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-950/40 text-red-400 border-red-500/30'
                          }`}>
                          {customer.status || 'active'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm border-t border-slate-700/60 pt-3 text-gray-300">
                      <p>
                        <span className="text-gray-400 font-medium">Email:</span>{' '}
                        <span className="break-all font-mono">{customer.email}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 font-medium">Address:</span>{' '}
                        <span>{customer.address || 'No registered location address'}</span>
                      </p>
                      <p>
                        <span className="text-gray-400 font-medium">Joined:</span>{' '}
                        <span>{registrationDate ? new Date(registrationDate).toLocaleDateString() : '—'}</span>
                      </p>
                    </div>

                    <div className="mt-5">
                      <button
                        disabled={updatingId === customerId}
                        onClick={() => handleStatusToggle(customerId, customer.status || 'active')}
                        className={`w-full py-3 font-bold uppercase text-xs tracking-wider rounded-xl transition disabled:opacity-50 ${customer.status === 'blocked'
                            ? 'bg-lime-500 text-black hover:bg-lime-400'
                            : 'bg-red-600 text-white hover:bg-red-500'
                          }`}
                      >
                        {updatingId === customerId ? 'Processing operation...' : customer.status === 'blocked' ? 'Unblock Profile Access' : 'Restrict Customer Access'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ManageCustomers