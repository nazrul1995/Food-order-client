import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [userData, isRoleLoading] = useRole()
  if(isRoleLoading)return null;
  return (
    <div>
     {
      userData?.role === 'admin' &&  <AdminStatistics />
     }
    </div>
  )
}

export default Statistics
