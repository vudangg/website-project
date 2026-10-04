import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <--- 1. Thêm dòng này

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer /> {/* <--- 2. Thêm Footer vào cuối cùng */}
    </section>
  );
}