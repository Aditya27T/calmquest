// src/components/pdf-generator.tsx
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
      // Set watermark style
      pdf.setTextColor(230, 230, 230);
      pdf.setFontSize(60);
      pdf.setGState(new pdf.GState({ opacity: 0.3 }));
      
      // Add watermark diagonally
      pdf.text(
        'CalmQuest',
        pdf.internal.pageSize.width/2,
        pdf.internal.pageSize.height/2,
        {
          angle: 45,
          align: 'center'
        }
      );
      
      // Reset text state for other content
      pdf.setGState(new pdf.GState({ opacity: 1 }));
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
      
      // Show generating toast
      toast({
        title: "Generating PDF",
        description: "Mohon tunggu sebentar...",
      });

      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (document) => {
          // Modify cloned document if needed
          const element = document.getElementById('content-to-pdf');
          if (element) {
            element.style.padding = '20px';
          }
        }
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');

      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(102, 51, 153); // Purple color
      pdf.text('CalmQuest - Hasil Assessment', 105, 15, { align: 'center' });
      
      // Add date
      pdf.setFontSize(12);
      pdf.setTextColor(96, 96, 96); // Gray color
      const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(`Tanggal: ${today}`, 105, 25, { align: 'center' });

      // Add watermark
      addWatermark(pdf);

      // Add content
      pdf.addImage(imgData, 'PNG', 0, 35, imgWidth, imgHeight);

      // Add footer
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        
        // Add page number
        pdf.text(
          `Halaman ${i} dari ${pageCount}`,
          105,
          pdf.internal.pageSize.height - 20,
          { align: 'center' }
        );
        
        // Add disclaimer
        pdf.text(
          'Hasil ini bersifat indikatif dan tidak menggantikan diagnosis profesional',
          105,
          pdf.internal.pageSize.height - 10,
          { align: 'center' }
        );
      }

      // Save PDF
      const fileName = `CalmQuest-Hasil-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      // Show success toast
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