import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/admin/login")
  }

  const isAdmin = user.user_metadata?.is_admin === true
  if (!isAdmin) {
    redirect("/admin/login?error=unauthorized")
  }

  // Fetch all content
  const { data: contentData } = await supabase.from("site_content").select("*").order("section_key")

  return <AdminDashboard user={user} initialContent={contentData || []} />
}
