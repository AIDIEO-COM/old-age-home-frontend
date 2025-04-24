
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { store } from './store';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';

// Dashboard and Check Pages
import Dashboard from './pages/Dashboard';
import RoomsCheck from './pages/RoomsCheck';
import ShowerCheck from './pages/ShowerCheck';
import BathHoistCheck from './pages/BathHoistCheck';
import TemperatureCheck from './pages/TemperatureCheck';
import WheelchairCheck from './pages/WheelchairCheck';
import PestControl from './pages/PestControl';
import FirstAidCheck from './pages/FirstAidCheck';
import LadderCheck from './pages/LadderCheck';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/" element={<DashboardLayout />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path="rooms" element={<RoomsCheck />} />
            <Route path="shower" element={<ShowerCheck />} />
            <Route path="bath-hoist" element={<BathHoistCheck />} />
            <Route path="temperature" element={<TemperatureCheck />} />
            <Route path="wheelchair" element={<WheelchairCheck />} />
            <Route path="pest-control" element={<PestControl />} />
            <Route path="first-aid" element={<FirstAidCheck />} />
            <Route path="ladder" element={<LadderCheck />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;
