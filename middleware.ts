import { auth } from "@/auth"
import { NextResponse } from "next/server";

export const config = {
    matcher: [
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

// export default auth((req) => {
//     const url = req.nextUrl;
//     let hostname = req.headers
//         .get("host")!
//         .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
//     const searchParams = req.nextUrl.searchParams.toString();
//     const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
//     console.log("To middleware URL: "+ req.url)

//     // if (!req.auth) {
//     //     // const urlMod = req.url.replace(url.pathname, "/volunteer/login")
//     //     // console.log("url Mod: "+ urlMod)
//     //     //return NextResponse.redirect('http://admin.localhost:3000/login')
//     //     return NextResponse.rewrite(new URL(`/admin/login`, req.url))

//     //     // return NextResponse.redirect(urlMod)
//     // }

//     if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//         if (!req.auth && path !== '/login') {
//             return NextResponse.redirect(new URL(`/login`, req.url))
//         } else if (req.auth && path == '/login') {
//             return NextResponse.redirect(new URL(`/dashboard`, req.url))
//         }
//         return NextResponse.rewrite(new URL(`/admin${path === "/" ? "" : path}`, req.url))
//     }

//     if (hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//         if (!req.auth && path !== '/login') {
//             return NextResponse.redirect(new URL(`/login`, req.url))
//         } else if (req.auth && path == '/login') {
//             return NextResponse.redirect(new URL(`/dashboard`, req.url))
//         }
//         return NextResponse.rewrite(new URL(`/partner${path === "/" ? "" : path}`, req.url))
//     }

//     if (hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
//         if (!req.auth && path !== '/login') {
//             return NextResponse.redirect(new URL(`/login`, req.url))
//         } else if (req.auth && path == '/login') {
//             return NextResponse.redirect(new URL(`/dashboard`, req.url))
//         }
//         return NextResponse.rewrite(new URL(`/volunteer${path === "/" ? "" : path}`, req.url))
//     }
// })

export default auth((req) => {
    const url = req.nextUrl;
    let hostname = req.headers
        .get("host")!
        .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
    // console.log("Pona host:" ,hostname)
    // console.log("Pona path:", path)

    // if (!req.auth) {
    //     if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    //         hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    //         hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    //     ) {
    //         if (path !== '/login' && path !== '/setup') {
    //             return NextResponse.redirect(new URL(`/login`, `http://${hostname}`))
    //         }
    //         if (path == '/login') {
    //             if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/admin/login`, req.url))
    //             } else if (hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/partner/login`, req.url))
    //             } else if (hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/volunteer/login`, req.url))
    //             }
    //         } else if (path == '/setup') {
    //             if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/admin/setup`, req.url))
    //             } else if (hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/partner/setup`, req.url))
    //             } else if (hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //                 return NextResponse.rewrite(new URL(`/volunteer/setup`, req.url))
    //             }
    //         }

    //     }
    // }



    // if (req.auth) {
    //     if (path == "/login") {
    //         return NextResponse.redirect(new URL(`/dashboard`, `http://${req.auth.user.role}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`))
    //     }
    //     if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    //         hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    //         hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    //     ) {
    //         if (path == "/") {
    //             return NextResponse.redirect(new URL(`/dashboard`, `http://${req.auth.user.role}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`))
    //         }
    //         let puthURL = new URL(`/${req.auth.user.role}${path === "/" ? "" : path}`, `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
    //         return NextResponse.rewrite(puthURL.href)
    //     }
    // }

    // Vercel changes
    // -----
    if (!req.auth) {
        if (path !== '/volunteer/login' && path !== '/volunteer/setup') {
            return NextResponse.redirect(new URL(`/volunteer/login`, `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`))
        }
        // if (path == '/volunteer/login') {
        //     return NextResponse.rewrite(new URL(`/volunteer/login`, req.url))
        // } else if (path == '/setup') {
        //     return NextResponse.rewrite(new URL(`/volunteer/setup`, req.url))
        // }
    }

    if (req.auth) {
        if (path == "/volunteer/login") {
            return NextResponse.redirect(new URL(`/volunteer/dashboard`, `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`))
        }
            if (path == "/") {
                return NextResponse.redirect(new URL(`/volunteer/dashboard`, `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`))
            }
            let puthURL = new URL(`/${req.auth.user.role}${path === "/" ? "" : path}`, `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
            return NextResponse.rewrite(puthURL.href)
    }


    // -----


    // if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //     if (!req.auth && path !== '/login') {
    //         return NextResponse.redirect(new URL(`/login`, req.url))
    //     } else if (req.auth && path == '/login') {
    //         return NextResponse.redirect(new URL(`/dashboard`, req.url))
    //     }
    //     return NextResponse.rewrite(new URL(`/admin${path === "/" ? "" : path}`, req.url))
    // }

    // if (hostname == `partner.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //     if (!req.auth && path !== '/login') {
    //         return NextResponse.redirect(new URL(`/login`, req.url))
    //     } else if (req.auth && path == '/login') {
    //         return NextResponse.redirect(new URL(`/dashboard`, req.url))
    //     }
    //     return NextResponse.rewrite(new URL(`/partner${path === "/" ? "" : path}`, req.url))
    // }

    // if (hostname == `volunteer.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    //     if (!req.auth && path !== '/login') {
    //         return NextResponse.redirect(new URL(`/login`, req.url))
    //     } else if (req.auth && path == '/login') {
    //         return NextResponse.redirect(new URL(`/dashboard`, req.url))
    //     }
    //     return NextResponse.rewrite(new URL(`/volunteer${path === "/" ? "" : path}`, req.url))
    // }
})