<template>
  <div
    class="flex py-60 flex-col h-screen my-auto items-center bgimg bg-cover bg-gradient-to-b from-white to-blue-200 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-400"
  >
    <div
      class="mt-2 bg-white font-bold text-7xl py-1 px-8 rounded m-2 dark:bg-slate-700 dark:text-white"
    >
      Welcome to the dashboard <span v-if="user?.name"> {{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const user = (await useUser()) as IUser;
</script>

<style scoped lang="scss"></style>
