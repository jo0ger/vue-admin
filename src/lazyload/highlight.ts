import * as highlight from 'highlight.js'
import * as xml from 'highlight.js/lib/languages/xml'
import * as bash from 'highlight.js/lib/languages/bash'
import * as css from 'highlight.js/lib/languages/css'
import * as markdown from 'highlight.js/lib/languages/markdown'
import * as http from 'highlight.js/lib/languages/http'
import * as java from 'highlight.js/lib/languages/java'
import * as javascript from 'highlight.js/lib/languages/javascript'
import * as json from 'highlight.js/lib/languages/json'
import * as makefile from 'highlight.js/lib/languages/makefile'
import * as nginx from 'highlight.js/lib/languages/nginx'
import * as python from 'highlight.js/lib/languages/python'
import * as scss from 'highlight.js/lib/languages/scss'
import * as sql from 'highlight.js/lib/languages/sql'
import * as stylus from 'highlight.js/lib/languages/stylus'

highlight.registerLanguage('xml', xml)
highlight.registerLanguage('bash', bash)
highlight.registerLanguage('css', css)
highlight.registerLanguage('markdown', markdown)
highlight.registerLanguage('http', http)
highlight.registerLanguage('java', java)
highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('json', json)
highlight.registerLanguage('makefile', makefile)
highlight.registerLanguage('nginx', nginx)
highlight.registerLanguage('python', python)
highlight.registerLanguage('scss', scss)
highlight.registerLanguage('sql', sql)
highlight.registerLanguage('stylus', stylus)
highlight.configure({
    classPrefix: '', // don't append class prefix
})

export default highlight
