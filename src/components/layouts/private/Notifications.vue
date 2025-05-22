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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shares/ui/avatar';
import { Button } from '@/components/shares/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shares/ui/dropdown-menu';
import { Bell, MessageCircle } from 'lucide-vue-next';
</script>
