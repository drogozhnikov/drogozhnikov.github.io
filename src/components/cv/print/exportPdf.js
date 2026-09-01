import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

const KEEP_SELECTORS = [
  '.badge',
  '.badge-light',
  '.skill-tag',
  '.skill-item',
  '.info-item',
  '.contact-item',
  '.contact-line',
  '.personal-line',
  '.tech-group',
  '.tech-category',
  '.project-item',
  '.exp-header',
  '.exp-title-row',
  '.edu-item',
  '.edu-header',
  '.section-title',
  '.sidebar-title',
  '.desired-header',
  '.identity-header',
  '.identity-name',
  '.identity-role',
  '.desired-row',
  '.about-block',
  '.profile-name',
  '.profile-title',
  '.avatar-container',
  '.avatar-block',
  '.header-section',
  '.sub-heading',
  '.block-label',
  'li',
].join(',')

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function collectKeepRects(element, ratio, maxKeepPx) {
  const root = element.getBoundingClientRect()
  const rects = []

  for (const node of element.querySelectorAll(KEEP_SELECTORS)) {
    const box = node.getBoundingClientRect()
    const height = box.height * ratio
    if (height < 2 || height > maxKeepPx) continue

    rects.push({
      top: (box.top - root.top) * ratio,
      bottom: (box.bottom - root.top) * ratio,
    })
  }

  return rects.sort((a, b) => a.top - b.top)
}

function cutsRect(y, rect) {
  return y > rect.top + 1 && y < rect.bottom - 1
}

function findBreakY(pageStart, pageHeight, totalHeight, rects) {
  const ideal = Math.min(pageStart + pageHeight, totalHeight)
  if (ideal >= totalHeight - 2) return totalHeight

  const minY = pageStart + pageHeight * 0.52
  const hitting = rects
    .filter((rect) => rect.bottom > pageStart + 2 && cutsRect(ideal, rect))
    .sort((a, b) => a.top - b.top)

  if (hitting.length && hitting[0].top >= minY) {
    return Math.max(pageStart + 8, Math.round(hitting[0].top))
  }

  const candidates = new Set([ideal])
  for (const rect of rects) {
    if (rect.top >= minY && rect.top <= ideal) candidates.add(rect.top)
    if (rect.bottom >= minY && rect.bottom <= ideal) candidates.add(rect.bottom)
  }

  const sorted = [...candidates].sort((a, b) => b - a)
  for (const y of sorted) {
    if (y < minY) continue
    if (!rects.some((rect) => cutsRect(y, rect))) return Math.round(y)
  }

  return Math.round(ideal)
}

function buildSlices(totalHeight, pageHeight, rects) {
  const slices = []
  let y = 0

  while (y < totalHeight - 1) {
    const remaining = totalHeight - y
    if (remaining <= pageHeight + 2) {
      slices.push({ start: y, height: remaining })
      break
    }

    const breakY = findBreakY(y, pageHeight, totalHeight, rects)
    const height = Math.max(8, breakY - y)
    slices.push({ start: y, height })
    y += height
  }

  return slices
}

function paintPage(source, slice, pageWidth, pageHeight, sidebarWidth) {
  const page = document.createElement('canvas')
  page.width = pageWidth
  page.height = pageHeight

  const ctx = page.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, pageWidth, pageHeight)

  if (sidebarWidth > 0) {
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, sidebarWidth, pageHeight)
  }

  ctx.drawImage(
    source,
    0,
    slice.start,
    source.width,
    slice.height,
    0,
    0,
    source.width,
    slice.height,
  )

  return page
}

export async function exportElementToPdf(element, filename) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: 794,
    onclone(_doc, clonedEl) {
      clonedEl.style.width = '210mm'
      clonedEl.style.maxWidth = '210mm'
      clonedEl.style.margin = '0'
      clonedEl.style.position = 'static'
      clonedEl.style.transform = 'none'
      clonedEl.style.inset = 'auto'
    },
  })

  const root = element.getBoundingClientRect()
  const ratio = canvas.width / root.width
  const pageHeightPx = canvas.width * (A4_HEIGHT_MM / A4_WIDTH_MM)
  const rects = collectKeepRects(element, ratio, pageHeightPx * 0.82)
  const slices = buildSlices(canvas.height, pageHeightPx, rects)

  const sidebar = element.querySelector('.sidebar')
  const sidebarWidth = sidebar
    ? Math.round((sidebar.getBoundingClientRect().width / root.width) * canvas.width)
    : 0

  const pdf = new jsPDF({
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
    compress: true,
  })

  slices.forEach((slice, index) => {
    if (index > 0) pdf.addPage()
    const pageCanvas = paintPage(
      canvas,
      slice,
      canvas.width,
      Math.round(pageHeightPx),
      sidebarWidth,
    )
    pdf.addImage(
      pageCanvas.toDataURL('image/jpeg', 0.92),
      'JPEG',
      0,
      0,
      A4_WIDTH_MM,
      A4_HEIGHT_MM,
    )
  })

  downloadBlob(pdf.output('blob'), filename)
}
