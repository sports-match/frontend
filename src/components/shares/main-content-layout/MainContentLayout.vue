<template>
  <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
    <div v-if="$slots.title" class="flex items-center mb-4">
      <h1 class="text-xl font-semibold md:text-2xl">
        <slot name="title" />
      </h1>
      <section
        id="action"
        class="ms-auto"
      >
        <slot name="action" />
      </section>
    </div>
    <slot />
  </main>
</template>
