<template>
  <MainContentLayout>
    <template #title>
      Upcoming Events
      <div class="text-sm font-normal">
        Join weekly ladder events, prove your skills, and boost your global ranking across academies
      </div>
    </template>

    <template #action>
      <div class="flex space-x-2">
        <Button
          v-for="item in icons"
          :key="item.value"
          variant="ghost"
          class="p-2 rounded-md" :class="[
            selectedIcon === item.value ? 'text-primary' : 'text-black',
          ]"
          @click="selectIcon(item.value)"
        >
          <component :is="item.icon" class="w-6 h-6" />
        </Button>
      </div>
    </template>

    <component :is="selectedIcon === 'grid' ? GridView : selectedIcon === 'list' ? ListView : mapView" />
  </MainContentLayout>
</template>

<script setup lang="ts">
import { MainContentLayout } from '@/components/shares/main-content-layout';
import { Button } from '@/components/shares/ui/button';
import GridView from '@/components/user/events/gridView.vue';
import ListView from '@/components/user/events/listView.vue';
import mapView from '@/components/user/events/mapView.vue';
import { Grid3x3, LayoutGrid, MapPinned } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const icons = [
  { value: 'list', icon: Grid3x3 },
  { value: 'grid', icon: LayoutGrid },
  { value: 'map', icon: MapPinned },
];

const route = useRoute();
const router = useRouter();
const selectedIcon = ref(route.query.icon || 'grid');

function selectIcon(icon: string) {
  selectedIcon.value = icon;
  router.push({ query: { ...route.query, icon } });
}
</script>
