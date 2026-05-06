  git clone git@github.com:ctarrington/try-agentic-dev.git
  cd try-agentic-dev/car-store-react-ts
  podman build -t cypress-chrome-lightweight:latest .
  podman save -o cypress-chrome-lightweight.tar cypress-chrome-lightweight:latest
