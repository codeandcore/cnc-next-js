import path from 'path';

const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      'wordpress-1074629-4621962.cloudwaysapps.com',
      'https://cnc-website-new.vercel.app',
    ],
  },

  webpack: (config, { buildId, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );

    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: './src/assets/video',
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

  async redirects() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_ENV !== "development"
      ? `${process.env.NEXT_PUBLIC_VERCEL_URL}data/redirect/yoast`
      : `${process.env.NEXT_PUBLIC_WP_URL}wp-json/custom/v1/yoast_redirects`);
    const data = await res.json();

    const redirects = data.yoast_seo_redirects.map((redirect) => ({
      source: `/${redirect.old_url}`,
      destination: `/${redirect.new_url}`,
      permanent: false,
      statusCode: 301
    }));

    return redirects;
  },
};

export default nextConfig;
