<script setup lang="ts">
import { useData } from 'vitepress'
import Home from './Home.vue'
import Article from './Article.vue'
import Footer from './Footer.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="antialiased dark:bg-slate-900">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">
        <a class="text-xl" href="/" aria-label="The Vue Point">
          <img
            class="inline-block mr-2"
            style="width: 36px; height: 31px"
            alt="logo"
            src="https://www.peppubuild.com/favicon.ico"
          />
          <span
            v-if="!frontmatter.index"
            class="hidden md:inline dark:text-white"
            >Peppubuild's blog</span
          >
        </a>
        <div class="text-sm text-gray-500 dark:text-white leading-5">
          <a
            class="hover:text-gray-700 dark:hover:text-gray-200 link remove-deco"
            href="https://github.com/Peppu-Group/Peppubuild"
            target="_blank"
            rel="noopener"
            ><span class="hidden sm:inline">GitHub </span>Source</a
          >
          <span class="mr-2 ml-2">·</span>
          <a
            class="hover:text-gray-700 dark:hover:text-gray-200 link remove-deco"
            href="https://peppubuild.com"
            target="_blank"
            rel="noopener"
            >Peppubuild.com →</a
          >
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else />
    </main>
    <Footer />
  </div>
</template>
