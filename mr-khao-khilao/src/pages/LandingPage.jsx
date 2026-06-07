import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import AchievementCounters from '../components/landing/AchievementCounters'
import FounderStory from '../components/landing/FounderStory'
import BrandStrip from '../components/landing/BrandStrip'
import JourneyTimeline from '../components/landing/JourneyTimeline'
import SignatureDishes from '../components/landing/SignatureDishes'
import CustomerReviews from '../components/landing/CustomerReviews'
import OutletsSection from '../components/landing/OutletsSection'
import FranchiseSection from '../components/landing/FranchiseSection'
import Footer from '../components/landing/Footer'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AchievementCounters />

      {/* Founder Story — full-width storytelling section */}
      <FounderStory />

      {/* Brand values strip */}
      <BrandStrip />

      <JourneyTimeline />
      <SignatureDishes />
      <CustomerReviews />
      <OutletsSection />
      <FranchiseSection />
      <Footer />
    </div>
  )
}

export default LandingPage
