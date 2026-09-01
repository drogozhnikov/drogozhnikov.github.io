<template>
  <div class="mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>
    <div v-for="(contact, index) in contacts" :key="index" class="contact-row">
      <span class="contact-icon">
        <v-icon :icon="contact.icon" size="18" />
      </span>
      <a
          :href="contact.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-link text-decoration-none"
      >
        <span class="contact-label">{{ contact.text }}</span>
        <span class="contact-value">{{ formatContactValue(contact) }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'CONTACT' },
  contacts: { type: Array, default: () => [] }
})

const formatContactValue = (contact) => {
  const url = contact?.url || ''
  if (!url || url === '#') return ''

  if (url.startsWith('tel:')) {
    const digits = url.replace(/^tel:/, '')
    const match = digits.match(/^\+375(\d{2})(\d{3})(\d{2})(\d{2})$/)
    if (match) return `+375 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
    return digits
  }

  if (url.startsWith('mailto:')) return url.replace(/^mailto:/, '')

  try {
    const parsed = new URL(url)
    const path = decodeURIComponent(parsed.pathname).replace(/\/$/, '')
    if (parsed.host.includes('linkedin.com')) {
      const slug = path.replace(/^\/in\//, '')
      return slug ? `in/${slug}` : parsed.host
    }
    return `${parsed.host}${path}`.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
}
</script>

<style scoped>
.contact-row {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  column-gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.contact-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.contact-icon :deep(.v-icon) {
  width: 18px !important;
  height: 18px !important;
  font-size: 18px !important;
}

.contact-icon :deep(svg) {
  width: 18px !important;
  height: 18px !important;
  max-width: 18px;
  max-height: 18px;
  display: block;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  line-height: 1.3;
}

.contact-label {
  flex: 0 0 auto;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
}

.contact-value {
  min-width: 0;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.8rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-link:hover .contact-label,
.contact-link:hover .contact-value {
  text-decoration: underline;
}
</style>
