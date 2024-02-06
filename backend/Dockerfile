FROM python:3.9-slim

WORKDIR /home/app
COPY requirements.txt ./
RUN apt update -y && \
    apt install -y --no-install-recommends pkg-config python3-dev build-essential default-libmysqlclient-dev && \
    pip install -r requirements.txt
COPY concert_platform entrypoint.sh waitport.py ./
RUN mv concert_platform/settings.docker.py concert_platform/settings.py

CMD ["/home/app/entrypoint.sh"]