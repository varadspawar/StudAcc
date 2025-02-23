import { Outlet } from 'react-router-dom';





function Layout() {
    return (
        <div>
            Hello from Layout
            <Outlet /> 
        </div>
    );
}

export default Layout;
