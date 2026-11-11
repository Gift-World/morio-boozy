import home from '../../index.html?raw'
import about from '../../about.html?raw'
import contact from '../../contact.html?raw'
import services from '../../service.html?raw'
import team from '../../team.html?raw'
import notFound from '../../404.html?raw'

export type LegacyPage = 'home' | 'about' | 'contact' | 'services' | 'team' | 'not-found'

const pages: Record<LegacyPage, string> = { home, about, contact, services, team, 'not-found': notFound }

function bodyOf(document: string) {
  return document.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? document
}

export function legacyMarkup(page: LegacyPage) {
  return bodyOf(pages[page])
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replaceAll('assets/', '/')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="about.html"', 'href="/about"')
    .replaceAll('href="contact.html"', 'href="/contact"')
    .replaceAll('href="service.html"', 'href="/services"')
    .replaceAll('href="team.html"', 'href="/team"')
    .replaceAll('href="404.html"', 'href="/404"')
}
