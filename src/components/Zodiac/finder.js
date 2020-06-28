import Zodiacs from './model.js'

export default function (date) {
    return Zodiacs.find((zodiac) => {
        if (zodiac.start <= date && zodiac.end >= date) {
            return zodiac
        }
    })
}