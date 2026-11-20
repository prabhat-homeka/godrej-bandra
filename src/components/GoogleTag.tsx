import Script from "next/script";

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

// Loads the Google tag (gtag.js) site-wide once NEXT_PUBLIC_GOOGLE_ADS_ID
// (e.g. "AW-123456789") is set; renders nothing until then.
export default function GoogleTag() {
  if (!ADS_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} />
      <Script id="google-tag">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ADS_ID}');`}
      </Script>
    </>
  );
}
