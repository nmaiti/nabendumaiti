import mixins from './mixins';

const light = {
  darknavy: '#e9fdffff',
  navy: '#fcfffffd',
  lightnavy: '#cff6fcf3',
  lightestnavy: '#dbfff7e8',
  navyshadow: 'hsla(195, 22%, 38%, 0.37)',
  darkslate: '#000000ff',
  slate: '#132330ff',
  lightslate: '#193c3fff',
  lightestslate: '#37586eff',
  white: '#ffffffff',
  higlight: 'rgb(36, 148, 253)',
  higlighttint: 'rgba(93, 203, 247, 0.6)',
};

const dark = {
  darknavy: '#020e20',
  navy: '#072042',
  lightnavy: '#26509a',
  lightestnavy: '#376ccc',
  navyshadow: 'rgba(2, 14, 32, 0.7)',
  darkslate: '#495670',
  slate: '#c8d4f7',
  lightslate: '#ebeffb',
  lightestslate: '#ccd6f6',
  white: '#f7f7fe',
  higlight: '#24b4fd',
  higlighttint: 'rgba(39, 167, 231, 0.6)',
};

const theme = isDark => {
  const colors = isDark ? dark : light;
  return {
    isDark,
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
