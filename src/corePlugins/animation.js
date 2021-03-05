const nameClass = require('tailwindcss/lib/util/nameClass').default
const transformThemeValue = require('tailwindcss/lib/util/transformThemeValue').default
const parseAnimationValue = require('tailwindcss/lib/util/parseAnimationValue').default
const { newFormat } = require('../pluginUtils')

module.exports = function ({ jit: { theme, addUtilities } }) {
  let keyframes = Object.fromEntries(
    Object.entries(theme.keyframes).map(([key, value]) => {
      return [
        key,
        [
          {
            [`@keyframes ${key}`]: value,
          },
          { respectVariants: false },
        ],
      ]
    })
  )

  let transformValue = transformThemeValue('animation')
  addUtilities({
    animate: [
      newFormat((modifier, { theme }) => {
        let value = transformValue(theme.animation[modifier])

        if (modifier === '' || value === undefined) {
          return []
        }

        let { name: animationName } = parseAnimationValue(value)

        return [
          keyframes[animationName],
          { [nameClass('animate', modifier)]: { animation: value } },
        ]
      }),
    ],
  })
}
