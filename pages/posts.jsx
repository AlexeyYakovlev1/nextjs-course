import Link from "next/link";
import React from "react";
import MainLayout from "../components/MainLayout";
import Post from "./post/[id]";

export default function Posts({posts}) {
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

Posts.getInitialProps = async() => {
    const response = await fetch("http://localhost:4200/posts");
    const posts = await response.json();

    return {
        posts
    }
}