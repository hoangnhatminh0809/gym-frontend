import { IoHome, IoPeople } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import { MdIntegrationInstructions } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0
                        flex flex-col
                        bg-sidebarPrimary text-white shadow-lg">
            <SidebarIcon icon={<IoHome size="28"/>} route="/"/>
            <SidebarIcon icon={<CgGym size="28"/>} route="/equipment"/>
            <SidebarIcon icon={<IoPeople size="28"/>} route="/member"/>
            <SidebarIcon icon={<MdIntegrationInstructions size="28"/>} route="/employee"/>
        </div>
    )
}

interface SidebarIconProps {
    icon: React.ReactNode;
    route: string;
}

const SidebarIcon = ({ icon, route }: SidebarIconProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = location.pathname === route

    return (
        <div className={ isActive ? 'sidebar-icon-current' : 'sidebar-icon'} onClick={() => navigate(route)}>
            {icon}
        </div>
    )
}


export default Sidebar;