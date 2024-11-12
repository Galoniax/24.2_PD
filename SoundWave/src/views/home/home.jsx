import React, { useEffect, useState } from "react";
import { ProductSection } from "../../components/carousel/ProductSection";
import "./home.css";
import { SoundWave } from "../../components/animation/Wave";
import PlaylistPlayer from "../../components/spotify/PlaylistPlayer";
import { useCategory } from "../../hooks/useCategory";
import { useReviews } from "../../hooks/useReviews";


export function Home() {
  const { fetchCategories } = useCategory();
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);


  const { fetchAllReviews } = useReviews();


  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const reviewsData = await fetchAllReviews();
        setReviews(reviewsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

   
    const getRandomReviews = async () => {
      try {
        const reviewsData = await fetchAllReviews();
        const randomReviews = reviewsData
          .sort(() => 0.5 - Math.random())
          .slice(0, 3); // Selecciona 3 reseñas aleatorias

        setReviews(randomReviews);
      } catch (error) {
        console.error("Error al obtener reviews", error);
      }
    };

    getRandomReviews();
    fetchData();
  }, []);

  const heights = [100, 40, 60, 40, 60, 30, 110, 80, 60, 20, 30, 80, 100];
  return (
    <div className="bg-[#161616] w-[100%] min-h-screen">
      <main className="pt-[180px] px-[200px] pb-[50px]">
        <h1 className="textGabarito col text-[85px] font-bold text-center">
          Bienvenido a SoundWave
        </h1>
        <p className="textOpenSansRegular  text-[16px] text-end underline underline-offset-[7px] decoration-[#df9a3a]">
          "Eleva tu experiencia auditiva trayendo la música a la vida."
        </p>
        <div className="main-box">
          <ProductSection />
          <div className="product-try">
            <SoundWave />
          </div>
        </div>
      </main>
      <section
        id="Nosotros"
        className="mt-[50px] bg-[#ede0d0] w-[100%] min-h-[65vh]"
      >
        <div className="container-Nosotros flex justify-center pt-[120px] gap-[80px]">
          <div className="w-[50%] flex flex-col items-end gap-5">
            <h1 className="textNunitoSansBold tracking-tight text-[#221709] text-[75px] font-bold text-center">
              ¿Quienes somos?
            </h1>
            <p className="textNunitoSansLight black text-[16px] text-end max-w-[500px] leading-relaxed">
              Somos una empresa dedicada a la venta de dispositivos de audio y
              sonido. Nuestra misión es brindar a nuestros clientes una
              experiencia de sonido excepcional. Con una amplia variedad de
              productos y servicios, ofrecemos una amplia gama de opciones para
              satisfacer sus necesidades de sonido.
            </p>
            <p className="textNunitoSansLight black text-[16px] text-end max-w-[400px] leading-relaxed">
              Nuestro equipo de expertos en sonido está comprometido con la
              calidad y la satisfacción de nuestros clientes.
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

            <p className="textNunitoSansLight black text-[16px] text-start items-start max-w-[400px] leading-relaxed indent-7">
              En SoundWave, creemos que la calidad del sonido puede transformar
              la experiencia de nuestros usuarios. Nos esforzamos por traer las
              mejores marcas y las últimas innovaciones tecnológicas para
              garantizar una experiencia auditiva incomparable.
            </p>
            {/*<img src="../../src/assets/images/Radio.png" alt="Radio" className='w-[45%] mt-[50px] ms-[50px]' />*/}
          </div>
        </div>
      </section>

      <section id="Productos" className="bg-[#ede0d0] w-[100%] min-h-[100vh]">
        <div className="w-[90%] m-auto">
          <PlaylistPlayer />
        </div>
        <div className="container-Productos flex justify-center gap-[80px]">
          <div className="w-[50%] flex flex-col items-end gap-5">
            <h1 className="textNunitoSansBold tracking-tight text-[#221709] text-[75px] font-bold text-center">
              ¿Que ofrecemos?
            </h1>
            <div className="w-7 h-7 bg-orange-500 rounded-full mb-4"></div>
            <p className="textNunitoSansLight black text-[16px] text-end max-w-[700px] leading-loose">
              SoundWave ofrece una experiencia auditiva de alta calidad y
              variedad, ideal para los amantes de la música y el sonido. Nos
              especializamos en dispositivos de audio de marcas reconocidas y de
              última tecnología, desde auriculares y parlantes portátiles hasta
              sistemas de sonido envolvente para el hogar. Con un compromiso
              constante hacia la innovación, garantizamos productos duraderos,
              de diseño moderno y con un rendimiento excepcional.
            </p>
          </div>
          <div className="w-[50%] flex flex-col justify-center ">
            {categories.map((category) => (
              <div key={category.id} className="w-[90%]  ">
                <p className="textNunitoSansRegular p-[20px] border-t-[1px]  border-t-[#27272725] text-[#252525] text-[22px] text-start items-start leading-relaxed hover:bg-[#F1720C] hover:text-[#fff]">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Contacto" className="bg-[#ede0d0] w-[100%] ">
        <div className="w-[95%] m-auto min-h-[65vh] flex justify-center flex-col ">
          <h1 className="textNunitoSansLight pt-[100px] max-w-[600px] tracking-tight text-[#221709] text-[30px] font-bold text-center">
            Escucha las reseñas de los clientes
          </h1>
          {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <p className="text-[20px] text-[#221709] font-semibold">Calificación: {review.rating} / 5</p>
                <p className="text-[16px] text-[#221709]">{review.comment}</p>
                <p className="text-[14px] text-[#221709]">{review.date}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
