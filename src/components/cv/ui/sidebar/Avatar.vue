<template>
  <div class="avatar-wrap">
    <v-img
        :src="src"
        alt="Avatar"
        cover
        width="240"
        height="240"
        aspect-ratio="1"
        class="avatar-photo"
    />
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true }
})
</script>

<style scoped>
.avatar-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.avatar-photo {
  width: 240px !important;
  height: 240px !important;
  flex: 0 0 240px;
  max-width: 240px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #00bcd4;
  box-shadow: 0 0 0 4px rgba(0, 188, 212, 0.18);
}

.avatar-photo :deep(.v-img__img),
.avatar-photo :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover !important;
  object-position: 50% 28%;
  border-radius: 50%;
  image-rendering: auto;
}
</style>
