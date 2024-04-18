// App.js
import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Router/Private";
import AdminRoute from "./components/Router/AdminRoute";
import StaffRoute from "./components/Router/StaffRoute"
import Userdashboard from "./pages/user/Userdashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import AdminRegistration from "./pages/Admin/AdminRegistration";
import CreatesubCategory from "./pages/Admin/CreatesubCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Categoryimage from "./pages/Admin/Categoryimage";
import CreateCategoryDesign from "./pages/Admin/CreateDesignCategory";
import CreateDesignSubcategory from "./pages/Admin/CreateDesignSubcategory";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Updatestaffprofile from "./pages/Staff/Updatestaffprofile";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import ChatComponent from "./pages/DesignIdeas/chat";
import UserImagesPage from "./pages/Staff/viewmore";

//design
import Exploredesigns from "./pages/Exploredesigns";
import CreateDesignbystaff from "./pages/Staff/CreateDesigns";
import Designs from "./pages/Admin/Designs";
import DesignPage from "./pages/DesignIdeas/designideas";
import DesignDetailPage from "./pages/DesignIdeas/designdetails";
import Bookdesigns from "./pages/DesignIdeas/bookdesigns";

//staff
import StaffLogin from "./pages/Auth/LoginStaff";
import StaffHome from "./pages/Staff/staffDashboard";
import OTPInput from "./pages/Auth/OTPInput";
import ResetPassword from "./pages/Auth/ResetPassword";
import Recovered from "./pages/Auth/Recovered";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import WishlistPage from "./pages/WishlistPage";
import Registerstaff from "./pages/Admin/RegisterStaff";
import AppointmentForm from "./pages/Staff/Addappoinments";
import ExpertiseList from "./pages/DesignIdeas/selectexperts";
import SiteManager from "./pages/DesignIdeas/sitedetails";
import SiteDetails from "./pages/user/Siteimage";

const RecoveryContext = createContext();

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();
  function NavigateComponents() {
    return <Recovered />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}>
      <div className="flex justify-center items-center">
        <Routes>
          <Route path="/" element={<HomePage />} />


          {/*user route*/}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="Userdashboard" element={<Userdashboard />} />
            <Route path="Orders" element={<Orders />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="site-details" element={<SiteDetails />} />
          </Route>


          <Route element={<PrivateRoute />}>
          <Route path="/selectexperts" element={<ExpertiseList />} />
          <Route path="/chat" element={<ChatComponent />} />
          <Route path="/sitedetails" element={<SiteManager />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>


           {/*admin route*/}
          <Route path="/Dashboard" element={<AdminRoute />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="AdminDashboard" element={<AdminDashboard />} />
            <Route path="AdminDashboard/adminregister"element={<AdminRegistration />}/>
            <Route path="AdminDashboard/adminregister/staff" element={<Registerstaff />}/>
            <Route path="AdminDashboard/create-category" element={<CreateCategory />}/>
            <Route path="AdminDashboard/create-subcategory" element={<CreatesubCategory />}/>
            <Route path="AdminDashboard/products" element={<Products />} />
            <Route path="AdminDashboard/designs" element={<Designs />} />
            <Route path="AdminDashboard/create-product"element={<CreateProduct />}/>
            <Route path="AdminDashboard/designimages"element={<Categoryimage />}/>
            <Route path="AdminDashboard/create-categorydesign" element={<CreateCategoryDesign />}/>
            <Route path="AdminDashboard/create-subcategorydesign" element={<CreateDesignSubcategory />} />
            <Route path="AdminDashboard/users" element={<Users />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

  
          <Route path="/" element={<StaffRoute />}>
          <Route path="staff-dashboard" element={<StaffHome />} />
          <Route path="staff-dashboard/create-designs"element={<CreateDesignbystaff />}/>
          <Route path="userdetails-staff" element={<userStaff />} />
          <Route path="staffprofileup" element={<Updatestaffprofile />} />
          <Route path="Login-staff" element={<StaffLogin />} />
          <Route path="add-appoinments" element={<AppointmentForm />} />
          <Route path="staff-dashboard/create-designs" element={<CreateDesignbystaff />}/>
          </Route>
          
          <Route path="/user/:userId/images" element={<UserImagesPage/>} />

          <Route path="/subcategory-designs/:categoryId" element={<DesignPage />}/>
          <Route path="/designs" element={<DesignPage />} />
          <Route path="/designs/:categoryId" element={<DesignPage />} />
          <Route path="/design-details/:designSlug" element={<DesignDetailPage />}/>
          <Route path="/slot-details" element={<Bookdesigns />} />
          <Route path="/wishlist" element={<WishlistPage />} />
       
          <Route path="/search" element={<Search />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/searchInput" element={<searchInput />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Explore-Designs" element={<Exploredesigns />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/otpinput" element={<OTPInput />} />
          <Route path="/recovered" element={<Recovered />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/*" element={<PageNotFound />} />
       
       
        </Routes>
      </div>
      <Toaster />
    </RecoveryContext.Provider>
  );
}

export default App;

export { RecoveryContext };
