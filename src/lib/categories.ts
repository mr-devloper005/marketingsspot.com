export const CATEGORY_OPTIONS: Array<{ name: string; slug: string; type: string }> = [
  { name: "Business", slug: "business", type: "Business" },
  { name: "Health", slug: "health", type: "Health" },
  { name: "Technology", slug: "technology", type: "Technology" },
  { name: "Real Estate", slug: "real-estate", type: "Real Estate" },
  { name: "Home Improvement", slug: "home-improvement", type: "Home Improvement" },
  { name: "Automotive", slug: "automotive", type: "Automotive" },
  { name: "Travel", slug: "travel", type: "Travel" },
  { name: "Blog", slug: "blog", type: "Blog" },
  { name: "Shopping", slug: "shopping", type: "Shopping" },
  { name: "Service", slug: "service", type: "Service" },
  { name: "Lifestyle", slug: "lifestyle", type: "Lifestyle" },
  { name: "Beauty", slug: "beauty", type: "Beauty" },
  { name: "Pet & Animal", slug: "pet-animal", type: "Pet & Animal" },
  { name: "Food", slug: "food", type: "Food" },
  { name: "Furniture", slug: "furniture", type: "Furniture" },
  { name: "Electric", slug: "electric", type: "Electric" },
  { name: "Jobs & Payroll", slug: "jobs-payroll", type: "Jobs & Payroll" },
  { name: "Finance", slug: "finance", type: "Finance" },
  { name: "Crypto", slug: "crypto", type: "Crypto" },
  { name: "Casino", slug: "casino", type: "Casino" },
  { name: "CBD", slug: "cbd", type: "CBD" },
  { name: "Social Media", slug: "social-media", type: "Social Media" },
  { name: "Game & Sports", slug: "game-sports", type: "Game & Sports" },
  { name: "Arts", slug: "arts", type: "Arts" },
  { name: "Entertainment", slug: "entertainment", type: "Entertainment" },
  { name: "Shipping & Transportation", slug: "shipping-transportation", type: "Shipping & Transportation" },
  { name: "Education", slug: "education", type: "Education" },
  { name: "Family & Parenting", slug: "family-parenting", type: "Family & Parenting" },
  { name: "Law & Legal", slug: "law-legal", type: "Law & Legal" },
  { name: "Fashion", slug: "fashion", type: "Fashion" },
  { name: "Photography", slug: "photography", type: "Photography" },
  { name: "Adult", slug: "adult", type: "Adult" },
  { name: "Event", slug: "event", type: "Event" },
  { name: "Digital", slug: "digital", type: "Digital" },
  { name: "News", slug: "news", type: "News" },
  { name: "Industry & Manufacturing", slug: "industry-manufacturing", type: "Industry & Manufacturing" },
  { name: "Houses", slug: "houses", type: "Real Estate" },
  { name: "Villas", slug: "villas", type: "Real Estate" },
  { name: "Apartments", slug: "apartments", type: "Real Estate" },
  { name: "Lofts", slug: "lofts", type: "Real Estate" },
  { name: "Estates", slug: "estates", type: "Real Estate" },
  { name: "Cottages", slug: "cottages", type: "Real Estate" },
  { name: "Townhouses", slug: "townhouses", type: "Real Estate" },
  { name: "Penthouses", slug: "penthouses", type: "Real Estate" },
];

const allowed = new Set(
  CATEGORY_OPTIONS.flatMap((item) => [item.slug.toLowerCase(), item.name.toLowerCase()])
);

export const isValidCategory = (value: string) =>
  allowed.has(value.trim().toLowerCase());

export const normalizeCategory = (value: string) => {
  const normalized = value.trim().toLowerCase();
  const match = CATEGORY_OPTIONS.find(
    (item) =>
      item.slug.toLowerCase() === normalized ||
      item.name.toLowerCase() === normalized
  );
  return match?.slug || normalized;
};
