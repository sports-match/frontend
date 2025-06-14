<template>
  <Dialog v-model:open="open">
    <!-- Trigger -->
    <DialogTrigger as-child>
      <Button class="bg-primary text-white">
        <Users2Icon class="w-5 h-5 mr-2" /> Generate Group
      </Button>
    </DialogTrigger>

    <!-- Content -->
    <DialogContent
      class="max-w-2xl w-full rounded-xl p-6"
    >
      <DialogHeader>
        <DialogTitle>
          Generate Groups
        </DialogTitle>
      </DialogHeader>

      <!-- Table -->
      <div class="overflow-auto">
        <table class="w-full text-left border rounded-md">
          <thead class="border-b">
            <tr class="text-sm text-muted-foreground">
              <th class="py-2 px-4">
                Group Name
              </th>
              <th class="py-2 px-4">
                Court Numbers
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(group, idx) in groups"
              :key="idx"
              class="border-b text-sm"
            >
              <td class="py-2 px-4 font-medium">
                {{ group.name }}
              </td>
              <td class="py-2 px-4">
                {{ group.courts.join(' ') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-6">
        <Button
          @click="open = false"
        >
          Done
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shares/ui/dialog';
import { Users2Icon, X } from 'lucide-vue-next';
import { ref } from 'vue';

// Example group data
const groups = [
  { name: 'Group A', courts: [1, 2, 3] },
  { name: 'Group B', courts: [4, 5, 6] },
  { name: 'Group C', courts: [7, 8, 9] },
  { name: 'Group D', courts: [7, 8, 9] },
  { name: 'Group E', courts: [7, 8, 9] },
];

const open = ref(false);
</script>
