#!/usr/bin/env sh

name="${1:?Usage: project-init.sh <project name>}"

log() { echo ">>> [project-init] $*"; }

log "Initializing CAP project: $name"
cds init "$name" --add nodejs,hana --nodejs
cd "$name"

log "Installing dev dependencies"
npm install --save-dev @sap/cds-dk @cap-js/cds-test jest

log "Setting package scripts"
npm pkg set scripts.dev:cap="cds watch"
npm pkg set scripts.dev:ui="npm run dev --workspace=ui"
npm pkg set scripts.build="npm run build --workspace=ui && cds build --production"
npm pkg set scripts.preview="npm run build --workspace=ui && cds watch"
npm pkg set scripts.test="jest --testEnvironment node --forceExit"
npm pkg set cds.requires.auth="dummy"

log "Creating Vite React app in ui/"
npm create --yes vite@latest ui -- --template react --no-interactive

log "Configuring workspaces and UI dependencies"
npm pkg set 'workspaces[]=ui'
cd ui
npm pkg set 'dependencies.@ui5/webcomponents=latest'
npm pkg set 'dependencies.@ui5/webcomponents-fiori=latest'
npm pkg set 'dependencies.@ui5/webcomponents-icons=latest'
npm pkg set 'dependencies.@ui5/webcomponents-react=latest'
cd ..

log "Patching vite config (build output to ../app)"
vite_config=$(ls ui/vite.config.* 2>/dev/null | head -1)
log "Found vite config: $vite_config"
sed 's/defineConfig({/defineConfig({\
    build: {\
      outDir: "..\/app",\
      emptyOutDir: true\
    },/' "$vite_config" > ui/vite.config.tmp && mv ui/vite.config.tmp "$vite_config"

log "Running npm install and build in background"
(npm install && npm run build) > /dev/null 2>&1 &
