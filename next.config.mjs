import path from 'path';
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      'wordpress-1074629-4621962.cloudwaysapps.com', // Add your image hostname here
      'https://cnc-website-new.vercel.app', // Example: another domain for images
    ],
  },
  webpack: (config, {
    buildId,
    webpack
}) => {

    config.plugins.push(
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    );
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: './src/assets/video', // Where to store the video files
        },
      },
    });
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
    };
    return config;
  },
};

export default nextConfig;
