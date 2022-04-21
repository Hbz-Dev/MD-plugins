FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 5000

CMD ["node", "index.js", "--db 'mongodb+srv://ryubot:lunoxlance@cluster0.qupcb.mongodb.net/Cluster0?retryWrites=true&w=majority'"]

