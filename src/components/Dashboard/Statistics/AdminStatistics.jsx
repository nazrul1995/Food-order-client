import { useQuery } from '@tanstack/react-query'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { TbCurrencyDollar, TbUsers, TbCircleX, TbCircleCheck } from 'react-icons/tb'
import Container from '../../Shared/Container'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const CONFIG_PALETTE = ['#a3e635', '#22c55e']

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure()

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['admin-statistics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/statistics')
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">
          Sychronizing Matrix Analytics...
        </p>
      </div>
    )
  }

  const statisticalCards = [
    {
      title: 'Gross Revenue',
      value: `$${Number(stats.totalPaymentAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <TbCurrencyDollar className="text-xl" />,
      accent: "text-emerald-400"
    },
    {
      title: 'Active Accounts',
      value: stats.totalUsers || 0,
      icon: <TbUsers className="text-xl" />,
      accent: "text-lime-400"
    },
    {
      title: 'Pending Fulfillment',
      value: stats.pendingOrders || 0,
      icon: <TbCircleX className="text-xl" />,
      accent: "text-amber-400"
    },
    {
      title: 'Successful Deliveries',
      value: stats.deliveredOrders || 0,
      icon: <TbCircleCheck className="text-xl" />,
      accent: "text-sky-400"
    },
  ]

  const dataDistributionMatrix = [
    { name: 'Pending Order Pipeline', value: stats.pendingOrders || 0 },
    { name: 'Completed Order Actions', value: stats.deliveredOrders || 0 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 relative overflow-hidden">
      {/* Geometric background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-12 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <Container>
        <div className="space-y-12">
          {/* Section Identification Title */}
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">Platform Metrics Overview</h2>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Operational Business Intelligence</p>
          </div>

          {/* ===== STAT CARDS GRID ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statisticalCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 backdrop-blur-xs rounded-2xl p-5 border border-slate-850 flex items-center justify-between transition-all duration-300 hover:border-slate-800"
              >
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 tracking-wide">{card.title}</p>
                  <h3 className="text-2xl font-black tracking-tight text-white">
                    {card.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl bg-slate-950 border border-slate-850 ${card.accent}`}>
                  {card.icon}
                </div>
              </div>
            ))}
          </div>

          {/* ===== HIGH DENSITY PIE VISUALIZER ===== */}
          <div className="bg-slate-900/20 backdrop-blur-xs border border-slate-850 rounded-2xl p-6 lg:p-8">
            <div className="border-b border-slate-900 pb-4 mb-6">
              <h3 className="text-base font-bold text-white tracking-tight">Fulfillment Performance Status Matrix</h3>
              <p className="text-slate-500 text-xs font-medium">Real-time processing distribution metrics</p>
            </div>

            <div className="w-full h-[300px] relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataDistributionMatrix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={75}
                    outerRadius={105}
                    paddingAngle={4}
                    stroke="#020617"
                    strokeWidth={4}
                  >
                    {dataDistributionMatrix.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CONFIG_PALETTE[index % CONFIG_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#f8fafc'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Micro Data Legends Layer */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-4 pt-6 border-t border-slate-900/60">
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-lime-400" />
                <p className="text-xs font-bold text-slate-400 tracking-wide">
                  Pending Volume ({stats.pendingOrders || 0})
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full bg-green-500" />
                <p className="text-xs font-bold text-slate-400 tracking-wide">
                  Delivered Actions ({stats.deliveredOrders || 0})
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AdminStatistics