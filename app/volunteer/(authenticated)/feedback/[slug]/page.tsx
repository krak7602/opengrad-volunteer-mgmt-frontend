import Feedback from "@/components/volunteer/Feedback"


export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return (
        <div>
            <Feedback feedbackId={params.slug}/>
        </div>
    )
}
