import React from "react";

//INTERNAL IMPORT
import Style from "../styles/subscription.module.css";
import Subscription from "../Subscription/Subscription";

const subscription = () => {
  const subData = [
    {
      plan: "Starter",
      price: "$5/mo",
      popular: "Popular",
      service: ["Automated Reporting", "Faster Processing", "Customization"],
      info: "Literally you probably haven't heard of then jean shorts",
    },
    {
      plan: "Starter",
      price: "$5/mo",
      popular: "Popular",
      service: ["Automated Reporting", "Faster Processing", "Customization"],
      info: "Literally you probably haven't heard of then jean shorts",
    },
    {
      plan: "Starter",
      price: "$5/mo",
      popular: "Popular",
      service: ["Automated Reporting", "Faster Processing", "Customization"],
      info: "Literally you probably haven't heard of then jean shorts",
    },
    {
      plan: "Starter",
      price: "$5/mo",
      popular: "Popular",
      service: ["Automated Reporting", "Faster Processing", "Customization"],
      info: "Literally you probably haven't heard of then jean shorts",
    },
  ];

  return (
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <div className={Style.subscription_box_info}>
          <h1>Subscription</h1>
          <p>Pricing to fit the needs of any complete size</p>
        </div>

        <div className={Style.subscription_box_box}>
          {subData.map((el, i) => (
            <Subscription key={i + 1} el={el} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;
