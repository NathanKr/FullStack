import React from "react";

const Page1 = () => {
  const arItems = [
    {
      name: "jim",
      pic:
        "https://cdn.pixabay.com/photo/2017/12/26/16/09/lion-3040797_960_720.jpg"
    },
    {
      name: "john",
      pic:
        "https://image.shutterstock.com/image-photo/tiger-portrait-bengal-450w-112379906.jpg"
    }
  ];
  const elements = arItems.map(it => (
    <div>
      <p>{it.name}</p>
      <img
        style={{ width: "200px", height : "200px" }}
        src={it.pic}
        alt="person pic"
      />
    </div>
  ));
  return elements;
};

export default Page1;
