import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import '@/styles.css';
import { ReactNode } from 'react';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";
import { generateMetadata } from './utils/metadata';
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
import { BsCalendarWeek } from "react-icons/bs";

const banner = <Banner storageKey="some-key">Upcoming hackathon: Nairobi, Kenya @ August 18-28, 2025</Banner>
const iconClasses = "w-5 h-5 text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110"
const hoverColorClasses = [
  'hover:text-wada-a',
  'hover:text-wada-b',
  'hover:text-wada-c',
  'hover:text-wada-d',
];

const getRandomHoverColor = () => hoverColorClasses[Math.floor(Math.random() * hoverColorClasses.length)];

const navbar = (
  <Navbar
    logo={
      <div>
        <Image src="/brand_assets/Wada-RGB_Logo-Full-Alternative-Color.svg" width={140} height={60} alt="Wada Logo" />
      </div>
    }
    logoLink={"https://www.wada.org/"}
    chatIcon={<FaTelegramPlane className={`${iconClasses} ${getRandomHoverColor()}`} />}
    chatLink={"https://t.me/+cwjF0iDX0m81M2Y8/"}
    children={
      <div className="inline-flex items-center gap-4">
        {/* X (Twitter) */}
        <a
          href="https://x.com/wada_org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXTwitter className={`${iconClasses} ${getRandomHoverColor()}`} />
        </a>

        {/* Calendar */}
        <a
          href="https://lu.ma/user/wada"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsCalendarWeek className={`${iconClasses} ${getRandomHoverColor()}`} />
        </a>
      </div>
    }
    projectLink={"https://github.com/WADAlliance/"}
    projectIcon={<FaGithub className={`${iconClasses} ${getRandomHoverColor()}`} />}
  />
);

const footer = <Footer>Wada © {new Date().getFullYear()}</Footer>

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { mdxPath?: string[] };
}) {
  const metadata = await generateMetadata({ params }); // Generate dynamic metadata

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/WADAlliance/docs"
          footer={footer}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
          editLink={null}
          nextThemes={{ defaultTheme: "dark" }}
        >
          {children}
          <Analytics />
        </Layout>
      </body>
    </html>
  );
}
