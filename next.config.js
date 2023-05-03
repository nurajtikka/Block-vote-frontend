/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    poweredByHeader: false,

    experimental: {
        appDir: true,
    },

    compiler: {
        removeConsole: true,
    },
};
