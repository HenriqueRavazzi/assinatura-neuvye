'use client';

import { SignatureData } from "@/app/page";
import { useRef, useState } from "react";

interface SignaturePreviewProps {
  data: SignatureData;
}

const formatPhoneForSignature = (phone: string): { ddd: string, number: string } => {
  if (!phone) return { ddd: '', number: '' };
  const digitsOnly = phone.replace(/[^\d]/g, '');
  const ddd = digitsOnly.slice(0, 2);
  let numberPart = digitsOnly.slice(2);
  
  if (numberPart.length === 9) {
    numberPart = numberPart.replace(/(\d{5})(\d{4})/, '$1.$2');
  } else if (numberPart.length === 8) {
     numberPart = numberPart.replace(/(\d{4})(\d{4})/, '$1.$2');
  }

  return { ddd: ddd, number: numberPart };
};

export default function SignaturePreview({ data }: SignaturePreviewProps) {
  const signatureRef = useRef<HTMLDivElement>(null);
  const [buttonText, setButtonText] = useState('Copiar Assinatura');

  const handleCopy = async () => {
    if (signatureRef.current) {
      const htmlContent = signatureRef.current.innerHTML;
      try {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });
        await navigator.clipboard.write([clipboardItem]);
        setButtonText('Copiado com Sucesso!');
      } catch (err) {
        console.error('Falha ao copiar: ', err);
        setButtonText('Erro ao Copiar');
      } finally {
        setTimeout(() => {
          setButtonText('Copiar Assinatura');
        }, 2000);
      }
    }
  };

  const formattedMobile = formatPhoneForSignature(data.mobile);

  return (
    <div className="card flex flex-col items-center">
        <div className="tutorial-card">
          <p>
            Como Instalar sua Assinatura:
            <br />
            1. Após preencher seus dados, clique em <strong>Copiar Assinatura</strong>.
            <br />
            2. Vá nas <strong>configurações</strong> do seu cliente de e-mail (Gmail, Outlook).
            <br />
            3. Procure pela seção de <strong>assinaturas</strong>.
            <br />
            4. <strong>Cole (Ctrl+V ou Cmd+V)</strong> no campo de edição e salve.
          </p>
        </div>

        <h3 
          className="text-xl font-bold mb-4 self-start" 
          style={{ color: '#38A89D' }}
        >
          Prévia da Assinatura
        </h3>
        
        <div 
          ref={signatureRef} 
          id="signature-preview" 
          className="p-3 bg-white rounded-md shadow-inner w-full" 
          style={{ zoom: 1.15 }}
        >
            <table id="neuvye" width="390" style={{ height: '170px' }} border={0} cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td width="20" height="18"></td>
                  <td width="370" height="18" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', lineHeight: '15px', fontWeight: 600, color:'#074357', textDecoration: 'none', display: 'block' }}>
                    {data.name || 'Nome Sobrenome'}
                  </td>
                </tr>

                <tr>
                  <td width="20" height="10"></td>
                  <td width="370" height="10" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', lineHeight: '11px', fontWeight: 100, color: '#074357', textTransform: 'uppercase', textDecoration: 'none', display: 'block' }}>
                    {data.role || 'Cargo / Área'}
                  </td>
                </tr>

                <tr>
                  <td width="20" height="14"></td>
                  <td width="370" height="14"></td>
                </tr>

                {data.mobile && (
                  <tr>
                    <td width="20" height="12"></td>
                    <td width="370" height="12" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '12px', lineHeight: '12px', fontWeight: 600, color: '#074357', textDecoration: 'none', display: 'block' }}>
                      <table id="whats" width="370" style={{ height: '12px' }} border={0} cellPadding="0" cellSpacing="0">
                        <tbody>
                          <tr>
                            <td width="15" height="12">
                              <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/ico_whats.png" style={{ display: 'block' }} width="10" />
                            </td>
                            <td width="355" height="12" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '11px', lineHeight: '11px', fontWeight: 100, color: '#074357', textDecoration: 'none !important', display: 'block' }}>
                              {formattedMobile.ddd}
                              <a href={`https://api.whatsapp.com/send?phone=55${data.mobile.replace(/[^\d]/g, '')}`} target="_blank" style={{ fontSize: '12px', lineHeight: '12px', fontWeight: 600, color: '#074357', textDecoration: 'none !important' }}> {formattedMobile.number}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                
                <tr>
                  <td width="20" height="12"></td>
                  <td width="370" height="12">
                    <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/underline.png" style={{ display: 'block' }} width="21" height="2" />
                  </td>
                </tr>

                <tr>
                  <td width="20" height="12"></td>
                  <td width="370" height="12"></td>
                </tr>

                <tr>
                  <td width="390" height="62" colSpan={2}>
                    <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/neuvye_footer.png" style={{ display: 'block' }} width="390" height="62" />
                  </td>
                </tr>

                <tr>
                  <td width="20" height="30"></td>
                  <td width="370" height="30">
                    <table id="socialmedia" width="370" style={{ height: '30px' }} border={0} cellPadding="0" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td width="auto" height="30" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', lineHeight: '10px', fontWeight: 600, textAlign: 'right', color: '#074357', textDecoration: 'none', verticalAlign: 'middle' }}>
                            <a href="http://www.neuvye.com.br" target="_blank" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10px', lineHeight: '10px', fontWeight: 600, textAlign: 'right', color: '#074357', textDecoration: 'none' }}>neuvye.com.br</a>
                          </td>

                          {data.facebook && (
                            <td width="32" height="30" style={{ textAlign: 'right' }}>
                              <a href={`https://www.facebook.com/${data.facebook}`} target="_blank">
                                <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/ico_facebook.png" style={{ verticalAlign: 'middle' }} width="13" height="13" />
                              </a>
                            </td>
                          )}

                          {data.instagram && (
                            <td width="32" height="30" style={{ textAlign: 'right' }}>
                              <a href={`https://www.instagram.com/${data.instagram}/`} target="_blank">
                                <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/ico_insta.png" style={{ verticalAlign: 'middle' }} width="13" height="13" />
                              </a>
                            </td>
                          )}

                          {data.linkedin && (
                            <td width="32" height="30" style={{ textAlign: 'right' }}>
                              <a href={`https://www.linkedin.com/in/${data.linkedin}`} target="_blank">
                                <img src="http://www.commcepta.com.br/area/cliente/neuvye/signature/imgs/ico_linkedin.png" style={{ verticalAlign: 'middle' }} width="11" height="11" />
                              </a>
                            </td>
                          )}

                          <td width="17" height="30"></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>

        <button onClick={handleCopy} className="primary-button">
          {buttonText}
        </button>
    </div>
  );
}
