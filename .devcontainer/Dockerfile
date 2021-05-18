FROM node:12

# 開発環境構築用のDockerfile

RUN apt update && \
    apt upgrade -y && \
    # 日本語化うまく行ってない(コンソールから入力できないけど、別に要らないか)
    # # locale
    # apt install -y locales && \
    # locale-gen ja_JP.UTF-8 && \
    # echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc && \
    # git npm nest
    # npm i -g @nestjs/cli && \
    # cd backend && \
    # npm ci && \
    # cd ../frontend && \
    # npm ci
    # ローカルボリュームからのコピーコマンド
    mkdir /home/project -p && \
    echo "if [ -e /home/project/README.md ]; then" >> /usr/local/bin/init && \
    echo "echo Environment is already initialized." >> /usr/local/bin/init && \
    echo "exit 1" >> /usr/local/bin/init && \
    echo "fi" >> /usr/local/bin/init && \
    echo "cp -r /home/hostfiles/project /home" >> /usr/local/bin/init && \
    echo "cd /home/project" >> /usr/local/bin/init && \
    echo "git checkout ." >> /usr/local/bin/init && \
    echo "cd /home/project/frontend" >> /usr/local/bin/init && \
    echo "npm ci" >> /usr/local/bin/init && \
    echo "cd /home/project/backend" >> /usr/local/bin/init && \
    echo "npm ci" >> /usr/local/bin/init && \
    echo "cd /home/project" >> /usr/local/bin/init && \
    echo "echo Initialize environment." >> /usr/local/bin/init && \
    chmod a+x /usr/local/bin/init
