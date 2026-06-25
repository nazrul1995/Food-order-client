import {
  BsFingerprint
} from 'react-icons/bs'

import {
  HistoryIcon,
  HeartIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  UserIcon
} from 'lucide-react'

import MenuItem from './MenuItem'


const CustomerMenu = () => {

  return (
    <>
      {/* Customer Orders */}
      <MenuItem
        icon={ShoppingBagIcon}
        label="My Orders"
        address="my-orders"
      />

      {/* Payment History */}
      <MenuItem
        icon={CreditCardIcon}
        label="Payment History"
        address="payment-history"
      />

      {/* Favourite Foods */}
      <MenuItem
        icon={HeartIcon}
        label="My Favorites"
        address="customer-favorites"
      />

      {/* Reviews */}
      <MenuItem
        icon={BsFingerprint}
        label="My Reviews"
        address="customer-review"
      />

    </>
  )
}

export default CustomerMenu