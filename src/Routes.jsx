import React from 'react'
import { Route, Switch } from 'react-router-dom'
import path from './constants/path'
import MainLayout from 'src/layouts/MainLayout'
import Home from './pages/Home'
import RegisterLayout from './layouts/RegisterLayout'
import Register from './pages/Auth/Register'
import NotFound from './pages/NotFound'
import Login from './pages/Auth/Login'
import Authenticated from './guards/Authenticated'
import User from './pages/User'
import UnAuthenticated from './guards/UnAuthenticated'
import ProductDetail from './pages/ProductDetail'
import CartLayout from './layouts/CartLayout'
import Cart from './pages/Cart'
export default function routes() {
  return (
    <Switch>
      <Route exact path={path.home}>
        <MainLayout>
          <Home />
        </MainLayout>
      </Route>
      <Route exact path={path.productDetail}>
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      </Route>
      <Route path={path.register}>
        <Authenticated>
          <RegisterLayout title="Đăng ký">
            <Register />
          </RegisterLayout>
        </Authenticated>
      </Route>
      <Route path={path.login}>
        <Authenticated>
          <RegisterLayout title="Đăng nhập">
            <Login />
          </RegisterLayout>
        </Authenticated>
      </Route>
      <Route path={path.user}>
        <UnAuthenticated>
          <MainLayout>
            <User />
          </MainLayout>
        </UnAuthenticated>
      </Route>
      <Route path={path.cart}>
        <UnAuthenticated>
          <CartLayout>
            <Cart />
          </CartLayout>
        </UnAuthenticated>
      </Route>
      <Route path={path.notFound}>
        <NotFound />
      </Route>
    </Switch>
  )
}
