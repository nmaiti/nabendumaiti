import localFont from 'next/font/local';

export const calibre = localFont({
  src: [
    {
      path: '../fonts/Calibre/Calibre-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Calibre/Calibre-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Calibre/Calibre-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Calibre/Calibre-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/Calibre/Calibre-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../fonts/Calibre/Calibre-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-calibre',
});

export const sfMono = localFont({
  src: [
    {
      path: '../fonts/SFMono/SFMono-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/SFMono/SFMono-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/SFMono/SFMono-MediumItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../fonts/SFMono/SFMono-MediumItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-sf-mono',
});
