const config = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          ignoreBrowserslistConfig: true,
          useBuiltIns: false,
          forceAllTransforms: true,
          corejs: 3,
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
