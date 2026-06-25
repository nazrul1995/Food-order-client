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
        icon={MdOutlineUpdate}
        label="Update Order Status"
        address="update-order-status"
      />

      <MenuItem
        icon={MdPeople}
        label="Customers"
        address="customers"
      />

      <MenuItem
        icon={MdPayment}
        label="Payment Status"
        address="payment-status"
      />

    </>
  )
}

export default AdminMenu