# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-frontend,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build
RUN mkdir -p /app/nginx-dist && \
  if [ -d /app/dist/frontend/browser/en-US ]; then \
    cp -a /app/dist/frontend/browser/en-US/. /app/nginx-dist/; \
  else \
    cp -a /app/dist/frontend/browser/. /app/nginx-dist/; \
  fi

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx-dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
