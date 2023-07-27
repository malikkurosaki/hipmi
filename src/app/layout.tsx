import RootStyleRegistry from './emotion';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootStyleRegistry>{children}</RootStyleRegistry>
  );
}
