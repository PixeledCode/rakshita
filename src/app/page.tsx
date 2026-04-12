import { client } from "@/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  FEATURED_PROJECT_QUERY,
  CATEGORIES_QUERY,
  PROJECTS_QUERY,
  GALLERY_PHOTOS_QUERY,
} from "@/sanity/queries";
import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProject";
import WorkSection from "@/components/WorkSection";
import About from "@/components/About";
import Archive from "@/components/Archive";
import Contact from "@/components/Contact";
import Bottombar from "@/components/Bottombar";

export const revalidate = 60;

export default async function Page() {
  const [settings, featured, categories, projects, photos] = await Promise.all([
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(FEATURED_PROJECT_QUERY),
    client.fetch(CATEGORIES_QUERY),
    client.fetch(PROJECTS_QUERY),
    client.fetch(GALLERY_PHOTOS_QUERY),
  ]);

  return (
    <>
      <Topbar list={settings?.topbar ?? []} />
      <main>
        <Hero />
        <FeaturedProject data={featured ?? null} />
        <WorkSection
          categories={categories ?? []}
          projects={projects ?? []}
          photos={photos ?? []}
        />
        <About data={settings?.about ?? null} />
        <Archive data={settings?.archive ?? null} />
        <Contact data={settings?.contact ?? null} />
        <Bottombar list={settings?.bottomBar ?? null} />
      </main>
    </>
  );
}
