/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...withAntdLess({
    modifyVars: { '@primary-color': '#ff4646' },
  })
}

module.exports = nextConfig
