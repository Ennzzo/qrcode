"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaUpload } from "react-icons/fa";

export default function Home() {
  const [link, setLink] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [logo, setLogo] = useState('/logo.png');
  const [logoSize, setLogoSize] = useState(38);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) return;

    const linkEl = document.createElement("a");
    linkEl.href = canvas.toDataURL("image/png");
    linkEl.download = "qrcode.png";
    linkEl.click();
  };

  return (
    <main className="container">
      <section className="title-container">
        <h1 className="page-title">
          Gere e customize QR Codes <span>dinâmicos</span>
        </h1>
      </section>

      <section className="qr-code-container">
        <div className="qr-code">
          <label htmlFor="link">Digite seu link</label>
          <input
            id="link"
            type="text"
            placeholder="Seu link aqui"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="qr-code-preview" ref={qrRef}>
            <p>QR Code Preview</p>
            <QRCodeCanvas
              value={link}
              size={200}
              bgColor={bgColor}
              fgColor={fgColor}
              title={link}
              imageSettings={{
                src: logo,
                height: logoSize,
                width: logoSize,
                excavate: true,
                crossOrigin: 'anonymous',
              }}
            />
          </div>
        </div>

        <div className="qr-code-customization">
          <div className="customization-container">
            <h3>Cores</h3>
            <label>Cor principal
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
            </label>
            <label>Cor do fundo
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </label>
          </div>

          <div className="customization-container">
            <h3>Logo</h3>
            <label>Insira seu logo
              <input type="file" accept="image/*" onChange={handleLogoChange} />
              <button type="button" className="input-file-button">
                <FaUpload /> Escolher arquivo
              </button>
            </label>

            <label>Tamanho da logo
              <select value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))}>
                {[24, 38, 50].map(size => (
                  <option key={size} value={size}>{size}px x {size}px</option>
                ))}
              </select>
            </label>
          </div>

          <button onClick={handleDownload} className="download-button">
            Baixar QR Code
          </button>
        </div>
      </section>
    </main>
  );
}
