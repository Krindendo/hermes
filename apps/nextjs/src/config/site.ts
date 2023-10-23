export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    main: string;
    github: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Hermes",
  description: "Hermes description",
  url: "http://localhost:3000",
  ogImage: "http://localhost:3000/og.jpg",
  links: {
    main: "https://github.com/Krindendo",
    github: "https://github.com/Krindendo/hermes",
  },
};
