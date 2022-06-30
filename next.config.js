/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		//! Lista de todos los dominios de donde yo puedo tomar imagenes
		domains: ['raw.githubusercontent.com'],
	},
};

module.exports = nextConfig;
