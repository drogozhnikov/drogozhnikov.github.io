<template>
  <svg style="position: absolute; width: 0; height: 0; pointer-events: none">
    <filter :id="filterId" x="-2=0%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feImage :href="mapUrl" x="0" y="0" :width="width" :height="height" result="map" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="map"
        :scale="refractionScale"
        xChannelSelector="R"
        yChannelSelector="G"
        edgeMode="edge"
      />
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="blur" in2="SourceGraphic" operator="over" />
    </filter>
  </svg>

  <v-container
    :class="['liquid-glass-container', customClass]"
    :style="containerStyle"
  >
    <slot></slot>
    <div class="glass-highlight" :style="highlightStyle"></div>
  </v-container>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
  width: { type: Number, default: 800 },
  height: { type: Number, default: 400 },
  refractionScale: { type: Number, default: 60 }, // Сила преломления
  bezelWidth: { type: Number, default: 30 },      // Ширина рамки преломления
  customClass: { type: String, default: '' }
});

const filterId = `liquid-glass-${Math.random().toString(36).substr(2, 9)}`;
const mapUrl = ref('');

// Генерация карты смещения на Canvas (аналог логики из статьи)
const generateDisplacementMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = props.width;
  canvas.height = props.height;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(props.width, props.height);

  for (let y = 0; y < props.height; y++) {
    for (let x = 0; x < props.width; x++) {
      // 1. Считаем расстояние до ближайшего края (для создания формы линзы)
      const distToEdgeX = Math.min(x, props.width - x);
      const distToEdgeY = Math.min(y, props.height - y);
      const dist = Math.min(distToEdgeX, distToEdgeY);

      let offsetX = 0;
      let offsetY = 0;

      if (dist < props.bezelWidth) {
        // Упрощенная модель преломления:
        // Нормализуем расстояние 0...1 и применяем функцию Convex (как в статье)
        const t = dist / props.bezelWidth;
        const power = 1 - Math.sqrt(1 - Math.pow(1 - t, 2)); // Convex Circle

        // Определяем направление вектора преломления
        const dirX = x < props.width / 2 ? 1 : -1;
        const dirY = y < props.height / 2 ? 1 : -1;

        offsetX = (distToEdgeX < distToEdgeY) ? dirX * power : 0;
        offsetY = (distToEdgeY < distToEdgeX) ? dirY * power : 0;
      }

      const idx = (y * props.width + x) * 4;
      // R = X смещение, G = Y смещение (128 - нейтраль)
      imgData.data[idx] = 128 + offsetX * 127;
      imgData.data[idx + 1] = 128 + offsetY * 127;
      imgData.data[idx + 2] = 128; // B не используется
      imgData.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  mapUrl.value = canvas.toDataURL();
};

onMounted(() => {
  generateDisplacementMap();
});

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  backdropFilter: `url(#${filterId})`,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '25px',
  background: 'var.$background05',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  alignItems: 'center',
  justifyContent: 'center'
}));

const highlightStyle = computed(() => ({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  borderRadius: 'inherit',
  background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)',
  mixBlendMode: 'overlay'
}));
</script>

<style scoped lang="sass">
@use '@/styles/variables' as var
.liquid-glass-container
  /* Важно для корректной работы фильтра в Chrome */
  background-color: var.$background05
  transform: translateZ(0)
  box-shadow: 0 10px 30px rgba(0,0,0,0.3)
  transition: all 0.3s ease

</style>
