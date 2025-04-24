import ChecksTemplate from '@/components/checks/ChecksTemplate';
import { FaFirstAid } from 'react-icons/fa';

const FirstAidCheck = () => {
  return <ChecksTemplate title="First Aid Box" icon={FaFirstAid} checkType="First Aid" />;
};

export default FirstAidCheck;
