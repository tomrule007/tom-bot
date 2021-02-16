FROM debian:buster

WORKDIR /vortex

RUN apt-get update &&  apt-get -y install curl zip && apt-get clean

RUN curl -O https://www.vtxhub.com/download/1.1.4/linux/vortex.zip

RUN unzip vortex.zip -d /usr/bin && rm vortex.zip

CMD [ "vortex" ]