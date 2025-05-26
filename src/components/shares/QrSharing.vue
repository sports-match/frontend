<template>
  <div>
    <div class="flex flex-col items-center gap-4">
      <img v-if="publicLink" class="mt-6 mb-2 rounded border" :src="qrcode" alt="QR Code">
      <Button
        @click="downloadQR"
      >
        <Download class="w-4 h-4 mr-2" />
        Download QR Code
      </Button>
    </div>

    <!-- Sharing Options -->
    <div>
      <p class="text-sm text-gray-600 mb-2">
        Share this link via
      </p>
      <div class="flex items-center gap-3">
        <a :href="`mailto:?body=${publicLink}`" target="_blank" class="p-2 border rounded hover:bg-gray-100">
          <Mail class="w-4 h-4" />
        </a>
        <a
          :href="`https://wa.me/?text=${encodeURIComponent(publicLink)}`"
          target="_blank"
          class="p-2 border rounded hover:bg-gray-100"
        >
          <MessageCircleMore class="w-4 h-4 text-green-500" />
        </a>
      </div>
    </div>

    <!-- Copy Link -->
    <div>
      <p class="text-sm text-gray-600 mt-4">
        Public Link:
      </p>
      <div class="relative mt-1">
        <input
          type="text"
          :value="publicLink"
          readonly
          class="w-full border rounded-md p-2 pr-10 text-sm bg-gray-50"
        >
        <button class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-600 hover:text-gray-900" @click="copyLink">
          <Copy class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/shares/ui/button';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { Copy, Download, Mail, MessageCircleMore } from 'lucide-vue-next';
import { computed, ref, shallowRef } from 'vue';

const publicLink = shallowRef('https://go.gl/xprowi2025');
const qrcode = useQRCode(publicLink, {
  errorCorrectionLevel: 'H',
  margin: 3,
});

function downloadQR() {
  const link = document.createElement('a');
  link.href = qrcode.value;

  link.download = 'qr-code.png';
  link.click();
}

function copyLink() {
  navigator.clipboard.writeText(publicLink).then(() => {
    // alert('Link copied!');
  });
}
</script>
