# Page Editor

Editor visual de páginas para sistema multi-tenant.

## Tecnologías
- React 19.2
- Vite 7.3
- Tailwind CSS 4.x
- shadcn/ui (CLI v4)
- Zustand
- TypeScript 5.7

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Estructura del proyecto

```
src/
├── components/
│   ├── ui/           # Componentes shadcn/ui
│   ├── editor/       # Componentes del editor
│   └── common/       # Componentes comunes
├── store/            # Estado global (Zustand)
├── types/            # Tipos TypeScript
├── lib/              # Utilidades
└── data/             # Datos de tenants
```