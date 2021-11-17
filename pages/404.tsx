import cx from "classnames";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  backgroundColor,
  context,
  errorPageWrapper,
  headline,
  left,
  nob,
  pane,
  post,
  right,
  sign,
  signContainer,
  signTextColor,
} from "styles/404.module.css";

import { useLocale } from "@lib/hooks/useLocale";

import { HeadSeo } from "@components/seo/head-seo";

const globalStyle = `
body {
  background-color: #fff !important;
}`;

export default function Custom404() {
  const { t } = useLocale();

  return (
    <>
      <HeadSeo
        title={t("404_page_not_found")}
        description={t("404_page_not_found")}
        nextSeoProps={{
          nofollow: true,
          noindex: true,
        }}
      />
      <Head>
        <style>{globalStyle}</style>
      </Head>
      <div className={cx(sign, errorPageWrapper, backgroundColor)}>
        <div className={signContainer}>
          <div className={nob}></div>
          <div className={cx(post, left)}></div>
          <div className={cx(post, right)}></div>
          <div className={pane}>
            <div className={cx(headline, signTextColor)}>404</div>
            <div className={cx(context, signTextColor)}>
              Oops, the page you&apos;re
              <br />
              looking for does not exist.
            </div>
          </div>
        </div>

        <Link href="/">
          <img
            src="/mlh-logo-color.svg"
            title="MajorLeague Hacking"
            alt="Major League Hacking"
            style={{
              display: "inline-block",
              position: "relative",
              zIndex: 100,
              top: "150px",
              width: "100%",
              height: "150px",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
    </>
  );
}
