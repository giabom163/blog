// 主题风格方案切换脚本
// 用法: node switch-theme.mjs <方案名>
// 可选方案: ocean(海蓝) / sakura(樱粉) / forest(森绿) / sunset(橙红) / mono(灰调) / banner(带横幅)
import fs from "node:fs";

const CONFIG = "./src/config.ts";
const PRESETS = {
	ocean: { hue: 210, banner: false, label: "海蓝（默认）" },
	sakura: { hue: 345, banner: false, label: "樱粉" },
	forest: { hue: 140, banner: false, label: "森绿" },
	sunset: { hue: 20, banner: false, label: "橙红" },
	mono: { hue: 250, banner: false, label: "灰调" },
	banner: { hue: 210, banner: true, label: "海蓝+横幅" },
};

const key = process.argv[2] || "ocean";
const preset = PRESETS[key];
if (!preset) {
	console.error("未知方案。可选:", Object.keys(PRESETS).join(", "));
	process.exit(1);
}

let src = fs.readFileSync(CONFIG, "utf8");

// 改 hue
src = src.replace(/hue:\s*\d+/, `hue: ${preset.hue}`);
// 改 banner 开关
src = src.replace(/(banner:\s*\{\s*\n\s*enable:\s*)(true|false)/, `$1${preset.banner}`);

fs.writeFileSync(CONFIG, src);
console.log(`已切换到「${preset.label}」 hue=${preset.hue} banner=${preset.banner}`);
console.log("接下来执行 npm run build 预览效果");
