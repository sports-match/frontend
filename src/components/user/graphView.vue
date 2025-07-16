<template>
  <Card class="rounded-xl p-4 space-y-6">
    <div class="text-xl font-semibold">
      Ratings Progress
    </div>
    <!-- <div class="flex space-x-4 mb-4">
      <button
        v-for="tab in ['Doubles', 'Singles', 'By Game', 'All Time']"
        :key="tab"
        class="px-3 py-1 text-sm rounded-md"
        :class="activeTab === tab ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div> -->

    <div class="h-72">
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import type { TooltipItem } from 'chart.js';
import { Card } from '@/components/shares/ui/card';
import { useDateFormat } from '@vueuse/core';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';
import { computed } from 'vue';
import { Line as LineChart } from 'vue-chartjs';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
);

// const activeTab = ref('Doubles');

// Sample data - replace with your actual data
const startDate = new Date();
startDate.setDate(startDate.getDate() - 30);
const allDates = Array.from({ length: 30 })
  .fill(0)
  .map((_, i) => {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    return date.toISOString().split('T')[0];
  });

function getRateScoresPerDay(allDates: string[], doubles: any[]) {
  const scoreMap = new Map();
  if (doubles?.length === 0) {
    return allDates.map(() => '0');
  }
  // Step 1: format doubles' createTime to 'YYYY-MM-DD'
  for (const entry of doubles) {
    const entryDate = useDateFormat(new Date(entry.createTime), 'YYYY-MM-DD').value;
    scoreMap.set(entryDate, entry.rateScore);
  }

  // Step 2: format each allDates entry and check the map
  return allDates.map((date) => {
    const formattedDate = useDateFormat(new Date(date), 'YYYY-MM-DD').value;
    return String(scoreMap.get(formattedDate) ?? 0);
  });
}

// const doublesRatings = computed(() => props.data.doubleEventRatingHistory);
const doublesRatings = computed(() => getRateScoresPerDay(allDates, props.data?.doubleEventRatingHistory || []));
const singlesRatings = computed(() => getRateScoresPerDay(allDates, props.data?.singleEventRatingHistory || []));

const chartData = computed(() => ({
  labels: allDates,
  datasets: [{
    label: 'Doubles Rating',
    data: doublesRatings.value,
    borderColor: '#22c55e', // green-500
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 2,
    pointBorderColor: '#22c55e',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    fill: true,
  }, {
    label: 'Singles Rating',
    data: singlesRatings.value,
    borderColor: '#3b82f6', // blue-500
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 2,
    pointBackgroundColor: '#fff',
    pointBorderColor: '#3b82f6',
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    fill: true,
  }],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        backgroundColor: '#22c55e',
        boxWidth: 8, // Smaller dot
        boxHeight: 8,
        padding: 12,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'line'>) => `${context.dataset.label}: ${context.parsed.y}`,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        // Rotate labels vertically
        color: '#6b7280', // Tailwind gray-500
        maxRotation: 90,
        minRotation: 90,
        align: 'center',
      },
    },
    y: {
      min: Math.min(...doublesRatings.value.map(x => +x), ...singlesRatings.value.map(x => +x)),
      max: Math.max(...doublesRatings.value.map(x => +x), ...singlesRatings.value.map(x => +x)) + 100,
      ticks: {
        stepSize: 1,
      },
      grid: {
        color: '#e5e7eb', // Tailwind gray-200
      },
    },
  },
};
</script>
