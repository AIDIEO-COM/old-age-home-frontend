import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { logout } from '@/store/slices/authSlice';
import { cn } from '@/lib/utils';
import { FaBed, FaShower, FaBath, FaWheelchair, FaBug, FaFirstAid, FaSortAmountUp, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaTimes, FaBars } from 'react-icons/fa';

const Sidebar = ({ isDesktop }) => {
  console.log(isDesktop);
  const [collapsed, setCollapsed] = useState(isDesktop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const weeklyItems = [
    // {
    //   name: 'Dashboard',
    //   path: '/',
    //   icon: FaTachometerAlt,
    // },
    {
      name: 'Rooms Check',
      path: '/rooms',
      icon: FaBed,
    },
    {
      name: 'Shower Check',
      path: '/shower',
      icon: FaShower,
    },
    {
      name: 'Bath Hoist Check',
      path: '/bath-hoist',
      icon: FaBath,
    },
    // {
    //   name: 'Temperature Check',
    //   path: '/temperature',
    //   icon: FaTemperatureLow,
    // },
    {
      name: 'Wheelchair Check',
      path: '/wheelchair',
      icon: FaWheelchair,
    },
    {
      name: 'Pest Control',
      path: '/pest-control',
      icon: FaBug,
    },
  ];

  const monthlyItems = [
  
    {
      name: 'First Aid Box',
      path: '/first-aid',
      icon: FaFirstAid,
    },
    {
      name: 'Ladder Register',
      path: '/ladder',
      icon: FaSortAmountUp,
    },
   
  ];
  const renderSection = (title, items) => (
    <>
      {!collapsed && (
        <div className="px-3 text-sm font-semibold text-muted-foreground   mt-4 mb-2">
          {title}
        </div>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-blue-200"
                  : "hover:bg-muted text-foreground hover:text-foreground"
              )
            }
          >
            <item.icon size={20} className={collapsed ? "mx-auto" : "mr-3"} />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>
    </>
  );


  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    if (isDesktop) {
      setCollapsed(!collapsed);
    } else {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      {!isDesktop && (
        <button
          onClick={toggleSidebar}
          className={`${mobileOpen ? "hidden" : ""} fixed top-4 left-2 z-50 p-2 rounded-md bg-card shadow-sm border border-border`}
        >
         {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      )}

      <div
        className={cn(
          "h-screen bg-card border-r border-border transition-all duration-300 flex flex-col fixed md:relative z-40",
          isDesktop 
            ? collapsed 
              ? "w-16" 
              : "w-64"
            : mobileOpen
              ? "w-64 translate-x-0"
              : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4">
          {(!collapsed || !isDesktop) && (
            <div className="text-xl font-bold text-primary">Dashboard Ui</div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isDesktop ? (
              collapsed ? (
                <FaChevronRight size={18} />
              ) : (
                <FaChevronLeft size={18} />
              )
            ) : (
              <FaTimes size={18} />
            )}
          </Button>
        </div>
        <Separator />
      

<div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2">
  {renderSection('Weekly ', weeklyItems)}
  <Separator className="my-4" />
  {renderSection('Monthly ', monthlyItems)}
</div>




        <Separator />
        <div className="p-4">
          <Button
            variant="ghost"
            className={cn("w-full justify-start", collapsed && isDesktop && "justify-center")}
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} className={collapsed && isDesktop ? "mx-auto" : "mr-3"} />
            {(!collapsed || !isDesktop) && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {!isDesktop && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;