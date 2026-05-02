import { build, context } from "esbuild";
import { copyFile, mkdir } from "fs/promises";

const watchMode = process.argv.includes("--watch");

const baseBuildOptions = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "neutral",
  target: ["es2020"],
};

const outputTargets = [
  {
    outfile: "dist/index.js",
    format: "esm",
  },
  {
    outfile: "dist/index.cjs",
    format: "cjs",
  },
];

const runBuild = async () => {
  if (watchMode) {
    const contexts = await Promise.all(
      outputTargets.map((target) =>
        context({
          ...baseBuildOptions,
          ...target,
        })
      )
    );

    await Promise.all(contexts.map((ctx) => ctx.watch()));
    console.log("[MeawWind] Watching for changes...");
    return;
  }

  await Promise.all(
    outputTargets.map((target) =>
      build({
        ...baseBuildOptions,
        ...target,
      })
    )
  );

  console.log("[MeawWind] Build complete: dist/index.js and dist/index.cjs");

  try {
    await mkdir("docs/dist", { recursive: true });
    await copyFile("dist/index.js", "docs/dist/index.js");
    await copyFile("dist/index.js.map", "docs/dist/index.js.map");
    console.log("[MeawWind] Copied dist/index.js to docs/dist/");
  } catch (err) {
    console.error("[MeawWind] Failed to copy dist to docs:", err);
  }
};

runBuild().catch((error) => {
  console.error("[MeawWind] Build failed", error);
  process.exit(1);
});