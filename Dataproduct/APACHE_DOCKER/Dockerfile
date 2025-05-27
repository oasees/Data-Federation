FROM ubuntu 
RUN apt update 
RUN apt install -y apache2 
RUN apt install -y apache2-utils 
RUN apt clean 

RUN mkdir -p /tmp/www/html/.well-known


COPY ./oasees.crt   /etc/ssl/certs/oasees.crt
COPY ./SSL1550613.priv  /etc/ssl/private/SSL1550613.priv

COPY ./ssl-params.conf /etc/apache2/conf-available/ssl-params.conf
COPY ./default-ssl.conf /etc/apache2/sites-available/default-ssl.conf
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf



RUN a2enmod ssl
RUN a2enmod headers
RUN a2ensite default-ssl
RUN a2enconf ssl-params
RUN  apache2ctl configtest
EXPOSE 80
EXPOSE 443

CMD ["apache2ctl", "-D", "FOREGROUND"]
