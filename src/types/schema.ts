export interface ImageValue {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface VideoValue {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
}

export type ComponentValue = string | number | boolean | ImageValue | VideoValue;

export interface TypographyConfig {
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontFamily?: 'primary' | 'secondary';
  letterSpacing?: string;
  lineHeight?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal';
}

export interface LinkConfig {
  href: string;
  target?: '_blank' | '_self';
  rel?: string;
  ariaLabel?: string;
}

export interface AttributeNode {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
  editable: boolean;
  label?: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessage?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export interface ComponentNode {
  id: string;
  type: string;
  order: number;
  visible: boolean;
  label?: string;
  path: string;
  editable: boolean;
  repeatable?: boolean;
  repeatableTemplate?: ComponentNode;
  minItems?: number;
  maxItems?: number;
  value?: ComponentValue;
  typography?: TypographyConfig;
  link?: LinkConfig;
  attributes?: AttributeNode[];
  children?: ComponentNode[];
  validation?: ValidationRules;
}

export interface Section {
  id: string;
  type: string;
  order: number;
  visible: boolean;
  label: string;
  components: ComponentNode[];
}

export interface PageSchema {
  id: string;
  slug: string;
  templateId: string;
  tenantId: string;
  sections: Section[];
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontFamilyHeading: string;
  googleFontsUrl?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterSite: string;
  canonicalUrl: string;
  robots: string;
  author: string;
  language: string;
  locale: string;
  structuredData: Record<string, unknown>;
}

export interface BrandingConfig {
  logo: string;
  logoAlt: string;
  logoDark: string;
  favicon: string;
  appleTouchIcon: string;
}

export interface ContactConfig {
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  socialMedia: Record<string, string>;
}

export interface TenantConfig {
  id: string;
  domain: string;
  name: string;
  template: string;
  seo: SEOConfig;
  theme: ThemeConfig;
  branding: BrandingConfig;
  contact: ContactConfig;
  pageSchema: PageSchema;
}
