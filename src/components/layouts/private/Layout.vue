<template>
  <SidebarProvider class="flex flex-col">
    <header v-if="isAuthenticated" class="sticky z-10 top-0 flex h-16 items-center border-b bg-background px-4">
      <div class="flex items-center xs:block ">
        <SidebarTrigger class="-ml-1 opacity-50" />
        <Separator orientation="vertical" class="m-2 h-4" />
      </div>
      <div class="flex h-14 items-center lg:h-[75px]">
        <RouterLink :to="{ path: '/' }" class="w-auto h-auto">
          <img src="@/assets/images/main-logo.png" alt="Logo" class="h-10 w-10 object-contain">
        </RouterLink>
      </div>
      <!-- <MainMenu /> -->
      <div class="w-[--sidebar-width] flex items-center justify-between pr-4">
        <!-- <SidebarTrigger class="" /> -->
      </div>
      <div class="ml-auto flex items-center space-x-4 relative">
        <Notifications />
        <Separator orientation="vertical" class="h-4" />
        <Profile />
      </div>
    </header>
    <header v-if="!isAuthenticated" class="sticky z-10 top-0 flex h-16 items-center border-b bg-background px-4">
      <div class="flex h-14 items-center lg:h-[75px]">
        <RouterLink :to="{ path: '/' }" class="w-auto h-auto">
          <img src="@/assets/images/main-logo.png" alt="Logo" class="h-10 w-10 object-contain">
        </RouterLink>
      </div>
    </header>
    <div class="flex flex-1 overflow-y-auto">
      <SideMenu v-if="isSidebarHidden" />
      <SidebarInset class="text-foreground overflow-y-scroll">
        <div class="flex items-center gap-2 px-4 py-2">
          <!-- <Breadcrumb /> -->
        </div>
        <RouterView />
      </SidebarInset>
    </div>
  </SidebarProvider>
</template>

<script setup lang=ts>
// import Breadcrumb from '@/components/layouts/private/Breadcrumb.vue';
import Notifications from '@/components/layouts/private/Notifications.vue';
import Profile from '@/components/layouts/private/Profile.vue';
import SideMenu from '@/components/layouts/private/SideMenu.vue';
import { Separator } from '@/components/shares/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/shares/ui/sidebar';
import { useAuthentication } from '@/composables';
import router from '@/routes';
import { computed } from 'vue';

const { isAuthenticated } = useAuthentication();

const isSidebarHidden = computed(() => {
  if (!isAuthenticated.value) {
    return false;
  } else {
    return router.currentRoute.value.name !== 'SkillAssessmentPage' && router.currentRoute.value.name !== 'ClubSelectPage';
  }
});
</script>
