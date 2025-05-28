export interface LegalResource {
  id: string;
  title: string;
  content: string;
  url: string;
  jurisdiction: string;
  category: string;
}

export const legalResources: LegalResource[] = [
  {
    id: '1',
    title: 'US Tenant Rights Overview',
    content: 'Tenants in the United States have specific rights protected by federal and state laws. These include the right to habitable housing, privacy, security deposit protection, and protection against discrimination under the Fair Housing Act.',
    url: 'https://www.hud.gov/topics/rental_assistance/tenantrights',
    jurisdiction: 'US',
    category: 'housing'
  },
  {
    id: '2',
    title: 'US Employment Rights Guide',
    content: 'US workers are protected by federal laws including the Fair Labor Standards Act (FLSA), which establishes minimum wage, overtime pay, and other employment standards. The Equal Employment Opportunity Commission (EEOC) enforces workplace discrimination laws.',
    url: 'https://www.dol.gov/general/topic/disability/laws',
    jurisdiction: 'US',
    category: 'employment'
  },
  {
    id: '3',
    title: 'Canadian Tenant Rights Guide',
    content: 'In Canada, tenant rights are primarily governed by provincial and territorial laws. Common protections include rent increase limits, maintenance standards, and eviction procedures. The Residential Tenancies Act varies by province.',
    url: 'https://www.cmhc-schl.gc.ca/en/rental-housing/i-am-renting',
    jurisdiction: 'Canada',
    category: 'housing'
  },
  {
    id: '4',
    title: 'Canadian Employment Standards',
    content: 'Canadian employment standards are set by both federal and provincial laws. The Canada Labour Code governs federally regulated industries, while provincial employment standards acts cover most other workplaces.',
    url: 'https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html',
    jurisdiction: 'Canada',
    category: 'employment'
  }
]; 