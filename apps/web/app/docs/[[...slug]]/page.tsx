import { notFound } from "next/navigation";
import { Callout, Steps, Step, FeatureCard, VisibilityMatrix, PrivacyFlowDiagram, KeyDerivationDiagram, EncryptionComparison, ScanningFlowDiagram, ZKCircuitDiagram, SDKFlowDiagram, TokenCards, PaymentFlowDiagram, PrivacyShield, TroubleshootingCards } from "@/components/docs";

// Map of slug to MDX content
const docs: Record<string, () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>> = {
  "": () => import("@/content/docs/index.mdx"),
  "how-it-works": () => import("@/content/docs/how-it-works.mdx"),
  "receive": () => import("@/content/docs/receive.mdx"),
  "pay": () => import("@/content/docs/pay.mdx"),
  "withdraw": () => import("@/content/docs/withdraw.mdx"),
  "developer-guide": () => import("@/content/docs/developer-guide.mdx"),
  "api": () => import("@/content/docs/api.mdx"),
  "faq": () => import("@/content/docs/faq.mdx"),
  "privacy-model": () => import("@/content/docs/privacy-model.mdx"),
  "cryptography": () => import("@/content/docs/cryptography.mdx"),
  "utxo-system": () => import("@/content/docs/utxo-system.mdx"),
  "zero-knowledge": () => import("@/content/docs/zero-knowledge.mdx"),
  "sdk-modifications": () => import("@/content/docs/sdk-modifications.mdx"),
};

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug?.join("/") || "";

  const loader = docs[slugPath];
  if (!loader) {
    notFound();
  }

  const { default: Content } = await loader();

  return (
    <div className="docs-content">
      <Content components={{ Callout, Steps, Step, FeatureCard, VisibilityMatrix, PrivacyFlowDiagram, KeyDerivationDiagram, EncryptionComparison, ScanningFlowDiagram, ZKCircuitDiagram, SDKFlowDiagram, TokenCards, PaymentFlowDiagram, PrivacyShield, TroubleshootingCards }} />
    </div>
  );
}

export function generateStaticParams() {
  return [
    { slug: undefined },
    { slug: ["how-it-works"] },
    { slug: ["receive"] },
    { slug: ["pay"] },
    { slug: ["withdraw"] },
    { slug: ["developer-guide"] },
    { slug: ["api"] },
    { slug: ["faq"] },
    { slug: ["privacy-model"] },
    { slug: ["cryptography"] },
    { slug: ["utxo-system"] },
    { slug: ["zero-knowledge"] },
    { slug: ["sdk-modifications"] },
  ];
}
