# Next.js + HTMX

This is a barebones template for using HTMX with Next.js.

It also includes Tailwind, but does so via a static css file, so it's easy to remove or upgrade to "proper" post-css if you want.

## Why did you make this?

1. I'm riding the hype train and learning HTMX
2. I like JSX more than HTML templating in other languages
3. I like Vercel as a host for quick proof-of-concept projects

## Those are bad reasons

Good

## How to use

Serve full pages as normal. Instead of using React hooks, use HTMX attributes and create api endpoints to return the corresponding HTML. Check out `~/pages/api/clicked.tsx` for an example of what that looks like.

## How it works

HTMX is included as a static script via a custom Next `_document` file. Full pages are rendered server-side via Next. As long as you avoid stateful/client components, Next should strip React from the client side entirely. This still allows you to do things like async database calls using server components.

When HTMX requests an HTML snippet from an api endpoint, we use Next's pages router to statically render some JSX and return that HTML without returning a full document. That means that even if you do happen to mess up and try to use client components, it won't be possible to hydrate them on the client.