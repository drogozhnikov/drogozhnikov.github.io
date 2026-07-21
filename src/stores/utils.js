const hardwareSpecs = [
  window.navigator.userAgent,
  window.screen.width + 'x' + window.screen.height,
  window.screen.colorDepth,
  Intl.DateTimeFormat().resolvedOptions().timeZone,
  window.navigator.hardwareConcurrency || 4
].join('|');

class Utils {

  simpleHash() {
    let hash = 0;
    for (let i = 0; i < hardwareSpecs.length; i++) {
      const char = hardwareSpecs.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  async copyToBuffer(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Ошибка при копировании текста:', err);
    }
  }
}

export default new Utils();