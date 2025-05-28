/*
  # Add initial legal resources

  1. New Data
    - Adds initial legal resources for both US and Canadian jurisdictions
    - Covers common legal topics like housing, employment, and family law
    
  2. Categories
    - Housing Law
    - Employment Law
    - Family Law
    - Consumer Protection
    - Personal Injury
*/

-- US Resources
INSERT INTO legal_resources (title, content, url, jurisdiction, category) VALUES
(
  'US Tenant Rights Overview',
  'Tenants in the United States have specific rights protected by federal and state laws. These include the right to habitable housing, privacy, security deposit protection, and protection against discrimination under the Fair Housing Act.',
  'https://www.hud.gov/topics/rental_assistance/tenantrights',
  'US',
  'housing'
),
(
  'US Employment Rights Guide',
  'US workers are protected by federal laws including the Fair Labor Standards Act (FLSA), which establishes minimum wage, overtime pay, and other employment standards. The Equal Employment Opportunity Commission (EEOC) enforces workplace discrimination laws.',
  'https://www.dol.gov/general/topic/disability/laws',
  'US',
  'employment'
);

-- Canadian Resources
INSERT INTO legal_resources (title, content, url, jurisdiction, category) VALUES
(
  'Canadian Tenant Rights Guide',
  'In Canada, tenant rights are primarily governed by provincial and territorial laws. Common protections include rent increase limits, maintenance standards, and eviction procedures. The Residential Tenancies Act varies by province.',
  'https://www.cmhc-schl.gc.ca/en/rental-housing/i-am-renting',
  'Canada',
  'housing'
),
(
  'Canadian Employment Standards',
  'Canadian employment standards are set by both federal and provincial laws. The Canada Labour Code governs federally regulated industries, while provincial employment standards acts cover most other workplaces.',
  'https://www.canada.ca/en/services/jobs/workplace/federal-labour-standards.html',
  'Canada',
  'employment'
);