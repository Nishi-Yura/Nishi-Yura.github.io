import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { TooltipProvider } from "@/components/ui/tooltip"
import { getReport } from "@/lib/report"
import { ReportPage } from "@/pages/report-page"
import { IndexPage } from "@/pages/index-page"
import "./index.css"

// <div id="root" data-report="1"> ならレポート、data-report が無ければ目次
const el = document.getElementById("root")!
const id = el.dataset.report ? Number(el.dataset.report) : null

createRoot(el).render(
  <StrictMode>
    <TooltipProvider delay={150}>
      {id ? <ReportPage report={getReport(id)} /> : <IndexPage />}
    </TooltipProvider>
  </StrictMode>
)
