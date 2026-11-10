export function useAssetUrl() {
  const baseURL = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return (path?: string | null) => {
    if (!path) return undefined
    return path.startsWith('/') && !path.startsWith('//') ? `${baseURL}${path}` : path
  }
}
