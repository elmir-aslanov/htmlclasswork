import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ClientLayout = () => {
  return (
    <div className="client-layout">
      <Header />
      <main className="client-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
