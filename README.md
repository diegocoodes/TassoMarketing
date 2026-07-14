# TassoMarketing

Landing page estática, responsiva e institucional da Universo Marketing, desenvolvida com foco em autoridade de marca, clareza da oferta e conversão via WhatsApp.

## Objetivo

Apresentar a Universo Marketing e T. Thales de forma profissional, destacando tráfego pago como serviço principal e conectando isso a automações, CRM, atendimento com IA, SEO e estratégia digital.

## Tecnologias

- Next.js com App Router
- React
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Motion para React
- Lucide React
- `next/image`
- `next/font`

## Estrutura de pastas

```text
app/
  globals.css
  layout.tsx
  manifest.ts
  page.tsx
  robots.ts
  sitemap.ts
  politica-de-privacidade/page.tsx
  termos-de-uso/page.tsx

components/
  layout/
  sections/
  ui/

config/
  site.ts

data/
  benefits.ts
  clients.ts
  differentials.ts
  faq.ts
  navigation.ts
  results.ts
  services.ts

hooks/
  useIsomorphicLayoutEffect.ts
  useReducedMotion.ts

public/
  images/
    brand/
    clients/
    results/
    tasso/
```

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Build de produção

```bash
npm run build
```

O projeto está configurado com `output: "export"`, então o build gera a versão estática na pasta `out/`.

## Publicação

O site pode ser publicado em:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- hospedagem tradicional

## Configuração do WhatsApp

Edite [config/site.ts](C:/Users/diego.silva/Desktop/Tasso/config/site.ts:1).

Campos principais:

- `siteConfig.whatsapp.number`
- `siteConfig.whatsapp.message`

Todos os botões usam `getWhatsAppUrl()`, então o número não precisa ser repetido em outros componentes.

Observação: enquanto o número real não for informado, o projeto usa um fallback que abre o compartilhamento do WhatsApp apenas com a mensagem.

## Alteração dos Instagrams

Edite em [config/site.ts](C:/Users/diego.silva/Desktop/Tasso/config/site.ts:1):

- `siteConfig.social.tassoInstagram`
- `siteConfig.social.companyInstagram`

## Alteração de textos

Os textos institucionais estão distribuídos entre:

- [app/page.tsx](C:/Users/diego.silva/Desktop/Tasso/app/page.tsx:1) para ordem geral da página
- [components/sections](C:/Users/diego.silva/Desktop/Tasso/components/sections) para conteúdo por seção
- [data/services.ts](C:/Users/diego.silva/Desktop/Tasso/data/services.ts:1)
- [data/benefits.ts](C:/Users/diego.silva/Desktop/Tasso/data/benefits.ts:1)
- [data/differentials.ts](C:/Users/diego.silva/Desktop/Tasso/data/differentials.ts:1)
- [data/faq.ts](C:/Users/diego.silva/Desktop/Tasso/data/faq.ts:1)
- [data/results.ts](C:/Users/diego.silva/Desktop/Tasso/data/results.ts:1)

## Logos e identidade visual

As pastas já foram preparadas e os arquivos atuais foram organizados em:

- [public/images/brand](C:/Users/diego.silva/Desktop/Tasso/public/images/brand)
- [public/images/tasso](C:/Users/diego.silva/Desktop/Tasso/public/images/tasso)
- [public/images/clients](C:/Users/diego.silva/Desktop/Tasso/public/images/clients)
- [public/images/results](C:/Users/diego.silva/Desktop/Tasso/public/images/results)

Arquivos já padronizados:

- `public/images/brand/logo-universo-dourada.png`
- `public/images/brand/logo-universo-grafite.png`
- `public/images/brand/icone-universo-dourado.png`
- `public/images/brand/icone-universo-branco.png`
- `public/images/tasso/logo-gestor-trafego.png`
- `public/images/tasso/logo-gestor-trafego-alt-1.png`
- `public/images/tasso/logo-gestor-trafego-alt-2.png`

Alguns placeholders em SVG continuam no projeto apenas para cobrir peças ainda não fornecidas, como social cover e área de retrato futuro.

Para substituir:

1. Coloque os arquivos reais nas pastas corretas.
2. Atualize os caminhos em [config/site.ts](C:/Users/diego.silva/Desktop/Tasso/config/site.ts:1), se necessário.
3. Mantenha proporção original e prefira `SVG`, `PNG` com transparência ou `WebP` com transparência.

## Foto do T. Thales

No momento a seção “Sobre” usa a identidade visual de T. Thales em vez de foto fictícia. A área futura de retrato continua preparada em [public/images/tasso/portrait-placeholder.svg](C:/Users/diego.silva/Desktop/Tasso/public/images/tasso/portrait-placeholder.svg:1).

