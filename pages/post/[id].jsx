import { useRouter } from "next/router"
import MainLayout from "../../components/MainLayout";

export default function Post() {
    const router = useRouter();

    return (
        <MainLayout title={`Post ${router.query.id}`}>
            <h1>Post {router.query.id}</h1>
            <p>post description</p>
        </MainLayout>
    )
}

Post.getInitialProps = async(ctx) => {
    console.log(ctx.query);
    return {}
}