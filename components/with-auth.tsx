import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRole } from '@/lib/supabase'

export function withAuth(WrappedComponent: React.ComponentType, allowedRoles: string[]) {
  return function AuthComponent(props: any) {
    const [userRole, setUserRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
      async function checkAuth() {
        const role = await getUserRole()
        setUserRole(role)
        setLoading(false)

        if (!role || !allowedRoles.includes(role)) {
          router.push('/unauthorized')
        }
      }

      checkAuth()
    }, [])

    if (loading) {
      return <div>Loading...</div>
    }

    if (!userRole || !allowedRoles.includes(userRole)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}