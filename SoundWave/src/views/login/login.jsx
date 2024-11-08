import React from 'react';
import './login.css'




export function Login() {
    return (
        <div>
            <main className="pt-[180px] px-[200px] pb-[50px]">
                <h1 className="textGabarito col text-[85px] font-bold text-center">Bienvenido a SoundWave</h1>
                <p className="textOpenSansRegular  text-[16px] text-end underline underline-offset-[7px] decoration-[#df9a3a]">"Eleva tu experiencia auditiva trayendo la musica a la vida."</p>
                <div className="main-box">
                    <ProductSection />
                    <div className="product-try">
                        <SoundWave />
                    </div>
                </div>
            </main>

        </div>
    );
}
