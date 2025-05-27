<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div class="bg-[#1e1e1e] text-white rounded-xl p-6 w-[350px] text-center shadow-lg">
      <div class="flex justify-center mb-4">
        <div class="bg-red-500 rounded-full p-4">
          <UserIcon class="text-white w-6 h-6" />
        </div>
      </div>
      <h2 class="font-semibold text-white text-base mb-1">
        Profile Pending Approval
      </h2>
      <p class="text-sm text-gray-300">
        Your profile is currently under review. You will be notified once it has been approved.
      </p>
      <Button
        variant="link"
        class="text-white text-opacity-50"
        @click="$router.push('/auth/login')"
      >
        <ChevronLeft class="inline size-4 mr-1" />
        Back to Login
      </Button>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/shares/ui/button';
import { ChevronLeft, UserIcon } from 'lucide-vue-next';
</script>
