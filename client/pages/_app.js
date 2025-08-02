import dynamic from 'next/dynamic';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';

// Dynamic import TopNav to avoid SSR issues with Ant Design
const TopNav = dynamic(() => import('../components/TopNav'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
        <TopNav />
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;