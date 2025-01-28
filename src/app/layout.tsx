import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { TooltipProvider } from '@/components/ui/tooltip';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '@/components/custom/convex-client-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/(sidebar)/sidebar';
import './globals.css';
import { LoadersProvider } from '@/context/loaders-context';
import { SandpackActionProvider } from '@/context/sandpack-action-context';

export const metadata: Metadata = {
  title: 'Sparkify UI',
  description:
    'Unlock the power of AI with our app! Effortlessly generate high-quality, customizable code tailored to your needs. Simplify development, save time, and focus on innovation with AI-driven coding solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang='en'>
        <body className={GeistSans.className}>
          <NextTopLoader
            showSpinner={false}
            color='#8E51FF'
          />
          <Toaster
            richColors
            theme='dark'
          />
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={50}>
              <LoadersProvider>
                <SandpackActionProvider>
                  <main className='min-h-screen text-primary'>
                    <div className='absolute left-0 right-0 -top-20 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-400 opacity-20 blur-[100px]'></div>
                    <ConvexClientProvider>
                      <SidebarProvider>
                        <AppSidebar />
                        {children}
                      </SidebarProvider>
                    </ConvexClientProvider>
                  </main>
                </SandpackActionProvider>
              </LoadersProvider>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
