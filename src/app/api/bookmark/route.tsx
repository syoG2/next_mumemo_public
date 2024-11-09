import { JSDOM } from 'jsdom';
import { NextRequest, NextResponse } from 'next/server';

type OGP = {
  title: string,
  description: string,
  image: string,
}

const fetchOGPData = (url: string): Promise<OGP> => {
  return fetch(url).then(async res => {
    if (!res.ok) {
      return {
        title: "",
        description: "",
        image: "",
      }
    } else {
      const html = await res.text();

      const doms = new JSDOM(html);
      const metas = doms.window.document.head.querySelectorAll("meta");
      const ogpData = {
        title: "",
        description: "",
        image: "",
      }
      for (let i = 0; i < metas.length; i++) {
        const pro = metas[i].getAttribute("property");
        if (typeof pro == "string") {
          if (ogpData.title === "" && pro.match("og:title")) {
            ogpData.title = metas[i].getAttribute("content") ?? "";
          }
          if (ogpData.description === "" && pro.match("og:description")) {
            ogpData.description = metas[i].getAttribute("content") ?? "";
          }
          if (ogpData.image === "" && pro.match("og:image")) {
            ogpData.image = metas[i].getAttribute("content") ?? "";
          }
        }

      }
      return ogpData;
    }
  });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (url) {
    try {
      const ogpData = await fetchOGPData(url);
      return NextResponse.json(ogpData)
    } catch {
      return NextResponse.json({
        title: "",
        description: "",
        image: "",
      })
    }
  }

  return NextResponse.json({
    title: "",
    description: "",
    image: "",
  })
}