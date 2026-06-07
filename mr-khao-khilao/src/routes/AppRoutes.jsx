import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import CustomerDashboard from '../pages/CustomerDashboard'
import AdminDashboard from '../pages/AdminDashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default AppRoutes
