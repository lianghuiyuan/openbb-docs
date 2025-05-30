// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type { Options, ThemeConfig } from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import autoprefixer from "autoprefixer";
import { themes } from "prism-react-renderer";
import katex from "rehype-katex";
import math from "remark-math";
import tailwind from "tailwindcss";

export default {
	title: "OpenBB Docs",
	tagline: "OpenBB Docs",
	url: "https://docs.openbb.co", // Your website URL
	baseUrl: "/",
	projectName: "OpenBBTerminal",
	organizationName: "OpenBB-finance",
	trailingSlash: false,
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "img/favicon.ico",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	plugins: [
		[
			"@docusaurus/plugin-client-redirects",
			{
				redirects: [
					{
						from: "/platform/development/contributing",
						to: "/platform/developer_guide/contributing",
					},
					{
						from: "/pro/",
						to: "/workspace/",
					},
					{
						from: "/pro/enterprise",
						to: "/workspace/enterprise",
					},
					{
						from: "/pro/openbb-copilot",
						to: "/workspace/openbb-copilot",
					},
					{
						from: "/pro/platform-installer",
						to: "/workspace/platform-installer",
					},
					{
						from: "/workspace/data-connector",
						to: "/workspace/data-integration",
					},
					{
						from: "/workspace/enterprise",
						to: "https://openbb.co/pricing",
					},
				],
				createRedirects: (existingPath) => {
					if (existingPath.startsWith("/pro/")) {
						const newPath = existingPath.replace("/pro/", "/workspace/");
						if (newPath.includes("data-connector")) {
							return newPath.replace("/data-connector/", "/data-integration/");
						}
						return newPath;
					}
					if (existingPath.includes("data-connector")) {
						return existingPath.replace(
							"/data-connector/",
							"/data-integration/",
						);
					}
					return undefined;
				},
			},
		],
		async function twPlugin(context, options) {
			return {
				name: "docusaurus-tailwindcss",
				configurePostCss(postcssOptions) {
					// Appends TailwindCSS and AutoPrefixer.
					postcssOptions.plugins.push(tailwind);
					postcssOptions.plugins.push(autoprefixer);
					return postcssOptions;
				},
			};
		},
	],
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.js",
					editUrl: "https://github.com/OpenBB-finance/openbb-docs/edit/main/",
					showLastUpdateTime: true,
					showLastUpdateAuthor: true,
					routeBasePath: "/",
					path: "content",
					remarkPlugins: [math],
					rehypePlugins: [katex],
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Options,
		],
	],
	headTags: [
		{
			tagName: "meta",
			attributes: {
				"http-equiv": "Content-Security-Policy",
				content:
					"object-src 'self'; img-src * blob: data:; connect-src *; script-src 'self' 'unsafe-eval' 'unsafe-inline'; frame-ancestors 'self' 'https://pro.openbb.co' 'https://openbb.co' 'https://my.openbb.co'",
			},
		},
		{
			tagName: "meta",
			attributes: {
				"http-equiv": "Cache-Control",
				content: "max-age=3600, must-revalidate",
			},
		},
		{
			tagName: "meta",
			attributes: {
				"http-equiv": "X-Content-Type-Options",
				content: "nosniff",
			},
		},
	],
	themeConfig: {
		image: "img/banner.png",
		prism: {
			theme: themes.vsLight,
			darkTheme: themes.vsDark,
			additionalLanguages: ["json"],
		},
		// csp: {
		// 	"default-src": ["'self'"],
		// 	"script-src": ["self"],
		// 	"style-src": ["'self'"],
		// 	"img-src": ["*", "data:", "blob:"],
		// 	"connect-src": ["*"],
		// 	"frame-ancestors": [
		// 		"'self'",
		// 		"https://pro.openbb.co",
		// 		"https://openbb.co",
		// 		"https://my.openbb.co",
		// 	],
		// },
		// TODO - Jose can you make this so we get lighter color on main view - like bot docs
		colorMode: {
			defaultMode: "dark",
			disableSwitch: false,
			respectPrefersColorScheme: false,
		},
		algolia: {
			appId: "7D1HQ0IXAS",
			apiKey: "a2e289977b4b663ed9cf3d4635a438fd", // pragma: allowlist secret
			indexName: "openbbterminal",
			contextualSearch: false,
		},
	} satisfies ThemeConfig,
	stylesheets: [
		{
			href: "/katex/katex.min.css",
			type: "text/css",
		},
	],
} satisfies Config;
