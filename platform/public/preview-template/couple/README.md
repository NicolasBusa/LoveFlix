# 📁 Pasta `couple/` — Configuração do Casal

Esta é a **única pasta que você precisa tocar** para personalizar o LoveFlix para um novo casal.

---

## 📂 Estrutura

```
couple/
├── couple.js       ← TODAS as informações do casal (edite aqui)
└── photos/
    ├── hero.png    ← foto principal (banner do hero, fundo do login)
    ├── profile.png ← avatar circular (tela "Quem está assistindo?")
    ├── m1.png      ← galeria: foto 1
    ├── m2.png      ← galeria: foto 2
    ├── m3.png      ← galeria: foto 3
    ├── m4.png      ← galeria: foto 4
    └── m5.png      ← galeria: foto 5
```

---

## ✏️ O que editar em `couple.js`

| Campo          | O que é                                      |
|----------------|----------------------------------------------|
| `names`        | Nomes dos dois                               |
| `coupleTitle`  | Título exibido (ex: "Ana & Carlos")          |
| `tagline`      | Subtítulo romântico                          |
| `startDate`    | **🔐 Senha de acesso** (data do primeiro beijo/namoro) |
| `badges`       | Selos exibidos no topo (ex: "Top 1 Casal")  |
| `bio`          | Texto de apresentação no banner              |
| `tabs`         | Textos das abas: História, Momentos, etc.    |
| `timeline`     | Marcos do relacionamento (cards horizontais) |
| `cinema`       | ID do vídeo YouTube para música de fundo     |

---

## 🖼️ Como trocar as fotos

Basta **substituir os arquivos** na pasta `couple/photos/` mantendo os **mesmos nomes**:

- `hero.png` → foto horizontal para o banner principal
- `profile.png` → foto quadrada/circular para o perfil
- `m1.png` até `m5.png` → fotos da galeria e timeline

> **Formato recomendado:** PNG ou JPG  
> **Tamanho hero:** 1920×1080px (ou similar landscape)  
> **Tamanho profile/galeria:** mínimo 800×800px

---

## 🤖 Para automação (script)

Para trocar de casal automaticamente, seu script precisa:

1. Sobrescrever `couple/couple.js` com os dados do novo casal
2. Substituir os arquivos em `couple/photos/` com as fotos do novo casal

É só isso! O resto do site lê tudo automaticamente a partir daqui.
