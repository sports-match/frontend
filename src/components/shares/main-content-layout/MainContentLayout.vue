<template>
  <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div v-if="$slots.title" class="flex items-center mb-4">
      <h1 class="text-lg font-semibold md:text-2xl">
        <slot name="title" />
      </h1>
    </div>
    <slot />
  </main>
</template>
