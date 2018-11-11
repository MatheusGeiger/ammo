FROM node:8.11.2-alpine

EXPOSE 3000

ADD . /client-api

RUN cd /client-api &&\
    npm install && \
    if [ -f ~/.npmrc ]; then rm ~/.npmrc; fi

VOLUME /client-api/node_modules

WORKDIR /client-api

CMD ["npm", "run dev"]