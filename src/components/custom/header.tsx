import { Button } from '../ui/button';

const Header = () => {
  return (
    <nav className='flex items-center justify-between p-3.5'>
      <p className='text-sm font-semibold'>LOGO</p>
      <div className='flex gap-2.5'>
        <Button
          size='sm'
          variant='secondary'
        >
          Sign In
        </Button>
        <Button
          size='sm'
          variant='special'
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Header;
