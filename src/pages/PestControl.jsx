import ChecksTemplate from '@/components/checks/ChecksTemplate';
import { FaBug } from 'react-icons/fa';

const PestControlCheck = () => {
  return <ChecksTemplate title="Pest Control" icon={FaBug} checkType="Pest Control" />;
};

export default PestControlCheck;
