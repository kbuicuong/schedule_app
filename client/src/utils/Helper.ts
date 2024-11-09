

export const getEndpoint = () => {
  return import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_PROD_SERVER_URL : import.meta.env.VITE_DEV_SERVER_URL
}
