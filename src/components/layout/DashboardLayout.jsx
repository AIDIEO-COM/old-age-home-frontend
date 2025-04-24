import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '@/store/slices/authSlice';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';

const DashboardLayout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery('(min-width: 767px)');
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isDesktop={isDesktop} />
      <main className="flex-1 md:ml-0 overflow-x-hidden pl-12 md:pl-5 overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;