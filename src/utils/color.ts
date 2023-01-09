import color from "css-color-function"
const formula: { [prop: string]: string } = {
  "primary-light-1": "color(primary tint(10%))",
  "primaty-light-2": "color(primary tint(20%))",
  "primaty-light-3": "color(primary tint(30%))",
  "primaty-light-4": "color(primary tint(40%))",
  "primaty-light-5": "color(primary tint(50%))",
  "primaty-light-6": "color(primary tint(60%))",
  "primaty-light-7": "color(primary tint(70%))",
  "primaty-light-8": "color(primary tint(80%))",
  "primaty-light-9": "color(primary tint(90%))",
}

const generateColors = (primary: string) => {
  const colors: Record<string, string> = {}
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = color.convert(value)
  })
  return colors
}

const setColors = (colors: Record<string, string>) => {
  const el = document.documentElement
  Object.entries(colors).map(([key, value]) => {
    el.style.setProperty(`--el-color-${key}`, value)
  })
}

export { generateColors, setColors }
