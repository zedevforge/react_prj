import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AppLayout from "../components/global/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import Loading from "../components/global/Loading";


const Login = lazy(() => import("../pages/Login"));
const RecoverPassword = lazy(() => import("../pages/RecoverPassword"));
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const Users = lazy(() => import("../pages/users"));
const UserDetails = lazy(() => import("../pages/users/UserDetails"));
const Posts = lazy(() => import("../pages/Posts"));
const PostDetails = lazy(() => import("../pages/Posts/PostDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Todos = lazy(() => import("../pages/Todos"));
const Profile = lazy(() => import("../pages/profile"));


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>

          <Route path="/" element={<Navigate to="/app/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password"  element={<RecoverPassword />}/>

          <Route element={<ProtectedRoute />}>

            <Route path="/app" element={<AppLayout />} >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UserDetails />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/:id" element={<PostDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="todos" element={<Todos />} />
              <Route path="profile" element={<Profile />} />

            </Route>

          </Route>

          <Route path="*" element={<Navigate to="/app/home" replace />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;