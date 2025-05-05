import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  title: 'No-code Builder',
  description: 'Build websites and applications without writing any code',
  cleanUrls: true,
  head: [
    ['meta', { name: 'twitter:site', content: '@peppubuild' }],
    ['meta', { name: 'twitter:card', content: 'peppubuild' }],
    ['meta', { name: 'keywords', content: `proctored by Peppubuild, Peppubuild exam proctoring, proctor Google Forms, Google Forms proctoring tool,
    online exam proctoring with Google Forms, Peppubuild secure testing, Peppubuild proctored Google Forms,
    how to proctor Google Forms with Peppubuild, best tool to proctor Google Form exams, set time limit and proctor Google Forms,
    Google Forms camera and screen monitoring, remote exam monitoring for Google Forms, Peppubuild exam timer for Google Forms,
    secure student exams using Google Forms, timed Google Forms with screen recording, auto-close Google Forms on time,
    student activity monitoring in Google Forms, Google Form with camera access for exams, Google Forms cheat prevention tools,
    record screen during Google Form exam, teachers proctoring Google Forms, remote learning exam tools,
    secure Google Form for schools, Google Forms for online assessments, online exam tool for students` }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://www.peppubuild.com/favicon.ico'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://www.peppubuild.com/favicon.ico'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'NYHGSGQV',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-MFM2VRN4FC',
      }
    ],
    [
      'script',
      {  },
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-MFM2VRN4FC');`
    ],
  ],
  buildEnd: genFeed
})
