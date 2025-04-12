
import React from "react";
import { ResumeData } from "./ResumeEditor";
import { SimpleTemplate } from "./templates/SimpleTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { ATSTemplate } from "./templates/ATSTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, Download, FileJson, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { exportResumeAsJSON } from "@/utils/localStorage";
import { toast } from "sonner";

interface ResumePreviewProps {
  resumeData: ResumeData;
  currentResumeId: string;
}

export function ResumePreview({ resumeData, currentResumeId }: ResumePreviewProps) {
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast.info("Generating PDF...");
      
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, "PNG", imgX, 0, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = resumeData.name 
        ? `${resumeData.name.replace(/\s+/g, '_')}.pdf` 
        : "resume.pdf";
        
      pdf.save(fileName);
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const exportAsJSON = () => {
    if (!currentResumeId) {
      toast.error("No resume to export");
      return;
    }
    
    const jsonData = exportResumeAsJSON(currentResumeId);
    if (!jsonData) {
      toast.error("Failed to export resume");
      return;
    }
    
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.name || "resume"}.json`;
    document.body.appendChild(link);
    link.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    
    toast.success("Resume exported as JSON");
  };

  const exportAsTxt = () => {
    if (!resumeRef.current) return;
    
    try {
      // Extract plain text content
      const content = resumeRef.current.innerText;
      
      // Create a blob and download
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${resumeData.name || "resume"}.txt`;
      document.body.appendChild(link);
      link.click();
      
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      toast.success("Resume exported as TXT (ATS-friendly)");
    } catch (error) {
      console.error("Error exporting as TXT:", error);
      toast.error("Failed to export as TXT");
    }
  };

  const renderTemplate = () => {
    switch (resumeData.selectedTemplate) {
      case "simple":
        return <SimpleTemplate data={resumeData} />;
      case "minimalist":
        return <MinimalistTemplate data={resumeData} />;
      case "professional":
        return <ProfessionalTemplate data={resumeData} />;  
      case "creative":
        return <CreativeTemplate data={resumeData} />;
      case "ats":
        return <ATSTemplate data={resumeData} />;
      default:
        return <SimpleTemplate data={resumeData} />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="no-print">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">Resume Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button size="sm" onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={exportAsTxt}>
              <FileText className="h-4 w-4 mr-2" />
              Export TXT (ATS)
            </Button>
            <Button variant="outline" size="sm" onClick={exportAsJSON}>
              <FileJson className="h-4 w-4 mr-2" />
              Backup (JSON)
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div ref={resumeRef} className="animate-fade-in">
        {renderTemplate()}
      </div>
    </div>
  );
}
