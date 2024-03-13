FROM node:21-alpine3.18

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npx tsc

EXPOSE $AUTH_GRPC_PORT
ENV GATEWAY_PORT=8000
ENV JWT_SECRET='>sShIOu-q9£Ntq199N8)HX3ge52wa"P[gEi&/$Cd,B:BJkn+B'
ENV ACCESS_TOKEN='D[jHTur9],/;C£JPI?[1pf70oUdlUv:?touogbjT+\SFoOs;'
ENV REFRESH_TOKEN="pI|T>We<1Gvc]d3rp|u=5[Tk@84\grWZ)na3aW<pZ]!,Qb_K+Z"

CMD ["npm", "start"]

