import Main from "@/components/layout/main/main";

export const revalidate = 86400;

export default function Home() {
  return (
    <Main>
      <h1>Home</h1>
      <p>Home page content</p>
    </Main>
  );
}