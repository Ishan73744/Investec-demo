export interface AlertCardData {
  title: string
  description: string
  requiredInputs: string
}

export interface AlertCategory {
  name: string
  alerts: AlertCardData[]
}

export const alertCategoriesData: AlertCategory[] = [
  {
    name: "General Watchlist",
    alerts: [
      {
        title: "360° Company Sentinel",
        description:
          "Tracks **all** statutory filings (MCA, BSE-NSE, SEBI SDD, Form 8-K for overseas ADRs), price + volume anomalies, leadership changes, and mainstream-media headlines—bundles them into a single daily digest.",
        requiredInputs: "• Up to 20 tickers / CINs",
      },
      {
        title: "Thematic Basket Monitor",
        description:
          "Monitors a user-defined basket (e.g., “Green Hydrogen plays”) for any event that moves ≥ 5 % of constituents’ market cap or links to a common theme.",
        requiredInputs: "• List of tickers OR theme keyword",
      },
      {
        title: "Sector Pulse Scout",
        description:
          "For NIFTY sector indices (IT, Pharma, Bank, etc.) scrapes index factsheets, broker top-picks, and sector-specific RBI/SEBI circulars; delivers a weekly pulse report.",
        requiredInputs: "• Sector pick (default = All)",
      },
      {
        title: "Macro-&-Micro Fuse Agent",
        description:
          "Blends macro releases (CPI, IIP, RBI policy) with watch-list company data; highlights where macro prints statistically explain > X % of the firm’s one-day move.",
        requiredInputs: "• Ticker list",
      },
    ],
  },
  {
    name: "Corporate Events & Disclosures",
    alerts: [
      {
        title: "Earnings Pulse Agent",
        description:
          "Mines BSE/NSE results PDFs + concall transcripts (Symphony, ResearchBytes); returns YoY/ QoQ deltas, margin commentary, and tone.",
        requiredInputs: "• Tickers",
      },
      {
        title: "M&A Rumor Scout",
        description:
          "Screens SEBI SAST filings, DHRP drafts, and DealStreetAsia / VCCircle leaks for “strategic stake”, “scheme of arrangement”, etc.",
        requiredInputs: "• Target universe",
      },
      {
        title: "Leadership-Change Sentinel",
        description:
          "Watches BSE “corporate actions” + MCA DIR-12 filings; alerts on KMP exits/appointments, succession depth.",
        requiredInputs: "• Company list",
      },
    ],
  },
  {
    name: "Credit Rating & Risk",
    alerts: [
      {
        title: "Negative-Watch Detector",
        description:
          "Ingests CRISIL, ICRA, India Ratings, CARE bulletins; fires on Outlook → “Negative” / “Watch Neg”.",
        requiredInputs: "• Issuer list",
      },
      {
        title: "Bankruptcy Radar",
        description:
          "Streams NCLT cause-lists + IBBI portal for CIRP admissions; summarises petitioner, claim size, bench.",
        requiredInputs: "• Corporate group map",
      },
      {
        title: "Covenant-Breach Tracker",
        description:
          "Parses RBI-mandated quarterly covenant compliance and banking syndicate disclosures; spots breaches/waivers.",
        requiredInputs: "• Loan IDs",
      },
    ],
  },
  {
    name: "Market-Movement Signals",
    alerts: [
      {
        title: "Price-Shock Alert",
        description:
          "Detects ≥ X % intraday move vs NIFTY beta; auto-pulls Moneycontrol / Reuters headlines and NSE option tape.",
        requiredInputs: "• Tickers • %-move",
      },
      {
        title: "Volume-Anomaly Agent",
        description: "Spots ≥ 3× 30-day avg volume on NSE/BSE; matches with bulk/block deals feed.",
        requiredInputs: "• Tickers",
      },
      {
        title: "Short-Interest Surge Monitor",
        description: "Uses NSE daily shorts & F&O build-up to flag rises in > T % of free float.",
        requiredInputs: "• Tickers",
      },
    ],
  },
  {
    name: "Regulatory & Policy",
    alerts: [
      {
        title: "SEBI Circular Watcher",
        description: "Live-streams SEBI master circulars, settlement orders; tags sector impact & compliance dates.",
        requiredInputs: "• Sector keywords",
      },
      {
        title: "RBI Monetary-Policy Pulse",
        description:
          "Captures MPC statements, unscheduled speeches, OMO notices; extracts stance changes and rate-path language.",
        requiredInputs: "• None",
      },
      {
        title: "Tax-Bill Tracker",
        description:
          "Tracks Finance-Bill amendments and GST Council minutes; flags clauses altering effective tax rates for listed firms.",
        requiredInputs: "• Sector/ clause tags",
      },
    ],
  },
  {
    name: "Macro-Indicator Flash",
    alerts: [
      {
        title: "Inflation-Print Snapshot",
        description: "Fetches MOSPI CPI/WPI, compares v. Bloomberg consensus, annotates RBI commentary.",
        requiredInputs: "• Country (default = India)",
      },
      {
        title: "PMI Turning-Point Detector",
        description: "Monitors S&P Global PMI India; flags first MoM cross of 50 or 3-month trend break.",
        requiredInputs: "• Geography",
      },
      {
        title: "FX-Vol Spike Agent",
        description: "Tracks USD-INR implied vols; alerts when 1-wk ATM vol > 90th pct of past yr.",
        requiredInputs: "• Currency pair",
      },
    ],
  },
  {
    name: "Sentiment & Media",
    alerts: [
      {
        title: "Social-Sentiment Scanner",
        description:
          "Analyzes verified X/Twitter handles (FinTwit India), Reddit r/IndianStreetBets; surfaces sudden polarity shifts tagged to tickers.",
        requiredInputs: "• Tickers",
      },
      {
        title: "Analyst-Note Aggregator",
        description: "Scrapes ICICI Direct, Kotak, Jefferies PDFs; extracts rating/TP changes & thesis bullets.",
        requiredInputs: "• Broker universe",
      },
      {
        title: "CEO Interview Extractor",
        description: "Transcribes ET Now / CNBC-TV18 interviews; pulls forward-looking statements & tone.",
        requiredInputs: "• Exec names",
      },
    ],
  },
  {
    name: "Supply-Chain & Commodity",
    alerts: [
      {
        title: "Freight-Rate Spike Alert",
        description: "Monitors Baltic Dry, India Domestic Freight Index; links moves to top exporters.",
        requiredInputs: "• Commodity focus",
      },
      {
        title: "Input-Cost Monitor",
        description:
          "Watches MCX/LME prices (copper, steel) & Agri spot markets; cross-maps to COGS % in company filings.",
        requiredInputs: "• Tickers + commodity map",
      },
      {
        title: "Export-Ban Sentinel",
        description: "Flags DGFT notifications on export curbs (rice, sugar, iron ore); summarises scope & duration.",
        requiredInputs: "• Commodity keywords",
      },
    ],
  },
]
