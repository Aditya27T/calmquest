// src/app/learn/page.tsx
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Users, 
  AlertTriangle,
  Coffee,
  Sun,
  Moon,
  Smile,
  Frown,
  Activity,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import Link from 'next/link';

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 text-center mb-6">
            Memahami Kesehatan Mental
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Kesehatan mental adalah bagian penting dari kesejahteraan hidup yang 
            mempengaruhi cara kita berpikir, merasa, dan bertindak dalam kehidupan sehari-hari.
          </p>
        </div>
      </section>

      {/* Basic Understanding Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8">
              Apa itu Kesehatan Mental?
            </h2>
            <p className="text-gray-600 mb-6">
              Kesehatan mental mencakup kesejahteraan emosional, psikologis, dan sosial kita. 
              Ini mempengaruhi cara kita:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Brain className="h-6 w-6 text-purple-700 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-purple-900">Berpikir: </span>
                  <span className="text-gray-600">
                    Kemampuan untuk memproses informasi, membuat keputusan, dan menyelesaikan masalah
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <Heart className="h-6 w-6 text-purple-700 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-purple-900">Merasa: </span>
                  <span className="text-gray-600">
                    Kemampuan untuk mengenali dan mengelola emosi dengan sehat
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 text-purple-700 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-purple-900">Bertindak: </span>
                  <span className="text-gray-600">
                    Cara kita berperilaku dan berinteraksi dengan orang lain
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
            Masalah Kesehatan Mental yang Umum
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <IssueCard
              icon={<AlertTriangle className="h-8 w-8 text-purple-700" />}
              title="Kecemasan"
              description="Perasaan khawatir atau takut yang berlebihan dan mengganggu aktivitas sehari-hari"
            />
            <IssueCard
              icon={<Frown className="h-8 w-8 text-purple-700" />}
              title="Depresi"
              description="Perasaan sedih yang berkepanjangan, kehilangan minat, dan perubahan pola tidur/makan"
            />
            <IssueCard
              icon={<Activity className="h-8 w-8 text-purple-700" />}
              title="Stress"
              description="Tekanan mental yang menyebabkan ketegangan fisik dan emosional"
            />
          </div>
        </div>
      </section>

      {/* Self Care Tips Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-purple-900 text-center mb-12">
            Tips Menjaga Kesehatan Mental
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <TipCard
              icon={<Sun className="h-6 w-6 text-purple-700" />}
              title="Rutinitas Sehat"
              tips={[
                "Tidur cukup dan teratur",
                "Makan makanan bergizi",
                "Olahraga rutin"
              ]}
            />
            <TipCard
              icon={<Coffee className="h-6 w-6 text-purple-700" />}
              title="Keseimbangan Hidup"
              tips={[
                "Atur waktu kerja dan istirahat",
                "Luangkan waktu untuk hobi",
                "Jaga hubungan sosial"
              ]}
            />
            <TipCard
              icon={<Smile className="h-6 w-6 text-purple-700" />}
              title="Kesehatan Emosional"
              tips={[
                "Praktik mindfulness",
                "Meditasi rutin",
                "Ekspresikan perasaan"
              ]}
            />
            <TipCard
              icon={<Moon className="h-6 w-6 text-purple-700" />}
              title="Relaksasi"
              tips={[
                "Teknik pernapasan",
                "Yoga ringan",
                "Aktivitas menenangkan"
              ]}
            />
          </div>
        </div>
      </section>

      {/* When to Seek Help Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 text-center mb-8">
              Kapan Harus Mencari Bantuan?
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Jika Anda mengalami gejala berikut selama lebih dari 2 minggu, 
              sebaiknya segera konsultasi dengan profesional:
            </p>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <ul className="space-y-4">
                <WarningSign text="Perubahan drastis pada pola tidur atau makan" />
                <WarningSign text="Kesulitan melakukan aktivitas sehari-hari" />
                <WarningSign text="Perasaan sedih atau cemas yang intens" />
                <WarningSign text="Pikiran untuk menyakiti diri sendiri" />
                <WarningSign text="Penarikan diri dari lingkungan sosial" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Butuh Bantuan Segera?</h2>
          <p className="mb-8">
            Tim profesional kami siap membantu Anda 24/7
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              className="bg-white text-purple-900 hover:bg-purple-50"
              asChild
            >
              <Link href="/emergency" className="flex items-center">
                <PhoneCall className="mr-2 h-5 w-5" />
                Kontak Darurat
              </Link>
            </Button>
            <Button className="bg-purple-700 hover:bg-purple-800" asChild>
              <Link href="/assessment" className="flex items-center">
                Mulai Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const IssueCard = ({ icon, title, description }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-purple-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TipCard = ({ icon, title, tips }: any) => (
  <div className="bg-purple-50 p-6 rounded-xl">
    <div className="mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-purple-900 mb-3">{title}</h3>
    <ul className="space-y-2">
      {tips.map(({ tip }: any, index: any) => (
        <li key={index} className="text-gray-600 text-sm flex items-start">
          <span className="text-purple-700 mr-2">•</span>
          {tip}
        </li>
      ))}
    </ul>
  </div>
);

const WarningSign = ({ text }: any) => (
  <li className="flex items-center">
    <AlertTriangle className="h-5 w-5 text-purple-700 mr-3 flex-shrink-0" />
    <span className="text-gray-600">{text}</span>
  </li>
);