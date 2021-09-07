import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='h-screen dark:bg-gray-800'>
      <div className='text-gray-900 dark:text-white'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}
export default MyApp
