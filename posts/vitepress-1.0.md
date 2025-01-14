---
title: 'The Future is No-code'
date: 2024-12-18
author: Ukpai Ugochi Ibem
gravatar: 1t7YghWTfjB5qXTRAQR3BucJF-9qUk_Ie
twitter: '@hannydevelop'
---

<img src="https://peppubuild.com/AboutMain.png" alt="The future is no-code"  style="width:40vw; margin:2em auto;">

Today we are happy to announce the launch of Peppubuild's blog. This platform covers new releases, updates, features, and how-to guides.

---

## What can I use Peppubuild for?

- **Websites**
With Peppubuild, teams can build fully functional websites, without writing any code. At the end, you can export your code in HTML5, CSS, or VueJs. Peppubuild eliminates vendor lock-in, by allowing users full control to their code.

- **Web Applications**
Peppubuild allows you to connect to external CMS (Content Management Systems) and databases so that users can get real-time data. This feature allows the creation of dynamic websites and web applications.

- **Internal Tools**
Internal tools like process management routes and file management tools can be built with Peppubuild. This builds efficiency across teams, as repetitive tasks can be automated with Peppubuild.

## Performance

Unlike many traditional no-code tools that display images and other media in `base 64` format, Peppubuild uploads your images to Google Drive, attaching image links to your workspace. This increases the performance of your website. 

- **Fast Initial Load**

  The initial visit to your page will be served the static, pre-rendered HTML for fast loading speed and optimal SEO. The page then loads a JavaScript bundle that turns the page into a Vue SPA ("hydration"). Images are also loaded from your Google Drive's cloud storage, and cached. Hence, giving an instant load feel, since images from the web server aren't requested every time there's a reload (as in the case of base64 images that can't be cached)

- **Fast Post-load Navigation**

  VueJs SPA model leads to a better user experience **after** the initial load. Subsequent navigation within the site will no longer cause a full page reload. Instead, the incoming page's content will be fetched and dynamically updated. This post-load navigation will feel instant as VueJs automatically pre-fetches page chunks for links that are within the viewport. 
---

Peppubuild is free for use, as it is still under development. You can give us a [star on GitHub](https://github.com/Peppu-Group/Peppubuild) if you love what we're doing. Join our community on [Discord](https://discord.com/invite/rHSdJRzzrm) and let us know the features you'd like to see in Peppubuild.
