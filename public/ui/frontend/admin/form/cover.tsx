"use client";
// import { Button, Col, Row } from 'react-bootstrap';
// import {
//   file_upload_small,
//   bin_Dark,
//   file_upload_big,
// } from '../../constants/assetPath';
// import client from '../../utils/axios';
import { covet_big } from "@/constants/asset-path";
import { faCircleXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import SVG from 'react-inlinesvg';
// import { useTranslation } from 'react-i18next';

interface ICoverUploadProps {
  onCoverChange: (url: string | null) => void;
  url?: string | null;
  title?: string;
  displayToolbar?: boolean;
  onClickImage?: () => void;
  defaultImage?: any;
}

const CoverUploadSection: React.FC<ICoverUploadProps> = ({
  onCoverChange,
  url,
  title,
  displayToolbar = true,
  onClickImage,
  defaultImage,
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [fileUploadPath, setFileUploadPath] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      setFileUploadPath(url);
    }
  }, [url]);

  const onButtonClick = () => {
    if (hiddenFileInput && hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setFileUploadPath(url);
      onCoverChange(url);
    }
  };

  const coverSectionRendor = () => {
    return (
      <div
        className={`flex flex-col relative text-start mt-3 rounded ${
          fileUploadPath ? "shadow-md" : ""
        }`}
      >
        {displayToolbar && fileUploadPath && (
          <span
            className="absolute top-0 left-0 p-3 rounded-md  text-[#DD0000] cursor-pointer"
            onClick={() => {
              setFileUploadPath(null);
              if (hiddenFileInput.current) {
                hiddenFileInput.current.value = "";
              }
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />{" "}
          </span>
        )}
        <input
          ref={hiddenFileInput}
          name="cover"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={changeHandler}
        />
        <Image
          className="cursor-pointer rounded"
          onClick={onButtonClick}
          alt="icon cover"
          src={fileUploadPath ?? covet_big}
          width={1280}
          height={500}
        />
        <input type="hidden" name="image_old_path" value={fileUploadPath ?? ""} />
      </div>
    );
  };

  return <>{coverSectionRendor()}</>;
};

export default CoverUploadSection;
