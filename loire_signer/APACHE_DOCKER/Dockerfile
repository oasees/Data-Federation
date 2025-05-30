# Copyright (c) 2024 Tecnalia, Basque Research & Technology Alliance (BRTA)
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of
# this software and associated documentation files (the "Software"), to deal in
# the Software without restriction, including without limitation the rights to
# use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
# the Software, and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
# FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
# COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
# IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# 
# SPDX-License-Identifier: MIT

FROM ubuntu 
RUN apt update 
RUN apt install -y apache2 
RUN apt install -y apache2-utils 
RUN apt clean 

RUN mkdir -p /tmp/www/html/.well-known


COPY ./fullchain.pem   /etc/ssl/certs/fullchain.pem
COPY ./privkey.pem  /etc/ssl/private/privkey.pem



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
