FROM node:12

# WORKDIR /home/project/
# COPY ./ /home/project/

# ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && \
    apt upgrade -y && \
    # 日本語化うまく行ってない(コンソールから入力できないけど、別に要らない)
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
    echo "if [ -e /home/project/README.md ]; then" >> /usr/local/bin/init && \
    echo "echo Environment is already initialized." >> /usr/local/bin/init && \
    echo "exit 1" >> /usr/local/bin/init && \
    echo "fi" >> /usr/local/bin/init && \
    echo "cp -r /home/hostfiles /home/project" >> /usr/local/bin/init && \
    echo "cd /project" >> /usr/local/bin/init && \
    echo "git checkout ." >> /usr/local/bin/init && \
    echo "echo Initialize environment." >> /usr/local/bin/init && \
    chmod a+x /usr/local/bin/init


# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt update && \
#     # locale
#     apt install -y locales && \
#     locale-gen ja_JP.UTF-8 && \
#     echo "export LANG=ja_JP.UTF-8" >> ~/.bashrc && \
#     # apache
#     apt install -y apache2 && \
#     apt install -y software-properties-common && \
#     add-apt-repository -y ppa:ondrej/php && \
#     apt update && \
#     apt install -y php5.6 && \
#     apt install -y php5.6-mysql php5.6-intl php5.6-mbstring && \
#     service apache2 restart && \
#     # # mysql
#     # wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb && \
#     # dpkg -i mysql-apt-config_0.8.12-1_all.deb && \
#     # apt install -y -f mysql-client=5.7.32-0ubuntu0.18.04.1 && \
#     # composer
#     php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
#     php composer-setup.php && \
#     php -r "unlink('composer-setup.php');" && \
#     mv composer.phar /usr/local/bin/composer && \
#     # nodejsとnpmのインストール
#     apt install -y nodejs npm wget && \
#     npm install n -g && \
#     n stable && \
#     apt purge -y nodejs npm && \
#     # subversionをインストール
#     apt install -y subversion && \
#     # subversionの設定値変更(先頭に追加)
#     sed -i '1s/^/openssl_conf = default_conf\n/' /usr/lib/ssl/openssl.cnf && \
#     # subversionの設定値変更(末尾に追加)
#     echo "[ default_conf ]" >> /usr/lib/ssl/openssl.cnf && \
#     echo "ssl_conf = ssl_sect" >> /usr/lib/ssl/openssl.cnf && \
#     echo "[ssl_sect]" >> /usr/lib/ssl/openssl.cnf && \
#     echo "system_default = ssl_default_sect" >> /usr/lib/ssl/openssl.cnf && \
#     echo "[ssl_default_sect]" >> /usr/lib/ssl/openssl.cnf && \
#     echo "MinProtocol = TLSv1" >>/usr/lib/ssl/openssl.cnf && \
#     echo "CipherString = DEFAULT:@SECLEVEL=1" >> /usr/lib/ssl/openssl.cnf && \
#     #     
#     apt install -y zip unzip php5.6-xml && \
#     mkdir boss
