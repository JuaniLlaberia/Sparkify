import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { TooltipProvider } from '@/components/ui/tooltip';
import { MessagesProvider } from '@/context/messages-context';
import { ConvexAuthNextjsServerProvider } from '@convex-dev/auth/nextjs/server';
import { ConvexClientProvider } from '@/components/custom/convex-client-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/(sidebar)/sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <Toaster richColors />
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delayDuration={50}>
              <MessagesProvider>
                <main className='min-h-screen text-primary'>
                  <div className='absolute left-0 right-0 -top-20 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-400 opacity-20 blur-[100px]'></div>
                  <ConvexClientProvider>
                    <SidebarProvider>
                      <AppSidebar />
                      {children}
                    </SidebarProvider>
                  </ConvexClientProvider>
                </main>
              </MessagesProvider>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
