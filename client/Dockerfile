FROM node:latest as builder

ARG FRONTEND_URL
ENV FRONTEND_URL $FRONTEND_URL
ARG BACKEND_URL
ENV BACKEND_URL $BACKEND_URL

RUN mkdir -p /src/app
COPY . /src/app
WORKDIR /src/app
RUN npm install && npm run build

FROM node:latest
WORKDIR /client-react
RUN addgroup --system --gid 999 nodejs
RUN adduser --system --uid 999 nextjs
COPY package.json ./

RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /src/app/.next/standalone ./
COPY --from=builder  --chown=nextjs:nodejs /src/app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]