Para substituir:

1. Adicione a foto oficial em `public/images/tasso/`.
2. Atualize `siteConfig.assets.portrait` em [config/site.ts](C:/Users/diego.silva/Desktop/Tasso/config/site.ts:1).

## Cadastro de clientes e logos do marquee

Edite [data/clients.ts](C:/Users/diego.silva/Desktop/Tasso/data/clients.ts:1).

Estrutura esperada:

```ts
export const clients = [
  {
    name: "Nome da empresa",
    logo: "/images/clients/nome-da-logo.svg",
    alt: "Logo da empresa",
    width: 180,
    height: 64,
    href: "https://empresa.com.br",
  },
];
```

Coloque as logos em [public/images/clients](C:/Users/diego.silva/Desktop/Tasso/public/images/clients).

Se `clients` estiver vazio, a seção mostra espaços preparados em vez de inventar marcas.

## Velocidade do marquee

Edite em [data/clients.ts](C:/Users/diego.silva/Desktop/Tasso/data/clients.ts:1):

```ts
const pixelsPerSecond = 65;
```

No projeto atual esse valor está em `marqueeConfig.pixelsPerSecond`.

- Valor maior = movimento mais rápido
- Valor menor = movimento mais lento

## Resultados reais e prints

Os cards de resultados estão em [data/results.ts](C:/Users/diego.silva/Desktop/Tasso/data/results.ts:1) e a renderização visual está em [components/sections/ResultsSection.tsx](C:/Users/diego.silva/Desktop/Tasso/components/sections/ResultsSection.tsx:1).

Use [public/images/results](C:/Users/diego.silva/Desktop/Tasso/public/images/results) para armazenar prints ou imagens oficiais.

## GSAP

As animações GSAP estão concentradas nas seções e usam:

- `gsap.context()` para limpeza segura
- `ScrollTrigger` para reveals e progressão da linha do processo
- `gsap.matchMedia()` no processo para adaptar desktop e mobile

Hooks usados:

- [hooks/useIsomorphicLayoutEffect.ts](C:/Users/diego.silva/Desktop/Tasso/hooks/useIsomorphicLayoutEffect.ts:1)
- [hooks/useReducedMotion.ts](C:/Users/diego.silva/Desktop/Tasso/hooks/useReducedMotion.ts:1)

## Motion

O Motion foi usado para:

- hover e tap dos botões
- cards de serviços e problemas
- menu mobile
- accordion do FAQ
- microinterações do botão flutuante do WhatsApp
- microinterações das logos do marquee

Import utilizado:

```ts
import { motion, AnimatePresence } from "motion/react";
```

## Movimento reduzido

Quando `prefers-reduced-motion: reduce` estiver ativo:

- o marquee automático é desativado
- as logos viram grade estática
- timelines complexas são reduzidas
- o conteúdo continua acessível sem depender de movimento

## SEO

A configuração principal está em:

- [app/layout.tsx](C:/Users/diego.silva/Desktop/Tasso/app/layout.tsx:1)
- [components/ui/JsonLd.tsx](C:/Users/diego.silva/Desktop/Tasso/components/ui/JsonLd.tsx:1)
- [app/manifest.ts](C:/Users/diego.silva/Desktop/Tasso/app/manifest.ts:1)
- [app/robots.ts](C:/Users/diego.silva/Desktop/Tasso/app/robots.ts:1)
- [app/sitemap.ts](C:/Users/diego.silva/Desktop/Tasso/app/sitemap.ts:1)

## Arquivos de placeholder

Arquivos temporários ainda preparados para uso futuro:

- [public/images/brand/logo-placeholder.svg](C:/Users/diego.silva/Desktop/Tasso/public/images/brand/logo-placeholder.svg:1)
- [public/images/brand/icon-placeholder.svg](C:/Users/diego.silva/Desktop/Tasso/public/images/brand/icon-placeholder.svg:1)
- [public/images/brand/social-cover-placeholder.svg](C:/Users/diego.silva/Desktop/Tasso/public/images/brand/social-cover-placeholder.svg:1)
- [public/images/tasso/portrait-placeholder.svg](C:/Users/diego.silva/Desktop/Tasso/public/images/tasso/portrait-placeholder.svg:1)

## Verificações executadas

- `npm install`
- `npm run lint`
- `npm run build`

O projeto compila com sucesso e gera saída estática.

## Pendências que dependem do cliente

- número real do WhatsApp comercial
- logos oficiais da marca
- foto profissional do T. Thales
- logos reais de clientes/marcas atendidas
- prints e cases reais de resultados
- domínio final de produção para substituir `https://seudominio.com.br`
