import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cx from 'classnames';

import { COMPANY_NAME, DEVELOPER_DOCS, DOCS_URL, JOIN_SLACK, WEBSITE_URL } from "@calcom/lib/constants";
import { Icon } from "@calcom/ui";

import { useLocale } from "@lib/hooks/useLocale";

import { HeadSeo } from "@components/seo/head-seo";

import { ssgInit } from "@server/lib/ssg";

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

export default function Custom404() {
  const { t } = useLocale();

  const router = useRouter();
  const [username] = router.asPath.replace("%20", "-").split(/[?#]/);

  const links = [
    {
      title: t("documentation"),
      description: t("documentation_description"),
      icon: Icon.FiFileText,
      href: DOCS_URL,
    },
    {
      title: t("blog"),
      description: t("blog_description"),
      icon: Icon.FiBookOpen,
      href: `${WEBSITE_URL}/blog`,
    },
  ];

  const [url, setUrl] = useState(`${WEBSITE_URL}/signup?username=`);
  useEffect(() => {
    setUrl(`${WEBSITE_URL}/signup?username=${username.replace("/", "")}`);
  }, [username]);

  const isSuccessPage = router.asPath.startsWith("/booking");
  const isSubpage = router.asPath.includes("/", 2) || isSuccessPage;
  const isSignup = router.asPath.startsWith("/signup");
  const isCalcom = process.env.NEXT_PUBLIC_WEBAPP_URL === "https://app.cal.com";

  return (
    <>
      <HeadSeo
        title={isSignup ? t("signup_requires") : t("404_page_not_found")}
        description={t("404_page_not_found")}
        nextSeoProps={{
          nofollow: true,
          noindex: true,
        }}
      />
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssr = await ssgInit(context);

  return {
    props: {
      trpcState: ssr.dehydrate(),
    },
  };
};
