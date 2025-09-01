'use client'; 
import { useState } from 'react';
import SignatureForm from "@/components/SignatureForm";
import SignaturePreview from "@/components/SignaturePreview";

export interface SignatureData {
  name: string;
  role: string;
  mobile: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

export default function Home() {
  const [data, setData] = useState<SignatureData>({
    name: '',
    role: '',
    mobile: '',
    facebook: '',
    linkedin: '',
    instagram: '',
  });

  return (
    <section className="p-4 md:p-10 w-full">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <SignatureForm data={data} setData={setData} />
        <SignaturePreview data={data} />
      </div>
    </section>
  );
}
