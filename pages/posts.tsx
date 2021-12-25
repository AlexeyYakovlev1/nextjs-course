import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";
import MainLayout from "../components/MainLayout";
import { MyPost } from "../interfaces/post";

interface IPostsProps {
    posts: MyPost[]
}

export default function Posts({posts: serverPosts}: IPostsProps) {
    const [posts, setPosts] = React.useState(serverPosts);

    React.useEffect(() => {
        async function load() {
            const response = await fetch(`${process.env.API_URL}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if (!serverPosts) {
            load();
        }
        // eslint-disable-next-line
    }, [])

    if (!posts) {
        return <MainLayout>
            <h2>Loading...</h2>
        </MainLayout>
    }

    return (
        <MainLayout title="Posts page">
            <h1>Posts page</h1>
        
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </MainLayout>
    )
}

interface IPostNextContext extends NextPageContext {
    query: {
        id: string    
    }
}

Posts.getInitialProps = async({req}: IPostNextContext) => {
    if (!req) {
        return {posts: null}
    }
       
    const response = await fetch(`${process.env.API_URL}/posts`);
    const posts: MyPost[] = await response.json();

    return {
        posts
    }
}