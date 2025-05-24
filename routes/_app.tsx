import { PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>react-icons</title>
        <link rel="stylesheet" href="./index.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}