import type { Industry, MarketData } from "@/lib/workflow/types"

// Sample data for industries
export const industries: Industry[] = [
  { id: "tech", name: "Technology", macroSector: "Information Technology", subSector: "Software & Services" },
  { id: "healthcare", name: "Healthcare", macroSector: "Health", subSector: "Medical Devices & Equipment" },
  { id: "finance", name: "Financial Services", macroSector: "Finance", subSector: "Banking & Investment" },
  { id: "retail", name: "Retail", macroSector: "Consumer Discretionary", subSector: "E-commerce & Brick-and-Mortar" },
  { id: "energy", name: "Energy", macroSector: "Energy", subSector: "Renewable & Traditional" },
  {
    id: "telecom",
    name: "Telecommunications",
    macroSector: "Communication Services",
    subSector: "Wireless & Broadband",
  },
  { id: "manufacturing", name: "Manufacturing", macroSector: "Industrials", subSector: "Heavy Equipment & Machinery" },
  { id: "real-estate", name: "Real Estate", macroSector: "Real Estate", subSector: "Commercial & Residential" },
  { id: "quick-commerce", name: "Quick Commerce", macroSector: "Consumer Services", subSector: "On-Demand Delivery" },
  { id: "power", name: "Power Utilities", macroSector: "Energy", subSector: "Renewable & Transmission" },
]

// Sample market trend data
export const marketTrendData: Record<string, MarketData> = {
  "quick-commerce": {
    title: "Quick Commerce Market Segmentation Report",
    marketSize: "₹27,000 Crore",
    cagr: "32.4%",
    keyDrivers: ["Urbanization", "Convenience demand", "VC funding"],
    risks: ["Thin margins", "Logistics costs", "Retention challenges"],
    charts: [
      {
        id: "market-growth",
        title: "Market Growth Trajectory (2021-2027)",
        type: "line",
        data: [
          { year: 2021, value: 9500 },
          { year: 2022, value: 15000 },
          { year: 2023, value: 20500 },
          { year: 2024, value: 27000 },
          { year: 2025, value: 33000 },
          { year: 2026, value: 40000 },
          { year: 2027, value: 49000 },
        ],
      },
      {
        id: "market-share",
        title: "Top Players by Market Share (2024)",
        type: "pie",
        data: [
          { company: "Zepto", share: 28 },
          { company: "Swiggy Instamart", share: 25 },
          { company: "Blinkit", share: 22 },
          { company: "BigBasket Now", share: 13 },
          { company: "Others", share: 12 },
        ],
      },
      {
        id: "retention-speed",
        title: "Retention Rate vs. Delivery Speed",
        type: "bar",
        data: [
          { delivery: "10 mins", retention: 52 },
          { delivery: "20 mins", retention: 48 },
          { delivery: "30 mins", retention: 44 },
        ],
      },
    ],
    benchmarks: [
      { metric: "Average Order Value (AOV)", industry: "₹310", market: "₹580" },
      { metric: "Monthly Burn Rate", industry: "₹45 Cr", market: "₹18 Cr" },
      { metric: "Gross Margin", industry: "14%", market: "32%" },
      { metric: "Retention (3-Month)", industry: "48%", market: "59%" },
      { metric: "Last-Mile Cost per Order", industry: "₹23", market: "₹14" },
    ],
    summary:
      "India's Quick Commerce industry is witnessing rapid transformation, driven by urbanization, demand for hyper-convenience, and aggressive VC funding. After an intense expansion period between 2021-2023, players are now focusing on unit economics, retention, and logistics optimization.\n\nDespite operating on thinner margins than traditional e-commerce, leading players like Zepto, Blinkit, and Swiggy Instamart have increased their gross margin efficiency through backend automation and localized dark store models.",
    sources: [
      "DPIIT Annual Report 2024",
      "Bain India Retail Outlook",
      "Tracxn Private Markets Tracker (Q1 2024)",
      "Startup India Database",
      "Public domain filings (BSE/Startup dashboards)",
    ],
  },
  power: {
    title: "Power Utilities Market Analysis",
    marketSize: "₹4.3 Trillion",
    cagr: "7.8%",
    keyDrivers: ["Green energy push", "Infrastructure capex", "Government incentives"],
    risks: ["Policy delays", "DISCOM financial stress", "Land acquisition hurdles"],
    charts: [
      {
        id: "industry-gdp",
        title: "Industry CAGR vs. GDP",
        type: "line",
        data: [
          { year: 2019, industry: 5.2, gdp: 4.0 },
          { year: 2020, industry: 2.1, gdp: -7.3 },
          { year: 2021, industry: 6.8, gdp: 8.7 },
          { year: 2022, industry: 7.2, gdp: 7.2 },
          { year: 2023, industry: 7.5, gdp: 6.9 },
          { year: 2024, industry: 7.8, gdp: 6.5 },
        ],
      },
      {
        id: "renewable-growth",
        title: "Renewable vs. Non-Renewable Growth",
        type: "bar",
        data: [
          { year: 2020, renewable: 8.4, nonRenewable: 1.2 },
          { year: 2021, renewable: 12.6, nonRenewable: 2.1 },
          { year: 2022, renewable: 14.8, nonRenewable: 1.8 },
          { year: 2023, renewable: 16.2, nonRenewable: 1.5 },
          { year: 2024, renewable: 18.5, nonRenewable: 1.2 },
        ],
      },
      {
        id: "top-players",
        title: "Top 5 Players by Capacity",
        type: "pie",
        data: [
          { company: "NTPC", capacity: 28 },
          { company: "Adani Green", capacity: 22 },
          { company: "Tata Power", capacity: 18 },
          { company: "JSW Energy", capacity: 12 },
          { company: "Others", capacity: 20 },
        ],
      },
    ],
    benchmarks: [
      { metric: "EBITDA Margin", industry: "21.4%", topQuartile: "28.7%", market: "15.2%" },
      { metric: "ROCE", industry: "12.8%", topQuartile: "18.1%", market: "10.4%" },
      { metric: "EV/EBITDA", industry: "9.3x", topQuartile: "-", market: "7.1x" },
      { metric: "Debt/Equity", industry: "1.2", topQuartile: "-", market: "0.8" },
    ],
    summary:
      "The Indian power sector is undergoing a structural shift toward clean energy, backed by government incentives and global ESG capital flows. Despite regulatory challenges, renewable players continue to grow, supported by transmission infrastructure upgrades.\n\nLeading players like Tata Power, Adani Green, and NTPC are investing heavily in renewable capacity, while also modernizing grid infrastructure to support the transition.",
    sources: [
      "DPIIT Annual Report",
      "CEA Snapshot",
      "BSE filings",
      "Ministry of Power Annual Report",
      "IEA India Energy Outlook",
    ],
  },
}

