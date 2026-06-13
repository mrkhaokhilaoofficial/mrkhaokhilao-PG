import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import CustomerDashboard from '../pages/CustomerDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import SubmitReview from '../pages/SubmitReview'
import ApplyFranchise from '../pages/ApplyFranchise'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer" element={<CustomerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/reviews/new" element={<SubmitReview />} />
      <Route path="/franchise/apply" element={<ApplyFranchise />} />
    </Routes>
  )
}

export default AppRoutes

