'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useQRCode } from 'next-qrcode';

export default function Home() {
  return (
    <main className="container">
      <section>
        <h1>
          Gere e customize QR codes <span>dinâmicos</span>
        </h1>
        <img 
        src="/arrow.svg" 
        alt="seta para o QR Code"
        className="arrow-detail"/>
      </section>

      <section className="qr-code-container">
        <div className="qr-code">
          <div className="link-input">
              <label htmlFor="link">
                Digite seu link
              </label>
              <input 
                type="text" 
                placeholder="Seu link aqui" 
                id="link"
              />
              </div>
          </div>

        <div className="qr-code-preview">
          <p>
            QR Code Preview
          </p>

        </div>

        <div className="qr-code-customizate">

        </div>

      </section>

    </main>
  );
}
