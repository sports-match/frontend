<template>
  <Card class="bg-black text-white">
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle>Today --- 8:00 PM</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <h3 class="font-semibold">
        May 9th Mukilteo Mixer Standard Doubles Mixer
      </h3>
      <p class="text-sm mt-1">
        Arena Badminton & Sports Club
      </p>

      <!-- image -->
      <!-- <div class="mt-4 rounded-md overflow-hidden">
        <img
          src="@/assets/images/tennis.svg"
          alt="Event image"
          class="w-full h-auto object-cover color-white overflow-hidden"
        >
      </div> -->
    </CardContent>
    <CardFooter class="flex space-x-2">
      <Button variant="outline" size="sm" class="bg-black text-white border-white">
        <Calendar class="mr-2 size-4" />
        Event Detail
      </Button>
      <Button variant="outline" size="sm" class="bg-black text-white border-white">
        <Link class="mr-2 size-4" />
        Share
      </Button>
      <Button variant="outline" size="sm" class="bg-black text-white border-white">
        <ClockAlert class="size-4" />
      </Button>
      <Button variant="outline" size="sm" class="bg-black text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-white">
        <CircleAlert class="size-4" />
      </Button>
    </CardFooter>
    <!-- Tennis SVG image on the right side -->
    <!-- <div class="right-0 top-0 flex items-end pointer-events-none select-none pr-4">
      <img
        src="@/assets/images/tennis.svg"
        alt="Event image"
        class="h-56 w-auto object-contain"
        draggable="false"
      >
    </div> -->
  </Card>
</template>

<script setup>
import { Button } from '@/components/shares/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shares/ui/card';
import { Calendar, CircleAlert, ClockAlert, Link } from 'lucide-vue-next';
</script>
