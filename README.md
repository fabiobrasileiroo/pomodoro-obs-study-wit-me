# Pomodoro Timer - Estude Comigo

Timer Pomodoro personalizado com a estética da Grande Onda de Kanagawa, ideal para uso no OBS.

## Arquitetura

Projeto refatorado com estrutura clean e performática:

- **nuqs** - Gerenciamento type-safe de query parameters
- **Componentes isolados** - Separação de responsabilidades
- **Hooks customizados** - Lógica reutilizável e testável
- **Otimizações** - useCallback, memoização, e atualizações eficientes

### Estrutura de pastas

```bash
app/
  page.tsx                    # Página principal com Suspense
  clock/
    page.tsx                  # Página do relógio de Manaus
components/
  pomodoro-timer.tsx          # Componente principal orquestrador
  timer-display.tsx           # Display do tempo e texto
  session-counter.tsx         # Contadores de sessões (com formato X/Y)
  timer-controls.tsx          # Botões de controle (Start/Reset/Config)
  manaus-clock.tsx            # Relógio com horário de Manaus
  wave-icon.tsx               # Ícone da onda
hooks/
  use-pomodoro-params.ts      # Hook para query params com nuqs
  use-timer.ts                # Lógica do timer
lib/
  utils.ts                    # Utilitários (cn, formatTime)
```

## Como usar

### Parâmetros da URL

Configure o timer através dos parâmetros na URL:

- `duration` - Duração do timer em minutos (padrão: 25)
- `sessionDuration` - Duração por sessão exibida abaixo do contador (opcional)
- `autostart` - Iniciar automaticamente (true/false, padrão: false)
- `type` - Tipo de sessão: 'pomodoro' ou 'break' (padrão: pomodoro)
- `hidetext` - Ocultar texto "Estude comigo" (true/false, padrão: false)
- `hidebreak` - Ocultar contador de breaks (true/false, padrão: false)
- `study` - Número de sessões de estudo completadas (padrão: 0)
- `break` - Número de breaks completados (padrão: 0)
- `total` - Total de sessões planejadas - exibe formato "X/Y" (opcional)

**Nota:** Se `total` for informado, o contador de estudo mostra "3/5" (atual/total). Caso contrário, mostra apenas o número atual.

### Exemplos de URL

**Timer Pomodoro completo (25 min, mostrando 3/5 sessões):**

```
http://localhost:3000/?duration=25&study=3&total=5&sessionDuration=25
```

**Pomodoro 50 min com auto-start e sem contador de break:**

```
http://localhost:3000/?duration=50&autostart=true&type=pomodoro&study=3&total=5&hidebreak=true
```

**Break de 10 minutos:**

```
http://localhost:3000/?duration=10&autostart=true&type=break&study=3&break=2
```

**Timer limpo (sem texto, só o relógio):**

```
http://localhost:3000/?duration=25&autostart=true&hidetext=true
```

## Relógio de Manaus

Para usar apenas o relógio com horário de Manaus (AM - UTC-4) no OBS:

```
http://localhost:3000/clock
```

Exibe o horário no formato `HH:MM:SS`, atualizado em tempo real. Ideal para overlay de streams.

## Uso no OBS

### Timer Pomodoro

1. Adicione uma fonte "Navegador" (Browser Source)
2. Cole a URL com os parâmetros desejados
3. Configure a resolução (recomendado: 1920x1080)
4. Marque "Desligar fonte quando não estiver visível" para pausar quando trocar de cena
5. Crie diferentes cenas com URLs diferentes para cada tipo de sessão

**Exemplos de configuração:**

**Cena "Pomodoro 50min":**

```
sua-url/?duration=50&autostart=true&type=pomodoro&study=3&total=5&hidebreak=true
```

**Cena "Break 10min":**

```
sua-url/?duration=10&autostart=true&type=break&study=3&break=3&total=5
```

**Cena "Timer Limpo":**

```
sua-url/?duration=25&autostart=true&hidetext=true&hidebreak=true
```

### Relógio de Manaus

Para adicionar apenas o relógio:

1. Adicione uma fonte "Navegador" (Browser Source)
2. URL: `sua-url/clock`
3. Configure a resolução conforme necessário
4. O relógio mostra horário de Manaus (AM) em tempo real

### Painel de Configuração

Ao passar o mouse sobre o timer, aparecem os botões:

- **Start/Pause** - Controla o timer
- **Reset** - Reinicia o timer
- **Config** - Abre painel para ajustar todos os parâmetros via interface gráfica

O painel de Config permite alterar:

- Duração do timer
- Modo (Pomodoro/Break) - muda instantaneamente
- Total de sessões
- Duração por sessão
- Auto start e esconder texto
- Contadores de sessões de estudo e breaks

Todas as mudanças são aplicadas na URL automaticamente.

## Características Visuais

- Imagem da Onda de Kanagawa aparece mais transparente durante o pomodoro (foco) e mais visível durante o break
- Fontes grandes e legíveis com sombras sutis para melhor contraste
- **Contador de sessões formato "X/Y"** quando `total` é especificado (ex: "3/5")
- Opção de esconder contador de breaks com `hidebreak=true`
- Informação de duração por sessão exibida abaixo do contador (quando `sessionDuration` está presente)
- Controles de pausa/reset/config aparecem apenas ao passar o mouse (invisíveis na stream)
- Painel de configuração integrado com componentes shadcn/ui
- Relógio separado com horário de Manaus para uso independente no OBS
