import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Chatbot from "../components/chat/Chatbot.jsx";
import TranslateButton from "../components/TranslateButton.jsx";
import "nextra-theme-docs/style.css";
import "../global.css";

const navbar = (
  <Navbar
    logo={<b>Kamaldiņu Dzimta</b>}
    logoLink="/"
    projectLink="https://github.com/Kamaldins"
  >
    <TranslateButton />
  </Navbar>
);

const footer = (
  <Footer>
    <div className="site-footer">
      <div>
        <strong>Kamaldiņu Dzimta</strong>
        <p>Digitāls dzimtas vēstures, dokumentu un atmiņu arhīvs.</p>
      </div>
      <nav aria-label="Kājenes saites">
        <a href="/par-mums">Par projektu</a>
        <a href="/kontakti">Kontakti</a>
        <a href="/juridiskais">Tiesiskais pamatojums</a>
        <a href="/privatums">Privātums</a>
        <a href="https://github.com/Kamaldins" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </div>
  </Footer>
);

const search = (
  <Search
    placeholder="Meklēt arhīvā…"
    emptyResult="Nekas netika atrasts."
    errorText="Meklēšanas indekss vēl nav izveidots. Palaidiet npm run build un pēc tam npm run dev."
    loading="Meklē…"
  />
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
          search={search}
          docsRepositoryBase="https://github.com/Kamaldins"
          editLink={null}
          feedback={{ content: null }}
          copyPageButton={false}
          sidebar={{
            autoCollapse: true,
            defaultMenuCollapseLevel: 1,
            defaultOpen: false,
          }}
          themeSwitch={{ dark: "Tumšs", light: "Gaišs", system: "Sistēma" }}
          toc={{ backToTop: "Atpakaļ augšā", title: "Šajā lapā" }}
        >
          {children}
        </Layout>
        <Chatbot />
        <SpeedInsights />
      </body>
    </html>
  );
}
