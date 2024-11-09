import Main from "@/components/layout/main/main";

// TODO: revalidateの使い方が正しいか調べる
export const revalidate = 86400;


// TODO:Homeのコンポーネントを作る。更新順と閲覧数順をYoutubeを参考に作る
// TODO:検索用のページを作る
export default function Home() {
  return (
    <Main>
      <h1>Home</h1>
      <p>Home page content</p>
    </Main>
  );
}