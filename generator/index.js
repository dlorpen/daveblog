import fs from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

try {
  const indexHtml = await fs.readFile(
    path.join("layout", "templates", "index.html"),
    "utf-8"
  );

  const postHtml = await fs.readFile(
    path.join("layout", "templates", "post.html"),
    "utf-8"
  );

  const postDir = path.join("content", "publish");
  const mdFiles = (await fs.readdir(postDir)).filter(
    (file) => path.extname(file)?.toUpperCase() === ".MD"
  );
  mdFiles.sort();
  const links = [];
  for (const file of mdFiles) {
    console.log(file);
    const mdFileName = path.basename(file, path.extname(file));
    const htmlFileName = path.join("output", "posts", mdFileName + ".html");
    console.log(htmlFileName);

    const contents = await fs.readFile(path.join(postDir, file), "utf-8");
    const htmlContent = marked(contents).replace(
      /<a\s/g,
      `<a target="_blank" `
    );
    await fs.writeFile(
      htmlFileName,
      postHtml
        .replace("INSERT_CONTENT_HERE", htmlContent)
        .replaceAll("INSERT_TITLE_HERE", mdFileName)
    );
    links.push({
      url: `/posts/${mdFileName}.html`,
      title: mdFileName,
    });
  }

  await fs.writeFile(
    path.join("output", "index.html"),
    indexHtml.replace(
      "INSERT_LINKS_HERE",
      `<ul>${links.map(
        (link) =>
          `<li><a href="${
            link.url
          }" alt=${`blog post titled: "${link.title}"`}>${link.title}</a></li>`
      )}</ul>`
    )
  );
} catch (err) {
  console.error(err);
}
