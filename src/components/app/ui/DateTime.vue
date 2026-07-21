<template>

  <v-chip class="v-chip-time">{{formattedTime}}</v-chip>
  <v-chip class="v-chip-date">{{formattedDate}}</v-chip>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const currentTime = ref(null);
let timerId = null;

const updateTime = () => {
  currentTime.value = new Date();
};
const formattedTime = computed(() => {
  if (!currentTime.value) return '...';
  return currentTime.value.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
});

const formattedDate = computed(() => {
  if (!currentTime.value) return '...';
  return currentTime.value.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
onMounted(() => {
  updateTime();
  timerId = setInterval(updateTime, 1000);
});
onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId);
  }
});
</script>

<style scoped>

.v-chip-time {
  width: 100px;
  margin: 0 auto 0 20px;
}
.v-chip-date {
  width: 350px;
  margin: 0 auto;
}
</style>
