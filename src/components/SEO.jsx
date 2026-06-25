import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url }) {
  const siteName = "RuAuto TRAILER";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "RuAuto TRAILER — продажа и обслуживание полуприцепов, рефрижераторов, контейнеровозов и другой коммерческой техники. Широкий выбор техники в России.";
  const defaultImage = "https://images.unsplash.com/photo-1586191712102-14006c38ba16?q=80&w=1200&auto=format&fit=crop";
  const currentUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
