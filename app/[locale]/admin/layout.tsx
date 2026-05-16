export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position:"relative", zIndex:9999, background:"#f9fafb", minHeight:"100vh" }}>
      {children}
    </div>
  );
}
