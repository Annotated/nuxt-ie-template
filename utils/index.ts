interface DamnuEnable {
  [key: string]: Function // 字段扩展声明
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
/*eslint-disable*/
export function parseTime(
  time: Date | string | number,
  cFormat: string
): string | undefined {
  const literal = /\[([^]*?)\]/gm
  const token =
    /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g

  if (typeof time === 'string') {
    if (/^[0-9]+$/.test(time)) {
      // support "1548221490638"
      time = Number.parseInt(time)
    }
  }

  if (typeof time === 'number' && time.toString().length === 10) {
    time = time * 1000
  }
  time = new Date(time)

  const literals: any[] = []

  // Make literals inactive by replacing them with ??
  cFormat = cFormat.replace(literal, function ($0, $1) {
    literals.push($1)
    return '@@@'
  })

  // Apply formatting rules
  cFormat = cFormat.replace(token, function ($0) {
    if (isValidKey($0, formatFlags)) {
      return formatFlags[$0](time)
    } else {
      return $0.slice(1, $0.length - 1)
    }
  })
  // Inline literal values back into the formatted value
  return cFormat.replace(/@@@/g, function () {
    return literals.shift()
  })
}

function pad(val: number | string, len?: number) {
  let str = String(val)
  len = len || 2
  while (str.length < len) {
    str = '0' + val
  }
  return str
}

function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object
}

const formatFlags: DamnuEnable = {
  D (dateObj: Date) {
    return dateObj.getDay()
  },
  DD (dateObj: Date) {
    return pad(dateObj.getDay())
  },
  d (dateObj: Date) {
    return dateObj.getDate()
  },
  dd (dateObj: Date) {
    return pad(dateObj.getDate())
  },
  M (dateObj: Date) {
    return dateObj.getMonth() + 1
  },
  MM (dateObj: Date) {
    return pad(dateObj.getMonth() + 1)
  },
  yy (dateObj: Date) {
    return pad(String(dateObj.getFullYear()), 4).slice(2)
  },
  yyyy (dateObj: Date) {
    return pad(dateObj.getFullYear(), 4)
  },
  h (dateObj: Date) {
    return dateObj.getHours() % 12 || 12
  },
  hh (dateObj: Date) {
    return pad(dateObj.getHours() % 12 || 12)
  },
  H (dateObj: Date) {
    return dateObj.getHours()
  },
  HH (dateObj: Date) {
    return pad(dateObj.getHours())
  },
  m (dateObj: Date) {
    return dateObj.getMinutes()
  },
  mm (dateObj: Date) {
    return pad(dateObj.getMinutes())
  },
  s (dateObj: Date) {
    return dateObj.getSeconds()
  },
  ss (dateObj: Date) {
    return pad(dateObj.getSeconds())
  },
  S (dateObj: Date) {
    return Math.round(dateObj.getMilliseconds() / 100)
  },
  SS (dateObj: Date) {
    return pad(Math.round(dateObj.getMilliseconds() / 10), 2)
  },
  SSS (dateObj: Date) {
    return pad(dateObj.getMilliseconds(), 3)
  },
  ZZ (dateObj: Date) {
    const o = dateObj.getTimezoneOffset()
    return (
      (o > 0 ? '-' : '+') +
      pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4)
    )
  }
}
