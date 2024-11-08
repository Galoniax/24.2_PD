import React from 'react';
import { ProductSection } from '../../components/carousel/ProductSection';
import './home.css'
import { SoundWave } from "../../components/animation/Wave";



export function Home() {
    const heights = [100, 40, 60, 40, 60, 30, 110, 80, 60, 20, 30, 80, 100];
    return (
        <div>
            <main className="pt-[180px] px-[200px] pb-[50px]">
                <h1 className="textGabarito col text-[85px] font-bold text-center">Bienvenido a SoundWave</h1>
                <p className="textOpenSansRegular  text-[16px] text-end underline underline-offset-[7px] decoration-[#df9a3a]">"Eleva tu experiencia auditiva trayendo la música a la vida."</p>
                <div className="main-box">
                    <ProductSection />
                    <div className="product-try">
                        <SoundWave />
                    </div>
                </div>

                
            </main>
            <section id='Nosotros' className='mt-[50px] bg-[#ede0d0] w-[100%] min-h-[70vh]'>
                <div className="container-Nosotros flex justify-center pt-[120px] gap-[80px]">
                    <div className="w-[50%] flex flex-col items-end gap-5">
                        <h1 className="textOpenSansRegular tracking-tight text-[#221709] text-[75px] font-bold text-center">¿Quienes somos?</h1>
                        <p className="textOpenSansRegular black text-[16px] text-end max-w-[500px] leading-relaxed">Somos una empresa dedicada a la venta de dispositivos de audio y sonido. Nuestra misión es brindar a nuestros clientes una experiencia de sonido excepcional. Con una amplia variedad de productos y servicios, ofrecemos una amplia gama de opciones para satisfacer sus necesidades de sonido.
                        </p>
                        <p className="textOpenSansRegular black text-[16px] text-end max-w-[400px] leading-relaxed">Nuestro equipo de expertos en sonido está comprometido con la calidad y la satisfacción de nuestros clientes.
                        </p>

                    </div>
                    <div className="w-[50%] flex flex-col justify-center gap-5">
                        <div className="flex gap-4 mb-6 justify-start items-baseline cursor-pointer">
                            {heights.map((height, index) => (
                            <div
                                key={index}
                                className="w-[15px] bg-[#F1720C] rounded-full transition-all duration-300 ease-in-out"
                                style={{ height: `${height}px` }}
                            ></div>
                            ))}
                        </div>

                        <p className="textOpenSansRegular black text-[16px] text-start items-start max-w-[400px] leading-relaxed indent-7">
                            En SoundWave, creemos que la calidad del sonido puede transformar la experiencia de nuestros usuarios. Nos esforzamos por traer las mejores marcas y las últimas innovaciones tecnológicas para garantizar una experiencia auditiva incomparable.
                        </p>
                        <img src="../../src/assets/images/Radio.png" alt="Radio" className='w-[45%] mt-[50px] ms-[50px]' />
                    </div>
                </div>
            </section>
            
            <section id='Productos' className='bg-[#ede0d0] w-[100%] min-h-[80vh]'>
                <div className="container-Productos flex justify-center gap-[80px]">
                    <div className="w-[50%] flex flex-col items-end gap-5">
                        <h1 className="textOpenSansRegular tracking-tight text-[#221709] text-[75px] font-bold text-center">¿Que ofrecemos?</h1>
                        <div className="w-7 h-7 bg-orange-500 rounded-full mb-4"></div>
                        <p className="textOpenSansRegular black text-[16px] text-end max-w-[700px] leading-loose">
                            SoundWave ofrece una experiencia auditiva de alta calidad y variedad, ideal para los amantes de la música y el sonido. Nos especializamos en dispositivos de audio de marcas reconocidas y de última tecnología, desde auriculares y parlantes portátiles hasta sistemas de sonido envolvente para el hogar. Con un compromiso constante hacia la innovación, garantizamos productos duraderos, de diseño moderno y con un rendimiento excepcional.
                        </p>
                    </div>
                    <div className="w-[50%] flex flex-col justify-center gap-5">
                        
                        
                    </div>
                </div>
            </section>
        </div>
        
    );
}

