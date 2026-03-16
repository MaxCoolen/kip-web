import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import GrillDivider from '../components/GrillDivider'
import MenuSection from '../components/MenuSection'
import FoodGallery from '../components/FoodGallery'
import LocationSection from '../components/LocationSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="bg-soot-900 min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <GrillDivider />
      <MenuSection />
      <GrillDivider />
      <FoodGallery />
      <GrillDivider />
      <LocationSection />
      <GrillDivider />
      <ContactSection />
      <Footer />
    </div>
  )
}
