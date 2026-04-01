import { notFound } from "next/navigation";
import { isValidLocale, locales, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/locale-context";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chatbot/ChatBot";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      {/* Update <html lang> client-side since root layout owns the html tag */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute("lang","${locale}")`,
        }}
      />
      <LocaleProvider locale={locale as Locale}>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <ChatBot />
      </LocaleProvider>
    </>
  );
}
