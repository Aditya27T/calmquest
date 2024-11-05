'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PDFGeneratorProps {
  contentRef: React.RefObject<HTMLDivElement>;
}

export const PDFGenerator = ({ contentRef }: PDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const addWatermark = (pdf: jsPDF) => {
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setTextColor(230, 230, 230);
      pdf.setFontSize(60);
      
      // Use type assertion to handle the GState
      const gState = new (pdf as any).GState({ opacity: 0.3 });
      (pdf as any).setGState(gState);
      
      pdf.text(
        'CalmQuest',
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height / 2,
        { angle: 45, align: 'center' }
      );
      
      // Reset opacity
      const fullOpacity = new (pdf as any).GState({ opacity: 1 });
      (pdf as any).setGState(fullOpacity);
    }
  };

  const generatePDF = async () => {
    if (!contentRef.current) {
      toast({
        title: "Error",
        description: "Konten tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      toast({
        title: "Generating PDF",
        description: "Mohon tunggu sebentar...",
      });

      // Apply fixed desktop size styling
      const originalStyle = contentRef.current.style.cssText;
      contentRef.current.style.width = '1024px';
      contentRef.current.style.padding = '20px';
      contentRef.current.style.transform = 'scale(1)';
      contentRef.current.style.transformOrigin = 'top left';

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Restore original styles after capturing
      contentRef.current.style.cssText = originalStyle;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(102, 51, 153);
      pdf.text('CalmQuest - Hasil Assessment', 105, 15, { align: 'center' });

      // Add date
      pdf.setFontSize(12);
      pdf.setTextColor(96, 96, 96);
      const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      pdf.text(`Tanggal: ${today}`, 105, 25, { align: 'center' });

      addWatermark(pdf);

      pdf.addImage(imgData, 'PNG', 0, 35, imgWidth, imgHeight);

      pdf.setFontSize(10);
      pdf.setTextColor(128, 128, 128);
      pdf.text(
        'Hasil ini bersifat indikatif dan tidak menggantikan diagnosis profesional',
        105,
        pdf.internal.pageSize.height - 10,
        { align: 'center' }
      );

      const fileName = `CalmQuest-Hasil-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF berhasil dibuat",
        description: "File telah diunduh ke perangkat Anda",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Gagal membuat PDF",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant="outline"
      className="bg-white hover:bg-gray-50"
    >
      {isGenerating ? (
        <>
          <span className="inline-block animate-spin mr-2">⏳</span>
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </>
      )}
    </Button>
  );
};