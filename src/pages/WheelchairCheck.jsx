import ChecksTemplate from '@/components/checks/ChecksTemplate';
import { FaWheelchair } from 'react-icons/fa';

const WheelchairCheck = () => {
  return <ChecksTemplate title="Wheelchair Safety Check" icon={FaWheelchair} checkType="Wheelchair" />;
};

export default WheelchairCheck;

