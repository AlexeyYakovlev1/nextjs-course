import Link from "next/link";
import MainLayout from "../components/MainLayout";
import classes from "../styles/404.module.sass";

export default function ErrorPage() {
    return (
        <MainLayout title="404">
            <h1>Error 404</h1>
            <p className={classes.errorDescription}>Please go back to <Link href="/"><a>home page</a></Link></p>
        </MainLayout>
    )
}