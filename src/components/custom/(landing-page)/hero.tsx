import PromptInput from '../promp-input';
import SuggestionsCards from './suggestions-cards';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <div className='flex flex-col items-center mt-24 md:mt-48 gap-2 p-6'>
      <div
        className={cn(
          'mb-3 md:mb-8 rounded-full border border-border/50 transition-all ease-in hover:cursor-pointer bg-transparent hover:bg-muted/20'
        )}
      >
        <AnimatedShinyText className='inline-flex items-center justify-center text-sm px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 lg:text-sm'>
          <span>⚡ Build Smarter, Code Faster, Use Sparkify</span>
        </AnimatedShinyText>
      </div>
      <h1 className='font-semibold text-4xl md:text-[44px] leading-[40px]'>
        What do you want to build?
      </h1>
      <p className='text-muted-foreground font-medium text-base md:text-lg mt-1'>
        Prompt, run, edit, and deploy full-stack web apps.
      </p>

      <PromptInput />
      <SuggestionsCards />
    </div>
  );
};

export default Hero;
