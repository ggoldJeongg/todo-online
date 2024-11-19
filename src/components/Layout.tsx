import "./Layout.css";

interface LayoutProps {
    children: string; // 문자열 타입
}

function Layout ({ children }: LayoutProps) {
    return <div className="Layout">{children}</div>;
}

export default Layout;