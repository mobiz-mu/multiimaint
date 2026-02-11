import Header from "@/components/multiimaint/Header";
import HeroBanner from "@/components/multiimaint/HeroBanner";
import HomeServices from "@/components/multiimaint/HomeServices";
import HomeShop from "@/components/multiimaint/HomeShop";
import HomeAbout from "@/components/multiimaint/HomeAbout";
import HomeBlog from "@/components/multiimaint/HomeBlog";
import HomeContact from "@/components/multiimaint/HomeContact";
import Footer from "@/components/multiimaint/Footer";

export default function Page() {
  return (
    <>
      <Header />

      {/* ✅ full-width main (no double max-width/padding) */}
      <main id="main" className="w-full">
        <HeroBanner />
        <HomeServices />
        <HomeShop />
        <HomeAbout />
        <HomeBlog />
        <HomeContact />
      </main>

      <Footer />
    </>
  );
}


