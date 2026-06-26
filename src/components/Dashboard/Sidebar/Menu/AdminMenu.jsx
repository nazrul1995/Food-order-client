import {
  MdRestaurantMenu,
  MdAddCircle,
  MdShoppingBag,
  MdPeople,
  MdPayment,
  MdOutlineUpdate
} from 'react-icons/md'

import MenuItem from './MenuItem'


const AdminMenu = () => {

  return (
    <>
      <MenuItem
        icon={MdAddCircle}
        label="Add Food"
        address="/dashboard/add-meal"
      />

      <MenuItem
        icon={MdRestaurantMenu}
        label="Manage Foods"
        address="manage-foods"
      />

      <MenuItem
        icon={MdShoppingBag}
        label="All Orders"
        address="all-orders"
      />

      <MenuItem
        icon={MdPeople}
        label="Customers"
        address="manage-customers"
      />

    </>
  )
}

export default AdminMenu