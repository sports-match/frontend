<template>
  <Dialog v-model:open="open">
    <!-- Trigger -->
    <DialogTrigger as-child>
      <Button class="bg-primary text-white" @click="generateGroup">
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
              v-for="(group, idx) in currentGroups"
              :key="idx"
              class="border-b text-sm"
            >
              <td class="py-2 px-4 font-medium">
                {{ group.name }}
              </td>
              <td class="py-2 px-4">
                {{ group.courtNumbers }}
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
import type { Ref } from 'vue';
import { generateGroups, getEventGroups } from '@/api/event';
import { Button } from '@/components/shares/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shares/ui/dialog';
import { notify } from '@/composables/notify';
import { Users2Icon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  groups: { name: string; courtNumbers: string }[];
}>();

const emit = defineEmits(['pullGroups']);
const route = useRoute();
const { id } = route.params;

// Example group data
const currentGroups: Ref<{ name: string; courtNumbers: string }[]> = ref(
  JSON.parse(JSON.stringify(props.groups)),
);

const open = ref(false);
async function generateGroup() {
  try {
    if (props.groups.length) {
      return;
    }
    const { data: { message } } = await generateGroups(id as string);
    notify.success(message);
    emit('pullGroups');
  } catch (error) {
    notify.error (error as string);
  }
}
</script>
