
import ChecksTemplate from '@/components/checks/ChecksTemplate';
import { Thermometer } from 'lucide-react';

const TemperatureCheck = () => {
  return <ChecksTemplate title="Temperature Check" icon={Thermometer} checkType="Temperature" />;
};

export default TemperatureCheck;
