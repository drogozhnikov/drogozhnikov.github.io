<template>
  <div class="cv-print-container">
    <aside class="sidebar">
      <div v-if="data.avatar" class="avatar-container">
        <img :src="data.avatar" alt="Profile photo" class="profile-avatar" />
      </div>

      <section v-if="data.personal?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.personal }}</h3>
        <div v-for="(item, i) in data.personal" :key="i" class="info-item">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </section>

      <section v-if="data.contacts?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.contact }}</h3>
        <div v-for="(contact, i) in data.contacts" :key="i" class="contact-item">
          <span class="contact-label">{{ contact.text }}</span>
          <a :href="contact.url" class="contact-value" target="_blank">
            {{ formatContactValue(contact) }}
          </a>
        </div>
      </section>

      <section v-if="data.skills?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.skills }}</h3>
        <div v-for="(skill, i) in data.skills" :key="i" class="skill-item">
          <div class="skill-header">
            <span>{{ skill.name }}</span>
          </div>
          <div class="skill-bar-bg">
            <div class="skill-bar-fill" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </section>

      <section v-if="data.software?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.software }}</h3>
        <div class="badge-container">
          <span v-for="(tech, i) in data.software" :key="i" class="badge">
            {{ tech.name }}
          </span>
        </div>
      </section>

      <section v-if="data.technologies?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.technologies }}</h3>
        <div v-for="(group, g) in data.technologies" :key="g" class="tech-group">
          <div class="tech-category">{{ group.category }}</div>
          <div class="badge-container">
            <span v-for="(item, i) in group.items" :key="i" class="badge">
              {{ item.name }}
            </span>
          </div>
        </div>
      </section>

      <section v-if="data.hobbies?.length" class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.hobbies }}</h3>
        <div class="badge-container">
          <span v-for="(hobby, i) in data.hobbies" :key="i" class="badge">
            {{ hobby.name }}
          </span>
        </div>
      </section>
    </aside>

    <main class="main-content">
      <header class="identity-header">
        <h1 class="identity-name">
          {{ data.lastName }} {{ data.firstName }} {{ data.surname || data.middleName || '' }}
        </h1>
        <div class="identity-role">{{ data.profession }}</div>
      </header>

      <section v-if="data.desiredPosition" class="main-section">
        <h2 class="section-title">
          {{ data.labels.desiredPositionTitle || data.labels.labelsDesired?.title || 'Желаемая должность' }}
        </h2>
        <header class="desired-header">
          <div class="desired-top">
            <h1 class="desired-title">{{ data.desiredPosition.title }}</h1>
            <div v-if="data.desiredPosition.salary" class="desired-salary">
              {{ formatSalary(data.desiredPosition.salary) }}
              {{ data.labels.labelsDesired?.salarySuffix || '' }}
            </div>
          </div>
          <div class="desired-details">
            <div v-if="data.desiredPosition.specializations?.length" class="desired-row">
              <span class="desired-label">{{ data.labels.labelsDesired?.specializations }}:</span>
              {{ data.desiredPosition.specializations.join(' — ') }}
            </div>
            <div v-if="data.desiredPosition.employment" class="desired-row">
              <span class="desired-label">{{ data.labels.labelsDesired?.employment }}:</span>
              {{ data.desiredPosition.employment }}
            </div>
            <div v-if="data.desiredPosition.schedule?.length" class="desired-row">
              <span class="desired-label">{{ data.labels.labelsDesired?.schedule }}:</span>
              {{ data.desiredPosition.schedule.join(', ') }}
            </div>
            <div v-if="data.desiredPosition.travelTime" class="desired-row">
              <span class="desired-label">{{ data.labels.labelsDesired?.travelTime }}:</span>
              {{ data.desiredPosition.travelTime }}
            </div>
          </div>
        </header>
      </section>

      <section v-if="data.experience?.length" class="main-section">
        <h2 class="section-title">
          {{ data.labels.experience }}
          <span v-if="totalExperienceText" class="section-title-meta">
            ({{ totalExperienceText }})
          </span>
        </h2>
        <article v-for="(exp, i) in data.experience" :key="i" class="exp-item">
          <div class="exp-header">
            <div class="exp-title-row">
              <span class="exp-role">{{ exp.role }}</span>
              <span class="exp-company"> — {{ exp.company }}</span>
            </div>
            <div class="exp-date">{{ formatPeriod(exp) }}</div>
            <div v-if="getItemDuration(exp)" class="exp-duration">{{ getItemDuration(exp) }}</div>
          </div>

          <p v-if="exp.summary" class="exp-summary">{{ exp.summary }}</p>

          <div v-if="exp.responsibilities?.length">
            <div class="sub-heading">{{ data.labels.responsibilities }}:</div>
            <ul class="custom-list">
              <li v-for="(resp, j) in exp.responsibilities" :key="j">{{ resp }}</li>
            </ul>
          </div>

          <div v-if="exp.achievements?.length">
            <div class="sub-heading">{{ data.labels.achievements }}:</div>
            <ul class="custom-list achievements-list">
              <li v-for="(ach, j) in exp.achievements" :key="j">{{ ach }}</li>
            </ul>
          </div>

          <div v-if="exp.projects?.length">
            <div class="sub-heading">{{ data.labels.projects }}:</div>
            <div v-for="(project, p) in exp.projects" :key="p" class="project-item">
              <div class="project-name">{{ project.name }}</div>
              <p v-if="project.description" class="project-desc">{{ project.description }}</p>
              <div v-if="project.stack?.length" class="badge-container project-stack">
                <span v-for="(tech, t) in project.stack" :key="t" class="badge badge-light">
                  {{ tech.name }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section v-if="data.education?.length" class="main-section">
        <h2 class="section-title">{{ data.labels.education }}</h2>
        <article v-for="(edu, i) in data.education" :key="i" class="edu-item">
          <div class="edu-header">
            <span class="edu-title">{{ edu.title || edu.institution }}</span>
            <span class="edu-period">{{ edu.period }}</span>
          </div>
          <div v-if="edu.type" class="edu-type">{{ edu.type }}</div>
          <div v-if="edu.faculty" class="edu-details">
            <span class="edu-label">{{ data.labels.faculty }}:</span> {{ edu.faculty }}
          </div>
          <div v-if="edu.department" class="edu-details">
            <span class="edu-label">{{ data.labels.department }}:</span> {{ edu.department }}
          </div>
          <div v-if="edu.details" class="edu-badge">
            <span class="edu-label">{{ data.labels.speciality }}:</span> {{ edu.details }}
          </div>
        </article>
      </section>

      <section v-for="section in narrativeSections" :key="section.key" class="main-section">
        <h2 class="section-title">{{ section.title }}</h2>
        <p v-if="typeof section.items === 'string'" class="about-text">{{ section.items }}</p>
        <div v-else v-for="(item, i) in section.items" :key="i" class="about-block">
          <p class="about-text">{{ item.text }}</p>
          <ul v-if="item.subtext?.length" class="custom-list">
            <li v-for="(sub, j) in item.subtext" :key="j">
              <a
                  v-if="subUrl(sub)"
                  :href="subUrl(sub)"
                  target="_blank"
                  rel="noopener noreferrer"
              >{{ subText(sub) }}</a>
              <template v-else>{{ subText(sub) }}</template>
              <ul v-if="subItems(sub).length" class="custom-list">
                <li v-for="(nested, n) in subItems(sub)" :key="n">{{ nested }}</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </main>
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

const formatSalary = (value) => {
  if (!value) return ''
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const formatPeriod = (exp) => {
  if (exp.period) return exp.period
  const end = exp.endDate || (isEng.value ? 'Present' : 'н.в.')
  return `${exp.startDate} — ${end}`
}

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

const formatContactValue = (contact) => {
  if (!contact?.url || contact.url === '#') return contact.text
  return contact.url.replace(/^mailto:|^tel:|^https?:\/\//, '')
}
</script>

<style scoped>
.cv-print-container {
  width: 100%;
  min-height: 297mm;
  display: flex;
  align-items: stretch;
  background-color: #ffffff;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 8.5pt;
  line-height: 1.35;
  box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.sidebar {
  width: 30%;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 12mm 6mm 10mm 8mm;
  box-sizing: border-box;
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin: 0 0 16px 0;
}

.profile-avatar {
  width: 138px;
  height: 138px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.18);
}

.identity-header {
  margin: 0 0 12px 0;
  padding-bottom: 10px;
  border-bottom: 3px solid #0284c7;
}

.identity-name {
  margin: 0;
  font-size: 20pt;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #0f172a;
}

.identity-role {
  margin-top: 5px;
  font-size: 11pt;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #0284c7;
}

.sidebar-section {
  margin-bottom: 14px;
}

.sidebar-title {
  font-size: 7.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94a3b8;
  margin: 0 0 6px 0;
  padding-bottom: 2px;
  border-bottom: 1px solid #334155;
}

.contact-item, .info-item {
  margin-bottom: 5px;
  font-size: 7.5pt;
}

.contact-label, .info-label {
  color: #64748b;
  display: block;
  font-weight: 700;
}

.contact-value, .info-value {
  color: #e2e8f0;
  text-decoration: none;
  word-break: break-all;
}

.tech-group {
  margin-bottom: 8px;
}

.tech-category {
  font-size: 7pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #38bdf8;
  margin-bottom: 3px;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.badge {
  background-color: #1e293b;
  color: #38bdf8;
  font-size: 7pt;
  padding: 2px 5px;
  border-radius: 3px;
  border: 1px solid #334155;
}

.badge-light {
  background-color: #f1f5f9;
  color: #334155;
  border-color: #e2e8f0;
}

.skill-item {
  margin-bottom: 5px;
}

.skill-header {
  font-size: 7.5pt;
  margin-bottom: 2px;
  color: #cbd5e1;
}

.skill-bar-bg {
  height: 3px;
  background-color: #334155;
  border-radius: 2px;
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  background-color: #38bdf8;
}

.main-content {
  width: 70%;
  padding: 12mm 10mm 10mm 10mm;
  box-sizing: border-box;
}

.desired-header {
  margin-bottom: 4px;
}

.desired-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}

.desired-title {
  font-size: 13pt;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.desired-salary {
  font-size: 10pt;
  font-weight: 700;
  color: #0284c7;
  white-space: nowrap;
}

.desired-details {
  font-size: 8pt;
  color: #475569;
}

.desired-row {
  margin-bottom: 2px;
}

.desired-label {
  font-weight: 700;
  color: #334155;
}

.section-title {
  font-size: 9.5pt;
  font-weight: 700;
  text-transform: uppercase;
  color: #0f172a;
  margin: 8px 0 6px 0;
  padding-bottom: 2px;
  border-bottom: 2px solid #0284c7;
}

.section-title-meta {
  font-weight: 400;
  text-transform: none;
  color: #94a3b8;
}

.about-text {
  font-size: 8pt;
  margin: 0 0 4px 0;
}

.exp-item {
  margin-bottom: 10px;
}

.badge,
.skill-item,
.info-item,
.contact-item,
.tech-group,
.project-item,
.exp-header,
.edu-item,
.desired-header,
.identity-header,
.identity-name,
.identity-role,
.about-block,
li {
  break-inside: avoid;
  page-break-inside: avoid;
}

.exp-header {
  margin-bottom: 2px;
}

.exp-role {
  font-size: 9pt;
  font-weight: 700;
  color: #0f172a;
}

.exp-company {
  font-size: 8.5pt;
  font-weight: 600;
  color: #0284c7;
}

.exp-date {
  font-size: 7.5pt;
  color: #64748b;
  margin-top: 1px;
}

.exp-duration {
  font-size: 7.5pt;
  font-weight: 400;
  color: #94a3b8;
  margin-top: 1px;
}

.exp-summary {
  font-size: 8pt;
  color: #475569;
  margin: 2px 0 4px 0;
}

.sub-heading {
  font-size: 7.5pt;
  font-weight: 700;
  color: #334155;
  margin-top: 3px;
}

.custom-list {
  margin: 2px 0 4px 0;
  padding-left: 12px;
  font-size: 7.8pt;
  color: #334155;
}

.custom-list li {
  margin-bottom: 1px;
}

.achievements-list li {
  color: #0f172a;
}

.project-item {
  margin: 4px 0 6px 12px;
}

.project-name {
  font-size: 8pt;
  font-weight: 700;
  color: #0f172a;
}

.project-desc {
  font-size: 7.5pt;
  color: #475569;
  margin: 1px 0 3px 0;
}

.project-stack {
  margin-top: 2px;
}

.edu-item {
  margin-bottom: 6px;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.edu-title {
  font-size: 8.5pt;
  font-weight: 700;
  color: #0f172a;
}

.edu-period {
  font-size: 7.5pt;
  color: #64748b;
  white-space: nowrap;
}

.edu-type {
  font-size: 7.5pt;
  font-weight: 700;
  color: #0284c7;
  margin-top: 1px;
}

.edu-details {
  font-size: 7.8pt;
  color: #475569;
}

.edu-label {
  font-weight: 700;
  color: #334155;
}

.edu-badge {
  font-size: 7.5pt;
  color: #0284c7;
  font-weight: 600;
  margin-top: 2px;
}
</style>
