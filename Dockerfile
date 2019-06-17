#FROM node:12.3.1-alpine
FROM buildkite/puppeteer

RUN mkdir -p /code
WORKDIR /code/
COPY ./ ./

#RUN apk add curl openssl
RUN apt-get update && apt-get install -y --no-install-recommends curl openssl unzip
RUN curl -SsL https://downloads.gauge.org/stable | sh
RUN npm install taiko
RUN gauge telemetry off
RUN gauge install js
RUN gauge install html-report
RUN gauge install screenshot

#RUN adduser -D -u 1001 appuser
#USER appuser

ENTRYPOINT npm run test