import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useRole from '../../../hooks/useRole'

const AllOrders = () => {
  const axiosSecure = useAxiosSecure()
  const [processingIds, setProcessingIds] = useState([])
  const [userData, isRoleLoading] = useRole()

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['all-orders'],
    enabled: !isRoleLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-orders`)
      return res.data
    },
  })

  // Status handler
  const handleStatusChange = async (orderId, status) => {
    const confirm = await Swal.fire({
      title: `Confirm ${status}?`,
      text: `Do you want to mark this order as ${status}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#84cc16',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, change it!',
    })

    if (!confirm.isConfirmed) return

    try {
      setProcessingIds(prev => [...prev, orderId])
      await axiosSecure.patch(`/orders/status/${orderId}`, { status })

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Order status updated to ${status}.`,
        timer: 1800,
        showConfirmButton: false,
      })
      refetch()
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong.',
      })
    } finally {
      setProcessingIds(prev => prev.filter(id => id !== orderId))
    }
  }

  // Handle access restriction gracefully
  if (isRoleLoading || isLoading) {
    return <LoadingSpinner />
  }

  if (userData?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-400">Access Denied</h2>
          <p className="text-gray-400 mt-1">You do not have permission to view this page.</p>
        </div>
      </div>
    )
  }

  // Derived Stats based on order data
  const totalOrders = orders.length
  const totalRevenue = orders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + (order.price || 0), 0)
  const pendingCount = orders.filter(order => order.orderStatus === 'pending').length
  const completedCount = orders.filter(order => order.orderStatus === 'delivered').length

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-lime-500 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500 rounded-full opacity-20 blur-3xl -z-10"></div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
          Manage Orders
        </h1>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Total Orders</p>
            <h3 className="text-3xl font-bold">{totalOrders}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold text-lime-400">${totalRevenue}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Pending Orders</p>
            <h3 className="text-3xl font-bold text-yellow-400">{pendingCount}</h3>
          </div>

          <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Delivered</p>
            <h3 className="text-3xl font-bold text-cyan-400">{completedCount}</h3>
          </div>
        </div>

        {/* Content Section */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">📦</div>
            <h2 className="text-3xl font-bold mb-2">No Orders Found</h2>
            <p className="text-gray-400">There are currently no purchases in the system.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="overflow-x-auto bg-slate-800/70 rounded-2xl border border-slate-700 shadow-xl">
                <table className="min-w-full text-sm text-left">
                  <thead className="bg-slate-900 text-gray-300 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4">Meal Details</th>
                      <th className="px-6 py-4">Customer info</th>
                      <th className="px-6 py-4">Price & Qty</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4">Order Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-700">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-slate-700/40 transition">
                        {/* Meal info & Tracking */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{order.mealName}</span>
                            <span className="text-xs text-gray-400 mt-0.5 font-mono">
                              ID: {order.trackingId}
                            </span>
                          </div>
                        </td>

                        {/* Customer Email & Address */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col max-w-xs">
                            <span className="text-gray-200 truncate">{order.customerEmail}</span>
                            <span className="text-xs text-gray-400 truncate mt-0.5">
                              {order.userAddress}
                            </span>
                          </div>
                        </td>

                        {/* Price & Quantity */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-lime-400 font-bold">${order.price}</span>
                            <span className="text-xs text-gray-400">Qty: {order.quantity || 1}</span>
                          </div>
                        </td>

                        {/* Payment Status badge */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                              : 'bg-red-950/40 text-red-400 border-red-500/30'
                          }`}>
                            {order.paymentStatus}
                          </span>
                        </td>

                        {/* Order Status badge */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                            order.orderStatus === 'pending'
                              ? 'bg-yellow-900/40 text-yellow-300 border-yellow-500/30'
                              : order.orderStatus === 'accepted'
                                ? 'bg-blue-900/40 text-blue-300 border-blue-500/30'
                                : order.orderStatus === 'delivered'
                                  ? 'bg-green-900/40 text-green-300 border-green-500/30'
                                  : 'bg-red-900/40 text-red-300 border-red-500/30'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>

                        {/* Control Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {order.orderStatus === 'pending' && (
                              <>
                                <button
                                  disabled={processingIds.includes(order._id)}
                                  onClick={() => handleStatusChange(order._id, 'accepted')}
                                  className="px-3 py-1.5 bg-lime-500/10 text-lime-400 border border-lime-500/20 rounded-lg hover:bg-lime-500 hover:text-black font-semibold text-xs transition disabled:opacity-50"
                                >
                                  Accept
                                </button>
                                <button
                                  disabled={processingIds.includes(order._id)}
                                  onClick={() => handleStatusChange(order._id, 'cancelled')}
                                  className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white font-semibold text-xs transition disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </>
                            )}

                            {order.orderStatus === 'accepted' && (
                              <button
                                disabled={processingIds.includes(order._id)}
                                onClick={() => handleStatusChange(order._id, 'delivered')}
                                className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500 hover:text-black font-semibold text-xs transition disabled:opacity-50"
                              >
                                Deliver
                              </button>
                            )}

                            {(order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') && (
                              <span className="text-gray-500 text-sm font-medium mr-4">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-6">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="bg-slate-800/70 rounded-2xl p-5 border border-slate-700 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-bold">{order.mealName}</h2>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {order.trackingId}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                      order.orderStatus === 'pending'
                        ? 'bg-yellow-900/40 text-yellow-300 border-yellow-500/30'
                        : order.orderStatus === 'accepted'
                          ? 'bg-blue-900/40 text-blue-300 border-blue-500/30'
                          : order.orderStatus === 'delivered'
                            ? 'bg-green-900/40 text-green-300 border-green-500/30'
                            : 'bg-red-900/40 text-red-300 border-red-500/30'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm border-t border-slate-700/60 pt-3">
                    <p>
                      <span className="text-gray-400">Customer:</span>{' '}
                      <span className="text-gray-200 break-all">{order.customerEmail}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">Address:</span>{' '}
                      <span className="text-gray-300">{order.userAddress}</span>
                    </p>
                    <div className="flex justify-between items-center py-1">
                      <p>
                        <span className="text-gray-400">Total:</span>{' '}
                        <span className="text-lime-400 font-bold">${order.price}</span>
                        <span className="text-xs text-gray-400 ml-1">({order.quantity}x)</span>
                      </p>
                      <p>
                        <span className={`text-xs px-2 py-0.5 rounded-md uppercase tracking-wider font-semibold border ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                            : 'bg-red-950/40 text-red-400 border-red-500/30'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Ordered: {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions Buttons */}
                  {order.orderStatus === 'pending' && (
                    <div className="flex gap-3 mt-5">
                      <button
                        disabled={processingIds.includes(order._id)}
                        onClick={() => handleStatusChange(order._id, 'accepted')}
                        className="flex-1 py-3 bg-lime-500 text-black font-semibold rounded-xl disabled:opacity-50"
                      >
                        Accept
                      </button>
                      <button
                        disabled={processingIds.includes(order._id)}
                        onClick={() => handleStatusChange(order._id, 'cancelled')}
                        className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {order.orderStatus === 'accepted' && (
                    <div className="mt-5">
                      <button
                        disabled={processingIds.includes(order._id)}
                        onClick={() => handleStatusChange(order._id, 'delivered')}
                        className="w-full py-3 bg-green-500 text-black font-semibold rounded-xl disabled:opacity-50"
                      >
                        Deliver
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllOrders