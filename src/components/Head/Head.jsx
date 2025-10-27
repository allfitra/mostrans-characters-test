import { Helmet } from "react-helmet-async";

export const Head = ({ title, description }) => {
  const pageTitle = title ? `Rick and Morty | ${title}` : "Rick and Morty";

  return (
    <Helmet>
      <title>{pageTitle}</title>

      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};
