import React from 'react'
import RegisterLoginLayout from './../auth/layout/RegisterLoginLayout/index';
import { Route, Routes } from 'react-router';
import MainLayout from '../libs/layouts/MainLayout';
import Dashboard from './../dashboard/components/dashboard/index';
import RequireAuth from './../libs/components/RequireAuth';

function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='/' element={<RegisterLoginLayout />} />
                <Route element={<RequireAuth allowRole={"ADMIN"} />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default AppRoute