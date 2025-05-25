<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-5"
      >
        <Avatar class="h-10 w-10 rounded-full">
          <!-- <AvatarImage :src="data.user.avatar" :alt="user.displayName" /> -->
          <AvatarFallback class="rounded-lg">
            {{ getFistletter(user.displayName) }}
          </AvatarFallback>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">{{ user.displayName }}</span>
          <span class="truncate text-xs">{{ user.username }}</span>
        </div>
        <ChevronDown class="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
      <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar class="h-8 w-8 rounded-full">
            <AvatarFallback class="rounded-lg">
              {{ getFistletter(user.displayName) }}
            </AvatarFallback>
          </Avatar>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">{{ user.displayName }}</span>
            <span class="truncate text-xs">{{ user.email }}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          Setting
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="cursor-pointer" @click="logout">
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <!-- <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarFallback>{{ getFistletter(username) }}</AvatarFallback>
        </Avatar>
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-semibold">{{ user.displayName }}</span>
        <span class="truncate text-xs">{{ user.email }}</span>
      </div>
      </Button>
      <ChevronsUpDown class="ml-auto size-4" />
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="w-56" align="end"
    >
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ username }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="size-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BadgeInfo class="size-4 mr-2" />
          About
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon class="size-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="logout">
          <LogOutIcon class="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu> -->
</template>

<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
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
import { SidebarMenuButton } from '@/components/shares/ui/sidebar';
import { useUserStore } from '@/stores/user';
import { BadgeInfo, ChevronDown, LogOutIcon, SettingsIcon, User } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const user = computed(() => userStore.userDetails);

const getFistletter = (name: string) => name?.charAt(0).toUpperCase();

function logout() {
  userStore.Logout();
  router.push({ name: 'AuthLoginPage' });
}
</script>
