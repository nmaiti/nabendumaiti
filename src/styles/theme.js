import mixins from './mixins';

const light = {
  darknavy: '#c2d3e5',
  navy: '#fbfefb',
  lightnavy: '#ffffff',
  lightestnavy: '#bcb8b1',
  navyshadow: 'rgba(2, 12, 27, 0.7)',
  darkslate: '#000000',
  slate: '#082032',
  lightslate: '#082032',
  lightestslate: '#334756',
  white: '#fffbff',
  higlight: '#2080ff',
  higlighttint: 'rgba(30, 125, 250, 0.2)',
};

const dark = {
  darknavy: '#020e20',
  navy: '#0a0e20',
  lightnavy: '#26509a',
  lightestnavy: '#376ccc',
  navyshadow: 'rgba(2, 14, 32, 0.7)',
  darkslate: '#495670',
  slate: '#c8d4f7',
  lightslate: '#ebeffb',
  lightestslate: '#ccd6f6',
  white: '#f7f7fe',
  higlight: '#24b4fd',
  higlighttint: 'rgba(43, 181, 250, 0.6)',
};

const theme = isDark => {
  const colors = isDark ? dark : light;
  return {
    bp: {
      mobileS: `max-width: 330px`,
      mobileM: `max-width: 400px`,
      mobileL: `max-width: 480px`,
      tabletS: `max-width: 600px`,
      tabletL: `max-width: 768px`,
      desktopXS: `max-width: 900px`,
      desktopS: `max-width: 1080px`,
      desktopM: `max-width: 1200px`,
      desktopL: `max-width: 1400px`,
    },
    ...colors,
    mixins,
  };
};

export default theme;
