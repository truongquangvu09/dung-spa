import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/NavBar';
import CartPage from './pages/Cart';
import ContactPage from './pages/Contact';
import HomePage from './pages/Home/index';
import AboutPage from './pages/About/index';
import Shoppage from './pages/Shop/index';
import ServicesPage from './pages/Service';
import BookingPage from './pages/Booking';
import ProductDetail from './components/RoleCart/ProductDetail';
import NewDetail from './components/RoleCart/NewsDetail/index';
import ProductListDetail from './components/RoleCart/ProductListDetail/index';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword/index';
import ChangePassword from './pages/ChangePassword/index';
import NewsPage from './pages/News/index';
import NewsListContent from './components/MainLayoutNews/NewsList/index';
import NewsDetailContent from './components/MainLayoutNews/NewsList/NewsDetail/index';
import ViewPayCart from './components/MainLayoutShop/ViewPayCart';
import Profiles from './pages/Profiles';
import Admin from './pages/Admin/index';
import SalesManagement from './components/MainLayoutAdmin/SalesManagement/index';
import ProtectedRouter from './routers/ProtectedRouter';
import Footer from './components/Layout/Footer';
import DataTableProducts from './components/MainLayoutAdmin/ProductsManagement/index';
import DataTableUsers from './components/MainLayoutAdmin/UsersManagement/index';
import DataTableOrders from './components/MainLayoutAdmin/OrdersManagement/index';
import BookingContent from './components/Content/Booking';
function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Introduce" element={<AboutPage />} />
                    <Route path="/Shop" element={<Shoppage />}>
                        <Route path="" element={<ProductListDetail />} />
                        <Route path=":id" element={<ProductDetail />} />
                        <Route path="New_Detail" element={<NewDetail />} />
                    </Route>
                    <Route path="/Services" element={<ServicesPage />} />
                    <Route path="/Contact" element={<ContactPage />} />
                    <Route
                        path="Booking"
                        element={
                            <ProtectedRouter>
                                <BookingContent />
                            </ProtectedRouter>
                        }
                    />
                    <Route path="/Cart" element={<CartPage />} />
                    <Route
                        path="ViewPayCart"
                        element={
                            <ProtectedRouter>
                                <ViewPayCart />
                            </ProtectedRouter>
                        }
                    />
                    <Route path="/News" element={<NewsPage />}>
                        <Route path="" element={<NewsListContent />} />
                        <Route path=":id" element={<NewsDetailContent />} />
                    </Route>
                    <Route path="/UserProfile" element={<Profiles />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Sales" element={<SalesManagement />} />
                    <Route path="/Products" element={<DataTableProducts />} />
                    <Route path="/User" element={<DataTableUsers />} />
                    <Route path="/Order" element={<DataTableOrders />} />
                    <Route path="/Services" element={<ServicesPage />} />
                    <Route path="/Contact" element={<ContactPage />} />
                    <Route
                        path="Booking"
                        element={
                            <ProtectedRouter>
                                <BookingContent />
                            </ProtectedRouter>
                        }
                    />
                    <Route path="/Cart" element={<CartPage />} />
                    <Route
                        path="ViewPayCart"
                        element={
                            <ProtectedRouter>
                                <ViewPayCart />
                            </ProtectedRouter>
                        }
                    />
                    <Route path="/News" element={<NewsPage />}>
                        <Route path="" element={<NewsListContent />} />
                        <Route path=":id" element={<NewsDetailContent />} />
                    </Route>
                    <Route path="/UserProfile" element={<Profiles />} />
                    <Route path="/Admin" element={<Admin />} />
                    <Route path="/Sales" element={<SalesManagement />} />
                    {/* </Route> */}
                </Routes>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/ChangePassword" element={<ChangePassword />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
