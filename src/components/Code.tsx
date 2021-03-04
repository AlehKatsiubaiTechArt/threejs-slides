import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default function Code({ code = '', language = 'js', children = '' }) {
  return (
    <pre
      style={{ display: 'inline', margin: 0, padding: 0, overflow: 'auto' }}
      className={`language-${language}`}
      dangerouslySetInnerHTML={{
        __html: Prism.highlight(
          children || code,
          Prism.languages[language],
          language
        ),
      }}
    ></pre>
  )
}
