const config = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          ignoreBrowserslistConfig: true,
          useBuiltIns: "entry",
          forceAllTransforms: true,
          corejs: 3,
          targets: {
            browsers: ["last 20 versions", "ie >= 4"],
          },
        },
      ],
    ],
    plugins: ["@babel/plugin-proposal-optional-chaining"],
    targets: {
      node: "10",
    },
  };
};

export default config
