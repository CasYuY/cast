function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const text = body.text
  if (!text) {
    throw createError({
      statusCode: 400,
      statusText: "Bad Request(Missing text in body)",
    })
  }

  const key = generateUniqueId()
  await useStorage("redis").setItem(key, text, { ttl: 360 })

  return {
    key,
  }
})
