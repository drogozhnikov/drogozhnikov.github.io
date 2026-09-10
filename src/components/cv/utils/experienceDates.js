const DEFAULT_YEAR_FORMS = ['год', 'года', 'лет']
const DEFAULT_MONTH_FORMS = ['месяц', 'месяца', 'месяцев']

export const parseDate = (str) => {
  if (!str) return new Date()
  const [month, year] = str.split('.').map(Number)
  return new Date(year, month - 1, 1)
}

export const pluralize = (number, one, few, many) => {
  if (few === many) {
    return Math.abs(number) === 1 ? one : many
  }

  let n = Math.abs(number) % 100
  if (n >= 5 && n <= 20) return many
  n %= 10
  if (n === 1) return one
  if (n >= 2 && n <= 4) return few
  return many
}

export const formatDuration = (totalMonths, labels = {}) => {
  if (totalMonths <= 0) return ''

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const yearForms = labels.yearForms || DEFAULT_YEAR_FORMS
  const monthForms = labels.monthForms || DEFAULT_MONTH_FORMS
  const parts = []

  if (years > 0) {
    parts.push(`${years} ${pluralize(years, ...yearForms)}`)
  }
  if (months > 0) {
    parts.push(`${months} ${pluralize(months, ...monthForms)}`)
  }

  return parts.join(' ')
}

export const formatPeriod = (item, labels = {}) => {
  if (item.period) return item.period

  const months = labels.months || []
  const present = labels.present || 'По настоящее время'
  const start = parseDate(item.startDate)
  const startStr = `${months[start.getMonth()] || ''} ${start.getFullYear()}`.trim()

  if (!item.endDate) {
    return `${startStr} - ${present}`
  }

  const end = parseDate(item.endDate)
  const endStr = `${months[end.getMonth()] || ''} ${end.getFullYear()}`.trim()

  return `${startStr} - ${endStr}`
}

export const calculateMonthsBetween = (startDateStr, endDateStr) => {
  if (!startDateStr) return 0
  const start = parseDate(startDateStr)
  const end = endDateStr ? parseDate(endDateStr) : new Date()
  const total = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  return total > 0 ? total : 0
}
