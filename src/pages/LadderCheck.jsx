import ChecksTemplate from '@/components/checks/ChecksTemplate';
import { GiLadder } from 'react-icons/gi';

const LadderCheck = () => {
  return <ChecksTemplate title="Ladder Register" icon={GiLadder} checkType="Ladder" />;
};

export default LadderCheck;
