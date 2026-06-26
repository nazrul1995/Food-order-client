import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TbCurrencyDollar, TbTruckDelivery, TbStar, TbHeart, TbClock2 } from 'react-icons/tb'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const CONFIG_PALETTE = ['#f59e0b', '#22c55e']

const CustomerStatistics = () => {
  const axiosSecure = useAxiosSecure()

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['customer-statistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/customer/statistics')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
          Synchronizing Personal Activity Matrix...
        </p>
      </div>
    )
  }

  // Dashboard configuration dataset
  const statisticalCards = [
    {
      title: 'Total Investment',
      value: `$${Number(stats.totalSpent || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <TbCurrencyDollar className="text-xl" />,
      accent: "text-lime-400"
    },
    {
      title: 'Awaiting Kitchen / Delivery',
      value: stats.pendingOrders || 0,
      icon: <TbClock2 className="text-xl" />,
      accent: "text-amber-400"
    },
    {
      title: 'Meals Enjoyed',
      value: stats.deliveredOrders || 0,
      icon: <TbTruckDelivery className="text-xl" />,
      accent: "text-emerald-400"
    },
    {
      title: 'Saved Favorites',
      value: stats.totalFavorites || 0,
      icon: <TbHeart className="text-xl" />,
      accent: "text-rose-400"
    },
  ]

  const chartDistributionData = [
    { name: 'Pending Pipeline', value: stats.pendingOrders || 0 },
    { name: 'Completed Shipments', value: stats.deliveredOrders || 0 },
  ]

  // Check if there is data to display in the chart
  const hasChartData = stats.pendingOrders > 0 || stats.deliveredOrders > 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden">
      {/* Geometric Ambient Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-[400px] h-[400px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Profile Identity Headline */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Activity Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Real-time breakdown of your purchases, favorite selections, and culinary fulfillment pipelines.
          </p>
        </div>

        {/* Dynamic Metric Stat Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {statisticalCards.map((card, index) => (
            <div
              key={index}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-400">{card.title}</span>
                <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800/60 ${card.accent}`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-white">{card.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recharts Pie Layout graph */}
          <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-200">Order Allocation Summary</h3>
              <p className="text-xs text-slate-500 mt-1">Proportionate breakdown of active requests vs complete processes.</p>
            </div>
            
            <div className="h-64 w-full mt-4 flex items-center justify-center">
              {hasChartData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chartDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CONFIG_PALETTE[index % CONFIG_PALETTE.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                      itemStyle={{ color: '#a3e635' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-slate-500">No processing data history found to map structural graphs.</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Contributions Card */}
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-200">Platform Engagement</h3>
              <p className="text-xs text-slate-500 mt-1">Your contribution logs and feedback interactions inside the market.</p>
            </div>

            <div className="my-auto py-6 space-y-5">
              <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                  <TbStar className="text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white">{stats.totalReviews || 0}</span>
                  <span className="block text-xs text-slate-400">Submitted Food Critiques</span>
                </div>
              </div>

              <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
                  <TbHeart className="text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white">{stats.totalFavorites || 0}</span>
                  <span className="block text-xs text-slate-400">Curated Recipe Bookmarks</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xxs font-mono text-slate-600 tracking-wider uppercase border-t border-slate-800/60 pt-4">
              LocalChefBazaar Ecosystem User Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerStatistics