import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
        author
        description
        siteUrl
        keywords
        social {
          twitter
        }
      }
    }
  }
`;

function SEO({
  meta,
  image,
  title,
  description,
  slug,
  lang = 'en',
  notFound,
  keywords,
}) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const mapKeywords = keywords =>
          keywords.map(keyword => keyword).join(', ');
        const { siteMetadata } = data.site;
        const metaDescription = description || siteMetadata.description;
        const metaKeywords = keywords
          ? mapKeywords(keywords)
          : mapKeywords(siteMetadata.keywords);
        console.log(metaKeywords);
        const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null;
        const url = `${siteMetadata.siteUrl}${slug}`;
        return (
          <Helmet
            htmlAttributes={{ lang }}
            {...(title
              ? {
                  titleTemplate: `%s — ${siteMetadata.title}`,
                  title,
                }
              : notFound
              ? { title: '404' }
              : {
                  title: `${siteMetadata.title}`,
                })}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                name: 'keywords',
                content: metaKeywords,
              },
              {
                property: 'og:url',
                content: url,
              },
              {
                property: 'og:title',
                content: title || siteMetadata.title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteMetadata.social.twitter,
              },
              {
                name: 'twitter:title',
                content: title || siteMetadata.title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                metaImage
                  ? [
                      {
                        property: 'og:image',
                        content: metaImage,
                      },
                      {
                        name: 'twitter:image',
                        content: metaImage,
                      },
                    ]
                  : []
              )
              .concat(
                notFound ? [{ property: 'robots', content: 'noindex' }] : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  meta: [],
  title: '',
  slug: '',
};

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  meta: PropTypes.array,
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
