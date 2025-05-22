<template>
  <SidebarProvider class="flex flex-col">
    <header class="sticky z-10 top-0 flex h-16 items-center border-b bg-background px-4">
      <div class="flex items-center xs:block ">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="m-2 h-4" />
      </div>
      <div class="flex h-14 items-center lg:h-[75px]">
        <RouterLink :to="{ path: '/' }" class="w-auto h-auto">
          <!-- <img src="@/assets/images/main-logo.png" width="120"> -->
        </RouterLink>
      </div>
      <!-- <MainMenu /> -->
      <div class="w-[--sidebar-width] flex items-center justify-between pr-4">
        <div>
          Logo
        </div>
        <!-- <SidebarTrigger class="" /> -->
      </div>
      <div class="ml-auto flex items-center space-x-4 relative">
        <Notifications />
        <Separator orientation="vertical" class="h-4" />
        <Profile />
      </div>
    </header>
    <div class="flex flex-1">
      <SideMenu />
      <SidebarInset class="text-foreground">
        <div class="flex items-center gap-2 px-4 py-2">
          <Breadcrumb />
        </div>
        <RouterView />
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>

<script setup lang=ts>
import Breadcrumb from '@/components/layouts/private/Breadcrumb.vue';
import Notifications from '@/components/layouts/private/Notifications.vue';
import Profile from '@/components/layouts/private/Profile.vue';
import SideMenu from '@/components/layouts/private/SideMenu.vue';
// import MainMenu from '@/components/layouts/private/TopMenu.vue';
import { Separator } from '@/components/shares/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/shares/ui/sidebar';
// import { triggerAlert } from '@/composables/useAlert';
import { useUserStore } from '@/stores/user';
import { useIdle } from '@vueuse/core';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const userStore = useUserStore();
// When there's no action for 5 min, idle will true.
const min = 5;
const { idle } = useIdle(min * 60 * 1000);

watch(
  idle,
  async (value) => {
    if (value === true) {
      userStore.logout();
      await triggerAlert({
        title: t('messages.error.sessionExpiration'),
        description: t('messages.error.idleDesc', { min }),
      });
    }
  },
);
</script>
