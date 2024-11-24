import './App.css'
import {createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import Brands from './Components/Brands/Brands'
import AuthContextprovider from './Context/Authcontext'
import Protectedroute from './Components/Protectedroute/Protectedroute'
import Forgetpassword from './Components/Forgetpassword/Forgetpassword'
import Resetcode from './Components/Resetcode/Resetcode'
import Resetpassword from './Components/Resetpassword/Resetpassword'
import Productdetails from './Components/Productdetails/Productdetails'
import Checkout from './Components/Checkout/Checkout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Cartcontextprovider from './Context/Cartcontext'
import { Toaster } from 'react-hot-toast'
import Allorders from './Components/Allorders/Allorders'
import Whishlistcontextprovider from './Context/Whishlistcontext'
import Wishlist from './Components/Wishlist/Wishlist'
function App() {
  let query = new QueryClient({
  })
  let router = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        {
          index: true, element: <Protectedroute>
            <Home />
          </Protectedroute>
        },
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <Forgetpassword /> },
        { path: 'resetcode', element: <Resetcode /> },
        { path: 'resetpassword', element: <Resetpassword /> },
        { path: 'products', element: <Protectedroute><Products /></Protectedroute> },
        { path: 'productdetails/:id/:category', element: <Protectedroute><Productdetails /></Protectedroute> },
        { path: 'brands', element: <Protectedroute> <Brands /></Protectedroute> },
        { path: 'cart', element: <Protectedroute><Cart /></Protectedroute> },
        { path: 'checkout', element: <Protectedroute><Checkout /></Protectedroute> },
        { path: 'allorders', element: <Protectedroute><Allorders /></Protectedroute> },
        { path: 'wishlist', element: <Protectedroute><Wishlist /></Protectedroute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={query}>
        <Cartcontextprovider>
          <Whishlistcontextprovider>
          <AuthContextprovider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </AuthContextprovider>
          </Whishlistcontextprovider>
        </Cartcontextprovider>
      </QueryClientProvider>
    </>
  )
}

export default App
