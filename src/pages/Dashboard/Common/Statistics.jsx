import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CustomerStatistics from '../../../components/Dashboard/Statistics/CustomerStatistics'
import useRole from '../../../hooks/useRole'

const Statistics = () => {
  const [userData, isRoleLoading] = useRole()
  
  if (isRoleLoading) return null

  return (
    <div>
      {userData?.role === 'admin' && <AdminStatistics />}
      {userData?.role === 'customer' && <CustomerStatistics />}
    </div>
  )
}

export default Statistics