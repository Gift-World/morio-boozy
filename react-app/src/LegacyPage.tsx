import { useEffect, useMemo } from 'react'
import type { LegacyPage as LegacyPageName } from './legacy-pages'
import { legacyMarkup } from './legacy-pages'

const scripts = [
  '/js/jquery.js', '/js/popper.min.js', '/js/bootstrap.min.js', '/js/shuffle.min.js',
  '/js/owl.carousel.min.js', '/js/owl.carousel.filter.js', '/js/jquery.appear.js',
  '/js/jquery.nice-select.js', '/js/lightcase.js', '/js/lightslider.min.js',
  '/js/parallax.js', '/js/gmaps.js', '/js/slick.js',
  '/js/jquery.themepunch.tools.min.js', '/js/jquery.themepunch.revolution.min.js',
  '/js/extensions/revolution.extension.auctions.min.js',
  '/js/extensions/revolution.extension.carousel.min.js',
  '/js/extensions/revolution.extension.kenburn.min.js',
  '/js/extensions/revolution.extension.layeranimation.min.js',
  '/js/extensions/revolution.extension.migration.min.js',
  '/js/extensions/revolution.extension.navigation.min.js',
  '/js/extensions/revolution.extension.parallax.min.js',
  '/js/extensions/revolution.extension.slideanims.min.js',
  '/js/extensions/revolution.extension.video.min.js',
  '/js/gsap.min.js', '/js/ScrollTrigger.min.js', '/js/TweenMax.min.js', '/js/aos.js',
  '/js/core.js', '/js/common.js', '/js/theme.js',
]

function addScript(source: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = source
    script.async = false
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Could not load ${source}`))
    document.body.append(script)
  })
}

export function LegacyPage({ page }: { page: LegacyPageName }) {
  const markup = useMemo(() => legacyMarkup(page), [page])

  useEffect(() => {
    document.body.id = 'magicCursor'
    document.body.className = 'page'
    const pageTitles: Record<LegacyPageName, string> = {
      home: 'Morio Studios | Creative Agency in Nairobi, Kenya – Branding, Film & Design',
      about: 'About Morio Studios | Creative Agency in Nairobi, Kenya',
      contact: 'Morio Studios - Creative Agency',
      services: 'About Morio Studios | Creative Agency in Nairobi, Kenya',
      team: 'Morio Studios - Creative Agency',
      'not-found': 'Morio Studios - Creative Agency',
    }
    document.title = pageTitles[page]
    let cancelled = false
    let homeSlider: number | undefined
    void (async () => {
      for (const source of scripts) {
        if (cancelled) return
        await addScript(source)
      }
      if (page === 'home') {
        const slides = document.querySelectorAll('.banner-slider .slide')
        let currentSlide = 0
        if (slides.length > 1) {
          homeSlider = window.setInterval(() => {
            slides[currentSlide]?.classList.remove('active')
            currentSlide = (currentSlide + 1) % slides.length
            slides[currentSlide]?.classList.add('active')
          }, 5000)
        }
      }
    })()
    return () => {
      cancelled = true
      if (homeSlider) window.clearInterval(homeSlider)
      document.body.id = ''
      document.body.className = ''
    }
  }, [])

  return <div className="morio-parity-page" dangerouslySetInnerHTML={{ __html: markup }} />
}
