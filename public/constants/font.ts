import { Noto_Sans_Thai, Geist, Geist_Mono ,IBM_Plex_Sans_Thai, Noto_Sans_Thai_Looped ,Inter} from 'next/font/google';

export const NotoSansThaiLooped = Noto_Sans_Thai_Looped({
  weight: ['300', '400', '500', '600', '700'], 
  style: 'normal',                            
  subsets: ['thai'], 
  display: 'swap',
});

export const NotoSansThai = Noto_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'], 
  style: 'normal',                            
  subsets: ['thai'], 
  display: 'swap',
});

export const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['300', '400', '500', '600', '700'], 
  style: 'normal',                            
  subsets: ['thai'],                          
  display: 'swap',                           
})

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inTer = Inter({
  subsets: ["latin"],
});