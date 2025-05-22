<template>
  <Breadcrumb class="hidden lg:flex">
    <BreadcrumbList>
      <BreadcrumbItem v-for="(item, index) in breadcrumbItems" :key="index">
        <template v-if="item.to">
          <BreadcrumbLink as-child>
            <RouterLink :to="BreadcrumbItem.to">
              {{ item.text }}
            </RouterLink>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
        </template>

        <BreadcrumbPage v-else>
          {{ item.text }}
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shares/ui/breadcrumb';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbItems = computed(() => {
  const pathArray = route.path.split('/').filter(Boolean);
  const breadcrumbs = pathArray.map((path, idx) => {
    const previousBreadcrumb = idx > 0 ? pathArray[idx - 1] : undefined;
    return idx === pathArray.length - 1
      ? {
          text: path,
        }
      : {
          to: previousBreadcrumb ? `/${previousBreadcrumb}/${path}` : `/${path}`,
          text: path,
        };
  });

  return breadcrumbs;
});
</script>
