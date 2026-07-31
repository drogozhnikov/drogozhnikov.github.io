<template>
  <div class="cv-print-container">
    <!-- ЛЕВАЯ КОЛОНКА (SIDEBAR) -->
    <aside class="sidebar">
      <div v-if="data.avatar" class="avatar-container">
        <img :src="data.avatar" alt="Profile photo" class="profile-avatar" />
      </div>

      <div class="profile-name">
        {{ data.lastName }}<br />
        {{ data.firstName }} {{ data.middleName || '' }}
      </div>
      <div class="profile-title">{{ data.profession }}</div>

      <!-- Контакты -->
      <section class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.contact }}</h3>
        <div v-for="(contact, i) in data.contacts" :key="i" class="contact-item">
          <span class="contact-label">{{ contact.text }}</span>
          <a :href="contact.url" class="contact-value" target="_blank">
            {{ contact.url !== '#' ? contact.url.replace(/^mailto:|^tel:|^https?:\/\//, '') : contact.text === 'Локация' ? 'Минск' : '' }}
          </a>
        </div>
      </section>

      <!-- Личные данные -->
      <section class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.personal }}</h3>
        <div v-for="(item, i) in data.personal" :key="i" class="info-item">
          <span class="info-label">{{ item.label }}</span>
          <span class="info-value">{{ item.value }}</span>
        </div>
      </section>

      <!-- Стек -->
      <section class="sidebar-section">
        <h3 class="sidebar-title">{{ data.labels.software }}</h3>
        <div class="badge-container">
          <span v-for="(tech, i) in data.software" :key="i" class="badge">
            {{ tech.name }}
          </span>
        </div>
      </section>

      <!-- Навыки -->
      <section v-if="data.skills && data.skills.length" class="sidebar-section">
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
    </aside>

    <!-- ПРАВАЯ КОЛОНКА -->
    <main class="main-content">
      <!-- Желаемая должность -->
      <header v-if="data.desiredPosition" class="desired-header">
        <h1 class="desired-title">{{ data.desiredPosition.title }}</h1>
        <div class="meta-pills">
          <span class="meta-pill">{{ data.desiredPosition.employment }}</span>
          <span v-for="(s, i) in data.desiredPosition.schedule" :key="i" class="meta-pill">{{ s }}</span>
        </div>
      </header>

      <!-- О себе -->
      <section v-if="data.about && data.about.length" class="main-section">
        <h2 class="section-title">{{ data.labels.about }}</h2>
        <div v-for="(item, i) in data.about" :key="i" class="about-block">
          <p class="about-text">{{ item.text }}</p>
          <ul v-if="item.subtext && item.subtext.length" class="custom-list">
            <li v-for="(sub, j) in item.subtext" :key="j">{{ sub }}</li>
          </ul>
        </div>
      </section>

      <!-- Опыт работы -->
      <section v-if="data.experience && data.experience.length" class="main-section">
        <h2 class="section-title">{{ data.labels.experience }}</h2>
        <article v-for="(exp, i) in data.experience" :key="i" class="exp-item">
          <div class="exp-header">
            <div class="exp-title-row">
              <span class="exp-role">{{ exp.role }}</span>
              <span class="exp-company"> — {{ exp.company }}</span>
            </div>
            <div class="exp-date">
              {{ exp.startDate }} — {{ exp.endDate }} <span v-if="exp.duration">({{ exp.duration }})</span>
            </div>
          </div>

          <div v-if="exp.responsibilities && exp.responsibilities.length">
            <div class="sub-heading">{{ data.labels.responsibilities }}:</div>
            <ul class="custom-list">
              <li v-for="(resp, j) in exp.responsibilities" :key="j">{{ resp }}</li>
            </ul>
          </div>

          <div v-if="exp.achievements && exp.achievements.length">
            <div class="sub-heading">{{ data.labels.achievements }}:</div>
            <ul class="custom-list achievements-list">
              <li v-for="(ach, j) in exp.achievements" :key="j">{{ ach }}</li>
            </ul>
          </div>
        </article>
      </section>

      <!-- Образование -->
      <section v-if="data.education && data.education.length" class="main-section">
        <h2 class="section-title">{{ data.labels.education }}</h2>
        <article v-for="(edu, i) in data.education" :key="i" class="edu-item">
          <div class="edu-header">
            <span class="edu-title">{{ edu.title }}</span>
            <span class="edu-period">{{ edu.period }}</span>
          </div>
          <div class="edu-details">{{ edu.faculty }}, {{ edu.department }}</div>
          <div v-if="edu.details" class="edu-badge">{{ edu.details }}</div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.cv-print-container {
  width: 210mm;
  min-height: 297mm;
  display: flex;
  background-color: #ffffff;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  font-size: 8.5pt;
  line-height: 1.35;
  box-sizing: border-box;
}

.sidebar {
  width: 30%;
  background-color: #0f172a;
  color: #f8fafc;
  padding: 12mm 6mm 10mm 8mm;
  box-sizing: border-box;
}

.avatar-container {
  margin-bottom: 10px;
}

.profile-avatar {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #38bdf8;
}

.profile-name {
  font-size: 13pt;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
}

.profile-title {
  font-size: 9.5pt;
  color: #38bdf8;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #334155;
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
}

.contact-value, .info-value {
  color: #e2e8f0;
  text-decoration: none;
  word-break: break-all;
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
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e2e8f0;
}

.desired-title {
  font-size: 13pt;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.meta-pills {
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.meta-pill {
  font-size: 7.5pt;
  background-color: #f1f5f9;
  color: #475569;
  padding: 1px 6px;
  border-radius: 4px;
}

.section-title {
  font-size: 9.5pt;
  font-weight: 700;
  text-transform: uppercase;
  color: #0f172a;
  margin: 10px 0 6px 0;
  padding-bottom: 2px;
  border-bottom: 2px solid #0284c7;
}

.about-text {
  font-size: 8pt;
  margin: 0 0 4px 0;
}

.exp-item {
  margin-bottom: 10px;
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

.edu-item {
  margin-bottom: 6px;
}

.edu-header {
  display: flex;
  justify-content: space-between;
}

.edu-title {
  font-size: 8.5pt;
  font-weight: 700;
  color: #0f172a;
}

.edu-period {
  font-size: 7.5pt;
  color: #64748b;
}

.edu-details {
  font-size: 7.8pt;
  color: #475569;
}

.edu-badge {
  font-size: 7pt;
  color: #0284c7;
  font-weight: 600;
  margin-top: 2px;
}
</style>