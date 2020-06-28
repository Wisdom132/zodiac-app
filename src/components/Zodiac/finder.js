import Zodiacs from './model.js'

// export default function (date) {
//     return Zodiacs.find((zodiac) => {
//         if (zodiac.start <= date && zodiac.end >= date) {
//             return zodiac
//         }
//     })
// }

export let getByDate = date => {
    return Zodiacs.find((zodiac) => {
        if (zodiac.start <= date && zodiac.end >= date) {
            return zodiac
        }
    })
}


export let getByName = name => {
    return Zodiacs.find(zodiac => zodiac.name == name)
}