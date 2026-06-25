import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased selection:bg-lime-500/30 selection:text-lime-200">
      {/* Fixed top-layer global navigation layout */}
      <Navbar />
      <main className="grow pt-[77px] min-h-[calc(100vh-77px)]">
        <Outlet />
      </main>
      
      {/* Footer layout baseline */}
      <Footer />
    </div>
  );
};

export default MainLayout;