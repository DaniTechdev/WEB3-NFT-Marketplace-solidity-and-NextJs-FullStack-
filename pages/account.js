import React, { useState, useMemo, useCallback, useContext } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import Style from "../styles/account.module.css";
import images from "../img";
import Form from "../AccountPage/Form/Form";

const account = () => {
  const [fileUrl, setFileUrl] = useState(null);
  return (
    <div className={Style.account}>
      <div className={Style.account_info}>
        <h1>Profile Setting</h1>
        <p>
          You can set preffered display name, create your profile and other
          personal settings
        </p>
      </div>

      <div className={Style.account_box}>
        <div className={Style.account_box_img}>
          <input />
          <Image
            src={images.user1}
            alt="account uplaod"
            width={150}
            height={150}
            className={Style.account_box_img_img}
          />
          <p className={Style.account_box_img_para}>Change Image</p>
        </div>
        <div className={Style.account_box_form}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default account;
