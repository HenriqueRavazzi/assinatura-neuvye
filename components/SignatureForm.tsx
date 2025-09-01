'use client';

import { SignatureData } from '@/app/page';

interface SignatureFormProps {
  data: SignatureData;
  setData: React.Dispatch<React.SetStateAction<SignatureData>>;
}

const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 11) {
    return phoneNumber
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }

  return phoneNumber
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
};


export default function SignatureForm({ data, setData }: SignatureFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'mobile') {
      const formattedValue = formatPhoneNumber(value);
      setData((prevData) => ({ ...prevData, [id]: formattedValue }));
    } else {
      setData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Insira seus dados</h2>
      <p className="card-subtitle">A prévia será atualizada automaticamente.</p>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="name" className="form-label">Nome Completo*</label>
          <input type="text" id="name" value={data.name} onChange={handleChange} className="form-input" placeholder="Ex: João da Silva" />
        </div>
        <div>
          <label htmlFor="role" className="form-label">Cargo / Área</label>
          <input type="text" id="role" value={data.role} onChange={handleChange} className="form-input" placeholder="Ex: Analista de Marketing" />
        </div>
        <div>
          <label htmlFor="mobile" className="form-label">Celular (WhatsApp)</label>
          <input type="tel" id="mobile" value={data.mobile} onChange={handleChange} className="form-input" placeholder="(41) 99999-9999" />
        </div>
        
        <div>
          <label htmlFor="facebook" className="form-label">Facebook <span className="font-normal text-slate-600">(Opcional)</span></label>
          <div className="social-input-container">
            <span className="social-input-prefix">https://facebook.com/</span>
            <input type="text" id="facebook" value={data.facebook} onChange={handleChange} className="social-input-field" placeholder="seu.usuario" />
          </div>
        </div>
        <div>
          <label htmlFor="instagram" className="form-label">Instagram <span className="font-normal text-slate-600">(Opcional)</span></label>
          <div className="social-input-container">
            <span className="social-input-prefix">https://instagram.com/</span>
            <input type="text" id="instagram" value={data.instagram} onChange={handleChange} className="social-input-field" placeholder="seu.usuario" />
          </div>
        </div>
        <div>
          <label htmlFor="linkedin" className="form-label">LinkedIn <span className="font-normal text-slate-600">(Opcional)</span></label>
          <div className="social-input-container">
            <span className="social-input-prefix">https://linkedin.com/in/</span>
            <input type="text" id="linkedin" value={data.linkedin} onChange={handleChange} className="social-input-field" placeholder="seu-usuario" />
          </div>
        </div>
      </div>
    </div>
  );
}
