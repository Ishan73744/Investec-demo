import type { CompanyScreeningData } from "@/lib/workflow/types"

export const companyScreeningData: Record<string, CompanyScreeningData> = {
  "aarti-drugs": {
    id: "aarti-drugs",
    name: "Aarti Drugs Limited",
    logoUrl: "/aarti-drugs-logo.png",
    sector: "Pharmaceuticals",
    description:
      "Aarti Drugs Ltd was established in the year 1984. The company is engaged in the manufacturing of Active Pharmaceutical Ingredients (APIs), Pharma Intermediates, Specialty Chemicals and also produces Formulations. The company is a part of $900 Million Aarti Group of Industries.",
    websiteUrl: "https://www.aartidrugs.co.in/",
    courtChecks: [
      {
        id: "cc1",
        date: "2023-05-12",
        title: "Case Filed: Environmental Compliance",
        description:
          "A case was filed regarding environmental compliance at the Tarapur facility. The case is currently under review by the National Green Tribunal.",
        sourceUrl: "#",
        type: "case",
      },
      {
        id: "cc2",
        date: "2022-11-20",
        title: "Case Settled: Patent Dispute",
        description:
          "A patent dispute with a competitor regarding the manufacturing process of an API was settled out of court. Terms were not disclosed.",
        sourceUrl: "#",
        type: "case",
      },
    ],
    amlChecks: [
      {
        id: "aml1",
        date: "2024-01-05",
        title: "Alert: Transaction Monitoring",
        description:
          "A high-value transaction was flagged by the monitoring system and subsequently cleared after a manual review, finding no illicit activity.",
        sourceUrl: "#",
        type: "alert",
      },
    ],
    management: [
      {
        id: "mg1",
        name: "Prakash M. Patil",
        title: "Chairman & Managing Director",
        imageUrl: "/placeholder.svg?height=100&width=100",
        linkedinUrl: "#",
        courtChecks: [],
        amlChecks: [],
      },
      {
        id: "mg2",
        name: "Harshit M. Savla",
        title: "Joint Managing Director",
        imageUrl: "/placeholder.svg?height=100&width=100",
        linkedinUrl: "#",
        courtChecks: [
          {
            id: "mg2-cc1",
            date: "2021-02-15",
            title: "Article: Mention in Trade Publication",
            description:
              "Mentioned in a trade publication regarding a personal investment in a tech startup, unrelated to company activities.",
            sourceUrl: "#",
            type: "article",
          },
        ],
        amlChecks: [],
      },
      {
        id: "mg3",
        name: "Adhish P. Patil",
        title: "Chief Financial Officer",
        imageUrl: "/placeholder.svg?height=100&width=100",
        linkedinUrl: "#",
        courtChecks: [],
        amlChecks: [],
      },
    ],
  },
}
