import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MainLayout from "../../components/MainLayout";
import { NextPageContext } from "next";
import {MyPost} from "../../interfaces/post";

interface IPostPageProps {
    post: MyPost
}

export default function Post({post: serverPost}: IPostPageProps) {
    const [post, setPost] = React.useState(serverPost);
    const router = useRouter();

    React.useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts/${router.query.id}`);
            const data = await response.json();

            setPost(data);
        }

        if (!serverPost) {
            load();
        }
        // eslint-disable-next-line
    }, []);

    if (!post) {
        return <MainLayout>
            <h2>Loading...</h2>
        </MainLayout>
    }

    return (
        <MainLayout title={`Post ${post.title}`}>
            <h1>{post.title}</h1>
            <hr />
            <p>{post.body}</p>
            <button>
                <Link href="/posts">
                    <a>Back to all posts</a>
                </Link>
            </button>
        </MainLayout>
    )
}

export async function getServerSideProps({query}: NextPageContext) {
    const response = await fetch(`${process.env.API_URL}/posts/${query.id}`);
    const post: MyPost = await response.json();

    return { props: {post} };
}