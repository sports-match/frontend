<template>
  <div class="map-container">
    <div>
      <!-- <h3>Leaflet Map with Local Search Suggestions</h3>
      <div class="flex items-center gap-2 mb-2 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search visible location..."
          class="border rounded px-3 py-1 w-64"
          @input="filterSuggestions"
          @keyup.enter="selectSuggestion(searchQuery)"
        >
        <ul v-if="filteredSuggestions.length && searchQuery" class="absolute z-100 bg-white border rounded mt-10 w-64 max-h-40 overflow-y-auto">
          <li
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            class="px-3 py-1 hover:bg-gray-200 cursor-pointer"
            @click="selectSuggestion(suggestion.name)"
          >
            {{ suggestion.name }}
          </li>
        </ul>
        <button class="bg-blue-600 text-white px-3 py-1 rounded" @click="selectSuggestion(searchQuery)">
          Search
        </button>
      </div> -->
      <div id="map" class="map-view" />
    </div>
  </div>
</template>

<script setup lang="ts">
import * as L from 'leaflet';
import { onMounted, ref, watch } from 'vue';
import 'leaflet/dist/leaflet.css';

const { selectedLocation } = defineProps({
  selectedLocation: Object,
});

const initialMap = ref<L.Map | null>(null);
const searchQuery = ref('');
const filteredSuggestions = ref<AddressPoint[]>([]);

watch(
  () => selectedLocation,
  (newVal) => {
    if (newVal && initialMap.value) {
      initialMap.value.setView([newVal.lat, newVal.lon], 12);
    }
  },
  { immediate: true, deep: true },
);

type AddressPoint = {
  name: string;
  lat: number;
  lng: number;
};

const addressPoints: AddressPoint[] = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix', lat: 33.4484, lng: -112.0740 },
];

const markers: L.Marker[] = [];

// Filtering suggestions based on visible area and searchQuery
function filterSuggestions() {
  if (!initialMap.value)
    return;
  // const bounds = initialMap.value.getBounds();

  filteredSuggestions.value = addressPoints.filter((point) => {
    // const latlng = L.latLng(point.lat, point.lng);
    // return bounds.contains(latlng) && point.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return point.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
}

// Move to selected suggestion
// function selectSuggestion(name: string) {
//   const target = addressPoints.find(p => p.name.toLowerCase() === name.toLowerCase());
//   if (target && initialMap.value) {
//     initialMap.value.setView([target.lat, target.lng], 16);
//     const marker = markers.find((m) => {
//       const pos = m.getLatLng();
//       return pos.lat === target.lat && pos.lng === target.lng;
//     });
//     marker?.openPopup();
//   }
// }

onMounted(() => {
  initialMap.value = L.map('map').setView([37.7749, -122.4194], 12);
  if (initialMap.value && selectedLocation) {
    initialMap.value.setView([selectedLocation.lat, selectedLocation.lon], 12);
  }

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(initialMap.value);

  // Add multiple markers
  addressPoints.forEach((point) => {
    const marker = L.marker([point.lat, point.lng])
      .addTo(initialMap.value!)
      .bindPopup(point.name);
    markers.push(marker);
  });

  // Update suggestions on map move or zoom
  initialMap.value.on('moveend', filterSuggestions);

  // "Show My Location" control
  const locateControl = L.control({ position: 'topright' });
  locateControl.onAdd = function () {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.style.background = '#fff';
    div.style.cursor = 'pointer';
    div.style.width = '28px';
    div.style.height = '28px';
    div.style.borderRadius = '50%';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.title = 'Show My Location';
    div.innerHTML = '<span style="padding:4px;">📍</span>';
    div.onclick = () => {
      initialMap.value!.locate({ setView: true, maxZoom: 16 });
    };
    return div;
  };
  locateControl.addTo(initialMap.value);

  initialMap.value.on('locationfound', (e: L.LocationEvent) => {
    L.marker(e.latlng).addTo(initialMap.value!).bindPopup('You are here!').openPopup();
  });

  initialMap.value.on('locationerror', () => {
    alert('Unable to retrieve your location.');
  });

  // Initialize suggestions for current view
  filterSuggestions();
});
</script>

<style scoped>
.map-container {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  min-height: 400px;
  box-sizing: border-box;
}
.map-view {
  width: 100%;
  height: 80vh;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 40;
}
</style>
