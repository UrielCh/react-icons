import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>react-icons</title>
        <style>
          {`.text-red-500 { color: rgb(239, 68, 68); }
           .text-blue-500 { color: rgb(68, 68, 239); }`}
        </style>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}