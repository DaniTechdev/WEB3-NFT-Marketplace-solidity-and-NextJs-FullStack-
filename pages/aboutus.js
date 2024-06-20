import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "nneji dan",
      postion: "Founder of the Crypto Education Tech Hub",
      image: images.founder1,
    },
    {
      name: "akachukwu udechukwu",
      postion: " Co-Founder of the Crypto Education Tech Hub",
      image: images.founder2,
    },
    {
      name: "Mr Cj",
      postion: "Founder of the Crypto scriptRoute web2 ",
      image: images.founder3,
    },
    {
      name: "Mr Onyiii",
      postion: "Co-Founder of the Crypto scriptRoute web2",
      image: images.founder4,
    },
  ];

  const factsArray = [
    {
      title: "10 million",
      info: "Articles have been public around the world(as of ssept. 30 2024",
    },
    {
      title: "100,000",
      info: "Register users account (as of sep 30, 2024",
    },
    {
      title: "220+",
      info: "Countries and region have our presence ( as of sept. 30 2024)",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1> About Us</h1>
            <p>
              Were impartial and independent . and every day we create
              distinctive world class progrmame and content which inform,
              educate, and entertain millions of people im the world
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>Founder</h2>
          <p>
            We're impartial and independent , and every day we create
            destinctive , world class programmes and content.
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.image}
                  alt={el.name}
                  width={500}
                  height={500}
                  className={Style.aboutus_box_founder_box_img_img}
                />
                <h3>{el.name}</h3>
                <p>{el.postion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>FAST FACTS</h2>
          <p>
            We're impartial and independent , and every day we create
            destinctive , world class programmes and content.
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_info}>
                <h3>{el.title}</h3>
                <p>{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />s
    </div>
  );
};

export default aboutus;
