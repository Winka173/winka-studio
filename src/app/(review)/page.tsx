import type { Metadata } from 'next';
import { StudioHome } from '@/components/worlds/home';
import { Shell } from '@/components/shell';
import '@/styles/worlds.css';
import '@/styles/development.css';
import '@/styles/portfolio.css';
import '@/styles/portfolio-home.css';
import '@/styles/portfolio-products.css';
import '@/styles/portfolio-development.css';
import '@/styles/project-collection.css';
import '@/styles/product-guide.css';
import '@/styles/website-kits.css';
export const metadata:Metadata={title:'Winka Studio — Một studio. Nhiều thế giới.',description:'Ứng dụng hữu ích và thế giới game mang dấu ấn Winka.'};
export default function Page() {
  return <Shell locale="vi"><StudioHome locale="vi"/></Shell>;
}
