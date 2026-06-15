import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "../global.css";

const navbar = <Navbar logo={<b>Kamaldiņu Dzimta</b>} />;

const footer = (
  <Footer>
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <span>Kamaldiņu Dzimta</span>
      <span className="flex flex-wrap gap-2 text-sm">
        <a
          href="https://kamaltek.com"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Kamaltek
        </a>
        <a href="/legal" className="hover:underline">
          Legal
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy
        </a>
      </span>
    </div>
  </Footer>
);

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();
  return (
    <html lang="lv" suppressHydrationWarning dir="ltr">
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/shuding/nextra"
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
