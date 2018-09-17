import marked from 'marked'
import { highlight } from '@/plugins'

const languages = [
    'xml',
    'bash',
    'css',
    'markdown',
    'http',
    'java',
    'javascript',
    'json',
    'makefile',
    'nginx',
    'python',
    'scss',
    'sql',
    'stylus',
]

const renderer = new marked.Renderer()

renderer.heading = (text, level) => {
    return `<h${level} id="${generateId()}">${text}</h${level}>`
}

renderer.link = (href, title, text) => {
    const isOrigin = href.indexOf('jooger.me') > -1
    const isImage = /(<img.*?)>/gi.test(text)
    return `
    <a href=${href}
    target="_blank"
    class="${isImage ? 'img-link' : 'link'}"
    ${isImage && 'onclick=""'}
    title="${title || ''}"
    ${isOrigin ? '' : 'rel="external nofollow"'}>${text}</a>
  `.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.image = (href, title, text) => {
    return `
    <img class="image-view"
      src="${href}"
      title="${title || text || 'jooger.me'}"
      alt="${text || title || href}"
    ${this.options.xhtml ? '/' : ''}>
  `.replace(/\s+/g, ' ').replace('\n', '')
}

renderer.code = (code, lang, escaped) => {
    if (this.options.highlight) {
        const out = this.options.highlight(code, lang)
        if (out != null && out !== code) {
            escaped = true
            code = out
        }
    }

    const lineCode = code.split('\n')
    const codeWrapper = lineCode.map((line, index) =>
        `<span class="line" data-index="${index + 1}">
      ${line}
    </span>
    ${index !== lineCode.length - 1 ? '<br>' : ''}`
        .replace(/\s+/g, ' ')).join('')

    if (!lang) {
        return '<pre><code>' +
            codeWrapper +
            '\n</code></pre>'
    }

    return '<pre>' + '<code class="' +
        this.options.langPrefix +
        escape(lang, true) +
        '">' +
        codeWrapper +
        '\n</code></pre>\n'
}

marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight(code, lang) {
        if (!languages.includes(lang)) {
            return highlight.highlightAuto(code).value
        }
        return highlight.highlight(lang, code).value
    },
})

// 生成文章中的title id
function generateId(len: number = 0) {
    const chars = `ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz`
    /*tslint:disable */
    len = len | 8
    let id = ''
    for (let i = 0; i < len; i++) {
        id += chars[Math.floor(Math.random() * chars.length)]
    }
    return id
}

function escape(html, encode) {
    return html
        .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export {
    marked,
    highlight,
}
