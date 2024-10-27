import { withAuth } from '@/components/with-auth'

function AdminPage() {
  return <div>Admin Dashboard</div>
}

export default withAuth(AdminPage, ['admin'])