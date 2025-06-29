<template>
  <div class="flex items-center space-x-4">
    <Button variant="ghost" class="p-0" aria-label="Notifications">
      <Bell class="h-5 w-5" />
      <span class="sr-only">Notifications</span>
    </Button>
    <Button variant="ghost" class="p-0" aria-label="Settings">
      <MessageCircle class="h-5 w-5" />
      <span class="sr-only">Settings</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Bell, MessageCircle } from 'lucide-vue-next';
</script>
