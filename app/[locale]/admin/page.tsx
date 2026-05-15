import AdminPanel from "@/components/Admin/AdminPanel";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999 }}>
      <AdminPanel />
    </div>
  );
}
