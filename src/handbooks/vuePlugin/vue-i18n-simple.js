/**
 * Vue version >= 2.6.0
 * 简化版多语言插件，仅支持动态插入文本，用法跟 vue-i18n 插件一样
 *
 */

export default {

    install(Vue, options){
        const versionArr = Vue.version.split('.')
        const version = Number(`${versionArr[0]}${versionArr[1]}`)
        if (version < 26){
            console.error("Plugin 'Vue-i18n-simple' is unavailable, because Vue`s version is less than 2.6.0")
            return
        }
        const locale = options.locale

        Vue.prototype.$i18n = Vue.observable({ locale })
        Vue.prototype.$i18n.message = options.message

        Vue.prototype.$t = function (path, params) {
            if(!path) return ''
            const $i18n = this.$i18n
            const locale = $i18n.locale
            const message = $i18n.message
            const arrayOfPath = [locale, ...path.split('.')]
            const val = replaceParams(getValue(message, arrayOfPath), params)
            return val === undefined ? path : val
        }
    }
}

function getValue(message, arrayOfPath) {
    const key = arrayOfPath[0]
    if (arrayOfPath.length === 1) {
        return message[key]
    } else if (message[key] !== undefined) {
        arrayOfPath.shift()
        return getValue(message[key], arrayOfPath)
    } else {
        return undefined
    }
}

function replaceParams(str, params) {
    if (!params || !str) return str
    if (Object.prototype.toString(params) === '[object Object]' || Array.isArray(params)) {
        str = str.replace(new RegExp('\{([^\}]*)\}', 'g'), (a, b) => params[b.trim()] || a )
    }
    return str
}
