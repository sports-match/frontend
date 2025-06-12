<template>
  <div class="bg-white rounded-2xl border py-2 px-1 flex items-start max-w-full">
    <!-- Calendar Section -->
    <div class="">
      <!-- <div class="flex items-center gap-2 mb-4">
        <h2 class="text-2xl font-semibold">
          October
        </h2>
        <span class="text-2xl font-semibold">|</span>
        <span class="text-2xl font-semibold">2025</span>
        <Button variant="ghost" size="icon" class="ml-2 text-muted-foreground px-2 py-1">
          ▼
        </Button>
        <Button variant="ghost" size="icon" class="ml-2 text-muted-foreground px-2 py-1">
          ◀
        </Button>
        <Button variant="ghost" size="icon" class="text-muted-foreground px-2 py-1">
          ▶
        </Button>
      </div> -->
      <Calendar />
    </div>

    <!-- Divider -->
    <Separator orientation="vertical" class="mx-4 h-auto" />

    <!-- Upcoming Events Section -->
    <div class="flex-1 pt-4">
      <div class="flex items-center gap-2 mb-2">
        <h2 class="text-xl font-semibold">
          Upcoming Events
        </h2>
        <span class="bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-bold">2</span>
      </div>
      <p class="text-gray-500 mb-4">
        Tuesday, 10 May 2025
      </p>
      <!-- Event 1 -->
      <div class="flex gap-4 mb-6">
        <div class="text-gray-400 text-sm flex-shrink-0">
          <div>9:00 AM to</div>
          <div>11:00 PM</div>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">
            May 9th Mukilteo Mixer Standard Doubles Mixer
          </h3>
          <div class="flex gap-2 mt-2">
            <span class="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs">Safiya Jetha</span>
          </div>
          <div class="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <MapPinned class="size-4" />
            <span>BBC - Mukilteo</span>
            <span>#Courts(4)</span>
          </div>
        </div>
      </div>
      <!-- Event 2 -->
      <div class="flex gap-4">
        <div class="text-gray-400 text-sm flex-shrink-0">
          <div>7:00 PM to</div>
          <div>9:00 PM</div>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">
            Friday Courts 1, 9-11 Standard Doubles Mixer
          </h3>
          <div class="flex gap-2 mt-2">
            <span class="bg-gray-100 text-gray-700 rounded px-2 py-0.5 text-xs">Alex Chu</span>
          </div>
          <div class="flex items-center gap-2 mt-2 text-gray-500 text-sm">
            <MapPinned class="size-4" />
            <span>BBC - Redmond</span>
            <span>#Courts(4)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from '@/components/shares/ui/calendar';
import { Separator } from '@/components/shares/ui/separator';
import { MapPinned } from 'lucide-vue-next';
</script>
