<template>
  <Card class="w-full max-w-sm space-y-4 p-4">
    <!-- Title -->
    <CardHeader class="p-0">
      <CardTitle class="text-lg font-semibold">
        {{ eventTitle }}
      </CardTitle>
    </CardHeader>

    <!-- Progress bar -->
    <div>
      <Progress :model-value="progress" class="h-2 bg-gray-200 rounded-full" />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>Signed up</span>
        <span>{{ signedUp }}/{{ capacity }}</span>
      </div>
    </div>

    <!-- Organizer & Location -->
    <div class="flex justify-between text-sm">
      <div>
        <p class="font-medium">
          Organizer
        </p>
        <p>{{ organizer }}</p>
      </div>
      <div>
        <p class="font-medium">
          Location
        </p>
        <p>{{ location }}</p>
      </div>
    </div>

    <!-- Courts & Sign Up Button -->
    <div class="flex justify-between items-center">
      <div class="text-sm">
        <p class="font-medium">
          Courts
        </p>
        <p>{{ courts }}</p>
      </div>
      <Button variant="default" class="flex items-center space-x-2">
        <FilePlus class="w-4 h-4" />
        <span>Sign Up</span>
      </Button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@/components/shares/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/shares/ui/card';
import { Progress } from '@/components/shares/ui/progress';
import { FilePlus } from 'lucide-vue-next';

// Event Data (passed in Script)
const eventTitle = 'May 9th Mukilteo Mixer Standard Doubles Mixer';
const signedUp = 20;
const capacity = 25;
const progress = (signedUp / capacity) * 100;
const organizer = 'Northwest Badminton Academy';
const location = 'Northwest Badminton Academy';
const courts = 4;
</script>
