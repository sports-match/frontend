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

      <!-- Toggle Email / SMS -->
      <div class="flex gap-3 mb-4">
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
      </div>

      <!-- All Players Switch -->
      <div class="flex items-center gap-2 mb-4">
        <Switch v-model:checked="allPlayers" />
        <span class="text-sm font-medium">All Players</span>
      </div>

      <!-- Select Players Input -->
      <div class="mb-4">
        <!-- <span class="text-muted-foreground text-sm flex-1">Select Players</span>
        <Plus class="w-4 h-4 cursor-pointer" /> -->
        <MultiSelect
          v-model="form.player"
          :options="players"
          value-key="id"
          label-key="name"
          return-type="value"
          placeholder="Select Players"
        />
      </div>

      <!-- Message Input -->
      <Textarea
        v-model="message"
        placeholder="Message"
        class="mb-6 h-40"
      />

      <!-- Footer Button -->
      <div class="flex justify-end">
        <Button class="bg-blue-500 text-white hover:bg-blue-600">
          <Send class="w-4 h-4 mr-2" />
          Send Remind
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import MultiSelect from '@/components/shares/MultiSelect.vue';
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
import { Mail, Send, Smartphone } from 'lucide-vue-next';
import { ref } from 'vue';

const open = ref(false);
const method = ref<string>('email');
const allPlayers = ref(false);
const message = ref('');
const form = ref({
  player: [],
});

const players = ref([]);
</script>
