import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default auth((req) => {
  const url = req.nextUrl;
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
  const role = hostname.split(".")[0];
  if (!req.auth) {
    if (
      hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
      if (path !== "/login" && path !== "/setup") {
        return NextResponse.redirect(new URL(`/login`, `http://${hostname}`));
      }
      if (path == "/login") {
        if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
          return NextResponse.rewrite(
            new URL(`/admin/login?role=${role}`, req.url),
          );
        } else if (
          hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        ) {
          return NextResponse.rewrite(
            new URL(`/partner/login?role=${role}`, req.url),
          );
        } else if (
          hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        ) {
          return NextResponse.rewrite(
            new URL(`/volunteer/login?role=${role}`, req.url),
          );
        }
      } else if (path == "/setup") {
        if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
          return NextResponse.rewrite(new URL(`/admin/setup`, req.url));
        } else if (
          hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        ) {
          return NextResponse.rewrite(new URL(`/partner/setup`, req.url));
        } else if (
          hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
        ) {
          return NextResponse.rewrite(new URL(`/volunteer/setup`, req.url));
        }
      }
    }
  }

  if (req.auth) {
    if (path == "/login") {
      return NextResponse.redirect(
        new URL(
          `/dashboard`,
          `http://${req.auth.user.role}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        ),
      );
    }
    if (
      hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
      hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    ) {
      if (path == "/") {
        return NextResponse.redirect(
          new URL(
            `/dashboard`,
            `http://${req.auth.user.role}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
          ),
        );
      }
      let puthURL = new URL(
        `/${req.auth.user.role}${path === "/" ? "" : path}`,
        `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      );
      return NextResponse.rewrite(puthURL.href);
    }
  }
});
