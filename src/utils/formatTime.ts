function formatTime(ms: number) {
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  const days = Math.floor(ms / day)

  if (days < 0) {
    return ''
  }

  const h = Math.floor((ms - days * day) / hour)
  const m = Math.floor((ms - days * day - h * hour) / minute)
  const s = Math.floor((ms - days * day - h * hour - m * minute) / 1000)

  const HH = `${h}`.padStart(2, '0')
  const mm = `${m}`.padStart(2, '0')
  const SS = `${s}`.padStart(2, '0')

  return days > 0 ? `${days}일 ${HH}:${mm}:${SS}` : `${HH}:${mm}:${SS}`
}

export default formatTime
