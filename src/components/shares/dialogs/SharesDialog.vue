<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" size="sm" class="bg-black text-white border-white rounded-xl">
        <Link class="mr-2 size-4" />
        Share
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Event Sharing</DialogTitle>
      </DialogHeader>
      <QrSharing :event="event" />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import QrSharing from '@/components/shares/QrSharing.vue';
import { Button } from '@/components/shares/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shares/ui/dialog';
import { Link } from 'lucide-vue-next';

defineProps({
  event: {
    type: Object,
    default: () => ({}),
  },
});
</script>
