<template>
  <div class="cv-liquid-glass">
    <Teleport to="body">
      <svg class="cv-liquid-glass-svg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <filter
              :id="filterId"
              x="-15%"
              y="-15%"
              width="130%"
              height="130%"
              color-interpolation-filters="sRGB"
          >
            <feTurbulence
                type="turbulence"
                baseFrequency="0.008"
                numOctaves="2"
                seed="3"
                result="noise"
            />
            <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="120"
                xChannelSelector="R"
                yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </Teleport>

    <div
        class="cv-liquid-glass-filter"
        :style="{ filter: `url(#${filterId}) saturate(120%) brightness(1.15)` }"
    />
    <div class="cv-liquid-glass-overlay" />
    <div class="cv-liquid-glass-specular" />
    <div class="cv-liquid-glass-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useId } from 'vue'

const filterId = `cv-liquid-glass-${useId().replace(/\W/g, '')}`
</script>

<style>
.cv-liquid-glass {
  --glass-bg: rgba(18, 12, 8, 0.36);
  --glass-highlight: rgba(255, 255, 255, 0.45);

  position: relative;
  overflow: hidden;
  height: 100%;
}

.cv-liquid-glass-svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

.cv-liquid-glass-filter,
.cv-liquid-glass-overlay,
.cv-liquid-glass-specular {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.cv-liquid-glass-filter {
  z-index: 0;
  transform: translateZ(0);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.cv-liquid-glass-overlay {
  z-index: 1;
  background:
    radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 70%),
    var(--glass-bg);
}

.cv-liquid-glass-specular {
  z-index: 2;
  box-shadow: inset 1px 1px 1px var(--glass-highlight);
}

.cv-liquid-glass-content {
  position: relative;
  z-index: 3;
  height: 100%;
}

@supports not ((backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))) {
  .cv-liquid-glass-overlay {
    background: rgba(40, 34, 30, 0.92);
  }
}
</style>
