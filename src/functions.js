function lengthString (length) {
  const minutes = Math.floor(length / 60)
  const seconds = Math.round(length - minutes * 60)

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export {
  lengthString
}