// Default data for any industry not specifically defined
export const defaultMarketData: MarketData = {
  title: "Industry Analysis Report",
  marketSize: "Varies by region",
  cagr: "4-6% (estimated)",
  keyDrivers: ["Market-specific factors", "Economic conditions", "Technological advancements"],
  risks: ["Competitive pressures", "Regulatory changes", "Market volatility"],
  charts: [
    {
      id: "generic-growth",
      title: "Industry Growth Projection",
      type: "line",
      data: [
        { year: 2020, value: 100 },
        { year: 2021, value: 105 },
        { year: 2022, value: 110 },
        { year: 2023, value: 116 },
        { year: 2024, value: 122 },
        { year: 2025, value: 128 },
      ],
    },
    {
      id: "generic-market-share",
      title: "Market Share Distribution",
      type: "pie",
      data: [
        { company: "Leader", share: 30 },
        { company: "Second", share: 25 },
        { company: "Third", share: 20 },
        { company: "Fourth", share: 15 },
        { company: "Others", share: 10 },
      ],
    },
    {
      id: "generic-comparison",
      title: "Key Metrics Comparison",
      type: "bar",
      data: [
        { metric: "Revenue Growth", value: 8.5 },
        { metric: "Profit Margin", value: 12.3 },
        { metric: "Market Penetration", value: 15.7 },
      ],
    },
  ],
  benchmarks: [
    { metric: "Profit Margin", industry: "15.2%", market: "18.7%" },
    { metric: "Revenue Growth", industry: "7.5%", market: "9.2%" },
    { metric: "Customer Retention", industry: "68%", market: "75%" },
    { metric: "Market Share", industry: "Varies", market: "Varies" },
  ],
  summary:
    "This industry analysis provides a general overview based on available data. The sector shows moderate growth potential with opportunities for innovation and market expansion. Key success factors include operational efficiency, customer retention strategies, and adaptation to changing market conditions.",
  sources: ["Industry reports", "Market analysis", "Public financial data"],
}
