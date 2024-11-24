import React, { useEffect, useState } from "react";
import { ProductSection } from "../../components/carousel/ProductSection";
import "./home.css";
import { SoundWave } from "../../components/animation/Wave";
import PlaylistPlayer from "../../components/spotify/PlaylistPlayer";
import { useCategory } from "../../hooks/useCategory";
import { useReviews } from "../../hooks/useReviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faTelegram,
  faWhatsapp,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export function Home() {
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { fetchAllReviews } = useReviews();
  const { fetchAllCategories } = useCategory();

  const fetchData = async () => {
    try {
      const categoriesData = await fetchAllCategories();
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

  useEffect(() => {
    getRandomReviews();
    fetchData();
  }, []);

  const heights = [100, 40, 60, 40, 60, 30, 110, 80, 60, 20, 30, 80, 100];
  return (
    
    <div className="bg-[#232323] w-[100%] min-h-screen">
      <main className="pt-[180px] px-[200px] pb-[50px]">
        <h1 className="textNunitoSansBold col text-[85px] text-[#ffffff] tracking-tight font-bold text-center">
          Bienvenido a SoundWave
        </h1>
        <p className="textNunitoSansLight tracking-tight  text-[16px] text-end underline underline-offset-[7px] decoration-[#df9a3a]">
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
        className="mt-[50px] bg-[#eeeeee] w-[100%] min-h-[65vh]"
      >
        <div className="container-Nosotros flex justify-center pt-[120px] gap-[80px]">
          <div className="w-[50%] flex flex-col items-end gap-5">
            <h1 className="textNunitoSansBold tracking-tight text-[#221709] text-[75px] font-bold text-center">
              ¿Quienes somos?
            </h1>
            <p className="textNunitoSansLight black text-[16px] text-end max-w-[500px] leading-loose">
              Somos una empresa dedicada a la venta de dispositivos de audio y
              sonido. Nuestra misión es brindar a nuestros clientes una
              experiencia de sonido excepcional. Con una amplia variedad de
              productos y servicios, ofrecemos una amplia gama de opciones para
              satisfacer sus necesidades de sonido.
            </p>
            <p className="textNunitoSansLight black text-[16px] text-end max-w-[400px] leading-loose">
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

            <p className="textNunitoSansLight black text-[16px] text-start items-start max-w-[400px] indent-7 leading-loose">
              En SoundWave, creemos que la calidad del sonido puede transformar
              la experiencia de nuestros usuarios. Nos esforzamos por traer las
              mejores marcas y las últimas innovaciones tecnológicas para
              garantizar una experiencia auditiva incomparable.
            </p>
          </div>
        </div>
      </section>

      <section
        id="Productos"
        className="bg-[#eeeeee] w-[100%] min-h-[50vh] py-[100px] border-t-[1px] border-b-[1px] border-[#444444]"
      >
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
            <div className="mt-10"></div>
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

      <section
        id="Reviews"
        className="w-[100%] px-[50px] pb-[80px] pt-[50px] bg-[#eeeeee] "
      >
        <div className="flex bg-[#1A1A1C] py-[80px] justify-center px-10">
          <div className="w-[30%] mt-[50px] flex flex-col">
            <PlaylistPlayer />
            <div className=" bg-[#F3F3F3] py-5 flex justify-evenly rounded-xl px-5">
              <FontAwesomeIcon
                className="border-[1px] border-[#53535360] rounded-xl p-2 cursor-pointer hover:text-[#ffffff] hover:bg-black"
                icon={faYoutube}
              />
              <FontAwesomeIcon
                className="border-[1px] border-[#53535360] rounded-xl p-2 cursor-pointer hover:text-[#ffffff] hover:bg-black"
                icon={faTwitter}
              />
              <FontAwesomeIcon
                className="border-[1px] border-[#53535360] rounded-xl p-2 cursor-pointer hover:text-[#ffffff] hover:bg-black"
                icon={faTelegram}
              />
              <FontAwesomeIcon
                className="border-[1px] border-[#53535360] rounded-xl p-2 cursor-pointer hover:text-[#ffffff] hover:bg-black"
                icon={faWhatsapp}
              />
              <FontAwesomeIcon
                className="border-[1px] border-[#53535360] rounded-xl p-2 cursor-pointer hover:text-[#ffffff] hover:bg-black"
                icon={faInstagram}
              />
            </div>
          </div>

          <div className="w-[70%] flex flex-col justify-center">
            <div className="flex items-stretch justify-center px-10">
              <div className=" border-[1px] p-10 border-[#f6f6f757]">
                <h1 className="textRedHatDisplayRegular tracking-tight text-[#F6F6F7] text-[28px] font-bold">
                  Reseñas en SoundWave
                </h1>
              </div>

              <div className="border-[1px] p-11 border-[#f6f6f757] flex">
                <p className="textNunitoSansLight tracking-tight text-[#F6F6F7] text-[16px] font-bold">
                  /Reseñas
                </p>
                <p className="textNunitoSansLight tracking-tight text-[#F6F6F7] indent-6 text-[15px]">
                  Nuestro equipo de expertos en sonido está comprometido con la
                  calidad y la satisfacción de nuestros clientes. En SoundWave,
                  creemos que la calidad del sonido esta puede transformar la
                  experiencia de nuestros usuarios.
                </p>
              </div>
            </div>

            <div className="flex items-stretch justify-center px-10">
              {reviews.length == 0 ? (
                <p className="text-[16px] text-[#F6F6F7] font-semibold">
                  No hay reseñas disponibles.
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-card mt-10 border-[1px] p-10 border-[#f6f6f757] hover:bg-[#F1720C] hover:text-[#fff]"
                  >
                    <p className="text-[16px] text-[#F6F6F7] font-semibold">
                      Calificación: {review.rating} / 5
                    </p>
                    <p className="text-[18px] mt-3 text-[#F6F6F7] font-semibold">
                      {review.title}
                    </p>
                    <p className="text-[15px] mb-5 mt-2 text-[#F6F6F7] ps-4">
                      "{review.comment}"
                    </p>
                    <p className="text-[14px] text-[#F6F6F7]">{review.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
