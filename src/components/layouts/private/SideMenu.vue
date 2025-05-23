<template>
  <Sidebar collapsible="icon" class="top-16 h-[calc(100vh-theme(spacing.16))]">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>General</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="text-sidebar-foreground/70">
              <House class="text-sidebar-foreground/70" />
              <RouterLink to="/">
                Dashbaord
              </RouterLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <Collapsible
            v-for="item in data.navMain"
            :key="item.title"
            as-child
            class="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger as-child>
                <SidebarMenuButton :tooltip="item.title">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                  <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem
                    v-for="subItem in item.items"
                    :key="subItem.title"
                  >
                    <SidebarMenuSubButton as-child>
                      <RouterLink :to="subItem.url">
                        <span>{{ subItem.title }}</span>
                      </RouterLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton class="text-sidebar-foreground/70" @click="router.push('/playerStats')">
              <Medal class="text-sidebar-foreground/70" />
              <span>Player Stats</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup class="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Support</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton class="text-sidebar-foreground/70" @click="router.push('/faq')">
              <CircleHelp class="text-sidebar-foreground/70" />
              <span>FAQ</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton class="text-sidebar-foreground/70" @click="router.push('/contact')">
              <Mailbox class="text-sidebar-foreground/70" />
              <span>Contact Us</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter
      v-if="open"
      class="bg-background opacity-70"
    >
      <SidebarMenu>
        <SidebarMenuItem class="row items-end justify-end">
          <div class="flex justify-end text-sm pb-2">
            Copyright &copy; sportreview.com
          </div>
          <div class="flex items-center justify-between gap-2">
            <Button size="xs" variant="ghost" class="text-xs">
              Private Policy
            </Button>
            <Button size="xs" variant="ghost" class="text-xs">
              Terms and Conditions
            </Button>
            <Button size="xs" variant="ghost" class="text-xs">
              Contact
            </Button>
          </div>
        <!-- <SidebarMenuButton as-child tooltip="Toggle Sidebar" class="align-end">
        <SidebarTrigger />
        </SidebarMenuButton> -->
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/shares/ui/collapsible';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shares/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/shares/ui/sidebar';
import { useSidebar } from '@/components/shares/ui/sidebar/utils';
import router from '@/routes';
import { BadgeCheck, Banknote, Bell, CalendarRange, ChartLine, Check, ChevronRight, ChevronsUpDown, CircleHelp, Command, CreditCard, FileText, Folder, Forward, GalleryVerticalEnd, House, Landmark, LogOut, Mailbox, Medal, MoreHorizontal, Plus, Settings, Sparkles, Trash2 } from 'lucide-vue-next';

const { open } = useSidebar();

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Score',
      url: '#',
      icon: ChartLine,
      items: [
        {
          title: 'List',
          url: '#',
        },
      ],
    },
    {
      title: 'Events',
      url: '/evnents',
      icon: CalendarRange,
      items: [
        {
          title: 'Upcoming',
          url: '/events/upcoming',
        },
        {
          title: 'Past Events',
          url: '/events/past',
        },
      ],
    },
  ],
};
</script>
