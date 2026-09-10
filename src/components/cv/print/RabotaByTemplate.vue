<template>
  <div class="hh-pdf-container">
    <!-- Шапка: Фото + ФИО + Личные данные + Контакты -->
    <header class="header-section">
      <div v-if="data.avatar" class="avatar-block">
        <img :src="data.avatar" alt="Avatar" class="avatar-img" />
      </div>

      <div class="header-main">
        <h1 class="user-name">
          {{ data.lastName }} {{ data.firstName }} {{ data.middleName || '' }}
        </h1>

        <div class="personal-info" v-if="data.personal && data.personal.length">
          <div v-for="(item, i) in data.personal" :key="i" class="personal-line">
            <span class="label" v-if="item.label">{{ item.label }}: </span>
            <span class="val">{{ item.value }}</span>
          </div>
        </div>

        <div class="contacts-list" v-if="data.contacts && data.contacts.length">
          <div v-for="(contact, i) in data.contacts" :key="i" class="contact-line">
            <span class="contact-label">{{ contact.text }}: </span>
            <a
                :href="formatHref(contact.url)"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-link"
            >
              {{ contact.url ? contact.url.replace(/^mailto:|^tel:|^https?:\/\//, '') : contact.text }}
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Сопроводительное письмо / О себе -->
    <section
        v-for="section in narrativeSections"
        :key="section.key"
        class="pdf-section"
    >
      <h2 class="section-title">{{ section.title }}</h2>
      <div v-for="(item, i) in section.items" :key="i" class="about-block">
        <p class="about-p">{{ item.text }}</p>
        <ul v-if="item.subtext && item.subtext.length" class="pdf-list">
          <li v-for="(sub, j) in item.subtext" :key="j">
            <a
                v-if="subUrl(sub)"
                :href="subUrl(sub)"
                target="_blank"
                rel="noopener noreferrer"
            >{{ subText(sub) }}</a>
            <template v-else>{{ subText(sub) }}</template>
            <ul v-if="subItems(sub).length" class="pdf-list">
              <li v-for="(nested, n) in subItems(sub)" :key="n">{{ nested }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <!-- Желаемая должность -->
    <section v-if="data.desiredPosition" class="pdf-section">
      <h2 class="section-title">Желаемая должность и зарплата</h2>
      <div class="desired-row">
        <div class="desired-title">{{ data.desiredPosition.title }}</div>
        <div v-if="data.desiredPosition.salary" class="desired-salary">
          {{ data.desiredPosition.salary }} {{ data.labels?.labelsDesired?.salarySuffix }}
        </div>
      </div>
      <div class="desired-details">
        <div v-if="data.desiredPosition.employment">
          <span class="sub-label">Тип занятости:</span> {{ data.desiredPosition.employment }}
        </div>
        <div v-if="data.desiredPosition.schedule && data.desiredPosition.schedule.length">
          <span class="sub-label">Формат работы:</span> {{ data.desiredPosition.schedule.join(', ') }}
        </div>
      </div>
    </section>

    <!-- Опыт работы -->
    <section v-if="data.experience && data.experience.length" class="pdf-section">
      <h2 class="section-title">
        {{ data.labels?.experience || 'Опыт работы' }}
        <span v-if="totalExperienceText" class="section-title-meta">
          ({{ totalExperienceText }})
        </span>
      </h2>

      <article v-for="(exp, i) in data.experience" :key="i" class="exp-item">
        <div class="exp-grid">
          <div class="exp-dates">
            <div class="date-range">{{ exp.startDate }} — {{ exp.endDate || presentLabel }}</div>
            <div v-if="getItemDuration(exp)" class="date-duration">{{ getItemDuration(exp) }}</div>
          </div>

          <div class="exp-body">
            <div class="company-name">{{ exp.company }}</div>
            <div class="role-title">{{ exp.role }}</div>

            <p v-if="exp.summary" class="exp-summary">{{ exp.summary }}</p>

            <div v-if="exp.responsibilities && exp.responsibilities.length" class="sub-block">
              <div class="block-label">{{ data.labels?.responsibilities || 'Обязанности' }}:</div>
              <ul class="pdf-list">
                <li v-for="(resp, j) in exp.responsibilities" :key="j">{{ resp }}</li>
              </ul>
            </div>

            <div v-if="exp.achievements && exp.achievements.length" class="sub-block">
              <div class="block-label">{{ data.labels?.achievements || 'Достижения' }}:</div>
              <ul class="pdf-list">
                <li v-for="(ach, j) in exp.achievements" :key="j">{{ ach }}</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- Образование -->
    <section v-if="data.education && data.education.length" class="pdf-section">
      <h2 class="section-title">{{ data.labels?.education || 'Образование' }}</h2>
      <article v-for="(edu, i) in data.education" :key="i" class="edu-item">
        <div class="edu-grid">
          <div class="edu-year">{{ edu.period || edu.year }}</div>
          <div class="edu-body">
            <div class="edu-university">{{ edu.title }}</div>
            <div class="edu-spec" v-if="edu.faculty || edu.department">
              {{ edu.faculty }}<span v-if="edu.faculty && edu.department">, </span>{{ edu.department }}
            </div>
            <div class="edu-details" v-if="edu.details">{{ edu.details }}</div>
          </div>
        </div>
      </article>
    </section>

    <!-- Навыки / Стек -->
    <section v-if="data.software && data.software.length" class="pdf-section">
      <h2 class="section-title">{{ data.labels?.software || 'Навыки' }}</h2>
      <div class="skills-tags">
        <span v-for="(tech, i) in data.software" :key="i" class="skill-tag">
          {{ tech.name }}
        </span>
      </div>
    </section>

    <!-- Технологии -->
    <section v-if="data.technologies && data.technologies.length" class="pdf-section">
      <h2 class="section-title">{{ data.labels?.technologies || 'Технологии' }}</h2>
      <div v-for="(group, g) in data.technologies" :key="g" class="tech-group">
        <div class="tech-category">{{ group.category }}</div>
        <div class="skills-tags">
          <span v-for="(item, i) in group.items" :key="i" class="skill-tag">
            {{ item.name }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const hasBlocks = (value) => {
  if (!value) return false
  if (typeof value === 'string') return value.length > 0
  return value.length > 0
}

const subText = (sub) => (typeof sub === 'string' ? sub : (sub?.text ?? ''))
const subUrl = (sub) => (typeof sub === 'string' ? '' : (sub?.url ?? ''))
const subItems = (sub) => (typeof sub === 'string' ? [] : (sub?.items || []))

const narrativeSections = computed(() => {
  const sections = []
  if (hasBlocks(props.data.coverLetter)) {
    sections.push({
      key: 'coverLetter',
      title: props.data.labels?.coverLetter || 'Сопроводительное письмо',
      items: props.data.coverLetter
    })
  }
  if (hasBlocks(props.data.about)) {
    sections.push({
      key: 'about',
      title: props.data.labels?.about || 'О себе',
      items: props.data.about
    })
  }
  return sections
})

const parseDate = (str) => {
  if (!str) return new Date()
  const [month, year] = str.split('.').map(Number)
  return new Date(year, month - 1, 1)
}

const pluralize = (number, one, two, five) => {
  let n = Math.abs(number) % 100
  if (n >= 5 && n <= 20) return five
  n %= 10
  if (n === 1) return one
  if (n >= 2 && n <= 4) return two
  return five
}

const formatDuration = (totalMonths, eng) => {
  if (totalMonths <= 0) return ''

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const parts = []

  if (eng) {
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  } else {
    if (years > 0) parts.push(`${years} ${pluralize(years, 'год', 'года', 'лет')}`)
    if (months > 0) parts.push(`${months} ${pluralize(months, 'месяц', 'месяца', 'месяцев')}`)
  }

  return parts.join(' ')
}

const calculateMonthsBetween = (startDateStr, endDateStr) => {
  if (!startDateStr) return 0
  const start = parseDate(startDateStr)
  const end = endDateStr ? parseDate(endDateStr) : new Date()
  const total = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return total > 0 ? total : 0
}

const isEng = computed(() => /experience/i.test(props.data.labels?.experience || ''))

const presentLabel = computed(() => (
  isEng.value ? 'Present' : 'По настоящее время'
))

const totalExperienceText = computed(() => {
  const list = props.data?.experience
  if (!list?.length) return ''

  let totalMonths = 0
  list.forEach((item) => {
    totalMonths += calculateMonthsBetween(item.startDate, item.endDate)
  })

  return formatDuration(totalMonths, isEng.value)
})

const getItemDuration = (item) => {
  if (!item?.startDate) return ''
  return formatDuration(calculateMonthsBetween(item.startDate, item.endDate), isEng.value)
}

const formatHref = (url) => {
  if (!url || url === '#') return '#'
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('tel:')) {
    return url
  }
  if (url.includes('@') && !url.includes('/')) {
    return `mailto:${url}`
  }
  if (url.startsWith('+') || /^\d+$/.test(url.replace(/[\s()-]/g, ''))) {
    return `tel:${url.replace(/\s+/g, '')}`
  }
  return `https://${url}`
}
</script>

<!-- ГЛОБАЛЬНЫЕ СТИЛИ ПЕЧАТИ (БЕЗ SCOPED) -->
<style>
@page {
  size: A4 portrait;
  /* Сбрасываем поля @page, чтобы не суммировать их с дефолтными полями браузера */
  margin: 0;
}

@media print {
  html, body {
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .hh-pdf-container {
    width: 100% !important;
    max-width: 100% !important;
    min-height: 297mm !important;
    margin: 0 !important;
    padding: 8mm 10mm !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
  }

  a {
    text-decoration: underline !important;
    color: #1256a0 !important;
  }
}
</style>

<!-- ЛОКАЛЬНЫЕ СТИЛИ КОМПОНЕНТА -->
<style scoped>
.hh-pdf-container {
  width: 100%;
  min-height: 297mm;
  box-sizing: border-box;
  padding: 12mm 15mm;
  background-color: #ffffff;
  color: #222222;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 9pt;
  line-height: 1.4;
  margin: 0;
}

/* Шапка */
.header-section {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: flex-start;
}

.avatar-block {
  flex-shrink: 0;
}

.avatar-img {
  width: 195px;
  height: 195px;
  object-fit: cover;
  border-radius: 6px;
}

.header-main {
  flex-grow: 1;
  min-width: 0;
}

.user-name {
  font-size: 17pt;
  font-weight: 700;
  color: #000000;
  margin: 0 0 6px 0;
  line-height: 1.1;
}

.personal-info {
  font-size: 8.5pt;
  color: #444444;
  margin-bottom: 6px;
}

.personal-line {
  margin-bottom: 2px;
  display: block;
}

.personal-line .label {
  color: #666666;
}

.contacts-list {
  font-size: 8.5pt;
}

.contact-line {
  margin-bottom: 3px;
  display: block;
}

.contact-label {
  color: #666666;
}

.contact-link {
  color: #1256a0 !important;
  text-decoration: underline !important;
  font-weight: 500;
  word-break: break-all;
}

/* Секции */
.pdf-section {
  margin-bottom: 14px;
}

.section-title {
  font-size: 10.5pt;
  font-weight: 700;
  color: #1256a0;
  border-bottom: 1.5px solid #1256a0;
  padding-bottom: 2px;
  margin: 0 0 8px 0;

  break-after: avoid !important;
  page-break-after: avoid !important;
}

.section-title-meta {
  font-weight: 400;
  color: #9e9e9e;
}

.about-p {
  margin: 0 0 6px 0;
  font-size: 8.5pt;
}

/* Желаемая должность */
.desired-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}

.desired-title {
  font-size: 10.5pt;
  font-weight: 700;
  color: #000000;
}

.desired-salary {
  font-size: 9.5pt;
  font-weight: 700;
  color: #222222;
  white-space: nowrap;
  flex-shrink: 0;
}

.desired-details {
  font-size: 8.5pt;
  color: #555555;
}

.sub-label {
  color: #777777;
}

/* Опыт работы */
.exp-item {
  margin-bottom: 12px;
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

.exp-grid {
  display: flex;
  gap: 12px;
}

.exp-dates {
  width: 38mm; /* Компактная колонка дат */
  flex-shrink: 0;
  font-size: 8.5pt;
}

.date-range {
  color: #222222;
  font-weight: 600;
  line-height: 1.25;
  word-break: break-word;
}

.date-duration {
  color: #9e9e9e;
  font-size: 8pt;
  font-weight: 400;
  margin-top: 2px;
}

.exp-body {
  flex-grow: 1;
  min-width: 0; /* Не даёт flex-элементу раздувать ширину */
}

.company-name {
  font-size: 9.5pt;
  font-weight: 700;
  color: #000000;
}

.role-title {
  font-size: 9pt;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
}

.exp-summary {
  font-size: 8.5pt;
  color: #444444;
  margin: 0 0 4px 0;
}

.sub-block {
  margin-top: 4px;
}

.block-label {
  font-weight: 700;
  font-size: 8.5pt;
  color: #222222;
  margin-bottom: 2px;
}

.pdf-list {
  margin: 0;
  padding-left: 15px;
  font-size: 8.5pt;
  color: #333333;
}

.pdf-list li {
  margin-bottom: 2px;
  line-height: 1.3;
}

/* Образование */
.edu-item {
  margin-bottom: 8px;
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

.edu-grid {
  display: flex;
  gap: 12px;
}

.edu-year {
  width: 38mm;
  flex-shrink: 0;
  font-size: 8.5pt;
  font-weight: 600;
  color: #666666;
}

.edu-body {
  flex-grow: 1;
  min-width: 0;
}

.edu-university {
  font-size: 9pt;
  font-weight: 700;
  color: #000000;
}

.edu-spec {
  font-size: 8.5pt;
  color: #444444;
}

.edu-details {
  font-size: 8pt;
  color: #777777;
}

/* Навыки / Теги */
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}

.skill-tag {
  background-color: #f2f4f7;
  color: #222222;
  font-size: 8pt;
  padding: 2px 7px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
  break-inside: avoid;
  page-break-inside: avoid;
}

.tech-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 6px;
  break-inside: avoid;
  page-break-inside: avoid;
}

.tech-category {
  width: 42mm;
  flex-shrink: 0;
  font-size: 8pt;
  font-weight: 700;
  color: #777777;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.35;
  padding-top: 3px;
  margin: 0;
}

.tech-group .skills-tags {
  flex: 1;
  min-width: 0;
}

li {
  break-inside: avoid;
  page-break-inside: avoid;
}

.about-block {
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}
</style>