import { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Image = {
  url: string;
};

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl) // 初期値は空
  const [loading, setLoading] = useState(false); // trueの場合はurlを呼び出し中(サーバーサイド側で初期値を取得するため初期値はfalseに設定) 
  // 画面の描画後に1回発火する（クライアントサイドで初期値を取得している）
  // useEffect(() => { // async awaitの非同期を使用できない
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <button onClick={handleClick} className={styles.button}>
        One more cat!!
      </button>
      <div className={styles.frame}>
        {loading || <img src={imageUrl} className={styles.img} />}
      </div>
    </div>
  );
};

export default IndexPage;

// next.jsで初期値をサーバーサイド側で値を取得できるようにした（useEffectの代わり）
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images: unknown = await res.json();

  // 配列として表現されているか？
  if(!Array.isArray(images)) {
    throw new Error("No images found");
  };
  const image: unknown = images[0];
  // Imageの構造をなしているか？
  if(!isImage(image)) {
    throw new Error("No images found");
  };
  console.log(images);
  return images[0];
};

// 型ガード関数
const isImage = (value: unknown): value is Image => {
  // 値がオブジェクトなのか？
  if(!value || typeof value !== "object") {
    return false;
  };

  // urlプロパティが存在し、かつ、それが文字列なのか？
  return "url" in value && typeof value.url === "string";
};

fetchImage();
