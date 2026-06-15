'use client'

export default function TranslateButton() {
  function openTranslation() {
    const url = new URL('https://translate.google.com/translate')
    url.searchParams.set('sl', 'lv')
    url.searchParams.set('tl', 'en')
    url.searchParams.set('u', window.location.href)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
  }

  return (
    <button type="button" className="translate-button" onClick={openTranslation} title="Translate this page to English">
      Translate
    </button>
  )
}
