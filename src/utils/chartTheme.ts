/** Neon theme colors for Chart.js (align with tailwind neon/chrome) */
export const chartColors = {
  cyan: '#00f5ff',
  green: '#39ff14',
  red: '#ff3366',
  amber: '#ffb800',
  magenta: '#ff00ff',
  blue: '#0066ff',
  slate: 'rgba(148, 163, 184, 0.9)',
  grid: 'rgba(0, 245, 255, 0.15)',
}

export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: '#94a3b8', font: { size: 12 } },
    },
  },
}

export function barOptions(overrides = {}) {
  return {
    ...defaultChartOptions,
    scales: {
      x: { ticks: { color: chartColors.slate }, grid: { color: chartColors.grid } },
      y: { ticks: { color: chartColors.slate }, grid: { color: chartColors.grid } },
    },
    ...overrides,
  }
}

export function doughnutOptions(overrides = {}) {
  return { ...defaultChartOptions, ...overrides }
}
