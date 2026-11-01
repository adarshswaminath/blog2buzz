import { Masthead } from "./masthead";

/** Explore, topics, articles and the reading list share one masthead. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Masthead />
      <main className="flex-1 pb-24">{children}</main>
    </div>
  );
}
