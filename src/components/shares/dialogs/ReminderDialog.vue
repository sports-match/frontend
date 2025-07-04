<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>

    <DialogContent class="max-w-2xl p-6 rounded-2xl">
      <DialogHeader>
        <DialogTitle>
          Remind
        </DialogTitle>
      </DialogHeader>
      <form @submit.prevent="sendReminder">
        <!-- Toggle Email / SMS -->
        <!-- <div class="flex gap-3 mb-4">
          <Button
            v-for="opt in [
              { key: 'email', icon: Mail, label: 'Email' },
              { key: 'sms', icon: Smartphone, label: 'SMS' },
            ]"
            :key="opt.key"
            :variant="method === opt.key ? 'outline' : 'ghost'"
            class="flex items-center gap-2 border flex-col min-w-[90px] py-2" :class="[
              method === opt.key ? 'ring-2 ring-blue-500 border-blue-500' : '',
            ]"
            type="button"
            @click="method = opt.key"
          >
            <span>{{ opt.label }}</span>
          </Button>
        </div> -->

        <!-- All Players Switch -->
        <div v-if="allPlayers" class="flex items-center gap-2 mb-4">
          <Switch v-model:checked="formData.allPlayers" :model-value="formData.allPlayers" :disabled="allPlayers" />
          <span class="text-sm font-medium">All Players</span>
        </div>

        <!-- Select Players Input -->
        <!-- <div class="mb-4">
          <MultiSelect
            v-if="!formData.allPlayers"
            v-model="formData.player"
            :options="players"
            value-key="id"
            label-key="name"
            return-type="value"
            placeholder="Select Players"
          />
        </div> -->

        <!-- Message Input -->
        <Textarea
          v-model="formData.content"
          placeholder="Message"
          class="mb-6 h-40"
        />

        <!-- Footer Button -->
        <div class="flex justify-end">
          <Button type="submit" class="bg-blue-500 text-white hover:bg-blue-600">
            <Send class="w-4 h-4 mr-2" />
            Send Remind
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import type { Event } from '@/schemas/events';
import type { PropType, Ref } from 'vue';
import { sendEventReminder } from '@/api/event';
import { Button } from '@/components/shares/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shares/ui/dialog';
import { Switch } from '@/components/shares/ui/switch';
import { Textarea } from '@/components/shares/ui/textarea';
import { notify } from '@/composables/notify';
import { Send } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
  playerId: {
    type: Number,
    required: false,
  },
  allPlayers: {
    type: Boolean,
    default: false,
  },
});

const open = ref(false);
// const method = ref<string>('email');
const formData: Ref<{ allPlayers: boolean; players: number[]; content: string }> = ref({
  allPlayers: props.allPlayers,
  players: [],
  content: '',
});

async function sendReminder() {
  try {
    if (props.playerId) {
      formData.value.players = [props.playerId];
    }
    const { data: { data } } = await sendEventReminder(props.event?.id, formData.value);
    open.value = false;
    notify.success(data.message);
  } catch (error) {
    notify.error(error as string);
  }
}
</script>
