'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Hospital, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import emergencyData from '../../../public/data/emergency.json';

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedHospital, setSelectedHospital] = useState(emergencyData.hospitals[0]);

  const handleHospitalSelect = (hospital: any) => {
    setSelectedHospital(hospital);
    setActiveTab('details');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-700 hover:text-purple-800 mb-8"
        >
          Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Kontak Penting</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Daftar layanan darurat dan rumah sakit jiwa yang dapat membantu Anda.
          </p>
        </div>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
            <Phone className="h-6 w-6 mr-2" />
            Nomor Darurat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyData.emergencyContacts[0].contacts.map((contact, index) => (
              <Card 
                key={index} 
                className="p-6 bg-red-50 border-red-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.name}</h3>
                <p className="text-gray-600 mb-4">{contact.description}</p>
                <div className="flex items-center text-red-700">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="text-lg font-semibold">{contact.phone}</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-gray-800 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {contact.available}
                </span>
              </Card>
            ))}
          </div>
        </section>

        {/* Hospital Details Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
            <Hospital className="h-6 w-6 mr-2" />
            Rumah Sakit Jiwa
          </h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Detail RSJ</TabsTrigger>
              <TabsTrigger value="list">Daftar RSJ</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              {selectedHospital && (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-purple-900">{selectedHospital.name}</h3>
                  <p className="text-gray-600">{selectedHospital.address}</p>
                  <p className="text-gray-600">{selectedHospital.phone}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedHospital.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-4">
                {emergencyData.hospitals.map((hospital, index) => (
                  <Card
                    key={index}
                    className="p-4 cursor-pointer hover:bg-purple-50"
                    onClick={() => handleHospitalSelect(hospital)}
                  >
                    <h3 className="text-lg font-semibold text-purple-900">{hospital.name}</h3>
                    <p className="text-sm text-gray-600">{hospital.address}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
