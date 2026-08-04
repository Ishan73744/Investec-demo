"use client"

import { useState, useRef, useEffect } from "react"
import { WorkflowLayout } from "@/components/workflow/workflow-layout"
import { WorkflowHeader } from "@/components/workflow/workflow-header"
import { ChatInterface } from "@/components/workflow/chat-interface"
import { ChatInput } from "@/components/workflow/chat-input"
import { CustomizationBox } from "@/components/workflow/customization-box"
import { WorkflowEngine } from "@/lib/workflow/workflow-engine"
import type { MessageProps } from "@/components/workflow/chat-message"
import { CompanyNameInput } from "@/components/workflow/customization/company-name-input"
import { CompanyProfile } from "@/components/workflow/report/company-profile"

// Define the workflow configuration
const workflowConfig = {
  id: "company-one-pager",
  title: "Company One-Pagers – Strategic Summary Profiles",
  description:
    "Concise, standardized one-page summaries of companies covering key business details, product focus, financial performance, manufacturing footprint, and strategic transactions — for quick partner-level decision-making and opportunity assessment.",
  steps: [
    {
      id: 1,
      title: "Enter Company Name",
      description: "Provide the name of the company you want to analyze",
    },
    {
      id: 2,
      title: "Data Collection",
      description: "Gathering company information from various sources",
    },
    {
      id: 3,
      title: "Profile Generation",
      description: "Creating a comprehensive one-page company profile",
    },
    {
      id: 4,
      title: "Review Results",
      description: "Review and download the company profile",
    },
  ],
  initialMessage: (
    <div className="space-y-4">
      <p className="text-[#001742]">
        Welcome to the Company One-Pager workflow. Please enter the name of the company you'd like to create a strategic
        summary profile for.
      </p>
    </div>
  ),
}

