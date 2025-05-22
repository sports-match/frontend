<template>
  <div class="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 lg:block">
      <SideMenu />
    </div>

    <div class="flex flex-col sm:gap-4 sm:py-4">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <!-- <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" variant="outline" class="lg:hidden">
              <PanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="left" class="sm:max-w-xs">
            <SideMenu />
          </SheetContent>
        </Sheet> -->

        <Breadcrumb />

        <div class="relative ml-auto flex-1 md:grow-0">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @select="handleLogout">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import { useAuthentication } from '@/composables';
import { CircleUser } from 'lucide-vue-next';
import { RouterView, useRouter } from 'vue-router';
import Breadcrumb from './Breadcrumb.vue';
import SideMenu from './SideMenu.vue';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/shares/ui/sheet';
const { logout } = useAuthentication();

const router = useRouter();
function handleLogout() {
  logout();
  router.push({ name: 'AuthLoginPage' });
}
</script>
