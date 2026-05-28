export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: "#F7F6F3" }}>
      {children}
    </div>
  );
}
