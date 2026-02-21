import HeroBanner from "@/components/multiimaint/HeroBanner";
import HomeServices from "@/components/multiimaint/HomeServices";
import HomeShop from "@/components/multiimaint/HomeShop";
import HomeAbout from "@/components/multiimaint/HomeAbout";
import HomeBlog from "@/components/multiimaint/HomeBlog";
import HomeContact from "@/components/multiimaint/HomeContact";

export default function Page() {
  return (
    <>
      {/* Layout already provides Header + Footer */}
      <HeroBanner />
      <HomeServices />
      <HomeShop />
      <HomeAbout />
      <HomeBlog />
      <HomeContact />
    </>
  );
}
