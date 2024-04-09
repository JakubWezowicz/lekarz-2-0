import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";

import FeatureCard from "../components/feature-card";
import GalleryCard3 from "../components/gallery-card3";
import Question from "../components/question";
import "./home.css";
import Modal from "../components/Modal/Modal";

//firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="home-container">
      <Helmet>
        <title>Lekarz 2.0</title>
        <meta property="og:title" content="Lekarz 2.0" />
      </Helmet>
      <div className="home-hero">
        <div className="home-hero1">
          <div className="home-container01">
            <h1 className="home-hero-heading heading1">
              Znajdź idealnego lekarza dla ciebie
            </h1>
            <span className="home-hero-sub-heading">Lekarz 2.0</span>
            <div className="home-btn-group">
              <Link className="home-hero-button1 button" to="find-doctor">
                Znajdź
              </Link>
              <a href="#description" className="home-hero-button2 button">
                {" "}
                Więcej
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="home-details">
        <div className="home-details1">
          <div className="home-container02">
            <span className="home-text sectionTitle" id="description">
              <span>Szczegóły</span>
              <br></br>
            </span>
            <h2 className="home-details-heading heading2">
              Dlaczego Lekarz 2.0? 
            </h2>
            <span className="home-details-sub-heading">
              <br></br>
              <span>
                Lekarz 2.0 to kompleksowa platforma, która łączy pacjentów z
                zaufanymi lekarzami w ich okolicy. Nasza przyjazna dla
                użytkownika witryna umożliwia wyszukiwanie lekarzy według
                specjalizacji, lokalizacji i pokrycia ubezpieczeniem. Dzięki
                szczegółowym profilom i recenzjom pacjentów, możesz podejmować
                świadome decyzje dotyczące opieki zdrowotnej. Bez względu na to,
                czy potrzebujesz lekarza pierwszego kontaktu, specjalisty czy
                dentysty, Lekarz 2.0 ma wszystko, czego potrzebujesz.
              </span>
            </span>
          </div>
          <img
            alt="image"
            src="https://images.unsplash.com/photo-1579154341140-5aa3a445d43b?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExM3w&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
            className="home-details-image"
          />
        </div>
      </div>
      <div className="home-features">
        <div className="home-features-container">
          <div className="home-features1">
            <div className="home-container03">
              <span className="home-text05 sectionTitle">
                <span>OPCje</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">
                Wybierz odpowiedniego lekarza
              </h2>
              <span className="home-features-sub-heading">
                Odkryj funkcje, które sprawiają, że nasza strona internetowa
                jest doskonałym narzędziem do znalezienia najlepszych lekarzy
                spełniających Twoje potrzeby.
              </span>
            </div>
            <div className="home-container04">
              <FeatureCard
                Heading="Wyszukiwanie lekarzy"
                SubHeading="Łatwo znajdź lekarzy w swojej okolicy, uwzględniając specjalizację, lokalizację i dostępność."
              ></FeatureCard>
              <FeatureCard
                Heading="Rezerwuj wizyty online"
                SubHeading="Umawiaj się na wizyty bezpośrednio przez stronę internetową, oszczędzając czas i kłopoty."
              ></FeatureCard>
              <FeatureCard
                Heading="Przeglądaj profile lekarzy."
                SubHeading="Otrzymuj dostęp do szczegółowych profili lekarzy, obejmujących ich kwalifikacje, doświadczenie oraz obszary specjalizacji."
              ></FeatureCard>
              <FeatureCard
                Heading="Dobieraj lekarzy według specjalizacji"
                SubHeading="Dobierz lekarza, który najlepiej odpowiada Twoim potrzebom, wybierając spośród szerokiej gamy specjalizacji."
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-pricing"></div>
      <div className="home-gallery">
        <div className="home-gallery1">
          <h1 className="home-gallery-heading heading2">
            Znajdź idealnego specjaliste dla siebie
          </h1>
          <span className="home-gallery-sub-heading">
            Odkryj łatwość poszukiwania właściwego lekarza dla swoich potrzeb.
          </span>
          <div className="home-container05">
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1551076805-e1869033e561?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1612523138351-4643808db8f3?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName1"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1507206130118-b5907f817163?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName3"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1612943733919-f9661f1331f5?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName2"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1627495396837-a756c3267f77?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName4"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1634147070282-40cbdd54670a?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName5"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName6"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName7"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1612537785055-e226dae15987?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName8"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1488998527040-85054a85150e?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName9"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1550831106-2747f0d6a81c?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName10"
            ></GalleryCard3>
            <GalleryCard3
              image_src="https://images.unsplash.com/photo-1546659934-038aab8f3f3b?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcwMjM3MjExMHw&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=400"
              rootClassName="rootClassName11"
            ></GalleryCard3>
          </div>
        </div>
      </div>
      <div className="home-banner">
        <div className="home-banner1">
          <h1 className="home-banner-heading heading2">
            Odkryj najlepszych specjalistów medycznych
          </h1>
          <span className="home-banner-sub-heading">
            Znajdź właściwego lekarza dla swoich potrzeb i umów się na wizytę
            online.
          </span>
          <Link to="/find-doctor" className="home-banner-button button">
            Więcej
          </Link>
        </div>
      </div>
      <div className="home-faq">
        <div className="home-faq-container">
          <div className="home-faq1">
            <div className="home-container06">
              <span className="home-text08 sectionTitle">
                <span>FAQ</span>
                <br></br>
              </span>
              <h2 className="home-text11 heading2">
                <span>Najczęstsze pytania</span>
                <br></br>
              </h2>
              <span className="home-text14">
                <span>Oto kilka z najczęstszych pytań, jakie otrzymujemy.</span>
                <br></br>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
                <span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: " ",
                    }}
                  />
                </span>
              </span>
            </div>
            <div className="home-container07">
              <Question
                Answer="Strona internetowa korzysta z kompleksowej bazy danych do wyszukiwania lekarzy na podstawie Twojej lokalizacji, specjalizacji i innych preferencji."
                Question="Jak strona internetowa pomaga mi znaleźć lekarza?"
              ></Question>
              <Question
                Answer="Tak, strona internetowa umożliwia bezpośrednie umawianie się na wizyty u lekarzy."
                Question="Czy mogę umawiać się na wizyty przez stronę internetową?"
              ></Question>
              <Question
                Answer="Tak, strona zapewnia, że wszystkie informacje o lekarzach są zweryfikowane i aktualne."
                Question="Czy informacje o lekarzach na stronie są wiarygodne?"
              ></Question>
              <Question
                Answer="Nie, korzystanie ze strony internetowej w celu znalezienia lekarzy i umawiania wizyt jest całkowicie darmowe."
                Question="Czy korzystanie z usług strony wiąże się z opłatą?"
              ></Question>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
