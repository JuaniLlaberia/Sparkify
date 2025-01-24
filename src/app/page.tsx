import AuthHeaderContent from '@/components/custom/(landing-page)/auth-header-content';
import Footer from '@/components/custom/(landing-page)/footer';
import Hero from '@/components/custom/(landing-page)/hero';
import Header from '@/components/custom/header';

const HomePage = () => {
  return (
    <div className='flex flex-col w-full'>
      <Header content={<AuthHeaderContent />} />
      <div className='flex flex-col w-full min-h-[calc(100vh-4rem)]'>
        <div className='flex-grow overflow-auto'>
          <Hero />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
