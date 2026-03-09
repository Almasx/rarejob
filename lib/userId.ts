const STORAGE_KEY = "rarejob-user-id"

let cached: string | null = null

export function getUserId(): string {
  if (typeof window === "undefined") return ""
  if (cached) return cached

  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  cached = id
  return id
}
