import HomeExperience from "@/components/Home/HomeExperience";
import PropertyCarousel from "@/components/Home/PropertyCarousel";
import Navbar from "@/components/Experience/Navbar";

interface Props { params: Promise<{ locale: string }>; }

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  return (
    <div style={{ minHeight:"300vh" }}>
      <Navbar locale={locale} />
      {/* Hero sticky — se queda fijo mientras hay scroll */}
      <div style={{ height:"100vh", position:"sticky", top:0, zIndex:10 }}>
        <HomeExperience locale={locale} />
      </div>
      {/* Carrusel debajo */}
      <div style={{
        position:"relative",
        zIndex:20,
        background:"#080604",
        padding:"6rem clamp(1rem,5vw,4rem)",
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <PropertyCarousel locale={locale} />
      </div>
    </div>
  );
}
