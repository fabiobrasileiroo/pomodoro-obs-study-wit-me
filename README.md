# Pomodoro Timer - Estude Comigo

Timer Pomodoro personalizado com a estética da Grande Onda de Kanagawa, ideal para uso no OBS.

## Arquitetura

Projeto refatorado com estrutura clean e performática:

- **nuqs** - Gerenciamento type-safe de query parameters
- **Componentes isolados** - Separação de responsabilidades
- **Hooks customizados** - Lógica reutilizável e testável
- **Otimizações** - useCallback, memoização, e atualizações eficientes

### Estrutura de pastas

\`\`\`
app/
  page.tsx                    # Página principal com Suspense
components/
  pomodoro-timer.tsx          # Componente principal orquestrador
  timer-display.tsx           # Display do tempo e texto
  session-counter.tsx         # Contadores de sessões
  timer-controls.tsx          # Botões de controle
  wave-icon.tsx               # Ícone da onda
hooks/
  use-pomodoro-params.ts      # Hook para query params com nuqs
  use-timer.ts                # Lógica do timer
lib/
  utils.ts                    # Utilitários (cn, formatTime)
\`\`\`

## Como usar

### Parâmetros da URL

Configure o timer através dos parâmetros na URL:

- `duration` - Duração em minutos (padrão: 25)
- `autostart` - Iniciar automaticamente (true/false)
- `type` - Tipo de sessão ('pomodoro' ou 'break')
- `hidetext` - Ocultar texto "Estude comigo" (true/false)
- `study` - Número de sessões de estudo completadas (padrão: 0)
- `break` - Número de breaks completados (padrão: 0)

### Exemplos de URL

**Pomodoro de 50 minutos (auto-start):**
\`\`\`
http://localhost:3000/?duration=50&autostart=true&type=pomodoro&study=3&break=2
\`\`\`

**Break de 10 minutos (auto-start):**
\`\`\`
http://localhost:3000/?duration=10&autostart=true&type=break&study=3&break=2
\`\`\`

**Pomodoro padrão (25 minutos, sem auto-start):**
\`\`\`
http://localhost:3000/?duration=25&autostart=false&type=pomodoro
\`\`\`

**Timer limpo (sem texto):**
\`\`\`
http://localhost:3000/?duration=25&autostart=true&hidetext=true
\`\`\`

## Uso no OBS

1. Adicione uma fonte "Navegador" (Browser Source)
2. Cole a URL com os parâmetros desejados
3. Configure a resolução (recomendado: 1920x1080)
4. Marque "Desligar fonte quando não estiver visível" para pausar quando trocar de cena
5. Crie diferentes cenas com URLs diferentes para cada tipo de sessão

### Configuração recomendada no OBS:

**Cena "Pomodoro 50min":**
- URL: `sua-url/?duration=50&autostart=true&type=pomodoro&study=3&break=2`

**Cena "Break 10min":**
- URL: `sua-url/?duration=10&autostart=true&type=break&study=3&break=3`

Assim você só precisa alternar entre as cenas e o timer começa automaticamente! Os contadores de sessão ajudam a acompanhar seu progresso.

## Características Visuais

- Imagem da Onda de Kanagawa aparece mais transparente durante o pomodoro (foco) e mais visível durante o break
- Fontes grandes e legíveis com sombras sutis para melhor contraste
- Contadores de sessões de estudo e breaks
- Controles de pausa/reset aparecem apenas ao passar o mouse (invisíveis na stream)
