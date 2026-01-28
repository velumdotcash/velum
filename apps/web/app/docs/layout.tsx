import { Header } from "@/components/layout/header";
import { DocsSidebar, MobileDocsNav } from "@/components/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <Header />
      <DocsSidebar />
      <MobileDocsNav />
      <main id="main-content" className="pl-0 lg:pl-60 pt-24">
        <article className="mx-auto max-w-3xl px-6 lg:px-8 py-8 bg-background/90 backdrop-blur-md border-x border-border/50">
          {children}
        </article>
      </main>
    </div>
  );
}
