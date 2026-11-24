import { getProjectCatalog } from '@/lib/projects/server';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getProjectCatalog();
  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://saifulmashuri.com/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [
    {
      url: 'https://saifulmashuri.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://saifulmashuri.com/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
    {
      url: 'https://saifulmashuri.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
