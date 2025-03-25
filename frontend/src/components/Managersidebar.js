import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt,FaPayment, FaCalendarCheck,FaAdvance, FaTools, FaChartBar, FaCog, FaChevronDown, FaChevronUp, FaCircleNotch, FaServicestack, FaWallet } from 'react-icons/fa';

const Managersidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation(); // to get the current active route

    // Function to toggle sub-menu visibility
    const toggleSubCategory = (category) => {
        setOpenMenu(openMenu === category ? null : category);
    };

    // Function to check if the current location matches any of the sub-menu links
    const isActiveSubMenu = (subMenu) => {
        return subMenu.some(subItem => location.pathname === subItem.link);
    };

    const menuItems = [
        { name: 'Dashboard', icon: <FaTachometerAlt />, link: '/manager/dashboard' },
        {
            name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
                { name: 'Create Booking', link: '/manager/create-booking' },
                { name: 'View Booking', link: '/manager/view-booking' },
            ]
        },
        {
            name: 'Client', icon: <FaCalendarCheck />, subMenu: [
                { name: 'Client-Profile',icon: <FaCircleNotch/> ,link: '/manager/client-profile' },
                { name: 'Service-History',icon :<FaServicestack/>, link: '/manager/service-histroy' },
                { name: 'Payment-History', icon :<FaWallet/>,link: '/manager/payment-histroy' },
                { name: 'Wallet-Balance', icon :<FaWallet/>,link: '/manager/wallet-balance' },
                { name: 'Advance-Payment', icon : <FaWallet/>,link: '/manager/wallet-balance' }
            
             
            ]
        },
    ];

    // Update the state to open the menu if a sub-menu link is active
    useEffect(() => {
        menuItems.forEach(item => {
            if (item.subMenu && isActiveSubMenu(item.subMenu)) {
                setOpenMenu(item.name);
            }
        });
    }, [location]);

    return (
        <aside className={`fixed bg-white inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative`}>
            <nav>
                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.subMenu ? (
                                <div className="flex items-center justify-between py-3 px-4 cursor-pointer" onClick={() => toggleSubCategory(item.name)}>
                                    <div className="flex items-center gap-4">
                                        {item.icon}
                                        <span className="text-lg font-medium">{item.name}</span>
                                    </div>
                                    {openMenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            ) : (
                                <NavLink to={item.link} className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'}`} onClick={toggleSidebar}>
                                    {item.icon}
                                    <span className="text-lg font-medium">{item.name}</span>
                                </NavLink>
                            )}
                            {openMenu === item.name && item.subMenu && (
                                <ul className="pl-8 space-y-2">
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <NavLink to={subItem.link} className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'}`} onClick={toggleSidebar}>
                                                <span className="text-lg font-medium">{subItem.name}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Managersidebar;




