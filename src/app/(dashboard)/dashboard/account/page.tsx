import type { Metadata } from "next";

export const metadata: Metadata = {
  // metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
};

export default function AccountPage() {
  return <h1>Account</h1>;
}
