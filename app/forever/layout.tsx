import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forever Together | Final Proposal",
  description: "Will you keep making memories with me forever?",
};

export default function ForeverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
