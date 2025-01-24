import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='flex items-center justify-center md:justify-end p-2 px-3.5 mt-auto'>
      <ul className='flex items-center gap-2 text-xs md:text-sm text-muted-foreground'>
        <li>
          <Link
            href='/tos'
            className='hover:underline'
          >
            Terms
          </Link>
        </li>
        |
        <li>
          <Link
            href='/privacy-policy'
            className='hover:underline'
          >
            Privacy
          </Link>
        </li>
        |<li>Sparkify © {new Date().getFullYear()} All rights reserved</li>
      </ul>
    </footer>
  );
};

export default Footer;
