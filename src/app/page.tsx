import Footer from '@/components/custom/(landing-page)/footer';
import Hero from '@/components/custom/(landing-page)/hero';

const HomePage = () => {
  return (
    <div className='flex flex-col min-h-[calc(100vh-4rem)]'>
      <div className='flex-grow overflow-auto'>
        <Hero />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
