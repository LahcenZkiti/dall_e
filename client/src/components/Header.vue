<template>
  <header
    class="w-full flex items-center justify-between bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
  >
    <RouterLink to="/">
      <img :src="logo" alt="logo" class="w-28 object-contain" />
    </RouterLink>
    <RouterLink to="/create-post">
      <button
        class="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >
        Create
      </button>
    </RouterLink>
  </header>
</template>

<script setup>
import { logo } from "../assets";
</script>

<style lang="scss" scoped></style>
