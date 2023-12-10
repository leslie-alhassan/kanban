import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

const Logo = () => {
  return (
    <Link
      to='/'
      className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'
    >
      <img
        src={logo}
        alt='Logo'
        height={30}
        width={30}
      />
      <p className='text-lg pb-1 font-semibold'>Kanban</p>
    </Link>
  );
};

export default Logo;
