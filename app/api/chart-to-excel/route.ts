import { type NextRequest, NextResponse } from "next/server"

interface ChartToExcelPayload {
  imageUrl: string
  chartType: string
  options: {
    includeDataTable: boolean
    applyColorScheme: string
    addTrendlines: boolean
  }
  metadata?: {
    filename: string
    uploadedAt: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, chartType, options, metadata }: ChartToExcelPayload = body

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Prepare payload for external service
    const externalPayload = {
      image_url: imageUrl,
      chart_type: chartType,
      conversion_options: {
        include_data_table: options.includeDataTable,
        color_scheme: options.applyColorScheme,
        add_trendlines: options.addTrendlines,
      },
      metadata: {
        original_filename: metadata?.filename || "chart_screenshot.png",
        uploaded_at: metadata?.uploadedAt || new Date().toISOString(),
        request_id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
    }

    // Call external service
    const externalResponse = await fetch("https://chunking-orchestration.bynd.ai/api/chart-to-excel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any required authentication headers here
        // 'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`,
        // 'X-API-Key': process.env.EXTERNAL_API_KEY,
      },
      body: JSON.stringify(externalPayload),
    })

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text()
      console.error("External API error:", errorText)
      return NextResponse.json(
        {
          error: "Chart conversion failed",
          details: errorText,
        },
        { status: externalResponse.status },
      )
    }

    const result = await externalResponse.json()

    // The external service should return something like:
    // {
    //   success: true,
    //   excel_file_url: "https://...",
    //   extracted_data: {...},
    //   processing_time: "2.3s"
    // }

    return NextResponse.json({
      success: true,
      excelFileUrl: result.excel_file_url,
      extractedData: result.extracted_data,
      processingTime: result.processing_time,
      requestId: externalPayload.metadata.request_id,
    })
  } catch (error) {
    console.error("Chart conversion error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
