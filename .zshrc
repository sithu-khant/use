autoload -Uz colors && colors
setopt PROMPT_SUBST

function git_prompt() {
  local branch dirty

  branch=$(git symbolic-ref --short HEAD 2>/dev/null) \
    || branch=$(git rev-parse --short HEAD 2>/dev/null) \
    || return

  if ! git diff --quiet 2>/dev/null || ! git diff --cached --quiet 2>/dev/null; then
    dirty="*"
  fi

  echo "%F{magenta}(${branch}${dirty})%f "
}

PROMPT='%F{242}%n@%f%F{33}%2~%f $(git_prompt)%F{red}%(?..✗ )%f%% '

# -------------------------------- #
# Git
# -------------------------------- #

alias gs="git status"
alias ga="git add"
alias gA="git add -A"
alias gcam="gA && git commit -m"
alias gp="git push"
alias grhh="git reset --hard"

# -------------------------------- #
# pnpm
# -------------------------------- #

alias p="pnpm"

export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

# -------------------------------- #
# Bun
# -------------------------------- #

# completions
[ -s "$HOME/.bun/_bun" ] && source "$HOME/.bun/_bun"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
