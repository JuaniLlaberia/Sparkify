import PromptInput from '../promp-input';
import SuggestionsCards from './suggestions-cards';

const Hero = () => {
  return (
    <div className='flex flex-col items-center mt-56 gap-2'>
      <h1 className='font-semibold text-[44px] leading-[40px]'>
        What do you want to build?
      </h1>
      <p className='text-muted-foreground font-medium text-lg mt-1'>
        Prompt, run, edit, and deploy full-stack web apps.
      </p>

      <PromptInput />
      <SuggestionsCards />
    </div>
  );
};

export default Hero;
