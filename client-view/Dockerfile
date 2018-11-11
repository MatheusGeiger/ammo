FROM node:8.11.2-alpine

EXPOSE 3002

ADD . /client-view

RUN cd /client-view &&\
    npm install && \
    if [ -f ~/.npmrc ]; then rm ~/.npmrc; fi

VOLUME /client-view/node_modules

WORKDIR /client-view

CMD ["npm", "start"]