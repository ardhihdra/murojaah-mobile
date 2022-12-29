export function progressToColor(progress) {
  if(progress >= 100) return 'violet'
  else if(progress > 80) return 'green'
  else if(progress > 60) return 'orange'
  else if(progress > 30) return 'gold'
  return 'white'
}

export function progressToCircleColor(progress) {
  if(progress >= 100) return 'violet'
  else if(progress > 80) return 'green'
  else if(progress > 60) return 'orange'
  else if(progress > 30) return 'gold'
  return 'grey'
}

/**
 * Change an index with type number
 * to string that match the index in the database
 * @param {*} value 
 * @param {*} type 
 * @returns 
 */
export function numberToIndex(value, type) {
  if(typeof value === 'number') {
    value = `${value}`
    if(type === 'surah') {
      if(value.length === 1) value = `00${value}`
      else if(value.length === 2) value = `0${value}`
      else value = `${value}`
    } else if(type === 'juz'){
      if(value.length === 1) value = `0${value}`
      else value = `${value}`
    }
  }
  return value
}