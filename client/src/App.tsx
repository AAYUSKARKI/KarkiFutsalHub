import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import BookingSystem from './components/BookingSystem';
import Footer from './components/Footer';
import FloatingActionButton from './components/Floatingbutton';
import AdminDashboard from './components/ViewBooking';
import ChatAssistant from './components/Botui';
import MembershipRewards from './components/MembershipRewards';
import Pricing from './components/Pricing';
import Testimonials from './components/Testinomials';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <MembershipRewards />
      <Testimonials/>
      <BookingSystem />
      <AdminDashboard/>
      <ChatAssistant/>
      <Footer />
      {/* <FloatingActionButton /> */}
    </div>
  );
}

export default App;