<template>
  <div class="bg-white rounded-lg p-4 shadow space-y-6">
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
  </div>
</template>

<script setup lang="ts">
import type { TooltipItem } from 'chart.js';
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
const allDates = [
  '2025-05-27',
  '2025-05-25',
  '2025-05-23',
  '2025-05-22',
  '2025-05-21',
  '2025-05-20',
  '2025-05-18',
  '2025-05-16',
  '2025-05-14',
  '2025-05-12',
  '2025-05-11',
  '2025-05-09',
  '2025-05-08',
  '2025-05-06',
  '2025-05-03',
  '2025-05-01',
];

// Sample ratings data - replace with your actual data
// function generateRatings() {
//   return allDates.map((_) => {
//     // Simulate ratings between 3.0 and 5.0
//     return Number((Math.random() * 2 + 3).toFixed(1));
//   });
// }

// const doublesRatings = generateRatings();
// const singlesRatings = generateRatings();

const doublesRatings = computed(() => props.data.doubleEventRatingHistory);
const singlesRatings = computed(() => props.data.singleEventRatingHistory);

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
      min: 3.0,
      max: 5.0,
      ticks: {
        stepSize: 0.5,
      },
      grid: {
        color: '#e5e7eb', // Tailwind gray-200
      },
    },
  },
};

// Display every 3rd date to prevent overcrowding
// const displayedDates = computed(() => {
//   return allDates.filter((_, index) => index % 3 === 0);
// });

// function formatDateDisplay(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//   });
// }
</script>
