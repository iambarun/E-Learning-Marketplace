import { Menu } from 'antd';
import Link from "next/link";
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const TopNav = () => {
    const items = [
        {
            key: '1',
            icon:<AppstoreOutlined />,
            label: <Link href="/">App</Link>,
        },
        {
            key: '2',
            icon: <LoginOutlined />,
            label: <Link href="/login">Login</Link>,
        },
        {
            key: '3',
            icon: <UserAddOutlined />,
            label: <Link href="/register">Register</Link>,
        },
    ];

    return <Menu mode="horizontal" items={items} />;
};

export default TopNav;