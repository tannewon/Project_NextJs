export const metadata = {
  title: 'Nine Dev | Dashboard',
  description: 'Danh Sach Hoc Vien Nine Dev',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="content">{children}</div>;
}
