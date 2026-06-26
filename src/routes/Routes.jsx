import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import { createBrowserRouter } from 'react-router'
import AddMeal from '../pages/Dashboard/Seller/AddMeal'
import MealDetails from '../pages/MealDetails/MealDetails'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import OrderForm from '../components/Form/OrderForm'
import PaymentHistory from '../pages/Payment/PaymentHistory'
import MyCreatedMeals from '../pages/Dashboard/Seller/MyCreatedMeals'
import AllMeals from '../pages/AllMeals/AllMeals'
import AllChefs from '../pages/Chefs/AllChefs'
import ChefDetails from '../pages/Chefs/ChefDetails'
import CustomerReviewDataRow from '../components/Dashboard/TableRows/CustomerReviewDataRow'
import FavoriteMeals from '../components/Dashboard/TableRows/CustomerFavoriteData'
import ManageFoods from '../pages/Dashboard/Admin/ManageFoods'
import AllOrders from '../pages/Dashboard/Admin/ManageOrders'
import ManageCustomers from '../pages/Dashboard/Admin/ManageCutomers'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/meals',
        element: <AllMeals />,
      },
      {
        path: '/meals/:id',
        element: <PrivateRoute>
          <MealDetails />
        </PrivateRoute>
      },
      {
        path: '/chefs',
        element: <AllChefs />,
      },
      {
        path: '/chef/:id',
        element: <ChefDetails />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-meal',
        element: (
          <PrivateRoute>
            <AddMeal />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-foods',
        element: (
          <PrivateRoute>
            <ManageFoods/>
          </PrivateRoute>
        ),
      },
      {
        path: '/dashboard/order-form/:id',
        element: (
          <PrivateRoute>
            <OrderForm />
          </PrivateRoute>
        ),
      },

      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-customers',
        element: (
          <PrivateRoute>
            <ManageCustomers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },

      {
        path: 'customer-review',
        element:
          <PrivateRoute>
            <CustomerReviewDataRow />
          </PrivateRoute>,
      },
      {
        path: 'customer-favorites',
        element:
          <PrivateRoute>
            <FavoriteMeals />
          </PrivateRoute>,
      },


      {
        path: 'all-orders',
        
        element:<PrivateRoute>
          <AllOrders/>
        </PrivateRoute>,
      },

    ],
  },
])
