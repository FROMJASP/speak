import PlanPreviewPanel from "@/components/admin/plan-preview-panel"

export default function AdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="space-y-8">
        <PlanPreviewPanel />
      </div>
    </div>
  )
}
