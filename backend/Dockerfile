FROM python:3.9-slim

WORKDIR /home/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY concert_platform entrypoint.sh ./
RUN python3 manage.py migrate

CMD ["/home/app/entrypoint.sh"]