// Sample company data (would be fetched from API in a real implementation)
const sampleCompanyData = {
  aartiDrugs: {
    name: "Aarti Drugs Limited",
    established: "1984",
    stockInfo: "BSE: 524348 | NSE: AARTIDRUGS",
    overview:
      "Founded in 1984, Aarti Drugs Limited is a prominent Indian pharmaceutical company specializing in manufacturing Active Pharmaceutical Ingredients (APIs). Promoted by Mr. Chandrakant Gogri and associates, its major shareholders include the Gogri family and institutional investors.",
    products: [
      {
        category: "Active Pharmaceutical Ingredients (APIs)",
        description: "Bulk drugs primarily for antibiotics, anti-inflammatory, anti-diabetic medications.",
      },
      {
        category: "Specialty Chemicals",
        description: "Custom synthesis and contract manufacturing solutions for global pharmaceutical players.",
      },
      {
        category: "Formulations",
        description: "Finished dosage forms marketed domestically and internationally.",
      },
    ],
    manufacturing:
      "Aarti Drugs operates several manufacturing plants, prominently located in Tarapur (Maharashtra), Sarigam (Gujarat), and Baddi (Himachal Pradesh). The facilities comply with global regulatory standards, including approvals from USFDA, WHO-GMP, and European health authorities.",
    transactions: [
      {
        year: "2021",
        description: "Raised ₹69.85 crore via Qualified Institutional Placement (QIP).",
      },
      {
        year: "2020",
        description: "Bonus share issuance (3:1 ratio).",
      },
      {
        year: "2016",
        description: "Capacity expansion of Tarapur manufacturing unit (Investment: ₹50 crore).",
      },
    ],
    keyMetrics: [
      { label: "Market Cap", value: "₹4,650 Cr" },
      { label: "Employees", value: "1,200+" },
      { label: "Export Presence", value: "60+ Countries" },
      { label: "R&D Investment", value: "3.5% of Revenue" },
    ],
    financials: [
      {
        metric: "Revenue (₹ Cr)",
        fy2023: "2,677 (+4.2%)",
        fy2022: "2,570 (+12%)",
        fy2021: "2,295 (+18%)",
      },
      {
        metric: "EBITDA (₹ Cr)",
        fy2023: "350 (+3.9%)",
        fy2022: "337 (+8%)",
        fy2021: "312 (+15%)",
      },
      {
        metric: "Net Profit (₹ Cr)",
        fy2023: "187 (+6.7%)",
        fy2022: "175 (+5%)",
        fy2021: "167 (+18%)",
      },
      {
        metric: "Profit Margin (%)",
        fy2023: "6.98%",
        fy2022: "6.81%",
        fy2021: "7.28%",
      },
      {
        metric: "Debt-to-Equity Ratio",
        fy2023: "0.46",
        fy2022: "0.52",
        fy2021: "0.57",
      },
      {
        metric: "P/E Ratio",
        fy2023: "24.8",
        fy2022: "26.2",
        fy2021: "22.5",
      },
    ],
    website: "www.aartidrugs.co.in",
    email: "investor@aartidrugs.com",
  },
  sunPharma: {
    name: "Sun Pharmaceutical Industries Ltd.",
    established: "1983",
    stockInfo: "BSE: 524715 | NSE: SUNPHARMA",
    overview:
      "Sun Pharmaceutical Industries Ltd. is India's largest pharmaceutical company and the fifth largest specialty generic company globally. Founded by Dilip Shanghvi, it has grown through strategic acquisitions and R&D investments to become a leader in the global generic pharmaceuticals market.",
    products: [
      {
        category: "Generic Pharmaceuticals",
        description: "Wide range of generic formulations across therapeutic categories.",
      },
      {
        category: "Specialty Products",
        description: "Focused on dermatology, ophthalmology, oncology, and complex generics.",
      },
      {
        category: "Active Pharmaceutical Ingredients (APIs)",
        description: "Manufacturing of key pharmaceutical ingredients for internal use and external sales.",
      },
    ],
    manufacturing:
      "Sun Pharma operates over 40 manufacturing facilities across India, US, Brazil, Canada, Hungary, Israel, Bangladesh, Mexico, and other countries. These facilities are approved by major regulatory authorities including USFDA, EMA, UK MHRA, and Japan PMDA.",
    transactions: [
      {
        year: "2015",
        description: "Acquired Ranbaxy Laboratories for $4 billion, the largest pharma acquisition in India.",
      },
      {
        year: "2016",
        description: "Acquired 14 established prescription brands from Novartis in Japan.",
      },
      {
        year: "2019",
        description: "Acquired Pola Pharma in Japan to strengthen global dermatology presence.",
      },
    ],
    keyMetrics: [
      { label: "Market Cap", value: "₹2,85,000 Cr" },
      { label: "Employees", value: "37,000+" },
      { label: "Global Presence", value: "100+ Countries" },
      { label: "R&D Investment", value: "7.6% of Revenue" },
    ],
    financials: [
      {
        metric: "Revenue (₹ Cr)",
        fy2023: "43,279 (+10.8%)",
        fy2022: "39,055 (+15.6%)",
        fy2021: "33,765 (+2.5%)",
      },
      {
        metric: "EBITDA (₹ Cr)",
        fy2023: "11,689 (+15.2%)",
        fy2022: "10,146 (+23.1%)",
        fy2021: "8,243 (+6.8%)",
      },
      {
        metric: "Net Profit (₹ Cr)",
        fy2023: "8,473 (+18.7%)",
        fy2022: "7,139 (+29.4%)",
        fy2021: "5,516 (+7.2%)",
      },
      {
        metric: "Profit Margin (%)",
        fy2023: "19.58%",
        fy2022: "18.28%",
        fy2021: "16.34%",
      },
      {
        metric: "Debt-to-Equity Ratio",
        fy2023: "0.12",
        fy2022: "0.15",
        fy2021: "0.18",
      },
      {
        metric: "P/E Ratio",
        fy2023: "33.6",
        fy2022: "35.2",
        fy2021: "38.4",
      },
    ],
    website: "www.sunpharma.com",
    email: "investor.relations@sunpharma.com",
  },
  cipla: {
    name: "Cipla Limited",
    established: "1935",
    stockInfo: "BSE: 500087 | NSE: CIPLA",
    overview:
      "Founded in 1935 by Dr. K.A. Hamied, Cipla Limited is a global pharmaceutical company focused on complex generics and specialty products. The company is known for its pioneering role in providing affordable HIV/AIDS medications to developing countries and its strong respiratory portfolio.",
    products: [
      {
        category: "Respiratory Products",
        description: "Market leader in respiratory medications including inhalers and nebulizers.",
      },
      {
        category: "Complex Generics",
        description: "Difficult-to-manufacture generic medications across therapeutic areas.",
      },
      {
        category: "Specialty Products",
        description: "Focused on respiratory, oncology, and infectious diseases.",
      },
    ],
    manufacturing:
      "Cipla operates 46 manufacturing facilities worldwide, with major sites in India, South Africa, USA, and China. The facilities are approved by major regulatory authorities including USFDA, UK MHRA, WHO, and South African MCC.",
    transactions: [
      {
        year: "2015",
        description: "Acquired InvaGen Pharmaceuticals and Exelan Pharmaceuticals in the US for $550 million.",
      },
      {
        year: "2016",
        description: "Acquired 100% stake in Cipla Medpro South Africa.",
      },
      {
        year: "2019",
        description: "Formed joint venture with Jiangsu Acebright Pharmaceutical in China.",
      },
    ],
    keyMetrics: [
      { label: "Market Cap", value: "₹1,12,000 Cr" },
      { label: "Employees", value: "25,000+" },
      { label: "Global Presence", value: "80+ Countries" },
      { label: "R&D Investment", value: "6.2% of Revenue" },
    ],
    financials: [
      {
        metric: "Revenue (₹ Cr)",
        fy2023: "22,758 (+6.4%)",
        fy2022: "21,385 (+8.2%)",
        fy2021: "19,762 (+12.1%)",
      },
      {
        metric: "EBITDA (₹ Cr)",
        fy2023: "5,235 (+9.8%)",
        fy2022: "4,766 (+11.5%)",
        fy2021: "4,274 (+15.3%)",
      },
      {
        metric: "Net Profit (₹ Cr)",
        fy2023: "3,129 (+12.6%)",
        fy2022: "2,778 (+8.7%)",
        fy2021: "2,556 (+14.2%)",
      },
      {
        metric: "Profit Margin (%)",
        fy2023: "13.75%",
        fy2022: "12.99%",
        fy2021: "12.93%",
      },
      {
        metric: "Debt-to-Equity Ratio",
        fy2023: "0.08",
        fy2022: "0.11",
        fy2021: "0.14",
      },
      {
        metric: "P/E Ratio",
        fy2023: "35.8",
        fy2022: "32.4",
        fy2021: "29.7",
      },
    ],
    website: "www.cipla.com",
    email: "investorrelations@cipla.com",
  },
}

