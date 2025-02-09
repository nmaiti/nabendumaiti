module.exports = {
  email: '✉️ nbmaiti at gmail dot com',

  socialMedia: [
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/nabedumaiti',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/nmaiti',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/maitinabendu/',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@engineernabendu-vp5bq',
    },
    {
      name: 'Sandbox',
      url: 'https://codesandbox.io/u/nmaiti',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Blog',
      url: '/blogs',
    },
  ],

  colors: {
    highlight: '#24b4fd',
    lightDark: '#124581',
    dark: '#031b36',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
