<template>
  <MainContentLayout>
    <div>
      <Button variant="ghost" size="sm" @click="$router.push('/playerStats')">
        <ChevronLeft class="mr-2 size-4" />
        Back
      </Button>
    </div>
    <Card class="grid grid-cols-3 gap-6 p-6">
      <!-- Metric Labels -->
      <div class="border-r">
        <h2 class="text-2xl font-semibold mb-4">
          Compare
        </h2>
        <div v-for="metric in metrics" :key="metric.label" class="py-2">
          <div class="text-gray-600">
            {{ metric.label }}
          </div>
        </div>
      </div>

      <!-- Player 1 Data -->
      <div class="border-r pr-2">
        <div class="flex justify-between items-center mb-3">
          <div class="text-gray-800 font-semibold">
            Player Name 1
          </div>
          <Button variant="outline" size="sm">
            <X class="size-3" />
          </Button>
        </div>
        <div v-for="metric in metrics" :key="metric.label" class="py-2">
          {{ metric.player1 }}
        </div>
      </div>

      <!-- Player 2 Data -->
      <div>
        <div class="flex justify-between items-center mb-3">
          <div class="text-gray-800 font-semibold">
            Player Name 2
          </div>
          <Button variant="outline" size="sm">
            <X class="size-3" />
          </Button>
        </div>
        <div v-for="metric in metrics" :key="metric.label" class="py-2">
          {{ metric.player2 }}
        </div>
      </div>
    </Card>
  </MainContentLayout>
</template>

<script setup lang="ts">
import MainContentLayout from '@/components/shares/main-content-layout/MainContentLayout.vue';
import { Button } from '@/components/shares/ui/button';
import { Card } from '@/components/shares/ui/card';
import { ChevronLeft, X } from 'lucide-vue-next';

const metrics = [
  { label: 'Singles Rating', player1: '7.45', player2: '6.92' },
  { label: 'Doubles Rating', player1: '7.10', player2: '7.30' },
  { label: 'Total Matches Played', player1: '120', player2: '105' },
  { label: 'Singles Win %', player1: '68%', player2: '60%' },
  { label: 'Doubles Win %', player1: '72%', player2: '78%' },
  { label: 'Last Match Date', player1: '2025-05-10', player2: '2025-05-17' },
  { label: 'Last Match Result', player1: 'Win vs. Mike (21-19, 21-16)', player2: 'Loss vs. Ken (18-21, 20-22)' },
  { label: 'Head-to-Head (W-L)', player1: '3 - 2', player2: '2 - 3' },
  { label: 'Average Points/Game', player1: '19.6', player2: '18.4' },
  { label: 'Best Win Streak', player1: '9 Matches', player2: '7 Matches' },
  { label: 'Most Played Partner', player1: 'David Lee (45 matches)', player2: 'Brian Koh (52 matches)' },
  { label: 'Most Played Venue', player1: 'Phnom Penh Badminton Hall', player2: 'Elite Sports Arena' },
];
</script>