export default function CompanyOnePagerPage() {
  // Initialize the workflow engine
  const [workflowEngine] = useState(() => new WorkflowEngine(workflowConfig))

  // State management
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [activeCustomizationId, setActiveCustomizationId] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [companyData, setCompanyData] = useState<any>(null)

  // References
  const contentContainerRef = useRef<HTMLDivElement>(null)

  // Initialize the workflow
  useEffect(() => {
    setIsMounted(true)
    const initialMessages = workflowEngine.initialize()
    setMessages(initialMessages)
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
  }, [])

  // Handle company name submission
  const handleCompanySubmit = (companyName: string) => {
    // Normalize company name for matching
    const normalizedName = companyName.toLowerCase().replace(/\s+/g, "")

    // Find matching company in our sample data
    let matchedCompany = null
    if (normalizedName.includes("aarti") || normalizedName.includes("drug")) {
      matchedCompany = "aartiDrugs"
    } else if (normalizedName.includes("sun") || normalizedName.includes("pharma")) {
      matchedCompany = "sunPharma"
    } else if (normalizedName.includes("cipla")) {
      matchedCompany = "cipla"
    } else {
      // Default to Aarti Drugs if no match
      matchedCompany = "aartiDrugs"
    }

    setSelectedCompany(matchedCompany)
    setCurrentStep(2) // Move to data collection step

    // Add user message
    workflowEngine.addMessage("user", `I'd like to generate a one-pager for ${companyName}`)

    // Show data collection process
    simulateDataCollection(matchedCompany)
  }

  // Simulate data collection process
  const simulateDataCollection = (companyKey: string) => {
    const steps = [
      "Searching for company information...",
      "Retrieving financial data...",
      "Analyzing company structure...",
      "Gathering product portfolio details...",
      "Collecting manufacturing information...",
      "Retrieving transaction history...",
      "Compiling key metrics...",
      "Generating financial analysis...",
    ]

    workflowEngine.addLoadingMessage(steps[0])
    setMessages(workflowEngine.getMessages())

    // Simulate sequential loading steps
    let stepIndex = 1
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        workflowEngine.updateLoadingMessage(steps[stepIndex])
        setMessages(workflowEngine.getMessages())
        stepIndex++
      } else {
        clearInterval(interval)
        workflowEngine.removeLoadingMessage()
        showCompanyProfile(companyKey)
      }
    }, 1500)
  }

  // Show company profile
  const showCompanyProfile = (companyKey: string) => {
    setCurrentStep(4) // Move to results step
    setIsProfileComplete(true)
    setCompanyData(sampleCompanyData[companyKey as keyof typeof sampleCompanyData])

    // Clear active customization before showing the final result
    workflowEngine.clearActiveCustomization()
    setActiveCustomizationId(null)

    // Send a single combined message with both the text and the profile component
    workflowEngine.addMessage(
      "system",
      <div className="space-y-4">
        <p className="text-[#001742]">
          I've compiled a comprehensive one-page strategic profile for{" "}
          {sampleCompanyData[companyKey as keyof typeof sampleCompanyData].name}. Here's the summary:
        </p>

        <CompanyProfile
          companyData={sampleCompanyData[companyKey as keyof typeof sampleCompanyData]}
          onRestart={() => {
            // Reset the workflow
            const initialMessages = workflowEngine.initialize()
            setMessages(initialMessages)
            setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
            setCurrentStep(1)
            setIsProfileComplete(false)
            setSelectedCompany(null)
            setCompanyData(null)
          }}
        />
      </div>,
    )

    setMessages(workflowEngine.getMessages())
  }

  // Handle editing a message
  const handleEditMessage = (messageId: string) => {
    workflowEngine.handleEditMessage(messageId)
    setMessages(workflowEngine.getMessages())
    setActiveCustomizationId(workflowEngine.getActiveCustomizationId())
    setCurrentStep(workflowEngine.getCurrentStep())
  }

  // Render customization content based on current step
  const renderCustomizationContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyNameInput onSubmit={handleCompanySubmit} />
      default:
        return null
    }
  }

  // Add customization content to messages
  const messagesWithCustomization = messages.map((message) => {
    if (message.id === activeCustomizationId && message.showCustomization) {
      return {
        ...message,
        customization: <CustomizationBox>{renderCustomizationContent()}</CustomizationBox>,
      }
    }
    return message
  })

  return (
    <WorkflowLayout>
      <WorkflowHeader
        title="Company One-Pagers – Strategic Summary Profiles"
        breadcrumbs={[{ label: "Workflows", href: "/" }]}
      />

      {isMounted && (
        <>
          <ChatInterface
            messages={messagesWithCustomization}
            activeCustomizationId={activeCustomizationId}
            onEditMessage={handleEditMessage}
            contentContainerRef={contentContainerRef}
          />

          {isProfileComplete && (
            <ChatInput
              onSend={(message) => {
                // Handle follow-up questions here
                workflowEngine.addMessage("user", message)
                setMessages(workflowEngine.getMessages())

                // Simulate response
                setTimeout(() => {
                  workflowEngine.addMessage(
                    "system",
                    <div>
                      <p className="text-[#4e5971]">
                        I'll help you with that. What specific aspect of the company profile would you like to explore
                        further?
                      </p>
                    </div>,
                  )
                  setMessages(workflowEngine.getMessages())
                }, 1000)
              }}
              placeholder="Ask a follow-up question about the company profile..."
              fixed={true}
              contentContainerRef={contentContainerRef}
            />
          )}
        </>
      )}
    </WorkflowLayout>
  )
}
