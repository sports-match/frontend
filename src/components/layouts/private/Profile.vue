<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground gap-5"
      >
        <Avatar class="h-10 w-10 rounded-full">
          <AvatarImage :src="avatarPath" :alt="user.username" />
          <AvatarFallback class="rounded-lg">
            {{ getFistletter(user.username) }}
          </AvatarFallback>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
          <span class="truncate font-semibold">{{ user.username }}</span>
          <span class="truncate text-xs">{{ user.email }}</span>
        </div>
        <ChevronDown class="ml-auto size-4" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
      <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <Avatar class="h-8 w-8 rounded-full">
            <AvatarFallback class="rounded-lg">
              {{ getFistletter(user.username) }}
            </AvatarFallback>
          </Avatar>
          <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-semibold">{{ user.username }}</span>
            <span class="truncate text-xs">{{ user.email }}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="$router.push({ name: 'ProfilePage' })">
          Profile
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
  AvatarImage,
} from '@/components/shares/ui/avatar';
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
import { ChevronDown } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const user = computed(() => userStore.userDetails?.user?.user);

const getFistletter = (name: string) => name?.charAt(0).toUpperCase();
const avatarPath = computed(() => import.meta.env.VITE_API_URL + userStore.userDetails?.user?.avatarName || '');
function logout() {
  userStore.Logout();
  router.push({ name: 'AuthLoginPage' });
}
</script>
