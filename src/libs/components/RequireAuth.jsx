import React from 'react'
import useAuth from '../hooks/UseAuth'
import { Navigate, Outlet, useLocation } from 'react-router'

function RequireAuth({ allowRole }) {
    const { auth } = useAuth()
    const location = useLocation()
    return (
        auth?.userRole === allowRole
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    )
}

export default RequireAuth