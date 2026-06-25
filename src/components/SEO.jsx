import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "RuAuto TRAILER";
  const fullTitle = `${title} | ${siteName}`;
  const defaultDesc = "Продажа и производство полуприцепов Vollkraft в России. Завод в г. Вязники.";
  const siteUrl = "https://ruautotrailer.ru";

  return (
    <Helmet>
      {/* Standart Meta teglar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || "полуприцепы, Vollkraft, RuAuto TRAILER, спецтехника, прицепы в России"} />
      <link rel="canonical" href={`${siteUrl}${window.location.pathname}`} />

      {/* Open Graph / Facebook / Telegram */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || "/ruat_logo.png"} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || "/ruat_logo.png"} />
    </Helmet>
  );
};

export default SEO;