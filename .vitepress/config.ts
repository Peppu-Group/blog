import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  title: 'No-code Builder',
  description: 'Build websites and applications without writing any code',
  cleanUrls: true,
  head: [
    ['meta', { name: 'twitter:site', content: '@peppubuild' }],
    ['meta', { name: 'twitter:card', content: 'peppubuild' }],
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
